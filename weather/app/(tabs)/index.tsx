import { Image, StyleSheet, Text, Platform, View } from "react-native";
import Wether from "@/components/Wether";
import React from "react";

export default function HomeScreen() {
  return (
    <View>
      <Wether />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
