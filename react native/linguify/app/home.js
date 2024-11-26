import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { 
  Menu,
  PlusCircle,
  FileText,
  Moon,
  Sun,
  Settings,
  HelpCircle,
  Book,
  MessageSquare,
  Volume2,
  Palette
} from 'lucide-react';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [translations, setTranslations] = useState([]);
  
  const sidebarAnimation = new Animated.Value(0);

  const toggleSidebar = () => {
    const toValue = isSidebarOpen ? 0 : 1;
    
    Animated.spring(sidebarAnimation, {
      toValue,
      useNativeDriver: true,
      friction: 8,
    }).start();
    
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarTranslateX = sidebarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.7, 0],
  });

  const menuItems = [
    {
      title: 'Settings',
      items: [
        { icon: <Volume2 size={20} color="#fff" />, label: 'Voice Settings' },
        { icon: <Palette size={20} color="#fff" />, label: 'Theme Options' }
      ]
    },
    {
      title: 'Help',
      items: [
        { icon: <Book size={20} color="#fff" />, label: 'Documentation' },
        { icon: <MessageSquare size={20} color="#fff" />, label: 'Support' }
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#000000', '#1a1b4b', '#4834d4']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[styles.container, { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }]}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Translator</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <FileText color="#fff" size={24} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? (
              <Moon color="#fff" size={24} />
            ) : (
              <Sun color="#fff" size={24} />
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={toggleSidebar}
          >
            <Menu color="#fff" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {translations.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Welcome! Start by adding your first translation
            </Text>
          </View>
        ) : (
          <ScrollView style={styles.translationsList}>
            {translations.map((translation, index) => (
              <View key={index} style={styles.translationItem}>
                <Text style={styles.translationText}>{translation}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Sidebar */}
      <Animated.View 
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: sidebarTranslateX }],
          }
        ]}
      >
        <ScrollView style={styles.sidebarContent}>
          {menuItems.map((section, index) => (
            <View key={index} style={styles.menuSection}>
              <Text style={styles.menuSectionTitle}>{section.title}</Text>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.menuItem}
                >
                  {item.icon}
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Add Translation Button */}
      <TouchableOpacity style={styles.addButton}>
        <PlusCircle color="#fff" size={32} />
      </TouchableOpacity>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleSidebar}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Styles omitted for brevity
});

export default HomeScreen;