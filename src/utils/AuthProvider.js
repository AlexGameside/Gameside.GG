import createTokenProvider from "./TokenUtils";
import { useEffect, useState } from "react";

const createAuthProvider = () => {
  const tokenProvider = createTokenProvider();

  // sets the new tokens to localStorage
  const authLogin = (newTokens) => {
    if (!newTokens) {
      return;
    }
    tokenProvider.setToken(newTokens.accessToken, newTokens.refreshToken);
  };

  // removes tokens from local storage forcing the user to login again
  const authLogout = () => {
    tokenProvider.setToken(null, null);
  };

  const useAuth = () => {
    const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());

    useEffect(() => {
      const listener = (newIsLogged) => {
        setIsLogged(newIsLogged);
      };

      tokenProvider.subscribe(listener);
      return () => {
        tokenProvider.unsubscribe(listener);
      };
    }, []);

    return [isLogged];
  };

  return {
    useAuth,
    authLogin,
    authLogout,
  };
};

export default createAuthProvider;
