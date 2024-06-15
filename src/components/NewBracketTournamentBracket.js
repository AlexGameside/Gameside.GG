import { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { Grid, Typography, Divider } from "@mui/material";
import useDraggableScroll from "use-draggable-scroll";
import Avatar from "avataaars";
import { FaCrown } from "react-icons/fa";
import NewBracketTournamentTeamModal from "./NewBracketTournamentTeamModal";
import { BsThreeDots } from "react-icons/bs";
import NewBracketMenu from "./NewBracketMenu";

const NewBracketTournamentBracket = (props) => {
  // variables
  const { tournament, gameName } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const ref = useRef(null);
  const elRef = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, {
    direction: "horizontal",
  });

  // state
  const [height, setHeight] = useState(0);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [hoverColor, setHoverColor] = useState(theme.metaText());
  const [currentHoverId, setCurrentHoverId] = useState(null);
  const [currentMatchId, setCurrentMatchId] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  // methods
  const handleOpenTeamModal = () => {
    setTeamModalOpen(true);
  };

  const handleCloseTeamModal = () => {
    setSelectedTeam(null);
    setTeamModalOpen(false);
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setMenuAnchor(e.currentTarget);
  };

  const handleMenuClose = (e) => {
    e.stopPropagation();
    setMenuAnchor(null);
  };

  // effects
  useEffect(() => {
    setHeight(elRef.current.clientHeight);
  }, []);

  // style
  const styles = {
    match: {
      border: store.mode === "dark" ? `2px solid ${theme.border()}` : "",
      backgroundColor: theme.card(),
      height: 100,
      width: 250,
      borderRadius: 2,
      marginBottom: 1,
      boxShadow: theme.shadow(),
      position: "relative",
    },
    lines: {
      backgroundColor: "transparent",
      borderRight: `2px solid ${theme.border()}`,
      borderTop: `2px solid ${theme.border()}`,
      borderBottom: `2px solid ${theme.border()}`,
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
      zIndex: 10,
      marginBottom: 1,
    },
    even: {
      backgroundColor: "transparent",
      borderRight: `2px solid ${theme.border()}`,
      height: 50,
    },
    team: {
      fontSize: 15,
      fontWeight: 400,
      color: theme.metaText(),
    },
    teamContainer: {
      width: "100%",
      transition: "all .2s ease-in-out",
      borderRadius: 2,
      paddingLeft: 0.5,
      "&:hover": {
        cursor: "pointer",
        backgroundColor: theme.skeleton(),
      },
    },
  };

  return (
    <Grid
      item
      sx={{
        width: "100%",
        paddingTop: 2,
      }}
      wrap="nowrap"
      ref={ref}
      onMouseDown={onMouseDown}
      overflow="auto"
    >
      <NewBracketMenu
        anchor={menuAnchor}
        handleClose={handleMenuClose}
        matchId={currentMatchId}
        gameName={gameName}
      />
      <NewBracketTournamentTeamModal
        open={teamModalOpen}
        onClose={handleCloseTeamModal}
        team={selectedTeam}
      />
      <Grid
        container
        direction="row"
        alignItems="stretch"
        justifyContent="start"
        wrap="nowrap"
      >
        {tournament?.bracket?.matches?.map((round, i) => {
          return (
            <Grid item key={i} ref={elRef}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="space-around"
                sx={{ minHeight: "100%" }}
              >
                {round?.map((match, j) => {
                  return (
                    <Grid item key={j} sx={{ width: "100%" }}>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="start"
                        wrap="nowrap"
                      >
                        {i !== 0 ? (
                          <>
                            <Grid
                              item
                              sx={{
                                ...styles.lines,
                                minHeight: height / round.length / 2,
                                width: 20,
                              }}
                            ></Grid>
                            <Grid item alignSelf="center">
                              <Divider
                                sx={{
                                  backgroundColor: theme.border(),
                                  height: 2,
                                  width: 20,
                                }}
                              />
                            </Grid>
                          </>
                        ) : null}
                        <Grid item sx={styles.match}>
                          <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ width: "100%", minHeight: "100%" }}
                          >
                            {match?.blueteamid == null ? null : (
                              <>
                                <Grid
                                  item
                                  sx={styles.teamContainer}
                                  onClick={() => {
                                    setSelectedTeam(match?.blueteam_users);
                                    handleOpenTeamModal();
                                  }}
                                >
                                  <Grid
                                    container
                                    direction="row"
                                    justifyContent="start"
                                    alignItems="center"
                                    columnSpacing={{ xs: 1 }}
                                    wrap="nowrap"
                                    sx={{ overflow: "hidden" }}
                                  >
                                    <Grid item>
                                      <Avatar
                                        style={{ width: 40, height: 40 }}
                                        avatarStyle="Circle"
                                        {...match?.blueteam_users[0]?.avatar[0]}
                                      />
                                    </Grid>

                                    <Grid item>
                                      <Typography sx={styles.team} noWrap>
                                        <span
                                          style={{ color: theme.metaText() }}
                                        >
                                          Team{" "}
                                        </span>
                                        <span
                                          style={{
                                            color:
                                              match?.winner === 1
                                                ? theme.gold()
                                                : theme.text(),
                                            fontWeight: 600,
                                          }}
                                        >
                                          {match?.blueteam_users[0]?.username}
                                        </span>
                                      </Typography>
                                    </Grid>

                                    {match?.winner === 1 ? (
                                      <Grid item>
                                        <FaCrown
                                          style={{
                                            fontSize: 30,
                                            color: theme.gold(),
                                            position: "absolute",
                                            left: 9,
                                            top: -12,
                                          }}
                                        />
                                      </Grid>
                                    ) : null}

                                    {match?.blueteamid == null ? null : (
                                      <Grid
                                        item
                                        onMouseEnter={() => {
                                          setHoverColor(theme.text());
                                          setCurrentHoverId(match._id);
                                        }}
                                        onMouseLeave={() => {
                                          setHoverColor(theme.metaText());
                                          setCurrentHoverId(null);
                                        }}
                                        sx={{
                                          transition: "all .2s ease-in-out",
                                          "&:hover": {
                                            cursor: "pointer",
                                          },
                                        }}
                                        onClick={(e) => {
                                          setCurrentMatchId(match._id);
                                          handleMenuClick(e);
                                        }}
                                      >
                                        <BsThreeDots
                                          style={{
                                            fontSize: 25,
                                            color:
                                              currentHoverId === match._id
                                                ? hoverColor
                                                : theme.metaText(),
                                            position: "absolute",
                                            right: 4,
                                            top: 2,
                                          }}
                                        />
                                      </Grid>
                                    )}
                                  </Grid>
                                </Grid>

                                <Grid item sx={{ width: "100%" }}>
                                  <Divider
                                    sx={{
                                      backgroundColor: theme.border(),
                                    }}
                                  />
                                </Grid>

                                <Grid
                                  item
                                  sx={styles.teamContainer}
                                  onClick={() => {
                                    setSelectedTeam(match?.redteam_users);
                                    handleOpenTeamModal();
                                  }}
                                >
                                  <Grid
                                    container
                                    direction="row"
                                    justifyContent="start"
                                    alignItems="center"
                                    columnSpacing={{ xs: 1 }}
                                    wrap="nowrap"
                                    sx={{ overflow: "hidden" }}
                                  >
                                    <Grid item>
                                      <Avatar
                                        style={{ width: 40, height: 40 }}
                                        avatarStyle="Circle"
                                        {...match?.redteam_users[0]?.avatar[0]}
                                      />
                                    </Grid>

                                    <Grid item>
                                      <Typography sx={styles.team} noWrap>
                                        <span
                                          style={{ color: theme.metaText() }}
                                        >
                                          Team{" "}
                                        </span>
                                        <span
                                          style={{
                                            color:
                                              match?.winner === 2
                                                ? theme.gold()
                                                : theme.text(),
                                            fontWeight: 600,
                                          }}
                                        >
                                          {match?.redteam_users[0]?.username}
                                        </span>
                                      </Typography>
                                    </Grid>

                                    {match?.winner === 2 ? (
                                      <Grid item>
                                        <FaCrown
                                          style={{
                                            fontSize: 30,
                                            color: theme.gold(),
                                            position: "absolute",
                                            left: 9,
                                            top: 32,
                                          }}
                                        />
                                      </Grid>
                                    ) : null}
                                  </Grid>
                                </Grid>
                              </>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default NewBracketTournamentBracket;
