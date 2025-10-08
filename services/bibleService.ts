// src/services/bibleService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  fetchBooks,
  fetchChapters,
  fetchVersesForChapter,
  fetchVerseText,
} from '@/api/bibleApi';
import { DEFAULT_BIBLE_ID } from '@/config/bibleConfig';

const TTL_MS = 1000 * 60 * 60 * 24 * 7; // optional TTL: 7 days

const storageKey = {
  books: (bibleId: string) => `bible:books:${bibleId}`,
  chapters: (bibleId: string, bookId: string) => `bible:chapters:${bibleId}:${bookId}`,
  chapterVerses: (bibleId: string, chapterId: string) => `bible:chapterVerses:${bibleId}:${chapterId}`,
  verseText: (bibleId: string, verseId: string) => `bible:verseText:${bibleId}:${verseId}`,
  meta: (key: string) => `bible:meta:${key}`,
};

async function writeCache(key: string, value: any) {
  const payload = { ts: Date.now(), data: value };
  await AsyncStorage.setItem(key, JSON.stringify(payload));
}

async function readCache(key: string) {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.ts && Date.now() - parsed.ts > TTL_MS) {
      // stale
      await AsyncStorage.removeItem(key);
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

export async function getBooks(bibleId = DEFAULT_BIBLE_ID, force = false) {
  const key = storageKey.books(bibleId);
  if (!force) {
    const cached = await readCache(key);
    if (cached) return { data: cached, fromCache: true };
  }

  const data = await fetchBooks(bibleId);
  await writeCache(key, data);
  return { data, fromCache: false };
}

export async function getChapters(bibleId = DEFAULT_BIBLE_ID, bookId: string, force = false) {
  const key = storageKey.chapters(bibleId, bookId);
  if (!force) {
    const cached = await readCache(key);
    if (cached) return { data: cached, fromCache: true };
  }

  const data = await fetchChapters(bibleId, bookId);
  await writeCache(key, data);
  return { data, fromCache: false };
}

export async function getVersesForChapter(bibleId = DEFAULT_BIBLE_ID, chapterId: string, force = false) {
  const key = storageKey.chapterVerses(bibleId, chapterId);
  if (!force) {
    const cached = await readCache(key);
    if (cached) return { data: cached, fromCache: true };
  }

  // Step 1: fetch metadata for all verses in chapter
  const versesMeta = await fetchVersesForChapter(bibleId, chapterId); // [{id, reference, verse}...]

  // Step 2: fetch full content for each verse
  const versesWithText = await Promise.all(
    versesMeta.map(async (v: any) => {
      const verseData = await getVerseText(bibleId, v.id);
      return {
        id: v.id,
        verse: v.verse,
        reference: v.reference,
        content: verseData.data?.content || '', // full text
      };
    })
  );

  await writeCache(key, versesWithText);
  return { data: versesWithText, fromCache: false };
}


export async function getVerseText(bibleId = DEFAULT_BIBLE_ID, verseId: string, force = false) {
  const key = storageKey.verseText(bibleId, verseId);
  if (!force) {
    const cached = await readCache(key);
    if (cached) return { data: cached, fromCache: true };
  }

  const data = await fetchVerseText(bibleId, verseId, 'text'); // plain text
  // data structure: { id, reference, content }
  await writeCache(key, data);
  return { data, fromCache: false };
}

/**
 * Optional helper to fully download the whole Bible. WARNING: expensive/rate limited.
 * We'll implement it with a progress callback and per-chapter caching.
 */
export async function downloadWholeBible(
  onProgress: (completed: number, total: number) => void,
  bibleId = DEFAULT_BIBLE_ID,
) {
  const { data: books } = await getBooks(bibleId, true);
  let totalChapters = 0;
  const chaptersByBook: Record<string, any[]> = {};

  // fetch chapters count for each book
  for (const book of books) {
    const { data: chapters } = await getChapters(bibleId, book.id, true);
    chaptersByBook[book.id] = chapters;
    totalChapters += chapters.length;
  }

  let completed = 0;
  for (const book of books) {
    const chapters = chaptersByBook[book.id];
    for (const chapter of chapters) {
      await getVersesForChapter(bibleId, chapter.id, true);
      completed++;
      onProgress(completed, totalChapters);
      // small delay to be polite to API (optional)
      await new Promise((r) => setTimeout(r, 150));
    }
  }
}
