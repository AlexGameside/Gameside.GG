import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import constants from "./constants";

const SOCKET_SERVER_URL = constants.serverURL;

// events
const NEW_CHAT_EVENT = "newChatMessage";
const NEW_GAME_EVENT = "gameMessage";
const NEW_READY_EVENT = "newReady";
const NEW_JOIN_EVENT = "newJoin";
const NEW_SUBMIT_EVENT = "newSubmit";
const NEW_CANCEL_EVENT = "newCancel";
const NEW_RESET_EVENT = "newReset";
const NEW_FORCE_EVENT = "newForce";
const NEW_AGREE_CANCEL_EVENT = "newAgree";
const NEW_REMOVE_VOTE_CANCEL_EVENT = "removeVote";
const NEW_ACTIVE_TOKEN = "newActiveToken";
const NEW_SCRIM = "newScrim";
const REMOVE_ACTIVE_TOKEN = "removeActiveToken";
const REMOVE_SCRIM = "removeScrim";
const NEW_TIMER_DONE_EVENT = "timerDone";
const NEW_REMATCH_INVITE_EVENT = "newRematch";
const NEW_TOURNAMENT_EVENT = "newTournament";
const REMOVE_TOURNAMENT_EVENT = "removeTournament";
const NEW_BRACKET_EVENT = "newBracket";
const NEW_BRACKET_WIN_EVENT = "newBracketWin";

const getChatTimeStamp = (id) => {
  if (id == null) {
    return "";
  }
  const timestamp = id.toString().substring(0, 8);
  const date = new Date(parseInt(timestamp, 16) * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, "0");
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

const useSocket = (wagerId) => {
  const [messages, setMessages] = useState([]);
  const [wager, setWager] = useState({});
  const [bracketTournament, setTournament] = useState({});
  const [agreedUsers, setAgreedUsers] = useState([]);
  const [socketTokens, setSocketTokens] = useState([]);
  const [socketScrim, setSocketScrim] = useState(null);
  const [tokenToRemove, setTokenToRemove] = useState(null);
  const [scrimToRemove, setScrimToRemove] = useState(null);
  const [socketTournament, setSocketTournament] = useState(null);
  const [tournamentToRemove, setTournamentToRemove] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    // create connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { wagerId },
      // transports: ["websocket", "polling"],
    });

    // listens for messages
    socketRef.current.on(NEW_CHAT_EVENT, (message) => {
      const incomingMessage = {
        body: message?.message,
        name: message?.name,
        time: message?.id
          ? getChatTimeStamp(message?.id)
          : getChatTimeStamp(wagerId),
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on(NEW_GAME_EVENT, (message) => {
      const incomingMessage = {
        body: message?.message,
        name: message?.name,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    // listening for ready up events
    socketRef.current.on(NEW_READY_EVENT, (wagerdata) => {
      // set the wager data on the wager state
      setWager(wagerdata);
    });

    // listening for join events
    socketRef.current.on(NEW_JOIN_EVENT, (wagerdata) => {
      setWager(wagerdata);
    });

    // listen for submit
    socketRef.current.on(NEW_SUBMIT_EVENT, (wagerdata) => {
      setWager(wagerdata);
    });

    // listen for cancel
    socketRef.current.on(NEW_CANCEL_EVENT, (wagerdata) => {
      setWager(wagerdata);
    });

    // listen for reset
    socketRef.current.on(NEW_RESET_EVENT, (wagerdata) => {
      setWager(wagerdata);
    });

    // listen for rematch sent
    socketRef.current.on(NEW_REMATCH_INVITE_EVENT, (wagerdata) => {
      setWager(wagerdata);
    });

    // listen for force
    socketRef.current.on(NEW_FORCE_EVENT, (wagerdata) => {
      setWager(wagerdata);
    });

    // listen for agreeing to cancel
    socketRef.current.on(NEW_AGREE_CANCEL_EVENT, (agreedUsers) => {
      setAgreedUsers(agreedUsers);
    });

    socketRef.current.on(NEW_REMOVE_VOTE_CANCEL_EVENT, (agreedUsers) => {
      setAgreedUsers(agreedUsers);
    });

    socketRef.current.on(NEW_ACTIVE_TOKEN, (newToken) => {
      setSocketTokens(newToken);
    });

    socketRef.current.on(NEW_SCRIM, (newScrim) => {
      setSocketScrim(newScrim);
    });

    socketRef.current.on(REMOVE_ACTIVE_TOKEN, (tokenRemove) => {
      setTokenToRemove(tokenRemove);
    });

    socketRef.current.on(REMOVE_SCRIM, (scrimId) => {
      setScrimToRemove(scrimId);
    });

    socketRef.current.on(NEW_TOURNAMENT_EVENT, (tournamentData) => {
      setSocketTournament(tournamentData);
    });

    socketRef.current.on(REMOVE_TOURNAMENT_EVENT, (tournamentId) => {
      setTournamentToRemove(tournamentId);
    });

    socketRef.current.on(NEW_BRACKET_EVENT, (tourneyData) => {
      setTournament(tourneyData);
    });

    // destroy the socket reference when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [wagerId]);

  // send a ready up event to the server
  const sendReadyEvent = (readyEventData) => {
    socketRef.current.emit(NEW_READY_EVENT, readyEventData);
  };

  // send a join event to server
  const sendJoinEvent = (joinEventData) => {
    socketRef.current.emit(NEW_JOIN_EVENT, joinEventData);
  };

  // send submit event to server
  const sendSubmitEvent = (submitEventData) => {
    socketRef.current.emit(NEW_SUBMIT_EVENT, submitEventData);
  };

  // send cancelled to server
  const sendCancelEvent = (cancelEventData) => {
    socketRef.current.emit(NEW_CANCEL_EVENT, cancelEventData);
  };

  // send reset to server
  const sendResetEvent = (resetEventData) => {
    socketRef.current.emit(NEW_RESET_EVENT, resetEventData);
  };

  // send force win to server
  const sendForceEvent = (forceEventData) => {
    socketRef.current.emit(NEW_FORCE_EVENT, forceEventData);
  };

  // send agree cancel event
  const sendAgreeCancelEvent = (agreeCancelData) => {
    socketRef.current.emit(NEW_AGREE_CANCEL_EVENT, agreeCancelData);
  };

  const sendRemoveCancelEvent = (agreeCancelData) => {
    socketRef.current.emit(NEW_REMOVE_VOTE_CANCEL_EVENT, agreeCancelData);
  };

  const sendRematchEvent = (rematchData) => {
    socketRef.current.emit(NEW_REMATCH_INVITE_EVENT, rematchData);
  };

  return {
    messages,
    wager,
    sendReadyEvent,
    sendJoinEvent,
    sendSubmitEvent,
    sendCancelEvent,
    sendResetEvent,
    sendForceEvent,
    agreedUsers,
    sendAgreeCancelEvent,
    socketTokens,
    tokenToRemove,
    sendRemoveCancelEvent,
    sendRematchEvent,
    socketTournament,
    tournamentToRemove,
    bracketTournament,
    socketScrim,
    scrimToRemove,
  };
};

export default useSocket;
