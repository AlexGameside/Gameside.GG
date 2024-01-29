import createTheme from "../utils/theme";
import { useContext, useEffect, useState } from "react";
import {
  StoreContext,
  StoreDispatch,
  SET_USER,
} from "../context/NewStoreContext";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { FaUsers } from "react-icons/fa";
import NewTeamModal from "./NewTeamModal";
import NewCreateTeamModal from "./NewCreateTeamModal";
import { useNavigate } from "react-router-dom";
import { getFullDateForMatch, getTournamentDate } from "../utils/helperMethods";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";
import Header from "../custom_components/Header";

const NewTeams = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const dispatch = useContext(StoreDispatch);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const navigate = useNavigate();

  // state
  const [loading, setLoading] = useState(true);
  const [userTeams, setUserTeams] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  // methods

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  const handleAddTeam = (team) => {
    setUserTeams((oldTeams) => [...oldTeams, team]);
    const newUserData = store?.user;
    newUserData.userTeams?.push(team);
    dispatch({ type: SET_USER, payload: newUserData });
  };

  // effects
  useEffect(() => {
    if (store?.user) {
      setLoading(false);
      setUserTeams(store?.user?.userTeams);
    }
  }, [store]);

  // styles
  const styles = {
    teamName: {
      fontSize: 18,
      fontWeight: 500,
      color: theme.text(),
    },
    subLabel: {
      fontSize: 14,
      fontWeight: 400,
      color: theme.metaText(),
    },
    label: {
      fontSize: 14,
      fontWeight: 400,
      color: theme.primary(),
    },
  };

  return loading ? null : (
    <Grid
      container
      direction="column"
      alignItems="start"
      justifyContent="center"
      gap={{ xs: 2 }}
    >
      <NewTeamModal
        open={modalOpen}
        team={selectedTeam}
        onClose={handleCloseModal}
      />
      <NewCreateTeamModal
        open={createOpen}
        onClose={handleCreateClose}
        handleAddTeam={handleAddTeam}
      />
      <Grid item sx={{ width: "100%" }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Grid item>
            <Header label={"Teams"} />
          </Grid>
          <Grid item>
            <NewPrimaryButton
              label={"create team"}
              onClick={handleCreateOpen}
            />
          </Grid>
        </Grid>
      </Grid>

      {store?.user?.userTeams?.length < 1 ? (
        <Grid item alignSelf="center">
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <FaUsers style={{ fontSize: 40, color: theme.metaText() }} />
            </Grid>

            <Grid item>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: theme.metaText(),
                }}
              >
                No Teams Yet!
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: theme.metaText(),
                }}
              >
                Try creating one.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            gap={{ xs: 1 }}
          >
            {userTeams?.map((team, i) => {
              return (
                <Grid
                  key={i}
                  item
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    padding: 2,
                    transition: "all .2s ease-in-out",
                    backgroundColor: theme.card(),
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: theme.cardHover(),
                    },
                    position: "relative",
                  }}
                  onClick={() =>
                    navigate(`/profile/team/${team?._id}`, {
                      state: {
                        team,
                        index: i,
                      },
                    })
                  }
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="start"
                    gap={{ xs: 1 }}
                  >
                    <Grid item sx={{ width: "100%" }}>
                      <Typography sx={styles.teamName} noWrap>
                        {team?.name}
                      </Typography>
                    </Grid>

                    <Grid item sx={{ width: "100%" }}>
                      <Typography>
                        <span style={styles.label}>
                          {team?.usernames?.length} members
                        </span>{" "}
                        <span style={{ color: theme.text() }}>·</span>{" "}
                        <span style={styles.subLabel}>
                          Created{" "}
                          {getTournamentDate(getFullDateForMatch(team?._id))}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default NewTeams;
