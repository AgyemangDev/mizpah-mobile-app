import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import MainHeader from '@/components/header/MainHeader';
import ShopCard from '@/components/Card/ShopCard';
import { useRouter } from 'expo-router';

const Shop = () => {
  const router = useRouter();

  // 🧾 Book data
  const products = [
    {
      title: 'You Can Also Do It',
      image: require('@/assets/images/alsodoit.jpg'),
      link: 'https://a.co/d/ac4lkIZ',
    },
    {
      title: 'Decoding the Secrets of Prayer',
      image: require('@/assets/images/decodingprayer.jpg'),
      link: 'https://a.co/d/aK8Oy5w',
    },
    {
      title: 'When the Watchmen Stop Watching',
      image: require('@/assets/images/watchman.jpg'),
      link: 'https://a.co/d/d93iOsk',
    },
    {
      title: 'Prayer Influence Heavens',
      image: require('@/assets/images/prayerinfluence.jpg'),
      link: 'https://a.co/d/3ns0for',
    },
    {
      title: 'Prayer That Shifts the Atmosphere',
      image: require('@/assets/images/prayershifts.jpg'),
      link: 'https://a.co/d/11xYJYd',
    },
    {
      title: "Prayerlessness is a Sign of Darkness",
      image: require('@/assets/images/prayerlessness.jpg'),
      link: 'https://a.co/d/0eM5E24',
    },
    {
      title: "When Mothers Enter Their War Room",
      image: require('@/assets/images/mother.jpg'),
      link: 'https://a.co/d/5yThnBj',
    },
    {
      title: 'Working on Your Assignment',
      image: require('@/assets/images/workingassignment.jpg'),
      link: 'https://a.co/d/9U0kxIA',
    },
    {
      title: 'How is Your Prayer Life?',
      image: require('@/assets/images/prayerlife.jpg'),
      link: 'https://a.co/d/gp4jRIt',
    },
  ];

  return (
    <View style={styles.container}>
      <MainHeader title="Books" onNavigateBack={() => router.back()} hideCart />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {products.map((item, index) => (
            <ShopCard
              key={index}
              title={item.title}
              image={item.image}
              link={item.link}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Shop;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scrollContent: {
    paddingVertical: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
});
