import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
export default function PlayerMin() {
  return (
    <View style={styles.playerMin}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Five Feet Apart - Don't Give Up On Me</Text>
      </View>
      <View style={styles.controllerRow}>
        <Image
          source={require("../assets/thumbnail.jpg")}
          style={styles.thumbnail}
        />
        <View style={styles.controls}>
          <MaterialIcons
            name="skip-previous"
            size={24}
            color="black"
            style={styles.icon}
          />
          <MaterialIcons
            name="play-arrow"
            size={24}
            color="black"
            style={styles.icon}
          />
          <MaterialIcons
            name="skip-next"
            size={24}
            color="black"
            style={styles.icon}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  playerMin: {
    padding: 20,
    // height: 150,
    // elevation: 55,
    backgroundColor: "#8685EF",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    // position: "relative",
  },
  titleRow: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: "white",
  },
  controllerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 2,
    position: "absolute",
    left: 0,
  },
  controls: {
    flexDirection: "row",
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
  },
  icon: {
    color: "white",
    fontSize: 35,
    marginHorizontal: 25,
  },
});
