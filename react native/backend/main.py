import firebase_admin
from firebase_admin import credentials, auth
from flask import Flask, request, jsonify
from flask_cors import CORS
from deep_translator import GoogleTranslator
import speech_recognition as sr
import threading
from gtts import gTTS
import base64
import io
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(override=True)  # This will load variables from .env file

# You can verify loaded variables like this
SECRET_KEY = os.getenv('SECRET_KEY')
FLASK_ENV = os.getenv('FLASK_ENV')

class TranslatorService:
    def __init__(self):
        # Load environment variables
        load_dotenv()

        # Initialize Firebase Admin SDK
        cred = credentials.Certificate('./firebase_credentials.json')
        firebase_admin.initialize_app(cred)

        # Flask app setup
        self.app = Flask(__name__)
        CORS(self.app)

        # Language codes mapping
        self.language_codes = {
            "en": "English", "es": "Spanish", "fr": "French",
            "de": "German", "zh": "Chinese", "ar": "Arabic",
            "ru": "Russian", "pt": "Portuguese", "ja": "Japanese", 
            "ko": "Korean", "it": "Italian", "nl": "Dutch"
        }

        # Route definitions
        self.setup_routes()

    def setup_routes(self):
        # Add root route
        self.app.route('/', methods=['GET'])(self.root)
        
        self.app.route('/translate', methods=['POST'])(self.translate_text)
        self.app.route('/speech-to-text', methods=['POST'])(self.speech_to_text)
        self.app.route('/text-to-speech', methods=['POST'])(self.text_to_speech)
        self.app.route('/languages', methods=['GET'])(self.get_supported_languages)
        self.app.route('/login', methods=['POST'])(self.login)
        self.app.route('/register', methods=['POST'])(self.register)
        self.app.route('/test', methods=['GET'])(self.test)

    # Add root route method
    def root(self):
        return jsonify({
            "message": "Translator Service API",
            "available_routes": [
                "/translate",
                "/speech-to-text",
                "/text-to-speech",
                "/languages",
                "/login",
                "/register",
                "/test"
            ]
        })

    def test(self):
        """Test route to check if backend is working"""
        return jsonify({"message": "Backend is working!"})

    def get_supported_languages(self):
        """Return list of supported languages"""
        try:
            return jsonify({
                "languages": [
                    {"code": code, "name": name} 
                    for code, name in self.language_codes.items()
                ]
            })
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def translate_text(self):
        try:
            # Authenticate request
            self.verify_token(request)

            data = request.json
            source_lang = data.get('sourceLang', 'en')
            target_lang = data.get('targetLang', 'es')
            text = data.get('text', '')

            if not text:
                return jsonify({"error": "No text provided"}), 400

            # Translate text
            translator = GoogleTranslator(source=source_lang, target=target_lang)
            translated_text = translator.translate(text)

            return jsonify({
                "originalText": text,
                "translatedText": translated_text,
                "sourceLang": source_lang,
                "targetLang": target_lang
            })

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def speech_to_text(self):
        try:
            # Authenticate request
            self.verify_token(request)

            # Decode base64 audio
            audio_data = request.json.get('audioData')
            source_lang = request.json.get('language', 'en')

            if not audio_data:
                return jsonify({"error": "No audio data provided"}), 400

            # Convert base64 to audio file
            audio_bytes = base64.b64decode(audio_data)
            
            recognizer = sr.Recognizer()
            with sr.AudioFile(io.BytesIO(audio_bytes)) as source:
                audio = recognizer.record(source)
                text = recognizer.recognize_google(audio, language=source_lang)

            return jsonify({"text": text})

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def text_to_speech(self):
        try:
            # Authenticate request
            self.verify_token(request)

            data = request.json
            text = data.get('text', '')
            lang = data.get('language', 'en')

            if not text:
                return jsonify({"error": "No text provided"}), 400

            # Generate audio
            tts = gTTS(text=text, lang=lang)
            audio_buffer = io.BytesIO()
            tts.write_to_fp(audio_buffer)
            audio_buffer.seek(0)

            # Encode audio to base64
            audio_base64 = base64.b64encode(audio_buffer.getvalue()).decode('utf-8')

            return jsonify({"audioData": audio_base64})

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def login(self):
        try:
            data = request.json
            email = data.get('email')
            password = data.get('password')

            # Firebase Authentication
            user = auth.get_user_by_email(email)
            
            # In a real app, you'd verify password with Firebase Auth
            # For demo, this is a placeholder
            token = auth.create_custom_token(user.uid)

            return jsonify({
                "token": token.decode('utf-8'),
                "user": {
                    "uid": user.uid,
                    "email": user.email
                }
            })

        except Exception as e:
            return jsonify({"error": str(e)}), 401

    def register(self):
        try:
            data = request.json
            email = data.get('email')
            password = data.get('password')

            # Create user in Firebase
            user = auth.create_user(
                email=email,
                password=password
            )

            token = auth.create_custom_token(user.uid)

            return jsonify({
                "token": token.decode('utf-8'),
                "user": {
                    "uid": user.uid,
                    "email": user.email
                }
            })

        except Exception as e:
            return jsonify({"error": str(e)}), 400

    def verify_token(self, request):
        # Verify Firebase ID token
        id_token = request.headers.get('Authorization')
        if not id_token:
            raise ValueError("No token provided")
        
        try:
            # Verify and decode the Firebase ID token
            decoded_token = auth.verify_id_token(id_token)
            return decoded_token
        except Exception as e:
            raise ValueError("Invalid token")

    def run(self, host='0.0.0.0', port=5000, debug=True):
        self.app.run(host=host, port=port, debug=debug)

if __name__ == "__main__":
    translator_service = TranslatorService()
    translator_service.run()