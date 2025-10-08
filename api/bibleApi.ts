// src/api/bibleApi.ts
import { API_BIBLE_KEY, API_BASE } from '@/config/bibleConfig';

type ApiResponse<T> = { data: T; meta?: any };

async function apiGet<T>(path: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: {
      'api-key': API_BIBLE_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  const json: ApiResponse<T> = await res.json();
  return json.data;
}

export async function fetchBibles() {
  return apiGet<any[]>('/bibles');
}

export async function fetchBooks(bibleId: string) {
  return apiGet<any[]>(`/bibles/${bibleId}/books`);
}

export async function fetchChapters(bibleId: string, bookId: string) {
  return apiGet<any[]>(`/bibles/${bibleId}/books/${bookId}/chapters`);
}

export async function fetchVersesForChapter(bibleId: string, chapterId: string) {
  // returns verses metadata for a chapter
  return apiGet<any[]>(`/bibles/${bibleId}/chapters/${chapterId}/verses`);
}

export async function fetchVerseText(bibleId: string, verseId: string, contentType = 'text') {
  // contentType can be 'text' or 'html' depending on needs
  return apiGet<any>(`/bibles/${bibleId}/verses/${verseId}?content-type=${contentType}`);
}
