// src/components/Bible/VerseList.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

type Props = {
  verses: any[];
  isLoading?: boolean;
};

const VerseList: React.FC<Props> = ({ verses, isLoading = false }) => {
  // Skeleton loader
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <View key={i} style={styles.row}>
            <View style={styles.skeletonNumber} />
            <View style={styles.skeletonText}>
              <View style={[styles.skeletonLine, { width: '100%' }]} />
              <View style={[styles.skeletonLine, { width: '95%' }]} />
              <View style={[styles.skeletonLine, { width: '88%' }]} />
            </View>
          </View>
        ))}
      </View>
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={verses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const cleanContent = item.content?.replace(/^\s*\[\d+\]\s*/, '') || '';
        return (
          <View style={styles.row}>
            <Text style={styles.number}>
              {item.verseId || item.reference?.split(':').pop()}
            </Text>
            <Text style={styles.text}>{cleanContent}</Text>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 0.5,
  },
  number: {
    width: 28,
    fontWeight: '600',
    color: '#666',
    marginRight: 8,
    fontSize: 15,
  },
  text: {
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
    color: '#1a1a1a',
  },
  loadingContainer: {
    flex: 1,
  },
  skeletonNumber: {
    width: 28,
    height: 18,
    backgroundColor: '#e8e8e8',
    borderRadius: 3,
    marginRight: 8,
  },
  skeletonText: {
    flex: 1,
    gap: 4,
  },
  skeletonLine: {
    height: 14,
    backgroundColor: '#e8e8e8',
    borderRadius: 3,
    marginBottom: 2,
  },
});

export default VerseList;