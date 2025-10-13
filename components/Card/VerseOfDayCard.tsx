import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import { dailyImages } from "@/assets/data/DailyImages";

interface VerseData {
  bookname: string;
  chapter: string;
  verse: string;
  text: string;
}

const VerseOfDayCard = () => {
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDailyContent();
  }, []);

  const fetchDailyContent = async () => {
    try {
      const verseResponse = await fetch(
        "https://labs.bible.org/api/?passage=votd&type=json"
      );
      const verseData = await verseResponse.json();

      const today = new Date().getDate();
      const selectedImage =
        dailyImages.find((item) => item.day === today)?.url ||
        dailyImages[0].url;

      setVerse(verseData[0]);
      setImage(selectedImage);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching daily content:", error);
      setLoading(false);
    }
  };

  // ✨ Helper to parse <b>bold</b> tags
  const renderVerseText = (text: string) => {
    // Split text into normal and bold parts
    const parts = text.split(/(<b>|<\/b>)/g).filter(Boolean);
    let isBold = false;

    return parts.map((part, index) => {
      if (part === "<b>") {
        isBold = true;
        return null;
      }
      if (part === "</b>") {
        isBold = false;
        return null;
      }

      return (
        <Text
          key={index}
          style={isBold ? styles.boldText : styles.normalText}
        >
          {part}
        </Text>
      );
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: image || undefined }}
        resizeMode="cover"
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            {loading ? (
              <>
                <View
                  style={[styles.skeleton, { width: 120, height: 14, marginBottom: 5 }]}
                />
                <View
                  style={[styles.skeleton, { width: 180, height: 24 }]}
                />
              </>
            ) : (
              <>
                <Text style={styles.subtitle}>Verse of the Day</Text>
                <Text style={styles.title}>
                  {verse
                    ? `${verse.bookname} ${verse.chapter}:${verse.verse}`
                    : "Psalms 4:8"}
                </Text>
              </>
            )}
          </View>

          {loading ? (
            <View
              style={[
                styles.skeleton,
                { width: "90%", height: 80, borderRadius: 12 },
              ]}
            />
          ) : (
            <Text style={styles.verseText}>
              {verse
                ? renderVerseText(verse.text)
                : "I will both lie down in peace, and sleep; For You alone, O Lord, make me dwell in safety."}
            </Text>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  imageBackground: {
    width: width * 0.92,
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
  },
  imageStyle: {
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    borderRadius: 20,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    marginBottom: 15,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 5,
    color: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  verseText: {
    fontSize: 18,
    fontWeight: "300",
    color: "#fff",
    lineHeight: 26,
    textAlign: "center",
  },
  boldText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  normalText: {
    fontSize: 18,
    fontWeight: "300",
    color: "#fff",
  },
  skeleton: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 8,
  },
});

export default VerseOfDayCard;
