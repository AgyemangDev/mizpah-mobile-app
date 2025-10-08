import React from "react";
import { Text, StyleSheet } from "react-native";

type GreetProps = {
  name: string;
};

const Greet: React.FC<GreetProps> = ({ name }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "Blessed Morning";
    if (hour >= 12 && hour < 17) return "Peaceful Afternoon";
    if (hour >= 17 && hour < 21) return "Holy Evening";
    return "Good Night";
  };

  return (
    <Text style={styles.text}>
      {getGreeting()}, {name}!
    </Text>
  );
};

export default Greet;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: "left",
    color: "#1F2937", // dark gray
    marginVertical: 5,
  },
});
