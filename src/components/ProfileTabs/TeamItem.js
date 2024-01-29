import { Grid, Typography, Paper } from "@mui/material";
import constants from "../../utils/constants";
import { useState } from "react";
import TeamModal from "./TeamModal";

const TeamItem = (props) => {
  const styles = {
    teamTitle: {
      fontSize: 28,
      color: constants.newGray,
      fontWeight: 900,
    },
    teamDetails: {
      fontSize: 20,
      color: constants.newGray,
      fontWeight: 200,
    },
  };

  const { team, user, handleRemoveTeam } = props;
  const [teamModal, setTeamModal] = useState(false);

  if (!team || !user) {
    return null;
  }

  const handleOpenTeamModal = () => {
    setTeamModal(true);
  };

  const handleCloseTeamModal = () => {
    setTeamModal(false);
  };

  return (
    <>
      <Grid item onClick={handleOpenTeamModal} xs={12} sm={12} md={6}>
        <Paper
          elevation={1}
          sx={{
            borderRadius: 3,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            borderLeft: `5px solid ${constants.newBlue}`,
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "#eeeeee",
            },
            transition: "0.3s",
          }}
        >
          <Grid container direction="column" rowSpacing={{ xs: 1 }}>
            <Grid item>
              <Typography sx={styles.teamTitle}>{team?.name}</Typography>
            </Grid>
            <Grid item>
              <Grid container direction="row">
                <Grid item>
                  <Typography
                    sx={styles.teamDetails}
                  >{`${team?.usernames?.length} players`}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <TeamModal
        open={teamModal}
        onClose={handleCloseTeamModal}
        team={team}
        user={user}
        handleRemoveTeam={handleRemoveTeam}
      />
    </>
  );
};

export default TeamItem;
