import { Grid, Typography, useMediaQuery } from "@mui/material";
import { useContext, useRef } from "react";
import { BsFlagFill } from "react-icons/bs";
import {
  FaGlobeAmericas,
  FaListAlt,
  FaPiggyBank,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import { IoPodium } from "react-icons/io5";
import { RiMedalFill, RiTreasureMapFill } from "react-icons/ri";
import { StoreContext } from "../../../context/NewStoreContext";
import BoxContainer from "../../../custom_components/BoxContainer";
import SectionHeader from "../../../custom_components/SectionHeader";
import {
  getCurrentTokenRegion,
  getRankLabel,
  getTokenMatchType,
} from "../../../utils/helperMethods";
import { useLocation } from 'react-router-dom';
import createTheme from "../../../utils/theme";
import DetailsMatchItem from "./DetailsMatchItem";
import useDraggableScroll from "use-draggable-scroll";

const DetailsMatchTab = (props) => {
  const { match } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const location = useLocation();
  const isFortnite = location.pathname.startsWith("/fortnite") || location.pathname === 'fortnite'; 
  const isValorant = location.pathname.startsWith("/valorant");
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, {
    direction: "horizontal",
  });

  const styles = {
    rules: {
      fontSize: 15,
      fontWeight: 400,
      color: theme.text(),
    },
  };

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
        alignItems="start"
        justifyContent="center"
        gap={{ xs: 4 }}
      >
        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
            gap={{ xs: 2 }}
          >
            <Grid item>
              <SectionHeader label="Match Details" home />
            </Grid>

            <Grid
              item
              sx={{ width: "100%" }}
              ref={ref}
              onMouseDown={onMouseDown}
              overflow="auto"
            >
              <Grid
                container
                justifyContent="start"
                alignItems="center"
                gap={{ xs: 1 }}
                wrap="nowrap"
                sx={{
                  width: "100%",
                  paddingBottom: 2,
                  boxSizing: "border-box",
                }}
              >
                <BoxContainer
                  label="Map"
                  value={
                    match?.hasVoting
                      ? "Pick/Ban"
                      : getTokenMatchType(match?.match_type)
                  }
                >
                  <RiTreasureMapFill
                    style={{ fontSize: 24, color: theme.metaText() }}
                  />
                </BoxContainer>

                <BoxContainer
                  label="Team Size"
                  value={`${match?.team_size}v${match?.team_size}`}
                >
                  <FaUsers style={{ fontSize: 24, color: theme.metaText() }} />
                </BoxContainer>

                <BoxContainer
                  label="Type"
                  value={
                    match?.isTourneyMatch
                      ? "Tournament"
                      : match?.isScrimMatch
                      ? "Scrim"
                      : "Cash Match"
                  }
                >
                  <FaListAlt
                    style={{ fontSize: 24, color: theme.metaText() }}
                  />
                </BoxContainer>

                <BoxContainer
                  label="Region"
                  value={getCurrentTokenRegion(match?.region)}
                >
                  <FaGlobeAmericas
                    style={{ fontSize: 24, color: theme.metaText() }}
                  />
                </BoxContainer>

                <BoxContainer label="Best of" value={match?.hasVoting ? 3 : 1}>
                  <IoPodium style={{ fontSize: 24, color: theme.metaText() }} />
                </BoxContainer>

                {match?.rank != null && match?.rank !== "" ? (
                  <BoxContainer label="Rank" value={getRankLabel(match?.rank)}>
                    <RiMedalFill
                      style={{ fontSize: 24, color: theme.metaText() }}
                    />
                  </BoxContainer>
                ) : null}

                {!match?.isScrimMatch && !match?.isTourneyMatch ? (
                  <BoxContainer label="First to" value={match?.first_to}>
                    <BsFlagFill
                      style={{ fontSize: 24, color: theme.metaText() }}
                    />
                  </BoxContainer>
                ) : null}
                {!match?.isTourneyMatch && !match?.isScrimMatch ? (
                  <>
                    <BoxContainer
                      label="Entry / Player"
                      value={numFormatter.format(match?.entry_fee)}
                    >
                      <FaWallet
                        style={{ fontSize: 24, color: theme.metaText() }}
                      />
                    </BoxContainer>

                    <BoxContainer
                      label="Prize / Player"
                      value={numFormatter.format(match?.entry_fee * 0.9)}
                    >
                      <FaPiggyBank
                        style={{ fontSize: 24, color: theme.metaText() }}
                      />
                    </BoxContainer>
                  </>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="start"
            gap={{ xs: 2 }}
          >
          {isValorant && (
            <>
            <Grid item>
              <SectionHeader label="Game Settings" home />
            </Grid>

            <Grid item>
              <Grid
                container
                justifyContent="start"
                alignItems="center"
                gap={{ xs: 2, sm: 4, md: 6, lg: 8 }}
              >
                <DetailsMatchItem label={"Play All Rounds"} value={"Off"} />
                <DetailsMatchItem label={"Tournament Mode"} value={"On"} />
                <DetailsMatchItem label={"Hide Match History"} value={"Off"} />
                <DetailsMatchItem label={"Cheats"} value={"Off"} />
                <DetailsMatchItem label={"Agent Switching"} value={"No"} />
              </Grid>
            </Grid>
            </>
          )}
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="start"
            gap={{ xs: 2 }}
          >
            <Grid item>
              <SectionHeader label="Game Rules" home />
            </Grid>

            <Grid item>
              <Grid
                container
                direction="column"
                justifyContent="start"
                alignItems="start"
                gap={{ xs: 2 }}
              >
              {isValorant && (
                <>
                <Grid item>
                  <Typography sx={styles.rules}>
                    - In First to 7 matches, play 4 rounds and then switch
                    <br />
                    attackers and defenders. In First to 9 matches, play 5<br />
                    rounds and then switch. (Only applies to 2v2, 3v3 game
                    modes).
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography sx={styles.rules}>
                    - If the score goes to win by 2, remain on the second half’s{" "}
                    <br />
                    sides until the match is over. (Only applies to matches that{" "}
                    <br />
                    are First to 7, and 9).
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography sx={styles.rules}>
                    - 4v4 and 5v5 matches are played out Normally. (Always First
                    to 13.)
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography sx={styles.rules}>
                    - Switching sides is done by backing out of the match and
                    <br />
                    requeuing with the same agents, host and settings. The score
                    <br />
                    carries on, proven by match history.
                  </Typography>
                </Grid>
                </>
              )}
              {isFortnite && (
                <>
                <Grid item>
                  <Typography sx={styles.rules}>
                  Box Fight
Join the map with your opponent using this Map: 7620-0771-9529 (Clix Box fights)
The pump should be a purple pump.
The chosen host is Team 1, the other team is Team 2.
Respawning mid-round is not allowed. The Round will result in a loss doing this.

                  </Typography>
                </Grid>

                <Grid item>
                  <Typography sx={styles.rules}>
                  Zone Wars
Join the map with your opponent using this Map: 6660-9625-9492 (Clix Zone wars)
The pump should be a purple pump.
The chosen host is Team 1, the other team is Team 2
Respawning mid-round is not allowed. The Round will result in a loss doing this.
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography sx={styles.rules}>
                  Realistics 
Join the map with your opponent using this Map: 6078-7811-0032 (Finest Realistics)
The map should be played in default mode.
The chosen host is Team 1, the other team is Team 2.
If you end the game before the loot has been given, you will lose the round.
Respawning mid-round is not allowed. The Round will result in a loss doing this.
                  </Typography>
                </Grid>
                </>
              )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailsMatchTab;
