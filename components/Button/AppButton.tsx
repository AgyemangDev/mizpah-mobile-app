import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AppButtonProps {
  title: string;
  onPress: () => void;
}

const AppButton: React.FC<AppButtonProps> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.85}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

export default AppButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7C3AED',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
