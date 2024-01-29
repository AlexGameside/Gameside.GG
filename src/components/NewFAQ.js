import { Grid, Paper, Typography, Divider } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";

const NewFAQ = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const navigate = useNavigate();

  // styles
  const styles = {
    title: {
      fontSize: 36,
      fontWeight: 900,
      color: theme.text(),
    },
    card: {
      padding: 4,
      backgroundColor: theme.card(),
      borderRadius: 2,
    },
    header: {
      fontSize: 22,
      fontWeight: 600,
      color: theme.text(),
    },
    text: {
      fontWeight: 400,
      fontSize: 15,
      color: theme.text(),
    },
    games: {
      fontSize: 18,
      fontWeight: 600,
      color: theme.blue(),
    },
    money: {
      fontSize: 18,
      fontWeight: 600,
      color: theme.green(),
    },
    general: {
      fontSize: 18,
      fontWeight: 600,
      color: theme.purple(),
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
      id="top"
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
                rowSpacing={{ xs: 2 }}
              >
                <Grid item>
                  <Typography sx={styles.header}>
                    Withdrawals/Deposits
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography sx={styles.money}>
                    Why do I not see my funds right away after depositing?
                  </Typography>
                  <Typography sx={styles.text}>
                    Sometimes we need to manually accept deposits. If you do not
                    receive your deposit that got put on hold in 1-3 hours,
                    please make a ticket in our discord.
                  </Typography>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Divider sx={{ backgroundColor: theme.subText() }} />
                </Grid>

                <Grid item>
                  <Typography sx={styles.money}>
                    How long does it take to receive funds once they have been
                    withdrawn?
                  </Typography>
                  <Typography sx={styles.text}>
                    Once you withdraw, you should receive your funds within 1-5
                    days. If you chose the bank option for withdrawals, after
                    1-5 days you will receive and email from "Wise" with
                    information on how to claim your funds. This usually is
                    instant once you follow the instructions in the email.
                  </Typography>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Divider sx={{ backgroundColor: theme.subText() }} />
                </Grid>

                <Grid item>
                  <Typography sx={styles.money}>
                    Can I deposit with Paypal?
                  </Typography>
                  <Typography sx={styles.text}>
                    Currently on TknsGG, we do not offer Paypal deposits.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="start"
                rowSpacing={{ xs: 2 }}
              >
                <Grid item>
                  <Typography sx={styles.header}>Competing</Typography>
                </Grid>
                <Grid item>
                  <Typography sx={styles.games}>
                    How old do I need to be to compete on Tkns.GG?
                  </Typography>
                  <Typography sx={styles.text}>
                    You can freely compete on TknsGG if you are above the age of
                    18. If you are not 18, you can compete above the age of 13
                    in the US and 16 in EU with parental consent.
                  </Typography>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Divider sx={{ backgroundColor: theme.subText() }} />
                </Grid>

                <Grid item>
                  <Typography sx={styles.games}>
                    Is it legal to compete in Tokens?
                  </Typography>
                  <Typography sx={styles.text}>
                    Since competing on our site is considered a game of skill
                    and not luck or chance, yes it is legal to compete! Be aware
                    that in some states, game of skill competition is banned and
                    you should be aware if one of those states is yours.
                  </Typography>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Divider sx={{ backgroundColor: theme.subText() }} />
                </Grid>

                <Grid item>
                  <Typography sx={styles.games}>
                    How can I compete in tournaments or tokens?
                  </Typography>
                  <Typography sx={styles.text}>
                    You must have an account to compete in tokens or
                    tournaments. Once you have signed up, make sure you link the
                    game account you are planning on playing on your profile
                    under{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        fontWeight: 900,
                        transition: "all .2s ease-in-out",
                        "&:hover": {
                          cursor: "pointer",
                          transform: "scale(1.1)",
                        },
                      }}
                      onClick={() => navigate("/profile/accounts")}
                    >
                      Linked Accounts.
                    </span>{" "}
                    Once you have done that, head over to the Tokens or
                    Tournaments tab and join a match and compete!
                  </Typography>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Divider sx={{ backgroundColor: theme.subText() }} />
                </Grid>

                <Grid item>
                  <Typography sx={styles.games}>
                    When are scrim ladders coming?
                  </Typography>
                  <Typography sx={styles.text}>
                    Free to enter scrim ladders will be added in the near
                    future.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="start"
                rowSpacing={{ xs: 2 }}
              >
                <Grid item>
                  <Typography sx={styles.header}>General</Typography>
                </Grid>

                <Grid item>
                  <Typography sx={styles.general}>
                    Am I allowed to have multiple accounts?
                  </Typography>
                  <Typography sx={styles.text}>
                    On TknsGG we do not allow a player to have multiple
                    accounts.
                  </Typography>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Divider sx={{ backgroundColor: theme.subText() }} />
                </Grid>

                <Grid item>
                  <Typography sx={styles.general}>
                    Can I transfer my friend funds through the site since they
                    cannot deposit?
                  </Typography>
                  <Typography sx={styles.text}>
                    No, we do not allow the transferring of funds.
                  </Typography>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Divider sx={{ backgroundColor: theme.subText() }} />
                </Grid>

                <Grid item>
                  <Typography sx={styles.general}>
                    How can I get help?
                  </Typography>
                  <Typography sx={styles.text}>
                    You can either visit our support page, or create a ticket in
                    our Discord. You can find our discord link at the bottom of
                    the page, our through our contact page.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NewFAQ;
