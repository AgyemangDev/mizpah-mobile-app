import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';

type MainHeaderProps = {
  title: string;
  onNavigateBack?: () => void;
};

const MainHeader: React.FC<MainHeaderProps> = ({ title, onNavigateBack }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Left - Back button (only if onNavigateBack exists) */}
        {onNavigateBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onNavigateBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <IconSymbol size={18} name="chevron.left" color="#333" />
          </TouchableOpacity>
        )}

        {/* Center Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Right icons */}
        <View style={styles.right}>
          <TouchableOpacity style={styles.iconButton}>
            <IconSymbol size={24} name="bell.fill" color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    backgroundColor: '#F5F5F5',
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111',
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});