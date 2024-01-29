import { Grid, Typography } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { StoreContext } from "../../../context/NewStoreContext";
import createTheme from "../../../utils/theme";
import useDraggableScroll from "use-draggable-scroll";
import StateScrollItem from "./StateScrollItem";

const CurrentMatchState = (props) => {
  // variables
  const { match } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, {
    direction: "horizontal",
  });

  // state

  //  methods
  const getScrollWidth = () => {
    if (match?.state === -1) {
      return 900;
    }
    if (match?.state === 0 || match?.state === 1) {
      return 0;
    }
    if (match?.state === 2 && match?.isVoting) {
      return 300;
    }
    return match?.state + 400;
  };

  // effects
  useEffect(() => {
    ref.current.scrollLeft += getScrollWidth();
  }, [match?.state]);

  // styles
  const styles = {
    title: {
      fontSize: 18,
      fontWeight: 700,
      color: theme.text(),
    },
    titleUnselected: {
      fontSize: 18,
      fontWeight: 700,
      color: theme.text(),
      opacity: 0.5,
    },
    subTitle: {
      fontSize: 15,
      fontWeight: 400,
      color: theme.subText(),
    },
    subTitleUnselected: {
      fontSize: 15,
      fontWeight: 400,
      color: theme.subText(),
      opacity: 0.5,
    },
  };

  return (
    <Grid
      container
      justifyContent="start"
      alignItems="start"
      wrap="nowrap"
      sx={{
        width: "100%",
        overflowX: "auto",
        paddingBottom: 2,
        boxSizing: "border-box",
      }}
      ref={ref}
      onMouseDown={onMouseDown}
      className="state-scroll"
    >
      <StateScrollItem
        title={"Waiting"}
        description={"Waiting for players to join"}
        finished={match?.state > 0 ? true : false}
        current={match?.state === 0}
        isLast={false}
      />

      <StateScrollItem
        title={"Readying Up"}
        description={"Ready up to start playing"}
        finished={match?.state > 1 ? true : false}
        current={match?.state === 1}
        isLast={false}
      />

      {match?.hasVoting ? (
        <StateScrollItem
          title={"Voting"}
          description={
            <>
              Pick and Ban maps to <br />
              determine which to play on!
            </>
          }
          finished={
            match?.state > 2 || (match?.state === 2 && !match?.isVoting)
              ? true
              : false
          }
          current={match?.state === 2 && match?.isVoting}
          isLast={false}
        />
      ) : null}

      <StateScrollItem
        title={"Playing"}
        description={"Currently playing the match"}
        finished={
          match?.state > 2 || match?.redsubmit >= 0 || match?.bluesubmit >= 0
            ? true
            : false
        }
        current={
          match?.state === 2 &&
          !match?.isVoting &&
          match?.redsubmit < 0 &&
          match?.bluesubmit < 0
        }
        isLast={false}
      />

      <StateScrollItem
        title={"Submitting Results"}
        description={"Submit your match results"}
        finished={match?.winner > 0 || match?.state === 4 || match?.state === 3}
        current={
          match?.winner === -1 &&
          (match?.bluesubmit > 0 || match?.redsubmit > 0) &&
          match?.state === 2
        }
        isLast={false}
      />

      {match?.state === 4 ? (
        <StateScrollItem
          title={"Disputed"}
          description={"Both teams have marked a win"}
          finished={false}
          current={true}
          isLast={false}
        />
      ) : null}

      {match?.state === -1 ? null : (
        <StateScrollItem
          title={"Completed"}
          description={"Match has concluded"}
          finished={match?.state === 3}
          current={false}
          isLast={true}
        />
      )}

      {match?.state === -1 ? (
        <StateScrollItem
          title={"Canceled"}
          description={"Match has been canceled"}
          finished={true}
          current={false}
          isLast={true}
        />
      ) : null}
    </Grid>
  );
};

export default CurrentMatchState;
