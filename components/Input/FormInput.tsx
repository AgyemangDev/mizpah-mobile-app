import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, Animated } from 'react-native';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'phone-pad';

}

export default function FormInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, (isFocused || value) && styles.labelFocused]}>
        {placeholder}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={isFocused ? '' : placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={[styles.input, isFocused && styles.inputFocused]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: 15,
    top: 15,
    fontSize: 16,
    color: '#aaa',
    zIndex: 1,
    transitionDuration: '200ms',
  },
  labelFocused: {
    top: -8,
    fontSize: 12,
    color: '#1E90FF',
    backgroundColor: '#fff',
    paddingHorizontal: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2, // for Android shadow
  },
  inputFocused: {
    borderColor: '#1E90FF',
  },
});
