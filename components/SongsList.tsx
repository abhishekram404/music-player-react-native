import { View, Text, VirtualizedList } from "react-native";
import React from "react";
import uuid from "react-native-uuid";
import SongListItem from "./SongListItem";

export default function SongsList() {
  const data = [
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
    {
      name: "Song 1",
      key: uuid.v4(),
    },
  ];

  const getItem = (data: [{ name: string; key: string }], index: number) =>
    data[index];

  const getItemCount = (data: [{ name: string; key: string }]) => data.length;

  return (
    <VirtualizedList
      data={data}
      initialNumToRender={10}
      renderItem={({ item }: { item: { name: string; key: string } }) => (
        <SongListItem name={item.name} />
      )}
      getItemCount={getItemCount}
      getItem={getItem}
      keyExtractor={(item) => item.key}
    />
  );
}

const Separator = () => {
  return (
    <View style={{ height: 2, borderColor: "#ddd", borderWidth: 1 }}></View>
  );
};
