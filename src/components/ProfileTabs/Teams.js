import { getUserTeams, createTeam } from "../../utils/API";
import useAxios from "../../utils/useAxios";
import { useEffect, useState } from "react";
import TeamItem from "./TeamItem";
import { Grid, Button, Typography, Paper, LinearProgress } from "@mui/material";
import constants from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import CreateTeamModal from "./CreateTeamModal";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Teams = (props) => {
  const styles = {
    activeTeamsTitle: {
      fontWeight: 900,
      color: constants.newGray,
      fontSize: 24,
    },
    createTeamButton: {
      fontSize: 20,
      border: `2px solid ${constants.newBlue}`,
      width: "100%",
      color: constants.white,
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor: constants.newBlue,
      "&:hover": {
        backgroundColor: constants.newBlue,
        opacity: 0.7,
        color: constants.white,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
  };
  const { user, userTeams } = props;
  const navigate = useNavigate();
  const api = useAxios();

  // state
  const [teams, setTeams] = useState([]);
  const [createTeamModal, setCreateTeamModal] = useState(false);

  // get teams
  useEffect(() => {
    if (!user) {
      navigate("/profile");
      return;
    }
    setTeams(userTeams);
  }, [user, userTeams]);

  const handleNewTeam = (team) => {
    setTeams((oldTeams) => [...oldTeams, team]);
  };

  const handleCreateTeamModalOpen = () => {
    setCreateTeamModal(true);
  };

  const handleCreateTeamModalClose = () => {
    setCreateTeamModal(false);
  };

  const handleRemoveTeam = (teamId) => {
    if (!teamId) {
      return;
    }
    const newTeams = teams.filter((team) => {
      return team?._id !== teamId;
    });
    setTeams(newTeams);
    return;
  };

  return (
    <>
      <Grid
        container
        sx={{ width: "100%", marginBottom: 2 }}
        direction="column"
        rowSpacing={{ xs: 1, sm: 2 }}
      >
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Button
                variant="contained"
                size="large"
                sx={styles.createTeamButton}
                onClick={handleCreateTeamModalOpen}
                startIcon={<AddCircleIcon />}
              >
                CREATE TEAM
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {
          // team list container
        }
        <Grid
          item
          sx={{
            width: "100%",
          }}
        >
          <Grid
            container
            direction="row"
            columnSpacing={{ xs: 1, sm: 2 }}
            rowSpacing={{ xs: 1, sm: 2 }}
            sx={{ padding: 2 }}
          >
            {teams?.length < 1 ? (
              <Grid item sx={{ width: "100%" }}>
                <LinearProgress />
              </Grid>
            ) : (
              teams?.map((team, i) => {
                return (
                  <TeamItem
                    key={i}
                    team={team}
                    user={user}
                    handleRemoveTeam={handleRemoveTeam}
                  />
                );
              })
            )}
          </Grid>
        </Grid>
      </Grid>
      <CreateTeamModal
        open={createTeamModal}
        onClose={handleCreateTeamModalClose}
        handleNewTeam={handleNewTeam}
        user={user}
      />
    </>
  );
};

export default Teams;
