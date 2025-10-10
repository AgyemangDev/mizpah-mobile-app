import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import FormInput from '@/components/Input/FormInput';
import FormButton from '@/components/Button/FormButton';
import churchImage from '../../assets/images/mizpah.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const storedCreds = await AsyncStorage.getItem('credentials');
        if (storedCreds) {
          const { email, password } = JSON.parse(storedCreds);
          setEmail(email);
          setPassword(password);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Error loading saved credentials', error);
      }
    };
    loadCredentials();
  }, []);

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Alert.alert('Invalid Email', 'Please enter a valid email address.');
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const userDataToStore = { uid: user.uid, email: user.email, ...userData };

        await AsyncStorage.setItem('user', JSON.stringify(userDataToStore));

        if (rememberMe) {
          await AsyncStorage.setItem('credentials', JSON.stringify({ email, password }));
        } else {
          await AsyncStorage.removeItem('credentials');
        }

        Alert.alert('Welcome Back!', `You’re logged in as ${email}`);
        router.replace('/(tabs)/home');
      } else {
        Alert.alert('Error', 'User profile not found. Please contact support.');
      }
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Login Failed', 'No account found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Login Failed', 'Incorrect password.');
      } else {
        Alert.alert('Login Failed', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
 
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Image source={churchImage} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Mizpah Family</Text>
            <Text style={styles.scripture}>
              “The Lord is my shepherd, I lack nothing.” — Psalm 23:1
            </Text>
          </View>

          {/* Login Card */}
          <View style={styles.formCard}>
            <FormInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
            />
            <FormInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
            />

            {/* Remember Me */}
            <TouchableOpacity
              style={styles.rememberContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checked]} />
              <Text style={styles.rememberText}>Remember Me</Text>
            </TouchableOpacity>

            <FormButton
              title={loading ? 'Logging in...' : 'Login'}
              onPress={handleLogin}
              disabled={!email || !password || loading}
              loading={loading}
              style={styles.loginButton}
            />
            {loading && <ActivityIndicator size="small" color="#000" style={{ marginTop: 10 }} />}
          </View>

<TouchableOpacity
  style={styles.signupContainer}
  onPress={() => router.push('/(auth)/SignUp')} // adjust path to your signup page
>
  <Text style={styles.signupText}>
    Don’t have an account? <Text style={styles.signupLink}>Sign up here</Text>
  </Text>
</TouchableOpacity>
          <Text style={styles.footer}>
            “Be still, and know that I am God.” — Psalm 46:10
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#fff' }, // fallback white background
  container: { flex: 1, justifyContent: 'center', backgroundColor:"#fff" },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 25, paddingVertical: 50 },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { width: 120, height: 120, marginBottom: 15, borderRadius: 60, borderWidth: 2, borderColor: '#000' },
  title: { fontSize: 28, fontWeight: '700', color: '#000' },
  scripture: { fontSize: 14, fontStyle: 'italic', color: '#333', textAlign: 'center', marginTop: 5 },
  formCard: {
    backgroundColor: '#fff', // white card
    padding: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  rememberContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    marginRight: 10,
  },
  checked: { backgroundColor: '#1E90FF', borderColor: '#1E90FF' },
  rememberText: { color: '#000', fontSize: 14 },
  loginButton: { marginTop: 20 },
  footer: { marginTop: 30, fontSize: 13, color: '#333', textAlign: 'center', fontStyle: 'italic' },
  signupContainer: { 
  marginTop: 20, 
  alignItems: 'center',
},
signupText: { 
  fontSize: 14, 
  color: '#555' 
},
signupLink: { 
  color: '#1E90FF', 
  fontWeight: '600' 
},
});
