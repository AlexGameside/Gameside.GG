import { getCurrentToken } from "../../../utils/API";

const getMatch = (api, matchId, setMatch, setLoading, setError) => {
  getCurrentToken(api, matchId).then((res) => {
    if (!res?.error) {
      setMatch(res?.token);
      setLoading(false);
      return;
    } else {
      setError(res?.message);
      setLoading(false);
      return;
    }
  });
};

const isBlueTeam = (username, match) => {
  return match?.blueteam_users?.includes(username);
};

const isRedTeam = (username, match) => {
  return match?.redteam_users?.includes(username);
};

const isVisitor = (username, match) => {
  if (!isRedTeam(username, match) && !isBlueTeam(username, match)) {
    return true;
  }
  return false;
};

const getYourTeam = (username, match) => {
  if (isVisitor(username, match)) {
    return match?.blueTeam;
  }
  if (isBlueTeam(username, match)) {
    return match?.blueTeam;
  }
  return match?.redTeam;
};

const getOpponentTeam = (username, match) => {
  if (isVisitor(username, match)) {
    return match?.redTeam;
  }
  if (isBlueTeam(username, match)) {
    return match?.redTeam;
  }
  return match?.blueTeam;
};

const isHost = (username, match) => {
  if (match?.host === "Red") {
    return isRedTeam(username, match);
  }
  return isBlueTeam(username, match);
};

const getVetoTitle = (state, picking) => {
  switch (state) {
    case 1:
    case 2:
    case 7:
    case 8:
      return `Waiting for ${picking} to ban a map`;
    case 3:
    case 5:
      return `Waiting for ${picking} to pick a map`;
    case 4:
    case 6:
    case 9:
      return `Waiting for ${picking} to choose a side`;
    case 10:
      return `Maps have been chosen. Start competing now!`;
  }
};

const getMatchStatusTitle = (match, username) => {
  switch (match?.state) {
    case 0:
      return "Waiting for a team to join";
    case 1:
      return "Ready up to start competing";
    case 2:
      if (match?.isVoting && match?.bluesubmit < 0 && match?.redsubmit < 0) {
        return "Vote/Ban to decide the maps to play";
      }

      if (isBlueTeam(username, match)) {
        if (match?.bluesubmit >= 0 && match?.redsubmit < 0) {
          return "Submitted win pending";
        } else if (match?.bluesubmit < 0 && match?.redsubmit >= 0) {
          return "Opponent has submitted their results";
        }
      } else if (isRedTeam(username, match)) {
        if (match?.redsubmit >= 0 && match?.bluesubmit < 0) {
          return "Submitted win pending";
        } else if (match?.redsubmit < 0 && match?.bluesubmit >= 0) {
          return "Opponent has submitted their results";
        }
      }

      return "Currently playing match";
    case 3:
      return null;
    case 4:
      return "Match has been disputed";
    case -1:
      return "Match has been canceled";
  }
};

export {
  getMatch,
  isBlueTeam,
  isRedTeam,
  isVisitor,
  getYourTeam,
  getOpponentTeam,
  isHost,
  getVetoTitle,
  getMatchStatusTitle,
};
