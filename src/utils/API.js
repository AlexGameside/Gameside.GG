import axios from "axios";
import constants from "./constants";
import useAxios from "./useAxios";

const route = `${constants.serverURL}/api`;

export const login = async (username, password) => {
  return await axios({
    method: "POST",
    url: `${route}/login`,
    data: {
      username,
      password,
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: "Server is experiencing issues. Please try again later.",
      };
    });
};

export const forgot = async (email) => {
  return await axios({
    method: "POST",
    url: `${route}/forgot`,
    data: {
      email,
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: "Server is experiencing issues. Please try again later.",
      };
    });
};

export const forgotPass = async (firstPassword, confirmPassword, code) => {
  return await axios({
    method: "POST",
    url: `${route}/resetPassword`,
    data: {
      firstPassword,
      confirmPassword,
      code,
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: "Server is experiencing issues. Please try again later.",
      };
    });
};

export const register = async (
  name,
  dob,
  email,
  username,
  password,
  promoCode
) => {
  let data = {
    name,
    dob,
    email,
    username,
    password,
  };
  if (promoCode) {
    data.promo = promoCode;
  }
  return await axios({
    method: "POST",
    data,
    url: `${route}/register`,
  })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not register!" };
    });
};

export const verify = async (code) => {
  return await axios({
    method: "POST",
    data: {
      verify_code: code,
    },
    url: `${route}/verify`,
  })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: "Could not verify",
      };
    });
};

export const logout = async (refreshToken) => {
  return await axios({
    method: "DELETE",
    data: {
      refreshToken,
    },
    url: `${route}/logout`,
  })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const renewToken = async (token) => {
  return await axios({
    method: "POST",
    data: {
      refreshToken: token,
    },
    url: `${route}/token`,
  })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err };
    });
};

export const getBracketTournaments = async (filterData) => {
  let params = new URLSearchParams([]);

  if (filterData?.region != null && filterData?.region !== "") {
    params.append("region", filterData.region);
  }
  if (filterData?.game != null && filterData?.game !== "") {
    params.append("game", filterData?.game);
  }
  if (
    filterData?.tournamentState != null &&
    filterData?.tournamentState !== ""
  ) {
    params.append("state", filterData?.tournamentState);
  }
  params.append("skip", filterData?.skip ?? 0);
  params.append("limit", filterData?.limit ?? 8);

  return await axios
    .get(`${route}/getTournaments`, { params })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: err?.response?.data?.message,
      };
    });
};

