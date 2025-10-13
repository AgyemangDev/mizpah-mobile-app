import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';

type ShopCardProps = {
  title: string;
  image: any; // 👈 for local require() assets
  link: string;
};

const ShopCard: React.FC<ShopCardProps> = ({ title, image, link }) => {
  const openLink = async () => {
    try {
      const supported = await Linking.canOpenURL(link);
      if (supported) {
        await Linking.openURL(link);
      } else {
        console.warn("Can't open URL:", link);
      }
    } catch (error) {
      console.error('Error opening link:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={openLink}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ShopCard;

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 32) / 2; // 2 cards per row with padding

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    padding: 8,
    textAlign: 'center',
  },
});
