import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '@/config/firebaseConfig'; // Firestore instance

interface Article {
  id: string;
  bibleVerse: string;
  body: any;
  blocks: any[];
  imageUrl?: string;
  prayer?: string;
  summary?: string;
  title?: string;
  timestamp: any; // Firestore timestamp
  user?: any;
}

interface ArticlesContextProps {
  articles: Article[];
  loading: boolean;
  refreshArticles: () => Promise<void>;
}

const ArticlesContext = createContext<ArticlesContextProps>({
  articles: [],
  loading: false,
  refreshArticles: async () => {}
});

export const useArticles = () => useContext(ArticlesContext);

export const ArticlesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const STORAGE_KEY = 'articles_cache';
  const TIMESTAMP_KEY = 'articles_last_fetch';

  const timestampToDate = (ts: any) => {
    if (!ts) return null;
    if (ts.toDate) return ts.toDate(); // Firestore Timestamp
    return new Date(ts);               // string fallback
  };

  // Fetch new articles from Firestore
  const fetchArticles = async () => {
    console.log('📝 Starting fetchArticles...');
    setLoading(true);
    try {
      // Load last fetch timestamp
      const lastFetchStr = await AsyncStorage.getItem(TIMESTAMP_KEY);
      const lastFetch = lastFetchStr ? new Date(lastFetchStr) : null;
      console.log('⏱ Last fetch timestamp from AsyncStorage:', lastFetch);

      // Build query: fetch articles with timestamp > lastFetch
      let articlesQuery;
      if (lastFetch) {
        console.log('🔹 Building incremental query...');
        articlesQuery = query(
          collection(db, 'articles'),
          where('timestamp', '>', Timestamp.fromDate(lastFetch)),
          orderBy('timestamp', 'asc')
        );
      } else {
        console.log('🔹 Building full fetch query (no last fetch found)...');
        articlesQuery = query(
          collection(db, 'articles'),
          orderBy('timestamp', 'asc')
        );
      }

      const snapshot = await getDocs(articlesQuery);
      console.log('📄 Firestore query returned documents count:', snapshot.size);

      const newArticles: Article[] = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log('📌 Article fetched:', {
          id: doc.id,
          timestamp: timestampToDate(data.timestamp),
          title: data.title
        });
        return { id: doc.id, ...data } as Article;
      });

      // Merge with cached articles
      const cachedStr = await AsyncStorage.getItem(STORAGE_KEY);
      const cachedArticles: Article[] = cachedStr ? JSON.parse(cachedStr) : [];
      console.log('📦 Cached articles count:', cachedArticles.length);
      const mergedArticles = [...cachedArticles, ...newArticles];
      console.log('🔗 Merged articles count:', mergedArticles.length);

      // Update cache and last fetch timestamp
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mergedArticles));
      if (newArticles.length > 0) {
        const latestTimestamp = newArticles[newArticles.length - 1].timestamp.toDate().toISOString();
        console.log('⏳ Updating last fetch timestamp in AsyncStorage:', latestTimestamp);
        await AsyncStorage.setItem(TIMESTAMP_KEY, latestTimestamp);
      } else {
        console.log('ℹ️ No new articles to update timestamp.');
      }

      // Update state
      setArticles(mergedArticles);
      console.log('✅ Articles state updated.');
    } catch (err) {
      console.error('❌ Error fetching articles:', err);
    } finally {
      setLoading(false);
      console.log('🔚 fetchArticles finished.');
    }
  };

  // Load cached articles on mount
  const loadCachedArticles = async () => {
    console.log('📝 Loading cached articles...');
    try {
      const cachedStr = await AsyncStorage.getItem(STORAGE_KEY);
      if (cachedStr) {
        const cachedArticles = JSON.parse(cachedStr);
        setArticles(cachedArticles);
        console.log('📦 Cached articles loaded:', cachedArticles.length);
      } else {
        console.log('ℹ️ No cached articles found.');
      }
    } catch (err) {
      console.error('❌ Error loading cached articles:', err);
    }
  };

  useEffect(() => {
    loadCachedArticles().then(fetchArticles);
  }, []);

  return (
    <ArticlesContext.Provider value={{ articles, loading, refreshArticles: fetchArticles }}>
      {children}
    </ArticlesContext.Provider>
  );
};
