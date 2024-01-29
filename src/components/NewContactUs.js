import { Grid, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";
import SectionHeader from "../custom_components/SectionHeader";
import createTheme from "../utils/theme";

const NewContactUs = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  // styles
  const styles = {
    card: {
      padding: 4,
      backgroundColor: theme.card(),
      borderRadius: 2,
    },
    header: {
      fontWeight: 400,
      fontSize: 18,
      color: theme.text(),
    },
    number: {
      fontSize: 15,
      fontWeight: 600,
      color: theme.primary(),
    },
    email: {
      fontSize: 15,
      fontWeight: 600,
      color: theme.green(),
    },
    address: {
      fontSize: 15,
      fontWeight: 600,
      color: theme.red(),
    },
    discord: {
      fontSize: 15,
      fontWeight: 600,
      color: theme.purple(),
    },
    discordContainer: {
      transition: "all .2s ease-in-out",
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.1)",
      },
    },
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="start"
      justifyContent="center"
      rowSpacing={{ xs: 2 }}
      sx={{ width: "100%" }}
    >
      <Grid item sx={{ width: "100%" }}>
        <Paper elevation={0} sx={styles.card}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="start"
            rowSpacing={{ xs: 3 }}
            sx={{ width: "100%" }}
          >
            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="start"
              >
                <Grid item>
                  <Typography sx={styles.header}>
                    Call us, we want to hear from you.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={styles.number}>+16049135390</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="center"
              >
                <Grid item>
                  <Typography sx={styles.header}>
                    Email us, It's like texting, but without the emojis.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={styles.email}>support@tkns.gg</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="center"
              >
                <Grid item>
                  <Typography sx={styles.header}>
                    Send us mail, we love post cards.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={styles.address}>
                    651 N. Broad St., Suite 206 Middletown DE 19709
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="center"
              >
                <Grid item>
                  <Typography sx={styles.header}>
                    Rather talk to us online? Join our Discord.
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={styles.discordContainer}
                  onClick={() =>
                    window.open("https://discord.gg/tknsgg", "_blank")
                  }
                >
                  <Typography sx={styles.discord}>Tkns.GG</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NewContactUs;
