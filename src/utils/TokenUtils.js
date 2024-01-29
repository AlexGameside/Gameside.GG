import { renewToken } from "./API";

const createTokenProvider = () => {
  let _token = localStorage.getItem("accessToken") || null;
  let _refreshToken = localStorage.getItem("refreshToken") || null;
  let observers = [];

  const getUserIdFromToken = (jwtToken) => {
    if (jwtToken == null) return null;
    const jwt = JSON.parse(atob(jwtToken.split(".")[1]));
    return (jwt && jwt.userId) || null;
  };

  const getExpirationDate = (jwtToken) => {
    if (!jwtToken) {
      return null;
    }
    const jwt = JSON.parse(atob(jwtToken.split(".")[1]));
    return (jwt && jwt.exp && jwt.exp * 1000) || null;
  };

  const isExpired = (exp) => {
    if (!exp) {
      return false;
    }
    return Date.now() > exp;
  };

  const getNewToken = () => {
    return localStorage.getItem("accessToken");
  };

  const getToken = async () => {
    if (!_token || !_refreshToken) {
      return null;
    }
    if (isExpired(getExpirationDate(_token))) {
      await renewToken(_refreshToken).then((res) => {
        setToken(res.accessToken, res.refreshToken);
      });
      return getNewToken();
    }
    return _token;
  };

  const isLoggedIn = () => {
    return !!_token;
  };

  const subscribe = (observer) => {
    observers.push(observer);
  };

  const unsubscribe = (observer) => {
    observers = observers.filter((_observer) => _observer !== observer);
  };

  const notify = () => {
    const isLogged = isLoggedIn();
    observers.forEach((observer) => observer(isLogged));
  };

  const setToken = (accessToken, refreshToken) => {
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    _token = accessToken;
    _refreshToken = refreshToken;
    notify();
  };

  return {
    getToken,
    isLoggedIn,
    setToken,
    subscribe,
    unsubscribe,
    isExpired,
    getExpirationDate,
    getUserIdFromToken,
  };
};

export default createTokenProvider;
