import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Buffer } from 'buffer';


interface SermonCardProps {
  article: any; // full Firestore document
}

export default function SermonCard({ article }: SermonCardProps) {
  const router = useRouter();

const handlePress = () => {
  const encodedImage = Buffer.from(article.imageUrl || '', 'utf8').toString('base64');
  router.push({
    pathname: '/(standalone)/sermon-detail',
    params: { 
      article: JSON.stringify(article),
      imageBase64: encodedImage,
    },
  });
};


  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.7}>
      {article.imageUrl && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: article.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>

        <Text style={styles.bibleVerse} numberOfLines={1}>
          {article.bibleVerse}
        </Text>

        <Text style={styles.summary} numberOfLines={3}>
          {article.summary}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: { width: '100%', height: 200, backgroundColor: '#f0f0f0' },
  image: { width: '100%', height: '100%' },
  content: { padding: 16 },
  title: { fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 8, lineHeight: 24 },
  bibleVerse: { fontSize: 14, fontStyle: 'italic', color: '#666', marginBottom: 8 },
  summary: { fontSize: 14, color: '#555', lineHeight: 20 },
});
