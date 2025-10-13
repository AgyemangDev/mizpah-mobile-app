import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type MainHeaderProps = {
  title: string;
  onNavigateBack?: () => void;
  cartItemCount?: number;
  hideCart?: boolean; // 🔹 New prop
};

const MainHeader: React.FC<MainHeaderProps> = ({
  title,
  onNavigateBack,
  cartItemCount = 0,
  hideCart = false, // default is false
}) => {
  const router = useRouter();
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const onCartPress = () => {
    router.push('/Shop');
  };

  // 🔹 Animate the cart icon continuously
  useEffect(() => {
    if (hideCart) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.15,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim, hideCart]);

  // 🔹 Pulse animation for badge when items are added
  useEffect(() => {
    if (cartItemCount > 0 && !hideCart) {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [cartItemCount, hideCart]);

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

        {/* Right - Conditionally render Cart */}
        {!hideCart && (
          <TouchableOpacity
            style={styles.cartContainer}
            activeOpacity={0.7}
            onPress={onCartPress}
          >
            <Animated.View
              style={[
                styles.cartIconWrapper,
                { transform: [{ scale: bounceAnim }] },
              ]}
            >
              <View style={styles.cartBackground}>
                <Ionicons name="cart" size={24} color="#fff" />
              </View>

              {cartItemCount > 0 && (
                <Animated.View
                  style={[
                    styles.badge,
                    { transform: [{ scale: pulseAnim }] },
                  ]}
                >
                  <Text style={styles.badgeText}>
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </Text>
                </Animated.View>
              )}
            </Animated.View>
          </TouchableOpacity>
        )}
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
  cartContainer: {
    marginLeft: 16,
    position: 'relative',
  },
  cartIconWrapper: {
    position: 'relative',
  },
  cartBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF5252',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
  },
});
