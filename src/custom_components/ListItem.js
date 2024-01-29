import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { HiHome } from "react-icons/hi";
import { FaTrophy } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { FaSkullCrossbones, FaPiggyBank } from "react-icons/fa";

const ListItem = (props) => {
  // variables
  const { selected = false, text, type, onClick } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  // methods
  const getIconForType = (listType) => {
    switch (listType) {
      case "home":
        return selected ? (
          <HiHome
            style={{
              color: theme.text(),
              fontSize: 20,
            }}
          />
        ) : (
          <HiHome
            style={{
              color: theme.subText(),
              fontSize: 20,
              marginTop: 1,
            }}
          />
        );
      case "leaderboard":
        return selected ? (
          <MdLeaderboard
            style={{
              color: theme.text(),
              fontSize: 20,
            }}
          />
        ) : (
          <MdLeaderboard
            style={{
              color: theme.subText(),
              fontSize: 20,
            }}
          />
        );
      case "scrims":
        return selected ? (
          <FaSkullCrossbones
            style={{
              color: theme.text(),
              fontSize: 20,
            }}
          />
        ) : (
          <FaSkullCrossbones
            style={{
              color: theme.subText(),
              fontSize: 20,
            }}
          />
        );
      case "tournaments":
        return selected ? (
          <FaTrophy
            style={{
              color: theme.text(),
              fontSize: 20,
            }}
          />
        ) : (
          <FaTrophy
            style={{
              color: theme.subText(),
              fontSize: 20,
            }}
          />
        );
      case "cash":
        return selected ? (
          <FaPiggyBank
            style={{
              color: theme.text(),
              fontSize: 20,
            }}
          />
        ) : (
          <FaPiggyBank
            style={{
              color: theme.subText(),
              fontSize: 20,
            }}
          />
        );
    }
  };

  // styles
  const styles = {
    selected: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.text(),
    },
    unselected: {
      fontWeight: 400,
      fontSize: 14,
      color: theme.subText(),
    },
  };

  return (
    <Grid
      item
      sx={{
        width: "100%",
        borderRadius: 2,
        backgroundColor: selected ? theme.background() : theme.cardDark(),
        transition: "all .2s ease-in-out",
        padding: 1.2,
        "&:hover": {
          cursor: "pointer",
          backgroundColor: selected ? theme.card() : theme.card(),
        },
      }}
      onClick={onClick}
    >
      <Grid
        container
        justifyContent="start"
        alignItems="center"
        gap={{ xs: 1.5 }}
      >
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            {getIconForType(type)}
          </Grid>
        </Grid>

        <Grid item>
          <Typography sx={selected ? styles.selected : styles.unselected}>
            {text}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ListItem;
