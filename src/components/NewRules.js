import { Grid, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";

const NewRules = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

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
      fontWeight: 600,
      fontSize: 18,
      color: theme.text(),
    },
    fortniteHeader: {
      fontWeight: 900,
      fontSize: 24,
      color: theme.blue(),
    },
    fivemHeader: {
      fontWeight: 900,
      fontSize: 24,
      color: theme.orange(),
    },
    otherText: {
      fontWeight: 400,
      fontSize: 15,
      color: theme.text(),
    },
    valHeader: {
      fontWeight: 600,
      fontSize: 22,
      color: theme.primary(),
    },
    generalHeader: {
      fontWeight: 600,
      fontSize: 22,
      color: theme.primary(),
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
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                justifyContent="start"
                alignItems="center"
                rowSpacing={{ xs: 1 }}
              >
                <Grid item>
                  <Typography sx={styles.valHeader}>Valorant</Typography>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Typography sx={styles.header}>Game Settings</Typography>
                  <ul>
                    <li style={styles.otherText}>"Play all rounds" off</li>
                    <li style={styles.otherText}>"Tournament mode" off</li>
                    <li style={styles.otherText}>"Hide match history" off</li>
                    <li style={styles.otherText}>"Cheats" off</li>
                    <li style={styles.otherText}>
                      No switching agents at half.
                    </li>
                  </ul>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Typography sx={styles.header}>Game Rules</Typography>
                  <ul>
                    <li style={styles.otherText}>
                      In First to 7 matches, play 4 rounds and then switch
                      attackers and defenders. In First to 9 matches, play 5
                      rounds and then switch. (Only applies to 2v2, 3v3 game
                      modes).
                    </li>
                    <li style={styles.otherText}>
                      If the score goes to win by 2, remain on the second half’s
                      sides until the match is over. (Only applies to matches
                      that are First to 7, and 9).
                    </li>
                    <li style={styles.otherText}>
                      4v4 and 5v5 matches are played out Normally. (Always First
                      to 13.)
                    </li>
                    <li style={styles.otherText}>
                      Switching sides is done by backing out of the match and
                      requeuing with the same agents, host and settings. The
                      score carries on, proven by match history.
                    </li>
                  </ul>
                </Grid>

                <Grid item>
                  <Typography sx={styles.generalHeader}>
                    General Rules
                  </Typography>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Typography sx={styles.header}>Disconnections</Typography>
                  <ul>
                    <li style={styles.otherText}>
                      If a team member leaves the game or respawns after the
                      round has begun, the remaining members must finish the
                      round. If all players of one team leave, that round will
                      be given to the opposing team.
                    </li>
                    <li style={styles.otherText}>
                      The round does Not count if a team member leaves before
                      the round begins, and the match is halted.
                    </li>
                    <li style={styles.otherText}>
                      All unavailable players will be unable to play for the
                      remainder of the match if they cause the match to be
                      paused for more than 10 minutes.
                    </li>
                    <li style={styles.otherText}>
                      Disconnecting due to latency, a player's game crashing, or
                      any other equipment issues (while unpleasant) does Not
                      result in a redo and the round will stand.
                    </li>
                  </ul>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Typography sx={styles.header}>Availability/AFK</Typography>
                  <ul>
                    <li style={styles.otherText}>
                      From the start of a match, all members get 15 minutes to
                      join a lobby.
                    </li>
                    <li style={styles.otherText}>
                      To verify that the opposing team did Not join within 15
                      minutes, a photo of chat and/or join log will be required
                      as proof.
                    </li>
                    <li style={styles.otherText}>
                      If any of your teammates are absent, you may still play
                      the match when possible.
                    </li>
                    <li style={styles.otherText}>
                      Cancellation of the match must be agreed upon by both
                      parties.
                    </li>
                    <li style={styles.otherText}>
                      If your opponent goes afk, only the first round they were
                      afk in will be counted towards your score.
                    </li>
                  </ul>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Typography sx={styles.header}>Bugs</Typography>
                  <ul>
                    <li style={styles.otherText}>
                      If a bug caused by the game occurs, the rounds in which
                      the bug occurs are Not counted. Ping lag or crashing does
                      Not count.
                    </li>
                    <li style={styles.otherText}>
                      A game crash is Not considered a game bug.
                    </li>
                  </ul>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Typography sx={styles.header}>Observers</Typography>
                  <ul>
                    <li style={styles.otherText}>
                      Any rounds with an outside observer will be reset, and the
                      team that did Not invite the spectator will receive a
                      point.
                    </li>
                    <li style={styles.otherText}>
                      The host should ensure that the lobby is made as private
                      as possible.
                    </li>
                  </ul>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Typography sx={styles.header}>Region</Typography>
                  <ul>
                    <li style={styles.otherText}>
                      Matches must be played on the region stated on the match
                      page.
                    </li>
                    <li style={styles.otherText}>
                      If the match was Not played on the correct region, the
                      match is reset.
                    </li>
                  </ul>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Typography sx={styles.header}>Host</Typography>
                  <ul>
                    <li style={styles.otherText}>
                      The chosen host should be given host in the Game lobby,
                      however all rounds played on an incorrect host will stand
                      (as will rounds played on an incorrect map).
                    </li>
                  </ul>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Typography sx={styles.header}>Miscellaneous</Typography>
                  <ul>
                    <li style={styles.otherText}>
                      Toxicity is against our rules. Although toxicity will
                      never change the outcome of a match, in extreme scenarios
                      we may penalize users. Do NOT claim a win if your opponent
                      is toxic, report them after the match in our Discord.
                      (discord.gg/QHMPUC3xk9)
                    </li>
                    <li style={styles.otherText}>
                      If a player's platform or Epic Name is incorrect, the
                      player has 10 minutes from the time a moderator enters the
                      conversation to resolve the situation. The match must be
                      restarted when the player resolves the issue by switching
                      accounts or platforms.
                    </li>
                    <li style={styles.otherText}>
                      Queuing into a match against an account you own or have
                      logged in to results in a permanent ban. We reserve the
                      right to ban both accounts involved in these acts and will
                      cancel all withdrawals from both users.
                    </li>
                    <li style={styles.otherText}>
                      Transferring tokens without playing them from one account
                      to aNother will result in a permanent ban. We reserve the
                      right to ban both accounts involved in these acts and will
                      cancel all withdrawals from both users.
                    </li>
                    <li style={styles.otherText}>
                      Moderators who come into your token chat or message you
                      via discord have the right to force a screen-share on any
                      player in the lobby.
                    </li>
                    <li style={styles.otherText}>
                      When a player is being forced to screen-share, they have 5
                      minutes to join the “Waiting For Support” call and comply
                      with the screen-share.
                    </li>
                    <li style={styles.otherText}>
                      Before a screen-share you CANNOT delete anything from your
                      PC or you will be permanently banned.
                    </li>
                    <li style={styles.otherText}>
                      If a player admits to cheating they will be temporarily
                      banned for 15 days, and forced to screen-share to be
                      unbanned after the time runs out.
                    </li>
                    <li style={styles.otherText}>
                      If a player is found with cheats during the screen-share
                      they will be permanently banned.
                    </li>
                    <li style={styles.otherText}>
                      If a player fails to comply with the screen-share they
                      will be banned for 30 days.
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NewRules;
