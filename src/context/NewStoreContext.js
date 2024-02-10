import { createContext } from "react";

export const StoreContext = createContext();
export const StoreDispatch = createContext();

// Actions
export const SET_MODE = "SET_MODE";
export const SET_USER = "SET_USER";
export const SET_CURRENT_TOKEN = "SET_CURRENT_TOKEN";
export const SET_ACTIVE_TOKENS = "SET_ACTIVE_TOKENS";
export const SET_OPEN_TOKEN_DIALOG_ID = "SET_OPEN_TOKEN_DIALOG_ID";
export const SET_DRAWER_STATE = "SET_DRAWER_STATE";
export const SET_OPEN_MATCH_DIALOG_ID = "SET_OPEN_MATCH_DIALOG_ID";
export const SET_IS_HOME_PAGE = "SET_IS_HOME_PAGE";
export const SET_CURRENT_GAME = "SET_CURRENT_GAME";

// Reducer
export const storeReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MODE: {
      return {
        ...state,
        mode: payload,
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: payload,
      };
    }
    case SET_CURRENT_TOKEN: {
      return {
        ...state,
        currentTokenId: payload,
      };
    }
    case SET_ACTIVE_TOKENS: {
      return {
        ...state,
        activeTokens: payload,
      };
    }
    case SET_OPEN_TOKEN_DIALOG_ID: {
      return {
        ...state,
        openTokenDialogId: payload,
      };
    }
    case SET_OPEN_MATCH_DIALOG_ID: {
      return {
        ...state,
        openMatchDialogId: payload,
      };
    }
    case SET_DRAWER_STATE: {
      return {
        ...state,
        drawerOpen: payload,
      };
    }
    case SET_IS_HOME_PAGE: {
      return {
        ...state,
        isHomePage: payload,
      };
    }
    case SET_CURRENT_GAME: {
      return {
        ...state,
        currentGameType: payload,
      };
    }
    }
};

const Store = (props) => {
  const { initialStore, dispatch } = props;

  return (
    <StoreContext.Provider value={initialStore}>
      <StoreDispatch.Provider value={dispatch}>
        {props.children}
      </StoreDispatch.Provider>
    </StoreContext.Provider>
  );
};

export default Store;