export const getWagers = async (filterData) => {
  let params = new URLSearchParams([]);

  if (filterData.region != null && filterData.region !== "") {
    params.append("region", filterData.region);
  }
  if (filterData.matchType != null && filterData.matchType !== "") {
    params.append("match_type", filterData.matchType);
  }
  if (filterData.teamSize != null && filterData.teamSize !== "") {
    params.append("team_size", filterData.teamSize);
  }
  if (filterData?.console_only) {
    params.append("console_only", filterData.console_only);
  }
  if (filterData.game != null && filterData.game !== "") {
    params.append("game", filterData.game);
  }
  if (filterData.limit != null && filterData.limit !== "") {
    params.append("limit", filterData.limit);
  }
  if (filterData.isScrimMatch != null && filterData.isScrimMatch !== "") {
    params.append("isScrimMatch", filterData.isScrimMatch);
  }
  params.append("skip", filterData.skip ?? 0);

  return await axios
    .get(`${route}/wagers`, {
      params,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const getEarningsLeaderboard = async (skip) => {
  let params = new URLSearchParams([]);
  params.append("next", skip);
  return await axios
    .get(`${route}/getTotalEarningsLeaderboard`, { params })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const getBracketTournament = async (id) => {
  return await axios({
    method: "get",
    url: `${route}/tourneys/getTournament/${id}`,
  })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: err?.response?.data?.message,
      };
    });
};

export const getOAuthUser = async (useAxios) => {
  return await useAxios
    .get("/getOAuthUser")
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const setUserRefCode = async (useAxios, refCode) => {
  return await useAxios
    .post("/user/setRefCode", {
      refCode,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const addRefCodeView = async (refCode) => {
  return await axios
    .post(`${route}/user/incrementRefCount`, {
      refCode,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const banMap = async (useAxios, mapToBan, wagerid) => {
  return await useAxios
    .post("/wager/banMap", {
      wagerid,
      mapToBan,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const pickMap = async (useAxios, mapToPlay, wagerid) => {
  return await useAxios
    .post("/wager/pickMap", {
      wagerid,
      mapToPlay,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const pickSide = async (useAxios, mapToPlay, wagerid, attOrDef) => {
  return await useAxios
    .post("/wager/pickSide", {
      wagerid,
      mapToPlay,
      attOrDef,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const createWager = async (useAxios, wagerData) => {
  return await useAxios
    .post("/wagers/createWager", wagerData)
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const createBracketTournament = async (useAxios, tournamentData) => {
  return await useAxios
    .post(`${route}/tourneys/createBracketTournament`, tournamentData)
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const deleteBracketTournament = async (useAxios, tourneyId) => {
  return await useAxios
    .post(`${route}/tourneys/deleteTournament`, { tourneyId })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err };
    });
};

export const cancelBracketTournament = async (useAxios, tourneyId) => {
  return await useAxios
    .post(`${route}/tourneys/cancelBracketTournament`, {
      tourneyId,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const leaveBracketTournament = async (useAxios, teamId, tourneyId) => {
  return await useAxios
    .post(`${route}/tourneys/leaveTournament`, { teamId, tourneyId })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const kickTeamFromTournament = async (useAxios, teamId, tourneyId) => {
  return await useAxios
    .post(`${route}/tourneys/kickTeam`, { tourneyId, teamId })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const startBracketTournament = async (useAxios, tourneyId) => {
  return await useAxios
    .post(`${route}/tourneys/startTournament`, { tourneyId })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const joinBracketTournament = async (
  useAxios,
  tourneyId,
  teamId,
  puttingUp
) => {
  return await useAxios
    .post(`${route}/tourneys/joinBracketTournament`, {
      tourneyId,
      teamId,
      puttingUp,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const getUser = async (useAxios, userId) => {
  return await useAxios
    .get(`/user/${userId}`)
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err };
    });
};

export const getUserTeams = async (useAxios, username) => {
  const params = { username };
  return await useAxios
    .get(`/user/teams`, { params })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err };
    });
};

export const getNotifications = async (useAxios, username) => {
  const params = { username };
  return await useAxios
    .get(`getNotifications`, { params })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: "Could not get notifications!",
      };
    });
};

export const joinTeam = async (useAxios, teamId, username, notification) => {
  return await useAxios
    .post(`/teams/join/${teamId}`, {
      teamId,
      username,
      notification,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const isUserInWager = async (useAxios, username) => {
  const params = { username };
  return await useAxios
    .get(`getActiveWagers`, { params })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Error getting active user wagers!" };
    });
};

export const getCurrentWager = async (useAxios, wagerId) => {
  return await useAxios
    .get(`/wager/${wagerId}`)
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: "Error getting token!",
      };
    });
};

export const cancelWager = async (useAxios, wagerId, username) => {
  return await useAxios
    .post(`/wager/cancel`, { wagerId, username })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { error: true, message: "Could not cancel wager" };
    });
};

export const getCurrentWagerStatus = async (useAxios, wagerId, username) => {
  return await useAxios
    .post(`/wager/wagerStatus`, { wagerId, username })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, redirect: true };
    });
};

export const joinWager = async (
  useAxios,
  wagerId,
  team,
  username,
  teamId,
  userThatPutUp,
  game
) => {
  return await useAxios
    .post(`/wager/join/${wagerId}`, {
      wagerId,
      team,
      username,
      teamId,
      userThatPutUp,
      game,
    })
    .then((res) => res.data)
    .catch((err) => {
      if (err.message === "Request failed with status code 409") {
        return {
          error: true,
          message:
            "Error joining match. Please ensure all team member's accounts are linked, they have enough balance, and nobody is banned.",
        };
      }
      return { error: true, message: err.message };
    });
};

export const acceptRematch = async (useAxios, tokenId) => {
  return await useAxios
    .post(`/wager/acceptRematch`, {
      tokenId,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.body?.message };
    });
};

export const searchForUser = async (useAxios, userToFind) => {
  return await useAxios
    .post(`user/searchForUser`, {
      userToFind,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.body?.message };
    });
};

export const hideOrShowBadge = async (useAxios, badgeType, isHidden) => {
  return await useAxios
    .post(`user/hideOrShowBadge`, {
      badgeType,
      isHidden,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.body?.message };
    });
};

export const readyUp = async (useAxios, wagerId, username) => {
  return await useAxios
    .post(`/wager/ready/${wagerId}`, {
      wagerId,
      username,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Error!" };
    });
};

export const getUserByUsername = async (useAxios, username) => {
  const params = { username };
  return await useAxios
    .get(`/user/getUser`, { params })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err };
    });
};

export const submitWagerResult = async (
  useAxios,
  wagerStatus,
  wagerId,
  username
) => {
  if (wagerStatus == null) {
    return {
      error: true,
      message: "No Wager Status!",
    };
  }
  if (wagerId == null) {
    return {
      error: true,
      message: "No Wager Id!",
    };
  }
  if (username == null) {
    return {
      error: true,
      message: "No Username!",
    };
  }

  return await useAxios
    .post(`/wager/submit/${wagerId}`, {
      status: wagerStatus,
      wagerId,
      username,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const forceWin = async (useAxios, wagerId, teamNum, username) => {
  return await useAxios
    .post(`/wager/forceWin/${wagerId}`, {
      wagerId,
      teamNum,
      username,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err };
    });
};

export const resetToken = async (useAxios, wagerId, username) => {
  return await useAxios
    .post(`/wager/reset/${wagerId}`, {
      wagerId,
      username,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err };
    });
};

export const punishUser = async (
  useAxios,
  userToPunish,
  username,
  points,
  wagerId
) => {
  return await useAxios
    .post(`/user/punish/${userToPunish}`, {
      userToPunish,
      username,
      points,
      wagerId,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not punish user." };
    });
};

export const sendChat = async (useAxios, message, wagerId, username) => {
  return await useAxios
    .post(`/wager/chat/${wagerId}`, {
      message,
      wagerId,
      username,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not send message!" };
    });
};

export const getChat = async (useAxios, wagerId) => {
  return await useAxios
    .post(`/wager/getChat/${wagerId}`, {
      wagerId,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not get chat!" };
    });
};

export const createTeam = async (useAxios, teamName, username) => {
  return await useAxios
    .post("/teams/createTeam", {
      name: teamName,
      username,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err };
    });
};

export const leaveTeam = async (useAxios, teamId, username) => {
  return await useAxios
    .post("/teams/leaveTeam", {
      teamId,
      username,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const poofRequest = async (useAxios, payload) => {
  return await useAxios
    .post("https://www.poof.io/api/v1/checkout", payload)
    .then((res) => res.data);
};

export const clearNotifs = async (useAxios, username) => {
  return await useAxios
    .post("/notifications/clear", {
      username,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not clear notifications" };
    });
};

export const dismissNotification = async (useAxios, notification) => {
  return await useAxios
    .post("notifications/dismiss", {
      notification,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not decline notification" };
    });
};

export const readNotification = async (useAxios, notification) => {
  return await useAxios
    .post("notifications/read", {
      notification,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const getTransactions = async (useAxios, username) => {
  const params = { username };
  return await useAxios
    .get(`user/transactions`, { params })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not get transactions" };
    });
};

export const setTempEpic = async (useAxios, username, epic) => {
  return await useAxios
    .post(`user/tempEpic`, {
      epic,
      username,
    })
    .then((res) => res.data)
    .catch(() => {
      return { error: true, message: "Could not set Epic! " };
    });
};

export const getTempEpic = async (useAxios, username) => {
  return await useAxios
    .get(`user/getTempEpic/${username}`)
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not get temporary Epic!" };
    });
};

export const resetTempEpic = async (useAxios, username) => {
  return await useAxios
    .post(`user/resetTempEpic`, {
      username,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not reset temporary Epic!" };
    });
};

export const withdrawTokens = async (
  useAxios,
  email,
  paypal,
  amount,
  fullName = null,
  currency = null
) => {
  return await useAxios
    .post(`user/makeWithdrawal`, {
      email,
      paypal,
      amount,
      fullName,
      currency,
    })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: err?.response?.data?.message,
      };
    });
};

export const valWithdraw = async (useAxios, country, amount, email) => {
  return await useAxios
    .post(`user/makeValPointWithdrawal`, {
      country,
      amount,
      email,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const getAvatar = async (useAxios, username) => {
  const params = { username };
  return await useAxios
    .get(`user/getAvatar`, { params })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not get avatar!" };
    });
};

export const setAvatar = async (useAxios, username, options) => {
  return await useAxios
    .post(`user/setAvatar`, {
      username,
      options,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not set avatar!" };
    });
};

export const getAgreedCancelUsers = async (useAxios, wagerId) => {
  return await useAxios
    .get(`wager/agreedUsers/${wagerId}`)
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not get agreed users!" };
    });
};

export const getUserEpicID = async (useAxios, username) => {
  return await useAxios
    .get(`user/getEpicID/${username}`)
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not get epic id!" };
    });
};

