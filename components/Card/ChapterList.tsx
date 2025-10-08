// src/components/Bible/ChapterList.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  chapters: any[];
  onSelect: (chapter: any) => void;
  isLoading?: boolean;
};

const ChapterList: React.FC<Props> = ({ chapters, onSelect, isLoading = false }) => {
  // Skeleton loader
  if (isLoading) {
    return (
      <FlatList
        data={Array.from({ length: 24 }, (_, i) => ({ id: `skeleton-${i}` }))}
        keyExtractor={(item) => item.id}
        numColumns={6}
        renderItem={() => (
          <View style={styles.cell}>
            <View style={styles.skeletonBox} />
          </View>
        )}
      />
    );
  }

  return (
    <FlatList
      data={chapters}
      keyExtractor={(item) => item.id}
      numColumns={6}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={styles.cell} 
          onPress={() => onSelect(item)}
          activeOpacity={0.7}
        >
          <View style={styles.chapterBox}>
            <Text style={styles.cellText}>{item.number}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cell: {
    width: '16.6%',
    padding: 6,
    aspectRatio: 1,
  },
  chapterBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  cellText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  skeletonBox: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
  },
});

export default ChapterList;