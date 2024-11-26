import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

const LanguageDropdown = ({ label, value, onValueChange, options, visible, onClose, customStyles }) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <TouchableOpacity 
      style={styles.dropdownOverlay}
      activeOpacity={1}
      onPress={onClose}
    >
      <View style={[styles.dropdownContainer, customStyles?.dropdownContainer]}>
        <View style={[styles.dropdownHeader, customStyles?.dropdownHeader]}>
          <Text style={[styles.dropdownTitle, customStyles?.dropdownTitle]}>{label}</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="x" size={24} color={customStyles?.iconColor || "#fff"} />
          </TouchableOpacity>
        </View>
        {/* Wrap ScrollView with a fixed height container */}
        <View style={styles.scrollViewContainer}>
          <ScrollView 
            style={[styles.dropdownScrollView, customStyles?.dropdownScrollView]}
            showsVerticalScrollIndicator={true}
            bounces={false}
            nestedScrollEnabled={true}
          >
            {options.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.dropdownOption,
                  value === lang.code && styles.dropdownOptionSelected,
                  customStyles?.dropdownOption,
                  value === lang.code && customStyles?.dropdownOptionSelected,
                ]}
                onPress={() => {
                  onValueChange(lang.code);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.dropdownOptionText,
                    value === lang.code && styles.dropdownOptionTextSelected,
                    customStyles?.dropdownOptionText,
                    value === lang.code && customStyles?.dropdownOptionTextSelected,
                  ]}
                >
                  {lang.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
);

const LanguageSelector = ({ label, value, onValueChange, customStyles }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const selectedLanguage = languages.find(lang => lang.code === value);

  return (
    <View style={[styles.languageSelector, customStyles?.container]}>
      <Text style={[styles.label, customStyles?.label]}>{label}</Text>
      <TouchableOpacity
        style={[styles.languageButton, customStyles?.languageButton]}
        onPress={() => setIsDropdownVisible(true)}
      >
        <Text style={[styles.languageButtonText, customStyles?.languageButtonText]}>
          {selectedLanguage ? selectedLanguage.name : 'Select language'}
        </Text>
        <Icon 
          name="chevron-down" 
          size={20} 
          color={customStyles?.iconColor || "#fff"} 
        />
      </TouchableOpacity>
      <LanguageDropdown
        label={label}
        value={value}
        onValueChange={onValueChange}
        options={languages}
        visible={isDropdownVisible}
        onClose={() => setIsDropdownVisible(false)}
        customStyles={customStyles}
      />
    </View>
  );
};

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
];

const styles = StyleSheet.create({
  languageSelector: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 4,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e293b',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  languageButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dropdownContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    width: width - 40,
    // Remove maxHeight from here
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  dropdownTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Add a container for ScrollView with fixed height
  scrollViewContainer: {
    height: Math.min(height * 0.5, 300), // 50% of screen height or 300, whichever is smaller
  },
  dropdownScrollView: {
    flexGrow: 1,
  },
  dropdownOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  dropdownOptionSelected: {
    backgroundColor: '#818cf8',
  },
  dropdownOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  dropdownOptionTextSelected: {
    fontWeight: 'bold',
  },
});

export default LanguageSelector;