export const refreshUserEpic = async (useAxios, username, id) => {
  return await useAxios
    .post(`user/refreshEpic`, {
      username,
      id,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not refresh Epic!" };
    });
};

export const getAdminStatsByEpic = async (useAxios, epic) => {
  return await useAxios
    .get(`getAdminStatsByEpic/${epic}`)
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not get user" };
    });
};

export const getAdminStatsByEmail = async (useAxios, email) => {
  return await useAxios
    .get(`getAdminStatsByEmail/${email}`)
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not get user" };
    });
};

export const getAdminStatsByDepositId = async (useAxios, depositId) => {
  return await useAxios
    .get(`user/getDepositByID/${depositId}`)
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not get user by deposit id" };
    });
};

export const resetEpic = async (useAxios, username) => {
  return await useAxios
    .post(`resetEpic`, {
      username,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not reset epic" };
    });
};

export const banPlayerChargeback = async (useAxios, username) => {
  return await useAxios
    .post("/banPlayerChargeback", {
      username,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, messagge: "Could not ban user." };
    });
};

export const getAdminLogs = async (useAxios) => {
  return await useAxios
    .get("getLogs")
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not get logs" };
    });
};

export const kickUser = async (useAxios, teamId, userToKick) => {
  return await useAxios
    .post(`teams/kickUser`, {
      userToKick,
      teamId,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const changePremiumColor = async (useAxios, extras) => {
  return await useAxios
    .post(`user/changePremiumColor`, {
      extras,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const getCurrentStats = async (useAxios) => {
  return await useAxios
    .get(`stats/getCurrentStats`)
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Could not get stats" };
    });
};

export const getHomeTokens = async (useAxios) => {
  return await useAxios
    .get(`getFirstThreeTokens`)
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: "Cold not get first three tokens" };
    });
};

export const getCurrentToken = async (useAxios, tokenId) => {
  return await useAxios
    .get(`token/getCurrentToken/${tokenId}`)
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: err?.response?.data?.message,
      };
    });
};

