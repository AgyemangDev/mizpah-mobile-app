// src/components/Bible/MainBookList.tsx
import React, { useState } from 'react';
import { LayoutAnimation, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, UIManager, View, Dimensions } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const OLD_TESTAMENT_BOOKS = new Set([
  'GEN','EXO','LEV','NUM','DEU','JOS','JDG','RUT','1SA','2SA','1KI','2KI','1CH','2CH',
  'EZR','NEH','EST','JOB','PSA','PRO','ECC','SNG','ISA','JER','LAM','EZK','DAN','HOS',
  'JOL','AMO','OBA','JON','MIC','NAM','HAB','ZEP','HAG','ZEC','MAL'
]);

const formatBookName = (book: any): string => {
  const name = book.name;
  const words = name.split(' ');
  
  if (words.length === 1) return words[0].substring(0, 3);
  
  return words.map((word:string, idx:number) => {
    if (idx === 0 && /^\d/.test(word)) return word;
    return word.substring(0, 3);
  }).join(' ');
};

type Props = {
  books: any[];
  onSelect: (book: any) => void;
};

const MainBookList: React.FC<Props> = ({ books, onSelect }) => {
  const [oldExpanded, setOldExpanded] = useState(false);
  const [newExpanded, setNewExpanded] = useState(false);

  const oldTestament = books.filter(b => OLD_TESTAMENT_BOOKS.has(b.id));
  const newTestament = books.filter(b => !OLD_TESTAMENT_BOOKS.has(b.id));

  const toggleOld = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOldExpanded(!oldExpanded);
  };

  const toggleNew = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setNewExpanded(!newExpanded);
  };

  const renderBookGrid = (bookList: any[]) => {
    return (
      <View style={styles.grid}>
        {bookList.map((book) => (
          <TouchableOpacity
            key={book.id}
            style={styles.bookBox}
            onPress={() => onSelect(book)}
            activeOpacity={0.7}
          >
            <Text style={styles.bookAbbrev}>{formatBookName(book)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
      {/* Old Testament Section */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.sectionHeader} 
          onPress={toggleOld}
          activeOpacity={0.8}
        >
          <Text style={styles.sectionTitle}>Old Testament</Text>
          <Text style={styles.chevron}>{oldExpanded ? '▼' : '▶'}</Text>
        </TouchableOpacity>
        {oldExpanded && renderBookGrid(oldTestament)}
      </View>

      {/* New Testament Section */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.sectionHeader} 
          onPress={toggleNew}
          activeOpacity={0.8}
        >
          <Text style={styles.sectionTitle}>New Testament</Text>
          <Text style={styles.chevron}>{newExpanded ? '▼' : '▶'}</Text>
        </TouchableOpacity>
        {newExpanded && renderBookGrid(newTestament)}
      </View>
    </ScrollView>
  );
};

const screenWidth = Dimensions.get('window').width;
const boxMargin = 5;
const boxCount = 5;
const boxSize = (screenWidth - (boxMargin * 2 * boxCount)) / boxCount; // exact 4 per row with margin

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  contentContainer: { padding: 0 },
  section: {
    marginBottom: 24,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2c3e50',
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
  },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#ffffff', letterSpacing: 0.5 },
  chevron: { fontSize: 18, color: '#ffffff', fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 4 },
  bookBox: {
    width: boxSize,
    height: boxSize,
    margin: boxMargin,
    backgroundColor: '#3498db',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  bookAbbrev: { fontSize: 13, fontWeight: '700', color: '#fff', textAlign: 'center', letterSpacing: 0.3 },
});

export default MainBookList;
