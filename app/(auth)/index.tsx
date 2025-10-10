import { useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '@/config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const hasNavigated = useRef(false);

  useEffect(() => {
    console.log('🟢 [SPLASH] Component mounted - Starting auth check');
    let timeoutId: NodeJS.Timeout;

    const checkAuth = async () => {
      try {
        console.log('🔍 [SPLASH] Setting 7-second timeout');
        timeoutId = setTimeout(() => {
          if (!hasNavigated.current) {
            console.log('⏰ [SPLASH] Timeout reached - no user detected in 7 seconds');
            hasNavigated.current = true;
            router.replace('/(auth)/welcome');
          }
        }, 7000);

        console.log('💾 [SPLASH] Checking AsyncStorage for stored user');
        const storedUser = await AsyncStorage.getItem('user');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser) {
          console.log('✅ [SPLASH] Found stored user:', parsedUser.email);
        } else {
          console.log('❌ [SPLASH] No stored user found in AsyncStorage');
        }

        console.log('🔥 [SPLASH] Setting up Firebase auth listener');
const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  console.log("🔥 [SPLASH] Firebase auth state changed");

  if (hasNavigated.current) {
    console.log("⚠️ [SPLASH] Already navigated, ignoring this auth change");
    return;
  }

  const storedUser = await AsyncStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  if (firebaseUser && parsedUser) {
    console.log("✅ [SPLASH] User authenticated — navigating to home");
    clearTimeout(timeoutId);
    hasNavigated.current = true;
    router.replace("/(tabs)/home");
  } else {
    console.log("🚫 [SPLASH] No valid session (either no Firebase user or no Async user)");
    await AsyncStorage.removeItem("user");
    clearTimeout(timeoutId);
    hasNavigated.current = true;
    router.replace("/(auth)/welcome");
  }
});


        return () => {
          console.log('🧹 [SPLASH] Cleanup - unsubscribing and clearing timeout');
          unsubscribe();
          clearTimeout(timeoutId);
        };
      } catch (error) {
        console.error('❌ [SPLASH] Auth check error:', error);
        clearTimeout(timeoutId);
        if (!hasNavigated.current) {
          hasNavigated.current = true;
          router.replace('/(auth)/welcome');
        }
      }
    };

    checkAuth();

    return () => {
      console.log('🔴 [SPLASH] Component unmounting');
    };
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
});