export const submitValId = async (useAxios, valId) => {
  return await useAxios
    .post(`user/val`, {
      valId,
    })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: err?.response?.data?.message,
      };
    });
};

export const submitYoutube = async (useAxios, youtubeURL) => {
  return await useAxios
    .post(`user/youtube`, {
      youtubeURL,
    })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: err?.response?.data?.message,
      };
    });
};

export const submitTwitch = async (useAxios, code) => {
  return await useAxios
    .post(`user/twitch`, {
      code,
    })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: err?.response?.data?.message,
      };
    });
};

export const generateTwitterAuth = async () => {
  return await axios
    .get(`${constants.serverURL}/user/twitter`)
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: err?.response?.data?.message,
      };
    });
};

export const submitTwitter = async (useAxios, token, verifier) => {
  return await useAxios
    .post(`user/twitterWebhook`, {
      oauth_token: token,
      oauth_verifier: verifier,
    })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: err?.response?.data?.message,
      };
    });
};

export const submitFiveMID = async (useAxios, fivemID) => {
  return await useAxios
    .post(`user/fivem`, {
      fivemID,
    })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: err?.response?.data?.message,
      };
    });
};

export const submitClashId = async (useAxios, clashId) => {
  return await useAxios
    .post(`user/clash`, {
      clashId,
    })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: err?.response?.data?.message,
      };
    });
};

export const removeConnection = async (useAxios, index) => {
  return await useAxios
    .post(`user/unlinkConnection`, {
      index,
    })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: err?.response?.data?.message,
      };
    });
};

export const linkDiscord = async (useAxios, token) => {
  return await useAxios
    .post(`user/discord`, {
      token,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const reportUser = async (useAxios, username, note, tokenId) => {
  return await useAxios
    .post(`reportUser`, {
      username,
      note,
      tokenId,
    })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: err?.response?.data?.message,
      };
    });
};

export const cardDeposit = async (useAxios, amount, token, email, fullName) => {
  return await useAxios
    .post(`squareIsGangStyll`, {
      amount,
      token,
      email,
    })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: err?.response?.data?.message,
      };
    });
};

export const getUserProfile = async (username, userSearching) => {
  const params = {
    username,
    userSearching,
  };

  return await axios
    .get(`${route}/userProfile`, { params })
    .then((res) => res.data)
    .catch((err) => {
      return {
        error: true,
        message: err?.response?.data?.message,
      };
    });
};
