import React from "react";

const PlayerContext = React.createContext({
  activeSong: undefined,
  setActiveSong: () => {},
  songs: [],
  setSongs: () => {},
});

export default PlayerContext;
