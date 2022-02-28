import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import PlayerContext from "../utils/PlayerContext";
import { Audio } from "expo-av";
import { useEffect } from "react";
import { useRef } from "react";
export default function PlayerMin() {
  const { activeSong } = useContext(PlayerContext);
  const [isPlaying, setPlaying] = useState(false);

  const sound = useRef(new Audio.Sound());

  const loadSong = async () => {
    const status = await sound.current.getStatusAsync();

    if (!status.isLoaded) {
      return sound.current.loadAsync({ uri: activeSong.uri });
    }
  };

  const playPause = async () => {
    const status = await sound.current.getStatusAsync();

    status.isPlaying
      ? await sound.current.pauseAsync()
      : await sound.current.playAsync();

    setPlaying(!isPlaying);
  };

  useEffect(async () => {
    const status = await sound.current.getStatusAsync();
    if (status.isPlaying || status.isLoaded) {
      await sound.current.pauseAsync();
      await sound.current.unloadAsync();
    }

    await loadSong();
    await sound.current.playAsync();
    setPlaying(true);

    return async () => {
      await sound.current.unloadAsync();
    };
  }, [activeSong]);
  return (
    <View style={styles.playerMin}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>
          {activeSong && activeSong?.filename.split(".mp3")[0]}
        </Text>
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
          {isPlaying ? (
            <MaterialIcons
              name="pause"
              size={24}
              color="black"
              style={styles.icon}
              onPress={playPause}
            />
          ) : (
            <MaterialIcons
              name="play-arrow"
              size={24}
              color="black"
              style={styles.icon}
              onPress={playPause}
            />
          )}
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
