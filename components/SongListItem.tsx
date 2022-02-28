import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import React from "react";
import { useContext } from "react";
import PlayerContext from "../utils/PlayerContext";
import { useState } from "react";
import { useEffect } from "react";

export default function SongListItem({ item }) {
  const [isActive, setActive] = useState(false);

  const { activeSong, setActiveSong } = useContext(PlayerContext);

  const handlePress = async () => {
    await setActiveSong(item);
  };

  useEffect(async () => {
    activeSong && (await activeSong.id) === item.id
      ? setActive(true)
      : setActive(false);
    return () => setActive(false);
  }, [activeSong]);

  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor="#ddd"
      onPress={handlePress}
    >
      <View style={styles.songListItem}>
        <Image
          source={require("../assets/thumbnail.jpg")}
          style={styles.songThumbnail}
        />
        <Text
          style={[
            styles.songName,
            isActive ? { color: "#8685EF" } : { color: "#000" },
          ]}
        >
          {item.filename}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  songListItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  songThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 20,
  },
  songName: {
    fontWeight: "300",
    fontSize: 16,
  },
});
