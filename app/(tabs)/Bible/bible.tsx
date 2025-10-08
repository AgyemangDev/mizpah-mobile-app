// src/screens/BibleScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import MainHeader from '@/components/header/MainHeader';
import MainBookList from '@/components/Card/MainBookList';
import ChapterList from '@/components/Card/ChapterList';
import VerseList from '@/components/Card/VerseList';
import { useBooks, useChapters, useVerses, downloadWholeBible } from '@/hooks/useBible';
import { IconSymbol } from '@/components/ui/icon-symbol';

const BibleScreen: React.FC = () => {
  const { books, loading: booksLoading } = useBooks();
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const { chapters, loading: chaptersLoading } = useChapters(selectedBook?.id);
  const [selectedChapter, setSelectedChapter] = useState<any | null>(null);
  const { verses, loading: versesLoading } = useVerses(selectedChapter?.id);

  const handleDownloadAll = async () => {
    Alert.alert(
      'Download whole Bible',
      'This will download and cache all chapters. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          onPress: async () => {
            try {
              await downloadWholeBible(() => {}); 
              Alert.alert('Download complete', `All chapters downloaded.`);
            } catch (err: any) {
              Alert.alert('Download failed', err.message || 'Unknown error');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <MainHeader title="Bible" />
      <View style={styles.content}>
        {booksLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7C3AED" />
          </View>
        ) : selectedBook ? (
          <>
            {/* Breadcrumb navigation */}
            <View style={styles.breadcrumbs}>
              <TouchableOpacity 
                style={styles.breadcrumbButton}
                onPress={() => { setSelectedBook(null); setSelectedChapter(null); }}
              >
                <IconSymbol size={16} name="chevron.left" color="#7C3AED" />
                <Text style={styles.breadcrumbText}>Books</Text>
              </TouchableOpacity>

              {selectedChapter && (
                <>
                  <View style={styles.breadcrumbDivider} />
                  <TouchableOpacity 
                    style={styles.breadcrumbButton}
                    onPress={() => setSelectedChapter(null)}
                  >
                    <IconSymbol size={16} name="chevron.left" color="#7C3AED" />
                    <Text style={styles.breadcrumbText}>Chapters</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            {/* Book and Chapter title combined */}
            <View style={styles.titleContainer}>
              <Text style={styles.bookTitle}>
                {selectedBook.name}
                {selectedChapter && (
                  <Text style={styles.chapterTitle}> Chapter {selectedChapter.number}</Text>
                )}
              </Text>
            </View>

            {/* Chapter section */}
            {chaptersLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#7C3AED" />
              </View>
            ) : selectedChapter ? (
              <>
                {verses || versesLoading ? (
                  <VerseList verses={verses || []} isLoading={versesLoading} />
                ) : (
                  <Text style={styles.emptyText}>No verses found.</Text>
                )}
              </>
            ) : (
              <>
                <Text style={styles.sectionLabel}>Select a Chapter</Text>
                <ChapterList
                  chapters={chapters || []}
                  onSelect={setSelectedChapter}
                  isLoading={chaptersLoading}
                />
              </>
            )}
          </>
        ) : (
          <>
            <Text style={styles.welcomeText}>Choose a book to begin reading</Text>
            {books ? <MainBookList books={books} onSelect={setSelectedBook} /> : <Text style={styles.emptyText}>No books available</Text>}
          </>
        )}
      </View>
    </View>
  );
};

export default BibleScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAFAFA' 
  },
  content: { 
    flex: 1, 
    padding: 16 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Breadcrumb styles
  breadcrumbs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    paddingVertical: 8,
  },
  breadcrumbButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  breadcrumbText: {
    color: '#7C3AED',
    fontWeight: '600',
    fontSize: 14,
  },
  breadcrumbDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },

  // Title styles
  titleContainer: {
    marginBottom: 20,
  },
  bookTitle: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: '#111827',
    letterSpacing: -0.5,
  },
  chapterTitle: { 
    fontSize: 24, 
    fontWeight: '400', 
    color: '#7C3AED',
  },
  
  // Section labels
  sectionLabel: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 12,
    color: '#374151',
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 20,
  },
});