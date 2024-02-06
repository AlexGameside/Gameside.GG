import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";
import constants from "./constants";

const NEW_ACTIVE_TOKEN = "newActiveToken";
const REMOVE_ACTIVE_TOKEN = "removeActiveToken";

const useActiveTokenSocket = () => {
  // variables
  const socketRef = useRef();

  // state
  const [socketTokens, setSocketTokens] = useState([]);
  const [tokenToRemove, setTokenToRemove] = useState(null);

  useEffect(() => {
    socketRef.current = socketIOClient(constants.serverUrl);

    socketRef.current.on(NEW_ACTIVE_TOKEN, (newToken) => {
      setSocketTokens((oldTokens) => [...oldTokens, newToken]);
    });

    socketRef.current.on(REMOVE_ACTIVE_TOKEN, (tokenRemove) => {
      setTokenToRemove(tokenRemove);
    });

    return () => {
      socketRef.current.disconnect();
    };
  });

  return {
    socketTokens,
    tokenToRemove,
  };
};

export default useActiveTokenSocket;
