// authPersistence.ts
import * as SecureStore from 'expo-secure-store';

const USER_KEY = 'firebase_user';

export async function saveUser(user: { uid: string; email: string | null } | null) {
  if (user) {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  } else {
    await SecureStore.deleteItemAsync(USER_KEY);
  }
}

export async function getSavedUser() {
  const data = await SecureStore.getItemAsync(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export async function clearUser() {
  await SecureStore.deleteItemAsync(USER_KEY);
}
