import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppBar from "./components/AppBar";
import PlayerMin from "./components/PlayerMin";
import SongsList from "./components/SongsList";

export default function App() {
  return (
    <View style={styles.container}>
      <AppBar />
      <SongsList />
      <PlayerMin />
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
