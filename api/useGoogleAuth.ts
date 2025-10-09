import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential, User } from "firebase/auth";
import { makeRedirectUri } from "expo-auth-session";
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // FIXED redirect URI logic
  const redirectUri =
    Constants.appOwnership === "expo"
      ? makeRedirectUri({ useProxy: true }) // Expo Go
      : "https://mizpahinternationalchurch.firebaseapp.com/__/auth/handler"; // Standalone build

  console.log("Redirect URI:", redirectUri);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "167177222865-371l11bcd7sok7q1qvovkofv9h0vaf5d.apps.googleusercontent.com",
    iosClientId: "167177222865-dpf9mnnnuja3isjeo13g2aecsve3642g.apps.googleusercontent.com",
    androidClientId: "167177222865-hrejq6n48l03naj5tfffksaj3q8sdlgt.apps.googleusercontent.com",
    redirectUri,
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      if (id_token) {
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            setUser(userCredential.user);
            console.log("User signed in:", userCredential.user.email);
          })
          .catch((err) => {
            console.error("Firebase sign-in error:", err);
            setError(err.message);
          });
      }
    } else if (response?.type === "error") {
      console.error("Google OAuth error:", response.error);
      setError("Google login failed.");
    }
  }, [response]);

  return { request, promptAsync, user, error };
}
