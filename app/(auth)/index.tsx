import { useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '@/config/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { getSavedUser, saveUser, clearUser } from '@/config/authPersistence';

export default function Index() {
  const router = useRouter();
  const hasNavigated = useRef<boolean>(false);

  useEffect(() => {
    console.log('🟢 [SPLASH] Component mounted - Starting auth check');

    let timeoutId: ReturnType<typeof setTimeout>;

    const checkAuth = async (): Promise<void> => {
      try {
        console.log('🔍 [SPLASH] Setting 7-second timeout');
        timeoutId = setTimeout(() => {
          if (!hasNavigated.current) {
            console.log('⏰ [SPLASH] Timeout reached - redirecting to Welcome');
            hasNavigated.current = true;
            router.replace('/(auth)/welcome');
          }
        }, 7000);

        console.log('💾 [SPLASH] Checking SecureStore for stored user');
        const savedUser = await getSavedUser();

        if (savedUser && savedUser.email) {
          console.log('✅ [SPLASH] Found saved user:', savedUser.email);
        } else {
          console.log('❌ [SPLASH] No saved user found');
        }

        console.log('🔥 [SPLASH] Setting up Firebase auth listener');
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
          console.log('🔥 [SPLASH] Firebase auth state changed');

          if (hasNavigated.current) return;

          if (firebaseUser) {
            console.log('✅ [SPLASH] Authenticated user — navigating to home');
            await saveUser(firebaseUser);
            clearTimeout(timeoutId);
            hasNavigated.current = true;
            router.replace('/(tabs)/home');
          } else {
            console.log('🚫 [SPLASH] No user — redirecting to Welcome');
            await clearUser();
            clearTimeout(timeoutId);
            hasNavigated.current = true;
            router.replace('/welcome');
          }
        });
      } catch (error) {
        console.error('❌ [SPLASH] Auth check error:', error);
        clearTimeout(timeoutId);
        if (!hasNavigated.current) {
          hasNavigated.current = true;
          router.push('/(auth)/welcome');
        }
      }
    };

    checkAuth();

    return () => {
      console.log('🔴 [SPLASH] Component unmounting');
      clearTimeout(timeoutId);
    };
  }, [router]);

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
    backgroundColor: '#fff' 
  },
  loadingText: { 
    marginTop: 10, 
    color: '#666' 
  },
});
