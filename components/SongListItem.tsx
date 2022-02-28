import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React from "react";

export default function SongListItem({ name }: { name: string }) {
  return (
    <TouchableHighlight activeOpacity={1} underlayColor="#000">
      <View style={styles.songListItem}>
        <Image
          source={require("../assets/thumbnail.jpg")}
          style={styles.songThumbnail}
        />
        <Text style={styles.songName}>{name}</Text>
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
