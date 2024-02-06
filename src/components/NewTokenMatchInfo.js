import { IoGameController, IoPodium } from "react-icons/io5";
import useDraggableScroll from "use-draggable-scroll";
import {
  FaWallet,
  FaGlobeAmericas,
  FaPiggyBank,
  FaDiscord,
  FaUsers,
} from "react-icons/fa";
import { MdOutlineGames } from "react-icons/md";
import { Grid, Typography } from "@mui/material";
import { useContext, useRef } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import {
  getColorForGame,
  getGame,
  getTokenMatchType,
} from "../utils/helperMethods";
import { RiTreasureMapLine } from "react-icons/ri";

const NewTokenMatchInfo = (props) => {
  // variables
  const { token } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, {
    direction: "horizontal",
  });
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // styles
  const styles = {
    header: {
      fontWeight: 600,
      fontSize: 20,
      color: theme.text(),
    },
    value: {
      fontWeight: 600,
      fontSize: 15,
      color: theme.text(),
    },
    label: {
      fontWeight: 400,
      fontSize: 15,
      color: theme.metaText(),
    },
  };

  return (
    <Grid item wrap="nowrap">
      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="center"
        sx={{ width: "100%" }}
        wrap="nowrap"
      >
        {/* <Grid item>
          <Typography sx={styles.header}>
            {token?.isScrimMatch ? "Scrim" : "Match"} Info
          </Typography>
        </Grid> */}

        <Grid
          item
          sx={{ width: "100%" }}
          wrap="nowrap"
          ref={ref}
          onMouseDown={onMouseDown}
          overflow="auto"
        >
          <Grid
            container
            direction="row"
            justifyContent="start"
            alignItems="center"
            sx={{ width: "100%" }}
            wrap="nowrap"
            gap={{ xs: 1 }}
          >
            <Grid
              item
              sx={{
                border: `1px solid ${theme.border()}`,
                borderRadius: 2,
                paddingTop: 2,
                paddingBottom: 2,
                backgroundColor: theme.cardDark(),
                minWidth: 125,
                boxSizing: "border-box",
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <IoGameController
                    style={{ fontSize: 25, color: theme.metaText() }}
                  />
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Typography sx={styles.label}>Game</Typography>
                    </Grid>

                    <Grid item>
                      <Typography sx={styles.value}>
                        <span
                          style={{
                            color: getColorForGame(token?.game),
                          }}
                        >
                          {getGame(token?.game)}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              sx={{
                border: `1px solid ${theme.border()}`,
                borderRadius: 2,
                paddingTop: 2,
                paddingBottom: 2,
                backgroundColor: theme.cardDark(),
                minWidth: 125,
                boxSizing: "border-box",
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minWidth: "100%" }}
              >
                <Grid item>
                  <FaDiscord
                    style={{ fontSize: 25, color: theme.metaText() }}
                  />
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Typography sx={styles.label}>Discord</Typography>
                    </Grid>

                    <Grid
                      item
                      sx={{
                        textAlign: "center",
                        transition: "all .2s ease-in-out",
                        "&:hover": {
                          cursor: "pointer",
                          transform: "scale(1.1)",
                        },
                      }}
                      onClick={() => {
                        if (token?.game === "FIVEM") {
                          window.open("https://discord.gg/tmftokens", "_blank");
                          return;
                        } else {
                          window.open("https://discord.gg/QHMPUC3xk9", "_blank");
                          return;
                        }
                      }}
                    >
                      <Typography sx={styles.value}>Join here</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {token?.isTourneyMatch || token?.isScrimMatch ? null : (
              <Grid
                item
                sx={{
                  border: `1px solid ${theme.border()}`,
                  borderRadius: 2,
                  paddingTop: 2,
                  paddingBottom: 2,
                  backgroundColor: theme.cardDark(),
                  minWidth: 125,
                  boxSizing: "border-box",
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ minWidth: "100%" }}
                >
                  <Grid item>
                    <FaWallet
                      style={{ fontSize: 25, color: theme.metaText() }}
                    />
                  </Grid>

                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Typography sx={styles.label}>Entry Fee</Typography>
                      </Grid>

                      <Grid item>
                        <Typography sx={styles.value}>
                          <span style={{ color: theme.orange() }}>
                            {numFormatter.format(token?.entry_fee)}
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}

            {token?.isTourneyMatch || token?.isScrimMatch ? null : (
              <Grid
                item
                sx={{
                  border: `1px solid ${theme.border()}`,
                  borderRadius: 2,
                  paddingTop: 2,
                  paddingBottom: 2,
                  backgroundColor: theme.cardDark(),
                  minWidth: 125,
                  boxSizing: "border-box",
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ minWidth: "100%" }}
                >
                  <Grid item>
                    <FaPiggyBank
                      style={{ fontSize: 25, color: theme.metaText() }}
                    />
                  </Grid>

                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Typography sx={styles.label}>Prize</Typography>
                      </Grid>

                      <Grid item>
                        <Typography sx={styles.value}>
                          <span style={{ color: theme.green() }}>
                            {numFormatter.format(token?.prize)}/player
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}

            <Grid
              item
              sx={{
                border: `1px solid ${theme.border()}`,
                borderRadius: 2,
                paddingTop: 2,
                paddingBottom: 2,
                backgroundColor: theme.cardDark(),
                minWidth: 125,
                boxSizing: "border-box",
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minWidth: "100%" }}
              >
                <Grid item>
                  <FaGlobeAmericas
                    style={{ fontSize: 25, color: theme.metaText() }}
                  />
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Typography sx={styles.label}>Region</Typography>
                    </Grid>

                    <Grid item>
                      <Typography sx={styles.value}>
                        {token?.game === "CLASH" || token?.game === "FIVEM"
                          ? "All"
                          : token?.region}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {token?.isScrimMatch ? (
              <Grid
                item
                sx={{
                  border: `1px solid ${theme.border()}`,
                  borderRadius: 2,
                  paddingTop: 2,
                  paddingBottom: 2,
                  backgroundColor: theme.cardDark(),
                  minWidth: 125,
                  boxSizing: "border-box",
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ minWidth: "100%" }}
                >
                  <Grid item>
                    <RiTreasureMapLine
                      style={{ fontSize: 25, color: theme.metaText() }}
                    />
                  </Grid>

                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Typography sx={styles.label}>Map</Typography>
                      </Grid>

                      <Grid item>
                        <Typography sx={styles.value}>
                          {getTokenMatchType(token?.match_type)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}

            {token?.game === "VAL" ? (
              <Grid
                item
                sx={{
                  border: `1px solid ${theme.border()}`,
                  borderRadius: 2,
                  paddingTop: 2,
                  paddingBottom: 2,
                  backgroundColor: theme.cardDark(),
                  minWidth: 125,
                  boxSizing: "border-box",
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ minWidth: "100%" }}
                >
                  <Grid item>
                    <FaUsers
                      style={{ fontSize: 25, color: theme.metaText() }}
                    />
                  </Grid>

                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Typography sx={styles.label}>Team Size</Typography>
                      </Grid>

                      <Grid item>
                        <Typography sx={styles.value}>
                          {token?.team_size}v{token?.team_size}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}

            {token?.isScrimMatch ? null : (
              <Grid
                item
                sx={{
                  border: `1px solid ${theme.border()}`,
                  borderRadius: 2,
                  paddingTop: 2,
                  paddingBottom: 2,
                  backgroundColor: theme.cardDark(),
                  minWidth: 125,
                  boxSizing: "border-box",
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ minWidth: "100%" }}
                >
                  <Grid item>
                    <IoPodium
                      style={{ fontSize: 25, color: theme.metaText() }}
                    />
                  </Grid>

                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Typography sx={styles.label}>First to</Typography>
                      </Grid>

                      <Grid item>
                        <Typography sx={styles.value}>
                          {token?.first_to}
                          {token?.game === "FN" || token?.game === "FIVEM" ? (
                            <sup> +2</sup>
                          ) : null}
                          {token?.game === "FIVEM" ? " | 2 series" : null}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}

            {token?.isTourneyMatch ? (
              <Grid
                item
                sx={{
                  border: `1px solid ${theme.border()}`,
                  borderRadius: 2,
                  paddingTop: 2,
                  paddingBottom: 2,
                  backgroundColor: theme.cardDark(),
                  minWidth: 125,
                  boxSizing: "border-box",
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ minWidth: "100%" }}
                >
                  <Grid item>
                    <MdOutlineGames
                      style={{ fontSize: 25, color: theme.metaText() }}
                    />
                  </Grid>

                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Typography sx={styles.label}>Game Type</Typography>
                      </Grid>

                      <Grid item>
                        <Typography sx={styles.value}>
                          {token?.match_type}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}

            {token?.game === "FN" && token?.console_only ? (
              <Grid
                item
                sx={{
                  border: `1px solid ${theme.border()}`,
                  borderRadius: 2,
                  paddingTop: 2,
                  paddingBottom: 2,
                  backgroundColor: theme.cardDark(),
                  minWidth: 125,
                  boxSizing: "border-box",
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ minWidth: "100%" }}
                >
                  <Grid item>
                    <FaGlobeAmericas
                      style={{ fontSize: 25, color: theme.metaText() }}
                    />
                  </Grid>

                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Typography sx={styles.label}>Console Only</Typography>
                      </Grid>

                      <Grid item>
                        <Typography sx={styles.value}>
                          <span style={{ color: theme.red() }}>True</span>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewTokenMatchInfo;
