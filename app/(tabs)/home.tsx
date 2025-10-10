import { StyleSheet, View, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";

import MainHeader from "@/components/header/MainHeader";
import VerseOfDayCard from "@/components/Card/VerseOfDayCard";
import Greet from "@/components/ui/greet";
import MeetingCountdown from "@/components/Button/countDownButton";
import RequestForPrayer from "@/components/Button/RequestForPrayer";
import FormButton from "@/components/Button/FormButton";

const Home = () => {
  const [name, setName] = useState("Guest");
  const router = useRouter();

  // ✅ Fetch user name from AsyncStorage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          const displayName =
            userData.name ||
            userData.fullName ||
            userData.username ||
            userData.email?.split("@")[0] ||
            "Guest";
          setName(displayName);
        } else {
          setName("Guest");
        }
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  // ✅ Proper logout (clears both Firebase + AsyncStorage)
const handleLogout = async () => {
  try {
    console.log("🚪 Logging out...");
    await signOut(auth); // Logs out of Firebase
    
    await AsyncStorage.removeItem("user"); // Remove cached user
    
    // ✅ Double safety: wait until Firebase confirms null user
    const waitForLogout = new Promise((resolve) => {
      const unsub = onAuthStateChanged(auth, (firebaseUser) => {
        if (!firebaseUser) {
          unsub();
          resolve();
        }
      });
    });
    await waitForLogout;

    console.log("✅ Logout confirmed by Firebase. Redirecting...");
    router.replace("/(auth)/login");
  } catch (error) {
    console.error("❌ Logout error:", error);
    Alert.alert("Error", "Something went wrong while logging out.");
  }
};


  return (
    <View style={styles.container}>
      <MainHeader title="Welcome To Mizpah" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greetContainer}>
          <Greet name={name} />
        </View>

        <VerseOfDayCard />
        <MeetingCountdown />
        <RequestForPrayer />

        {/* Logout button */}
        <FormButton
          title="Log Out"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  greetContainer: {
    width: "90%",
    marginBottom: 0,
  },
  logoutButton: {
    marginTop: 30,
    width: "90%",
  },
});
