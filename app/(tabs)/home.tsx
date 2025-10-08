import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import MainHeader from "@/components/header/MainHeader";
import VerseOfDayCard from "@/components/Card/VerseOfDayCard";
import Greet from "@/components/ui/greet";
import MeetingCountdown from "@/components/Button/countDownButton";
import RequestForPrayer from "@/components/Button/RequestForPrayer";


const Home = () => {
  const name = "Nana Agyemang";
  return (
    <View style={styles.container}>
      {/* Fixed Header at Top */}
      <MainHeader title="Welcome To Mizpah" />

      {/* Scrollable Content Area */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Left-aligned greeting */}
        <View style={styles.greetContainer}>
          <Greet name={name} />
        </View>

        {/* Centered verse card */}
        <VerseOfDayCard />
        <MeetingCountdown/>
        <RequestForPrayer/>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff"
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center", // centers cards
    paddingVertical: 20,
  },
  greetContainer: {
    width: "90%",       
    marginBottom: 0,
  },
});
