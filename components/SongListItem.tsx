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

export default function SongListItem({ item }) {
  // const getSongInfo = async ({ item }) => {
  //   let res = await MediaLibrary.getAssetInfoAsync(item);
  //   console.log(res);
  // };

  const { setActiveSong } = useContext(PlayerContext);

  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor="#ddd"
      onPress={() => {
        setActiveSong(item);
      }}
    >
      <View style={styles.songListItem}>
        <Image
          source={require("../assets/thumbnail.jpg")}
          style={styles.songThumbnail}
        />
        <Text style={styles.songName}>{item.filename}</Text>
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
