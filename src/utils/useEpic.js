import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import constants from "./constants";

const NEW_TEMP_EPIC_EVENT = "newTempEpic";
const NEW_EPIC_VERIFIED_EVENT = "newEpic";

const useEpic = (username) => {
  const [tempEpic, setTempEpic] = useState(null);
  const [epic, setEpic] = useState(null);
  const [epicId, setEpicId] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(constants.serverURL, {
      query: { username },
    });

    // listen for epic verified
    socketRef.current.on(NEW_EPIC_VERIFIED_EVENT, (epicData) => {
      const { epic, id } = epicData;
      setEpic(epic);
      setEpicId(id);
    });

    // listen for temp epic
    socketRef.current.on(NEW_TEMP_EPIC_EVENT, (newTemp) => {
      setTempEpic(newTemp);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [username]);

  const sendTempEpic = (tempEpic) => {
    socketRef.current.emit(NEW_TEMP_EPIC_EVENT, tempEpic);
  };

  return {
    tempEpic,
    epic,
    sendTempEpic,
    epicId,
  };
};

export default useEpic;
