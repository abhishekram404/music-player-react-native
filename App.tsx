import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppBar from "./components/AppBar";
import SongsList from "./components/SongsList";

export default function App() {
  return (
    <View style={styles.container}>
      <AppBar />
      <SongsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
});
