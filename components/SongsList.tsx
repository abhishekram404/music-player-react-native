import {
  View,
  Text,
  VirtualizedList,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, Suspense } from "react";
// import SongListItem from "./SongListItem";
import * as MediaLibrary from "expo-media-library";
import { useContext } from "react";
import PlayerContext from "../utils/PlayerContext";
const SongListItem = React.lazy(() => import("./SongListItem"));
export default function SongsList() {
  const [data, setData] = useState([]);
  const { setSongs } = useContext(PlayerContext);

  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({ mediaType: "audio" });

    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });
    let medias = await media.assets.filter((asset) => asset.duration > 20);
    setData(medias);
    setSongs(medias);
  };
  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();

    if (permission.granted) {
      getAudioFiles();
    }
    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === "denied" && canAskAgain) {
        getPermission();
      }

      if (status === "granted") {
        //get audio files
        getAudioFiles();
      }

      if (status === "denied" && !canAskAgain) {
        Alert.alert(
          "Permission required",
          "Please grant the required permissions."
        );
      }
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  const getItem = (data: [{ filename: string; id: string }], index: number) =>
    data[index];

  const getItemCount = (data: [{ filename: string; id: string }]) =>
    data.length;

  return (
    <VirtualizedList
      data={data}
      initialNumToRender={10}
      renderItem={({ item }) => (
        <Suspense
          fallback={
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
                borderBottomColor: "#eee",
                borderBottomWidth: 1,
              }}
            >
              <ActivityIndicator
                animating={true}
                size="small"
                color="#8685EF"
              />
            </View>
          }
        >
          <SongListItem item={item} />
        </Suspense>
      )}
      getItemCount={getItemCount}
      getItem={getItem}
      keyExtractor={(item) => item.id}
    />
  );
}
