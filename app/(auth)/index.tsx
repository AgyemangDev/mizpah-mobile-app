import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView} from 'react-native';
import { useRouter } from 'expo-router';

const slides = [
  {
    id: 1,
    title: 'Welcome to Mizpah Family',
    description: 'Connect, grow in faith, and stay updated anytime, anywhere.',
    image: require('../../assets/images/welcome.gif'),
  },
  {
    id: 2,
    title: 'Stay Inspired',
    description: 'Access sermons, devotionals, and scriptures to strengthen your spiritual life.',
    image: require('../../assets/images/stay.gif'),
  },
  {
    id: 3,
    title: 'Join the Family',
    description: 'Engage with members, events, and community prayer groups in one place.',
    image: require('../../assets/images/join.gif'),
  },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('/login');
    }
  };

  const handleSkip = () => {
    router.push('/login');
  };

  const { title, description, image } = slides[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  skipButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingRight:20
  },
  skipText: {
    fontSize: 16,
    color: '#666',
  },
  imageContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 280,
    height: 280,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    color: '#777',
    fontSize: 16,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#3B82F6',
    width: 16,
  },
  nextButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
