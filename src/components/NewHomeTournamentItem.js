import { Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import {
  getCurrentTokenRegion,
  getTournamentDate,
} from "../utils/helperMethods";
import defaultThumbnail from "../assets/default-tournament.png";

const NewHomeTournamentItem = (props) => {
  // variables
  const { tournament, onClick = () => {} } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // state
  const [hovered, setHovered] = useState(false);

  // methods

  // effects

  // styles
  const styles = {};

  return (
    <Grid
      item
      sx={{
        borderRadius: 2,
        padding: 1,
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="center"
      >
        <Grid
          item
          sx={{
            transition: "all .2s ease-in-out",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={onClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {tournament?.thumbnail == null ? (
            <Grid item>
              <img
                src={defaultThumbnail}
                alt="thumbnail"
                style={{
                  borderRadius: 8,
                }}
              />
            </Grid>
          ) : (
            <Grid item>
              <img
                src={tournament?.thumbnail}
                alt="thumbnail"
                style={{
                  borderRadius: 8,
                  border: `1px solid ${theme.border()}`,
                  height: 190,
                  width: 336,
                }}
              />
            </Grid>
          )}
        </Grid>

        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
          >
            <Grid item>
              <Typography
                sx={{ fontSize: 14, fontWeight: 400, color: theme.metaText() }}
              >
                {getTournamentDate(tournament?.start_date)}
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                sx={{ fontSize: 16, fontWeight: 700, color: theme.text() }}
              >
                {tournament?.title}
              </Typography>
            </Grid>

            <Grid item>
              <Typography>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: theme.metaText(),
                  }}
                >
                  {getCurrentTokenRegion(tournament?.region)}
                </span>{" "}
                <span style={{ color: theme.text() }}>·</span>{" "}
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: theme.metaText(),
                  }}
                >
                  {tournament?.num_teams} teams
                </span>{" "}
                <span style={{ color: theme.text() }}>·</span>{" "}
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: theme.green(),
                  }}
                >
                  {numFormatter.format(tournament?.prize)}
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewHomeTournamentItem;
