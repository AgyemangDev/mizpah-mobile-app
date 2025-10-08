// src/hooks/useBible.ts
import { useEffect, useState } from 'react';
import {
  getBooks,
  getChapters,
  getVersesForChapter,
  getVerseText,
  downloadWholeBible,
} from '@/services/bibleService';

export function useBooks() {
  const [books, setBooks] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [fromCache, setFromCache] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await getBooks();
        if (mounted) {
          setBooks(res.data);
          setFromCache(res.fromCache);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return { books, loading, fromCache, reload: async () => {
    setLoading(true);
    const res = await getBooks(undefined, true);
    setBooks(res.data);
    setFromCache(false);
    setLoading(false);
  } };
}

export function useChapters(bookId?: string) {
  const [chapters, setChapters] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!bookId) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      const res = await getChapters(undefined, bookId);
      if (mounted) setChapters(res.data);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [bookId]);

  return { chapters, loading, reload: async () => {
    if (!bookId) return;
    setLoading(true);
    const res = await getChapters(undefined, bookId, true);
    setChapters(res.data);
    setLoading(false);
  } };
}

export function useVerses(chapterId?: string) {
  const [verses, setVerses] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!chapterId) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      const res = await getVersesForChapter(undefined, chapterId);
      if (mounted) setVerses(res.data);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [chapterId]);

  return { verses, loading, reload: async () => {
    if (!chapterId) return;
    setLoading(true);
    const res = await getVersesForChapter(undefined, chapterId, true);
    setVerses(res.data);
    setLoading(false);
  } };
}

export function useVerseText(verseId?: string) {
  const [verseText, setVerseText] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!verseId) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      const res = await getVerseText(undefined, verseId);
      if (mounted) setVerseText(res.data);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [verseId]);

  return { verseText, loading, reload: async () => {
    if (!verseId) return;
    setLoading(true);
    const res = await getVerseText(undefined, verseId, true);
    setVerseText(res.data);
    setLoading(false);
  } };
}

export { downloadWholeBible };
