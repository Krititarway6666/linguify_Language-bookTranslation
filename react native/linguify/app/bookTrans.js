import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView,
  Platform
} from 'react-native';
import LanguageSelector from './component/languageSelector';

const BookTranslatorApp = () => {
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [translationProgress, setTranslationProgress] = useState(20);

  const dropdownStyle = {
    dropdownStyle: { backgroundColor: 'white' },
    textStyle: { color: 'white' },
    labelStyle: { color: 'white' }
  };

  const handleTranslateBook = () => {
    // Implement translation logic here
  };

  const handleDownload = () => {
    // Implement download logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Book Translator App</Text>
      
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadText}>Upload PDF</Text>
      </TouchableOpacity>

      <View style={styles.languageContainer}>
        <LanguageSelector
          label="Source Language"
          value={sourceLanguage}
          onValueChange={setSourceLanguage}
          customStyles={dropdownStyle}
        />
        <LanguageSelector
          label="Target Language"
          value={targetLanguage}
          onValueChange={setTargetLanguage}
          customStyles={dropdownStyle}
        />
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.label}>Translation Progress</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${translationProgress}%` }]} />
        </View>
        <Text style={styles.progressText}>{translationProgress}%</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.translateButton} onPress={handleTranslateBook}>
          <Text style={styles.buttonText}>Translate Book</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
          <Text style={[styles.buttonText, styles.downloadText]}>Download</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentTranslationsContainer}>
        <Text style={styles.sectionTitle}>Recent Translations</Text>
        <View style={styles.recentTranslationItem}>
          <Text style={styles.fileName}>Sample Book.pdf</Text>
          <View style={styles.translationDetails}>
            <Text style={styles.timestamp}>2 hours ago</Text>
            <Text style={styles.language}>English → Spanish</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A2B96',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  uploadText: {
    color: '#666',
    fontSize: 16,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    zIndex: 1, // Add this to ensure dropdowns appear above other content
  },
  languageSelectorWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  inputBox: {
    backgroundColor: '#E8E8E8',
    padding: 12,
    borderRadius: 8,
    height: 45,
    justifyContent: 'center',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3366FF',
    borderRadius: 10,
  },
  progressText: {
    color: 'white',
    textAlign: 'right',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  translateButton: {
    backgroundColor: '#3366FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  downloadButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  downloadText: {
    color: '#3366FF',
  },
  recentTranslationsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  recentTranslationItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  translationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
  language: {
    fontSize: 14,
    color: '#666',
  },
});

export default BookTranslatorApp;