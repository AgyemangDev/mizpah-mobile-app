import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { COLORS } from '@/constants/Colors';
import { GoogleIcon } from '@/assets/icons/GoogleICon';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import Mizaph from "../../assets/images/mizpah.png"


export default function LoginScreen() {
    const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGoogleSignIn = () => {
    router.push("/home")
    console.log('Google Sign In pressed');
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ]
          }
        ]}
      >
        {/* Logo */}
<View style={styles.logoContainer}>
  <View >
    <Image 
      source={Mizaph} 
      style={{ width: 180, height: 180, borderRadius: 30 }} 
      resizeMode="contain" 
    />
  </View>
</View>

        {/* Church name */}
        <Text style={styles.churchName}>Mizpah International</Text>
        <Text style={styles.churchSubtitle}>Ministry</Text>

        {/* Welcome text */}
        <Text style={styles.subtitleText}>Sign in to continue</Text>

        {/* Google Sign In Button */}
        <TouchableOpacity 
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.8}
        >
          <View style={styles.googleIconContainer}>
            <GoogleIcon />
          </View>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Terms and privacy */}
        <Text style={styles.termsText}>
          By continuing, you agree to our{'\n'}
          <Text style={styles.termsLink}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '700',
    color: COLORS.white,
  },
  churchName: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 4,
    textAlign: 'center',
  },
  churchSubtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 48,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 30,
    textAlign: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 56,
    backgroundColor: COLORS.white,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    paddingHorizontal: 24,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleIconContainer: {
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  termsText: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 32,
    lineHeight: 18,
  },
  termsLink: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});