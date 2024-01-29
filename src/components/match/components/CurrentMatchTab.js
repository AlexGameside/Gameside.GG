import { Grid, Typography, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../context/NewStoreContext";
import SectionHeader from "../../../custom_components/SectionHeader";
import { getAgreedCancelUsers } from "../../../utils/API";
import createTheme from "../../../utils/theme";
import useAxios from "../../../utils/useAxios";
import useSocket from "../../../utils/useSocket";
import Timer from "../../Timer";
import MatchTeams from "../MatchTeams";
import {
  getMatchStatusTitle,
  isBlueTeam,
  isRedTeam,
  isVisitor,
} from "../utils/matchHelpers";
import StateButtons from "./StateButtons";

const CurrentMatchTab = (props) => {
  // variables
  const { match, setSelected } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const api = useAxios();
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const { agreedUsers } = useSocket(match?.wagerid);

  // state
  const [newAgreedUsers, setNewAgreedUsers] = useState(agreedUsers);

  // methods
  const setAgreedNewPlayers = (wagerId) => {
    getAgreedCancelUsers(api, wagerId).then((res) => {
      if (!res?.error) {
        setNewAgreedUsers(res?.agreedUsers);
      }
    });
  };

  const getWinOrLossText = () => {
    if (isVisitor(store?.user?.username, match))
      return <span style={{ color: theme.primary() }}>has won!</span>;

    if (match?.winner === 1) {
      if (isBlueTeam(store?.user?.username, match)) {
        return <span style={{ color: theme.primary() }}>has won!</span>;
      } else {
        return <span style={{ color: theme.red() }}>has lost!</span>;
      }
    } else {
      if (isRedTeam(store?.user?.username, match)) {
        return <span style={{ color: theme.primary() }}>has won!</span>;
      }
      return <span style={{ color: theme.red() }}>has lost!</span>;
    }
  };

  // effects
  useEffect(() => {
    if (match) {
      setAgreedNewPlayers(match?.wagerid);
    }
  }, [match]);

  useEffect(() => {
    setNewAgreedUsers(agreedUsers);
  }, [agreedUsers]);

  // styles

  return (
    <Grid
      item
      sx={{
        width: "100%",
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={{ xs: 2 }}
      >
        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="column"
            alignItems={isDesktop ? "start" : "center"}
            justifyContent="center"
            gap={{ xs: 2 }}
          >
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                justifyContent={isDesktop ? "space-between" : "center"}
                alignItems="center"
                gap={{ xs: 1 }}
              >
                {/* <SectionHeader label={getMatchStatusTitle(match)} home /> */}
                {match?.winner === -1 ? (
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: 500,
                        color: theme.text(),
                      }}
                    >
                      {getMatchStatusTitle(match, store?.user?.username)}
                    </Typography>
                  </Grid>
                ) : (
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: 500,
                        color: theme.text(),
                      }}
                    >
                      {isVisitor(store?.user?.username, match)
                        ? match?.winner === 1
                          ? "Blue team"
                          : "Red team"
                        : "Your team"}{" "}
                      {getWinOrLossText()}
                    </Typography>
                  </Grid>
                )}

                {match?.state === 1 ? (
                  <Grid item>
                    <Timer
                      time={match?.timer}
                      state={match?.state}
                      wagerId={match?.wagerid}
                      isTourneyMatch={match?.isTourneyMatch}
                    />
                  </Grid>
                ) : null}

                {match?.redsubmit >= 0 &&
                match?.redsubmit !== -1 &&
                match?.bluesubmit < 0 &&
                match?.state === 2 ? (
                  <Grid item>
                    <Timer
                      time={match?.timer}
                      state={match?.state}
                      wagerId={match?.wagerid}
                      isTourneyMatch={match?.isTourneyMatch}
                    />
                  </Grid>
                ) : null}

                {match?.bluesubmit >= 0 &&
                match?.bluesubmit !== -1 &&
                match?.redsubmit < 0 &&
                match?.state === 2 ? (
                  <Grid item>
                    <Timer
                      time={match?.timer}
                      state={match?.state}
                      wagerId={match?.wagerid}
                      isTourneyMatch={match?.isTourneyMatch}
                    />
                  </Grid>
                ) : null}

                {match?.state === -1 ? null : (
                  <StateButtons
                    match={match}
                    setSelected={setSelected}
                    agreedUsers={newAgreedUsers}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>

          {match?.state === 4 ? (
            <Grid item>
              <Typography
                sx={{ fontSize: 14, fontWeight: 400, color: theme.subText() }}
              >
                Both teams have marked a win. A moderator will be with you
                shortly. If you have any evidence,
                <br /> please prepare it now. If you do not want to wait, feel
                free to submit a ticket in our discord.
                <br /> If you accidentally marked your win, please click
                forfeit.
              </Typography>
            </Grid>
          ) : null}
        </Grid>

        <MatchTeams match={match} agreedUsers={newAgreedUsers} />
      </Grid>
    </Grid>
  );
};

export default CurrentMatchTab;
