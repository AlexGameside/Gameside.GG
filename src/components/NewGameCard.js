import { Typography, Button } from "@mui/material";
import constants from "../utils/constants";
import valorantLogo from "../assets/valorant-logo.PNG";
import fortniteLogo from "../assets/fortnite-logo.PNG";
import fifaLogo from "../assets/fifa-logo.PNG";
import twoklogo from "../assets/2k-logo.PNG";
import clashLogo from "../assets/clash-logo.png";
import fiveMLogo from "../assets/fivem-logo.png";
import createTheme from "../utils/theme";
import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";

const NewGameCard = (props) => {
  const { size, game, tournament } = props;
  const gameEnum = {
    VALORANT: valorantLogo,
    FORTNITE: fortniteLogo,
    FIFA: fifaLogo,
    FIVEM: fiveMLogo,
    "2K": twoklogo,
    CLASH: clashLogo,
  };
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const getLogoSrc = () => {
    switch (game) {
      case "VALORANT":
        return gameEnum.VALORANT;
      case "FORTNITE":
        return gameEnum.FORTNITE;
      case "FIFA":
        return gameEnum.FIFA;
      case "2K":
        return gameEnum["2K"];
      case "CLASH":
        return gameEnum.CLASH;
      case "FIVEM":
        return gameEnum.FIVEM;
    }
  };

  const getButtonColor = () => {
    switch (game) {
      case "VALORANT":
        return "#06d6a0";
      case "FORTNITE":
        return "#00bbf9";
      case "FIFA":
        return "#ef476f";
      case "2K":
        return "#9665E6";
      case "CLASH":
        return "#ef476f";
    }
  };

  const getBorderColor = () => {
    switch (game) {
      case "VALORANT":
        return "#05faba";
      case "FORTNITE":
        return "#66d9ff";
      case "FIFA":
        return "#ef476f";
      case "2K":
        return "#9665E6";
      case "CLASH":
        return "#ff7899";
      case "FIVEM":
        return "#ffa061";
    }
  };

  const getGameBackgroundColor = () => {
    switch (game) {
      case "VALORANT":
        return "#87ffe0";
      case "FORTNITE":
        return "#a1e8ff";
      case "FIFA":
        return "#ef476f";
      case "2K":
        return "#9665E6";
      case "CLASH":
        return "#ff91ad";
      case "FIVEM":
        return "#fcaf7c";
    }
  };

  const styles = {
    cardContainer: {
      minHeight: size === "small" ? 294 : 359,
      minWidth: size === "small" ? 214 : 328,
      backgroundColor: getGameBackgroundColor(),
      borderRadius: 16,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: size === "large" ? "0 0 " : theme.shadow(),
    },
    card: {
      backgroundImage: `url(${getLogoSrc()})`,
      height: size === "small" ? 285 : 450,
      width: size === "small" ? 205 : 319,
      borderRadius: 16,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      display: "inline-grid",
      overflow: "hidden",
      alignItems: "end",
      border: `6px solid ${getBorderColor()}`,
    },
    headerContainer: {
      backdropFilter: "blur(47.2917px)",
      height: size === "small" ? 50 : 127,
      width: size === "small" ? 205 : 569,
      textAlign: "center",
      display: "flex",
      justifyContent: size === "small" ? "center" : "space-between",
      alignItems: "center",
      paddingLeft: size === "small" ? 0 : 44,
      paddingRight: size === "small" ? 0 : 44,
      boxShadow: "1px 1px 3px 1px rgb(79 82 102 / 20%)",
    },
    header: {
      color: constants.white,
      fontSize: size === "small" ? 22 : 28,
      fontWeight: 900,
    },
    playButton: {
      background:
        // "linear-gradient(82.9deg, #AAF1AA -28.45%, #A7A5F3 117.38%, rgba(210, 251, 206, 0.2) 162.04%, rgba(210, 251, 206, 0.2) 162.04%)",
        getButtonColor(),
      color: constants.white,
      boxShadow: "0 0",
      fontSize: 18,
      fontWeight: 900,
      borderRadius: 3,
      "&:hover": {
        opacity: 0.6,
        boxShadow: "0 0",
        backgroundColor: getButtonColor(),
      },
      transition: "0.3s",
      textTransform: "none",
    },
    tournamentButton: {
      color:
        // "linear-gradient(82.9deg, #AAF1AA -28.45%, #A7A5F3 117.38%, rgba(210, 251, 206, 0.2) 162.04%, rgba(210, 251, 206, 0.2) 162.04%)",
        constants.white,
      boxShadow: "0 0",
      fontSize: 20,
      fontWeight: 900,
      borderRadius: 3,
      "&:hover": {
        opacity: 0.6,
      },
      transition: "0.3s",
      textTransform: "none",
    },
  };

  const getGameTitle = () => {
    switch (game) {
      case "VALORANT":
        return "Valorant";
      case "FORTNITE":
        return "Fortnite";
      case "FIFA":
        return "FIFA 22";
      case "2K":
        return "NBA 2K22";
      case "CLASH":
        return "Clash Royale";
      case "FIVEM":
        return "FiveM";
    }
  };

  return (
    <div style={styles.cardContainer}>
      <div style={styles.card}>
        <div style={styles.headerContainer}>
          {!tournament ? (
            <Typography style={styles.header}>{getGameTitle()}</Typography>
          ) : null}
          {size === "small" ? null : (
            <Button variant="contained" size="large" sx={styles.playButton}>
              Play Now
            </Button>
          )}
          {tournament === true ? (
            <Button
              sx={styles.tournamentButton}
            >{`Play ${getGameTitle()}`}</Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NewGameCard;
