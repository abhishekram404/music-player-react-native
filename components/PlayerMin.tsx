import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import PlayerContext from "../utils/PlayerContext";
import { Audio } from "expo-av";
import { useEffect } from "react";
import Slider from "@react-native-community/slider";
import { useRef } from "react";
export default function PlayerMin() {
  const { activeSong } = useContext(PlayerContext);
  const [isPlaying, setPlaying] = useState(false);
  const { songs, setActiveSong } = useContext(PlayerContext);
  const [duration, setDuration] = useState<string>();
  const [progress, setProgress] = useState<string>();
  const [progressBarWidth, setProgressBarWidth] = useState<number>(0);
  const sound = useRef(new Audio.Sound());

  const nextSong = async () => {
    await pauseAndUnload(sound.current);
    const currentSongIndex = async () => await songs.indexOf(activeSong);
    if ((await currentSongIndex()) === songs.length - 1) {
      await setActiveSong(songs[0]);
      return;
    }
    await setActiveSong(songs[(await currentSongIndex()) + 1]);
  };

  const prevSong = async () => {
    const currentSongIndex = async () => await songs.indexOf(activeSong);

    if ((await currentSongIndex()) === 0) {
      await setActiveSong(songs[songs.length - 1]);
      return;
    }

    await setActiveSong(songs[(await currentSongIndex()) - 1]);
  };
  const playPause = async () => {
    const status = await sound.current.getStatusAsync();

    status.isPlaying
      ? await sound.current.pauseAsync()
      : await sound.current.playAsync();

    setPlaying(!isPlaying);
  };
  function millisToMinutesAndSeconds(millis = 0) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  const pauseAndUnload = async (soundInstance) => {
    await soundInstance.pauseAsync();
    await soundInstance.unloadAsync();
  };

  const loadAndPlay = async (soundInstance) => {
    const status = await soundInstance.getStatusAsync();
    if (status.isLoaded && status.isPlaying) {
      await pauseAndUnload(soundInstance);
    }

    await soundInstance.loadAsync(
      { uri: activeSong.uri },
      // { shouldPlay: true },
      {},
      true
    );

    setDuration(millisToMinutesAndSeconds(await getDuration(soundInstance)));

    soundInstance.playAsync();
    setPlaying(true);

    return async () => {
      await pauseAndUnload(soundInstance);
    };
  };

  sound.current.setOnPlaybackStatusUpdate((playbackStatus) => {
    if (playbackStatus.didJustFinish) {
      //  sound.current.unloadAsync();
      nextSong();
      return;
    }
    if (playbackStatus.isLoaded) {
      setProgress(millisToMinutesAndSeconds(playbackStatus.positionMillis));
      setProgressBarWidth(
        (playbackStatus.positionMillis / playbackStatus.durationMillis) * 100
      );
    }
  });

  const getDuration = async (soundInstance) => {
    const status = await soundInstance.getStatusAsync();
    return status.durationMillis;
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      (async () => {
        await loadAndPlay(sound.current);
      })();
    }

    return () => {
      isMounted = false;
      if (sound.current._loaded) {
        pauseAndUnload(sound.current);
      }
    };
  }, [activeSong]);

  const setSeek = async (percValue) => {
    await sound.current.setPositionAsync(
      (percValue / 100) * (await getDuration(sound.current))
    );
  };

  return (
    <View style={styles.playerMin}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>
          {activeSong && activeSong?.filename.split(".mp3")[0]}
        </Text>
      </View>
      <Pressable>
        <View style={styles.progressBarRow}>
          <Text style={styles.progressBarStart}>{progress}</Text>
          <Slider
            style={styles.progressBar}
            minimumValue={0}
            maximumValue={100}
            value={progressBarWidth ? progressBarWidth : 0}
            tapToSeek={true}
            onSlidingComplete={(value) => setSeek(value)}
          />
          {/* <View style={styles.progressBar}>
            <View
              style={[
                styles.progressIndicator,
                { width: `${progressBarWidth}%` },
              ]}
            >
              <View style={styles.progressIndicatorDot}></View>
            </View>
          </View> */}
          <Text style={styles.progressBarEnd}>{duration}</Text>
        </View>
      </Pressable>
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
            onPress={prevSong}
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
            onPress={nextSong}
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

  progressBarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  progressBarStart: {},
  progressBar: {
    flex: 1,
    // height: 10,

    // backgroundColor: "#fff",
    marginHorizontal: 10,

    // padding: 0,
    // overflow: "hidden",
  },
  progressBarEnd: {},
  progressIndicator: {
    height: 2,
    width: "0%",
    backgroundColor: "#474554",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  progressIndicatorDot: {
    height: 8,
    width: 8,
    backgroundColor: "#000",
    borderRadius: 50,
  },
});
