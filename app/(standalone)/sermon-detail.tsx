import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import moment from 'moment';
import { Buffer } from 'buffer';

export default function SermonDetail() {
  const params = useLocalSearchParams();

  // Parse article
  let article: any = {};
  try {
    article = params.article ? JSON.parse(params.article as string) : {};
  } catch (err) {
    console.error('Error parsing article params:', err);
  }

  // Get the imageUrl directly, keep it encoded
const encodedImage = typeof params.imageBase64 === 'string' ? params.imageBase64 : '';
const imageUrl = encodedImage ? Buffer.from(encodedImage, 'base64').toString('utf8') : '';
console.log('Displaying Image URL:', imageUrl);

  const { title, bibleVerse, summary, prayer, body, timestamp, user } = article || {};

  const formattedTimestamp =
    timestamp && timestamp.seconds
      ? moment(timestamp.seconds * 1000).format('DD MMMM YYYY, hh:mm A')
      : '';

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: title || 'Sermon Detail',
          headerBackTitle: 'Back',
        }}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.headerImage} resizeMode="cover" />
        )}

        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Bible Verse */}
          {bibleVerse && <Text style={styles.bibleVerse}>{bibleVerse}</Text>}

          {/* Article Body */}
          {body?.blocks && body.blocks.length > 0 && (
            <View style={styles.section}>
              {body.blocks.map((block: any, idx: number) => {
                const { text, type } = block;

                let blockStyle = styles.paragraph;
                if (type === 'header-three') blockStyle = styles.headerThree;
                else if (type === 'unordered-list-item') blockStyle = styles.ulItem;
                else if (type === 'ordered-list-item') blockStyle = styles.olItem;

                return (
                  <Text key={idx} style={blockStyle}>
                    {text}
                  </Text>
                );
              })}
            </View>
          )}

          {/* Summary */}
          {summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text style={styles.paragraph}>{summary}</Text>
            </View>
          )}

          {/* Prayer */}
          {prayer && (
            <View style={[styles.section, styles.prayerSection]}>
              <Text style={styles.sectionTitle}>Prayer</Text>
              <Text style={styles.prayer}>🙏 {prayer}</Text>
            </View>
          )}

          {/* Published & Author */}
          {(formattedTimestamp || user) && (
            <View style={styles.metaSection}>
              {formattedTimestamp && (
                <Text style={styles.metaText}>Published: {formattedTimestamp}</Text>
              )}
              {user && (
                <Text style={styles.metaText}>
                  Author: {user.name} ({user.email})
                </Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerImage: { width: '100%', height: 280, backgroundColor: '#f0f0f0' },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#111', marginBottom: 12, lineHeight: 36 },
  bibleVerse: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#374151',
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    lineHeight: 24,
  },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#111', marginBottom: 12 },
  paragraph: { fontSize: 16, lineHeight: 28, color: '#555', marginBottom: 12 },
  headerThree: { fontSize: 20, fontWeight: '700', color: '#111', marginVertical: 8 },
  ulItem: { fontSize: 16, color: '#555', marginLeft: 24, marginBottom: 6, lineHeight: 26 },
  olItem: { fontSize: 16, color: '#555', marginLeft: 24, marginBottom: 6, lineHeight: 26 },
  prayerSection: {
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  prayer: { fontSize: 16, color: '#166534', lineHeight: 28, fontWeight: '500' },
  metaSection: { marginTop: 16, borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingTop: 12 },
  metaText: { fontSize: 14, color: '#6b7280', marginBottom: 4 },
});
