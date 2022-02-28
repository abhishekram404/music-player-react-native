import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Animated,
} from "react-native";
import React, { Component } from "react";
import { Octicons } from "@expo/vector-icons";
export default class AppBar extends Component {
  render() {
    return (
      <View style={styles.appBar}>
        <Text style={styles.title}>Music</Text>
        <Animated.View>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#6B22F920"
            onPress={() => console.log("pressed")}
            style={{ borderRadius: 50, padding: 10 }}
          >
            <Octicons name="gear" size={24} color="#8685EF" />
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#FFFFFF",
    elevation: 5,
  },
  title: {
    color: "#8685EF",
    fontSize: 20,
    fontWeight: "700",
  },
});
