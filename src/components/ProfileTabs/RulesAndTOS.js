import { Grid, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import constants from "../../utils/constants";

const RulesAndTOS = () => {
  const styles = {
    title: {
      fontSize: 24,
      fontWeight: 900,
      color: constants.black,
    },
    viewButton: {
      backgroundColor: constants.black,
      "&:hover": {
        backgroundColor: constants.blackHovered,
      },
      transition: "0.3s",
    },
  };

  const navigate = useNavigate();

  const handleRulePress = () => {
    navigate("/valorant/rules");
    return;
  };

  const handleTOSPress = () => {
    navigate("/valorant/tos");
    return;
  };

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 2,
        padding: 4,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Grid container direction="column" rowSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item>
          <Typography sx={styles.title}>Rules and TOS</Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Button
                variant="contained"
                size="large"
                onClick={handleRulePress}
                style={styles.viewButton}
              >
                View Rules
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                onClick={handleTOSPress}
                style={styles.viewButton}
              >
                View TOS
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RulesAndTOS;
