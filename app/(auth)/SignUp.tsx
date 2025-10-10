import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import FormInput from '../../components/Input/FormInput';
import FormButton from '../../components/Button/FormButton';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState<Country | null>(null);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    console.log('🟢 [SIGNUP] Signup attempt started');
    console.log('📧 [SIGNUP] Email:', email);
    console.log('👤 [SIGNUP] First Name:', firstName);
    console.log('🌍 [SIGNUP] Country:', country?.name);
    
    if (!email || !password || !firstName || !phoneNumber || !country) {
      console.log('❌ [SIGNUP] Missing required fields');
      return Alert.alert('Error', 'All fields are required');
    }

    setLoading(true);
    try {
      console.log('🔥 [SIGNUP] Creating Firebase user account');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('✅ [SIGNUP] Firebase account created successfully');
      console.log('👤 [SIGNUP] User UID:', user.uid);

      // Send verification email
      console.log('📧 [SIGNUP] Sending verification email');
      await sendEmailVerification(user);
      console.log('✅ [SIGNUP] Verification email sent');

      const firestoreData = {
        email,
        firstName,
        phoneNumber,
        country: country.name,
        createdAt: new Date().toISOString(),
      };

      // Store user data in Firestore
      console.log('💾 [SIGNUP] Storing user data to Firestore');
      await setDoc(doc(collection(db, 'users'), user.uid), firestoreData);
      console.log('✅ [SIGNUP] User data stored in Firestore');

      const localStorageData = {
        uid: user.uid,
        email: user.email,
        firstName,
        phoneNumber,
        country: country.name,
      };

      // Store user data locally
      console.log('💾 [SIGNUP] Storing user data to AsyncStorage');
      await AsyncStorage.setItem('user', JSON.stringify(localStorageData));
      console.log('✅ [SIGNUP] User data stored in AsyncStorage');

      console.log('🎉 [SIGNUP] Signup process completed successfully');

      Alert.alert(
        'Success', 
        `Account created! A verification email has been sent to ${email}.`,
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('➡️ [SIGNUP] Navigating to home screen');
              router.replace('/(tabs)/home');
            }
          }
        ]
      );
    } catch (error: any) {
      console.error('❌ [SIGNUP] Signup error:', error);
      console.error('❌ [SIGNUP] Error code:', error.code);
      console.error('❌ [SIGNUP] Error message:', error.message);
      Alert.alert('Signup Failed', error.message);
    } finally {
      setLoading(false);
      console.log('🏁 [SIGNUP] Signup process completed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <FormInput value={firstName} onChangeText={setFirstName} placeholder="Full Name" />
      <FormInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
      <FormInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <FormInput value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" keyboardType="phone-pad" />

      <TouchableOpacity style={styles.countryButton} onPress={() => setShowCountryPicker(true)}>
        <Text style={{ color: '#333' }}>
          {country ? `Country: ${country.name}` : 'Select your country'}
        </Text>
      </TouchableOpacity>

      {showCountryPicker && (
        <CountryPicker
          visible={showCountryPicker}
          withFilter
          withFlag
          withAlphaFilter
          withCallingCode
          onSelect={(c) => {
            setCountry(c);
            setShowCountryPicker(false);
          }}
          onClose={() => setShowCountryPicker(false)}
        />
      )}

      <FormButton
        title="Create Account"
        onPress={handleSignup}
        disabled={!email || !password || !firstName || !phoneNumber || !country}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  countryButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    alignItems: 'center',
    marginVertical: 5,
  },
});