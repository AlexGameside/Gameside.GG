import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import constants from "./constants";

const NEW_WAGER_EVENT = "newWager";
const NEW_FILTER_EVENT = "newFilter";
const NEW_JOINED_WAGER_EVENT = "joinedWager";

const useWagers = (wagerId) => {
  const [socketWagers, setSocketWagers] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(constants.serverUrl, {
      query: { wagerId },
      // transports: ["websocket", "polling"],
    });

    socketRef.current.on(NEW_WAGER_EVENT, (wagers) => {
      setSocketWagers((wagers) => [...socketWagers, wagers]);
    });

    socketRef.current.on(NEW_JOINED_WAGER_EVENT, (wagerId) => {});
  }, []);
};
