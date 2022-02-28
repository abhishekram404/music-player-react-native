import React from "react";

const PlayerContext = React.createContext({
  activeSong: undefined,
  setActiveSong: () => {},
});

export default PlayerContext;
