import { StatusBar } from "expo-status-bar";
import React, { useState, Suspense } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppBar from "./components/AppBar";
import PlayerMin from "./components/PlayerMin";
import PlayerContext from "./utils/PlayerContext";
const SongsList = React.lazy(() => import("./components/SongsList"));
export default function App() {
  const [activeSong, setActiveSong] = useState(undefined);
  const [songs, setSongs] = useState([]);

  // console.log(activeSong);
  return (
    <PlayerContext.Provider
      value={{ activeSong, setActiveSong, songs, setSongs }}
    >
      <View style={styles.container}>
        <AppBar />
        <Suspense fallback={<Text>Loading...</Text>}>
          <SongsList />
        </Suspense>
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
