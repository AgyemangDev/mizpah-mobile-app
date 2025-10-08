import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const RequestForPrayer = () => {
  const router = useRouter();

  const handleNavigate = (type: 'request' | 'pray') => {
    router.push({
  pathname: '/Prayers', // the actual file path
  params: { id: type },  // your tab
});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleNavigate('request')}
        activeOpacity={0.9}
      >
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800' }}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <LinearGradient colors={['rgba(0,0,0,0.25)', 'rgba(0,0,0,0.7)']} style={styles.gradient}>
            <View style={styles.content}>
              <Text style={styles.title}>Request Prayer</Text>
              <Text style={styles.subtitle}>“Ask and it will be given to you.” — Matthew 7:7</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => handleNavigate('pray')}
        activeOpacity={0.9}
      >
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800' }}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <LinearGradient colors={['rgba(0,0,0,0.25)', 'rgba(0,0,0,0.7)']} style={styles.gradient}>
            <View style={styles.content}>
              <Text style={styles.title}>Pray for Others</Text>
              <Text style={styles.subtitle}>“Pray for one another.” — James 5:16</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default RequestForPrayer;



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 12,
    backgroundColor: '#fff',
    gap: 14,
  },
  card: {
    width: '46%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 12,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 12,
    color: '#fef9c3',
    marginTop: 3,
    opacity: 0.9,
  },
});
