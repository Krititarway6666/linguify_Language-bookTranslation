import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.0.2.2:5000'; // Replace with your backend IP/domain

const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to include token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/login', { email, password });
    await AsyncStorage.setItem('userToken', response.data.token);
    return response.data;
  },
  register: async (email, password) => {
    const response = await api.post('/register', { email, password });
    await AsyncStorage.setItem('userToken', response.data.token);
    return response.data;
  },
};

export const translationService = {
  getLanguages: async () => {
    const response = await api.get('/languages');
    return response.data.languages;
  },
  translate: async (text, sourceLang, targetLang) => {
    const response = await api.post('/translate', {
      text,
      sourceLang,
      targetLang,
    });
    return response.data;
  },
  speechToText: async (audioData, language) => {
    const response = await api.post('/speech-to-text', {
      audioData,
      language,
    });
    return response.data;
  },
  textToSpeech: async (text, language) => {
    const response = await api.post('/text-to-speech', {
      text,
      language,
    });
    return response.data;
  },
};

export default api;