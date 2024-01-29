import { Typography, Grid } from "@mui/material";
import { useContext, useState, useEffect, useRef } from "react";
import { cancelWager, getCurrentToken } from "../utils/API";
import useAxios from "../utils/useAxios";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { MdTimer } from "react-icons/md";

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  });
};

const Timer = (props) => {
  const {
    wagerId,
    time,
    state,
    updateWinEvent,
    isTourneyMatch = false,
  } = props;

  const api = useAxios();
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const [currentTime, setCurrentTime] = useState(time);
  const [winner, setWinner] = useState(-1);

  useEffect(() => {
    setCurrentTime(time);
  }, [time]);

  const decrementTimer = (time) => {
    setCurrentTime(time - 1);
  };

  useInterval(() => {
    if (currentTime === 0) {
      if (state === 1) {
        if (isTourneyMatch) {
          return;
        }
        cancelWager(api, wagerId, store?.user?.username).then((res) => {
          if (!res.error) {
            return;
          }
          return;
        });
        return;
      }
      if (state === 2) {
        if (isTourneyMatch) {
          return;
        }
        if (winner < 0) {
          getCurrentToken(api, wagerId).then((res) => {
            if (!res?.error) {
              setWinner(res?.token?.winner);
              updateWinEvent(res?.token?.winner);
            }
            return;
          });
        }
        return;
      }
    }
    decrementTimer(currentTime);
  }, 1000);

  const styles = {
    timerContainer: {
      backgroundColor: theme.card(),
      borderRadius: 12,
      border: `2px solid ${theme.border()}`,
      height: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.text(),
      padding: 8,
    },
    time: {
      fontSize: 18,
      fontWeight: 600,
      color: time < 30 ? theme.red() : theme.text(),
    },
  };

  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime - minutes * 60;

  const getTimeString = () => {
    if (minutes === 0) {
      return `${seconds}s`;
    }
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div style={styles.timerContainer}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        columnSpacing={{ xs: 1 }}
      >
        <Grid item>
          <MdTimer style={{ color: theme.text(), fontSize: 30 }} />
        </Grid>
        <Grid item>
          <Typography style={styles.time}>{getTimeString()}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Timer;
