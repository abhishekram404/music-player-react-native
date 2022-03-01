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
import { MaterialIcons } from "@expo/vector-icons";

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
        {/* <Image
          source={require("../assets/thumbnail.jpg")}
          style={styles.songThumbnail}
        /> */}
        <View
          style={[
            styles.thumbnailContainer,
            isActive
              ? { backgroundColor: "#8685EF" }
              : { backgroundColor: "#E3E0F3" },
          ]}
        >
          <MaterialIcons
            name="music-note"
            size={24}
            color="black"
            style={[
              styles.songThumbnail,
              isActive ? { color: "#fff" } : { color: "#000" },
            ]}
          />
        </View>
        <Text
          style={[
            styles.songName,
            isActive ? { color: "#8685EF" } : { color: "#000" },
          ]}
        >
          {item.filename.split(".mp3")[0]}
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
  thumbnailContainer: {
    backgroundColor: "#E3E0F3",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
    marginRight: 20,
  },
  songThumbnail: {
    // width: 40,
    // height: 40,
    // borderRadius: 50,
    // padding: 10,
  },

  songName: {
    fontWeight: "300",
    fontSize: 16,
  },
});
