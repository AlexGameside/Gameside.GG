import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import constants from "./constants";

const NEW_NOTIFICATION_EVENT = "newNotification";
const NEW_CURRENT_TOKEN_EVENT = "newCurrentToken";
const NEW_REMOVE_CURRENT_TOKEN_EVENT = "newRemoveCurrentToken";
const NEW_BALANCE_EVENT = "updateBalance";
const NEW_TIMER_BALANCE_EVENT = "timerBalance";
const NEW_TEAMMATE = "newTeammate";
const USER_KICKED = "userKicked";
const NEW_TOURNAMENT_MATCH = "newTournamentMatch";
const NEW_TOURNAMENT_WIN = "newTournamentWin";
const NEW_TOURNAMENT_EARN = "newTournamentEarn";
const NEW_REMATCH_REQUEST = "rematchRequest";
const NEW_VP_EVENT = "newValPoints";

const useNotifications = (username) => {
  const [notifications, setNotifications] = useState([]);
  const [newCurrentToken, setNewCurrentToken] = useState(null);
  const [removeCurrentToken, setRemoveCurrentToken] = useState(null);
  const [newBalance, setNewBalance] = useState(null);
  const [newTeam, setNewTeam] = useState(null);
  const [teamToRemove, setTeamToRemove] = useState(null);
  const [newMatchId, setNewMatchId] = useState(null);
  const [tournamentWin, setTournamentWin] = useState(null);
  const [tournamentEarn, setTournamentEarn] = useState(null);
  const [rematchWager, setRematchWager] = useState(null);
  const [points, setPoints] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(constants.serverUrl, {
      query: { username },
      // transports: ["websocket", "polling"],
    });

    // listen for notification
    socketRef.current.on(NEW_NOTIFICATION_EVENT, (notifdata) => {
      setNotifications((notifs) => [...notifs, notifdata]);
    });

    socketRef.current.on(NEW_CURRENT_TOKEN_EVENT, (id) => {
      setNewCurrentToken(id);
    });

    socketRef.current.on(NEW_REMOVE_CURRENT_TOKEN_EVENT, (id) => {
      setRemoveCurrentToken(id);
    });

    socketRef.current.on(NEW_BALANCE_EVENT, (balance) => {
      setNewBalance(balance);
    });

    socketRef.current.on(NEW_VP_EVENT, (points) => {
      setPoints(points);
    });

    socketRef.current.on(NEW_TIMER_BALANCE_EVENT, (timerBalanceData) => {
      setNewBalance(timerBalanceData);
    });

    socketRef.current.on(NEW_TEAMMATE, (teamdata) => {
      setNewTeam(teamdata);
    });

    socketRef.current.on(USER_KICKED, (teamdata) => {
      setTeamToRemove(teamdata?._id);
    });

    socketRef.current.on(NEW_TOURNAMENT_MATCH, (matchId) => {
      setNewMatchId(matchId);
    });

    socketRef.current.on(NEW_TOURNAMENT_WIN, (tournament) => {
      setTournamentWin(tournament);
    });

    socketRef.current.on(NEW_TOURNAMENT_EARN, (tournament) => {
      setTournamentEarn(tournament);
    });

    socketRef.current.on(NEW_REMATCH_REQUEST, (wagerdata) => {
      setRematchWager(wagerdata);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [username]);

  // send notif event to the server
  const sendNotifEvent = (notifEventData) => {
    socketRef.current.emit(NEW_NOTIFICATION_EVENT, notifEventData);
  };

  const sendNewTimerBalanceEvent = (timerBalanceData) => {
    socketRef.current.emit(NEW_TIMER_BALANCE_EVENT, timerBalanceData);
  };

  return {
    notifications,
    sendNotifEvent,
    newCurrentToken,
    removeCurrentToken,
    newBalance,
    sendNewTimerBalanceEvent,
    newTeam,
    teamToRemove,
    newMatchId,
    tournamentWin,
    tournamentEarn,
    rematchWager,
    points,
  };
};

export default useNotifications;
