import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { Grid, Typography, useMediaQuery, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  getColorForGame,
  getTournamentDate,
  getGame,
  getTournamentCountdownDate,
  determinePlaceEnd,
  getCurrentTokenRegion,
} from "../utils/helperMethods";
import Countdown from "react-countdown";
import { BsThreeDots } from "react-icons/bs";
import NewTournamentMenu from "./NewTournamentMenu";
import { useLocation } from 'react-router-dom';
import constants from "../utils/constants";
import defaultThumbnail from "../assets/default-tournament.png";
import { useNavigate } from "react-router-dom";

const NewTournamentItem = (props) => {
  // variables
  const { tournament } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const location = useLocation();
  const isSpectre = location.pathname.startsWith("/spectre") || location.pathname === 'spectre'; 
  const isValorant = location.pathname.startsWith("/valorant");
  const isMobile = useMediaQuery("(max-width:500px)");
  const Img = styled("img")``;
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // state
  const [hoverColor, setHoverColor] = useState(theme.metaText());
  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuOpen = Boolean(menuAnchor);

  // methods
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return null;
    } else {
      // Render a countdown
      return (
        <span style={{ color: theme.text() }}>
          {getTournamentCountdownDate(days, hours, minutes, seconds)}
        </span>
      );
    }
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

  // styles
  const styles = {
    label: {
      fontSize: 14,
      fontWeight: 400,
      color: theme.metaText(),
    },
    value: {
      fontSize: 16,
      fontWeight: 600,
      color: theme.text(),
    },
    starts: {
      fontSize: 14,
      fontWeight: 300,
      color: theme.subText(),
    },
    timeLabel: {
      fontSize: 14,
      fontWeight: 700,
      color: theme.metaText(),
    },
    hosted: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.blue(),
    },
  };

  return (
    <Grid
      item
      sx={{
        width: "100%",
        borderRadius: 2,
        paddingLeft: 1,
        paddingRight: 1,
        paddingTop: 1,
        paddingBottom: 0.5,
        "&:hover": {
          backgroundColor: theme.card(),
          cursor: "pointer",
        },
      }}
      onClick={() => {
        if (isMenuOpen) {
          return;
        }
        navigate(`/${isSpectre ? 'spectre/' : isValorant ? 'valorant/' : null}tournament/${tournament?._id}`);
      }}
    >
      <NewTournamentMenu
        anchor={menuAnchor}
        handleClose={handleMenuClose}
        tournamentId={tournament?._id}
      />
      <Grid
        container
        direction="row"
        justifyContent={"start"}
        alignItems="center"
        sx={{ width: "100%", position: "relative" }}
        columnSpacing={{ xs: 2 }}
        rowSpacing={{ xs: 1 }}
        wrap={isMobile ? "wrap" : "nowrap"}
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

        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="start"
            gap={{ xs: 0.1 }}
          >
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography sx={styles.value}>{tournament?.title}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Typography sx={styles.timeLabel}>
                {getTournamentDate(tournament?.start_date)}
              </Typography>
            </Grid>

            <Grid item>
              <Typography sx={styles.hosted}></Typography>
            </Grid>

            <Grid item>
              <Typography sx={styles.label}>
                Hosted by{" "}
                <span style={{ color: theme.metaText(), fontWeight: 700 }}>
                  {tournament?.hosted_by?.username}{" "}
                </span>
                <span style={{ fontWeight: 600, color: theme.text() }}>•</span>{" "}
                {getCurrentTokenRegion(tournament?.region)}{" "}
                {tournament?.region == null ? null : (
                  <span style={{ fontWeight: 600, color: theme.text() }}>
                    •
                  </span>
                )}{" "}
                {tournament?.team_size}v{tournament?.team_size}{" "}
                <span style={{ fontWeight: 600, color: theme.text() }}>•</span>{" "}
                {tournament?.teamIds?.length}/{tournament?.num_teams} teams{" "}
                <span style={{ fontWeight: 600, color: theme.text() }}>•</span>{" "}
                <span style={{ color: theme.metaText() }}>
                  <b>
                    {tournament?.entry_fee === 0 ||
                    tournament?.entry_fee == null
                      ? "Free"
                      : numFormatter.format(tournament?.entry_fee)}
                  </b>
                </span>{" "}
                entry{" "}
                <span style={{ fontWeight: 600, color: theme.text() }}>•</span>{" "}
                <span style={{ color: theme.green() }}>
                  <b>{numFormatter.format(tournament?.prize)}</b>
                </span>{" "}
              </Typography>
            </Grid>

            {tournament?.state === 0 ? (
              <Grid item>
                <Typography sx={styles.starts}>
                  Starts in{" "}
                  <b>
                    <Countdown
                      date={new Date(tournament?.start_date)}
                      style={{ color: theme.text() }}
                      renderer={renderer}
                    />
                  </b>
                </Typography>
              </Grid>
            ) : null}

            {tournament?.state === 1 ? (
              <Grid item>
                <Typography sx={styles.starts}>Ongoing</Typography>
              </Grid>
            ) : null}

            {tournament?.state === 2 ? (
              <Grid item>
                <Typography sx={styles.starts}>Completed</Typography>
              </Grid>
            ) : null}

            {tournament?.state === -1 ? (
              <Grid item>
                <Typography sx={styles.starts}>Canceled</Typography>
              </Grid>
            ) : null}
          </Grid>
        </Grid>

        <Grid
          item
          onMouseEnter={() => setHoverColor(theme.text())}
          onMouseLeave={() => setHoverColor(theme.metaText())}
          sx={{
            transition: "all .2s ease-in-out",
            position: "absolute",
            right: 0,
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={handleMenuClick}
          aria-expanded={isMenuOpen ? true : null}
        >
          <BsThreeDots
            style={{
              color: hoverColor,
              fontSize: 25,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewTournamentItem;
