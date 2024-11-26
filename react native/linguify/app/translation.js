import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
  StatusBar,
  Modal,
  Clipboard,
  Dimensions,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import * as Speech from 'expo-speech';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import LanguageSelector from './component/languageSelector';

const { width } = Dimensions.get('window');

const Linguify = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [history, setHistory] = useState([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedSourceLang, setSelectedSourceLang] = useState('en');
  const [selectedTargetLang, setSelectedTargetLang] = useState('es');

  // Voice recognition setup
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => setIsRecording(true);
  const onSpeechEnd = () => setIsRecording(false);
  const onSpeechError = () => setIsRecording(false);
  const onSpeechResults = (event) => {
    setInputText(event.value[0]);
  };

  const handleVoiceInput = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error(error);
    }
  };

  const handleTranslate = () => {
    if (!inputText.trim()) return;
    const translation = `Translated: ${inputText}`;
    setTranslatedText(translation);
    setHistory([
      { input: inputText, translation, timestamp: new Date() },
      ...history,
    ]);
  };

  const handleSpeak = () => {
    Speech.speak(translatedText);
  };

  const handleCopy = () => {
    Clipboard.setString(translatedText);
  };

  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
  };

  const MenuModal = () => (
    <Modal
      visible={isMenuOpen}
      transparent
      animationType="slide"
      onRequestClose={() => setIsMenuOpen(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsMenuOpen(false)}
          >
            <Icon name="x" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.menuSection}>
            <Text style={styles.menuHeader}>Settings</Text>
            <Text style={styles.menuItem}>Voice Settings</Text>
            <Text style={styles.menuItem}>Theme Options</Text>
          </View>
          <View style={styles.menuSection}>
            <Text style={styles.menuHeader}>Help</Text>
            <Text style={styles.menuItem}>Documentation</Text>
            <Text style={styles.menuItem}>Support</Text>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#3730a3', '#581c87']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitle}>
              <Icon name="globe" size={24} color="#818cf8" />
              <Text style={styles.title}>Linguify</Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsMenuOpen(true)}
              style={styles.menuButton}
            >
              <Icon name="menu" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Language Selection */}
          <View style={styles.languageContainer}>
            <LanguageSelector
              label="Source Language"
              value={selectedSourceLang}
              onValueChange={setSelectedSourceLang}
            />
            <LanguageSelector
              label="Target Language"
              value={selectedTargetLang}
              onValueChange={setSelectedTargetLang}
            />
          </View>

          {/* Input Area */}
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Enter text to translate..."
              placeholderTextColor="#94a3b8"
              multiline
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.button,
                  isRecording ? styles.recordingButton : styles.primaryButton,
                ]}
                onPress={handleVoiceInput}
              >
                <Icon name="mic" size={20} color="#fff" />
                <Text style={styles.buttonText}>
                  {isRecording ? 'Recording...' : 'Voice Input'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={handleTranslate}
              >
                <Icon name="refresh-cw" size={20} color="#fff" />
                <Text style={styles.buttonText}>Translate</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Output Area */}
          {translatedText ? (
            <View style={styles.card}>
              <Text style={styles.translatedText}>{translatedText}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.smallButton]}
                  onPress={handleSpeak}
                >
                  <Icon name="volume-2" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.smallButton]}
                  onPress={handleCopy}
                >
                  <Icon name="copy" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.smallButton]}
                  onPress={handleClear}
                >
                  <Icon name="trash-2" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {/* History Section */}
          <TouchableOpacity
            style={styles.historyButton}
            onPress={() => setIsHistoryVisible(!isHistoryVisible)}
          >
            <Icon name="clock" size={20} color="#fff" />
            <Text style={styles.buttonText}>
              {isHistoryVisible ? 'Hide History' : 'Show History'}
            </Text>
          </TouchableOpacity>

          {isHistoryVisible && (
            <View style={styles.card}>
              {history.length === 0 ? (
                <Text style={styles.emptyHistory}>
                  No translation history yet
                </Text>
              ) : (
                history.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.historyItem,
                      index < history.length - 1 && styles.historyItemBorder,
                    ]}
                  >
                    <Text style={styles.historyTimestamp}>
                      {new Date(item.timestamp).toLocaleString()}
                    </Text>
                    <Text style={styles.historyInput}>{item.input}</Text>
                    <Text style={styles.historyTranslation}>
                      {item.translation}
                    </Text>
                  </View>
                ))
              )}
            </View>
          )}
        </ScrollView>
      </LinearGradient>
      <MenuModal />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuButton: {
    padding: 8,
  },
  
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  input: {
    color: '#fff',
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 16,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#818cf8',
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: '#9333ea',
    flex: 1,
  },
  recordingButton: {
    backgroundColor: '#ef4444',
    flex: 1,
  },
  smallButton: {
    backgroundColor: '#475569',
    padding: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  translatedText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    marginBottom: 16,
    gap: 8,
  },
  historyItem: {
    paddingVertical: 12,
  },
  historyItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  historyTimestamp: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 4,
  },
  historyInput: {
    color: '#cbd5e1',
    fontSize: 14,
    marginBottom: 4,
  },
  historyTranslation: {
    color: '#fff',
    fontSize: 16,
  },
  emptyHistory: {
    color: '#94a3b8',
    textAlign: 'center',
    padding: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: 300,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  menuSection: {
    marginVertical: 16,
  },
  menuHeader: {
    color: '#818cf8',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  menuItem: {
    color: '#cbd5e1',
    fontSize: 16,
    marginBottom: 8,
  },
});

export default Linguify;