import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useArticles } from '@/context/ArticlesContext';
import SermonCard from '@/components/Card/sermonCard';
import MainHeader from '@/components/header/MainHeader';


export default function Sermon() {
  const { articles, loading, refreshArticles } = useArticles();

  useEffect(() => {
    refreshArticles();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  const renderItem = ({ item }: any) => (
<SermonCard article={item} />

  );

  return (
    <>
    <MainHeader title="Sermons & Articles" />
        <FlatList
      contentContainerStyle={styles.listContainer}
      data={articles}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
    </>

  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#f9fafb',
  },
});