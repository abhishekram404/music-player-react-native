import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppBar from "./components/AppBar";
import PlayerMin from "./components/PlayerMin";
import SongsList from "./components/SongsList";
import PlayerContext from "./utils/PlayerContext";
export default function App() {
  const [activeSong, setActiveSong] = useState(undefined);
  const [songs, setSongs] = useState([]);
  console.log(activeSong);
  return (
    <PlayerContext.Provider
      value={{ activeSong, setActiveSong, songs, setSongs }}
    >
      <View style={styles.container}>
        <AppBar />
        <SongsList />
        {activeSong && <PlayerMin />}
      </View>
    </PlayerContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
});
