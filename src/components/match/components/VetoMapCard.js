import { useContext, useState } from "react";
import { StoreContext } from "../../../context/NewStoreContext";
import createTheme from "../../../utils/theme";
import ascent from "../../../assets/ASCENT.png";
import bind from "../../../assets/BIND.PNG";
import fracture from "../../../assets/fracture.png";
import icebox from "../../../assets/ICEBOX.png";
import haven from "../../../assets/HAVEN.png";
import pearl from "../../../assets/PEARL.jpeg";
import breeze from "../../../assets/BREEZE.png";
import { BiCheck, BiX } from "react-icons/bi";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { FaShieldAlt } from "react-icons/fa";
import { RiSwordFill } from "react-icons/ri";
import { isRedTeam, isBlueTeam } from "../utils/matchHelpers";

const VetoMapCard = (props) => {
  // variables
  const {
    map,
    onClick,
    state,
    picking,
    isBanned,
    isPicked,
    needsSide,
    hasSide,
    match,
    loading,
    mapLoading,
  } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  // state
  const [hovered, setHovered] = useState(false);
  const [side, setSide] = useState(null);
  const [defenseHovered, setDefenseHovered] = useState(false);
  const [attackHovered, setAttackHovered] = useState(false);

  // methods
  const getImageForMap = (mapName) => {
    switch (mapName) {
      case "ascent":
        return ascent;
      case "bind":
        return bind;
      case "fracture":
        return fracture;
      case "icebox":
        return icebox;
      case "haven":
        return haven;
      case "pearl":
        return pearl;
      case "breeze":
        return breeze;
    }
  };

  // get state hover
  const getStateHover = (vetoState) => {
    if (loading) {
      return null;
    }

    switch (vetoState) {
      case 1:
        return store?.user?.username === picking ? (
          <BiX
            style={{
              fontSize: 150,
              color: theme.red(),
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              top: 100,
              bottom: 0,
            }}
          />
        ) : null;
      case 2:
        return store?.user?.username === picking && !isBanned ? (
          <BiX
            style={{
              fontSize: 150,
              color: theme.red(),
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              top: 100,
              bottom: 0,
            }}
          />
        ) : null;
      case 3:
        return store?.user?.username === picking && !isBanned && !isPicked ? (
          <BiCheck
            style={{
              fontSize: 150,
              color: theme.green(),
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              top: 100,
              bottom: 0,
            }}
          />
        ) : null;
      case 4:
        return null;
      case 5:
        return store?.user?.username === picking && !isBanned && !isPicked ? (
          <BiCheck
            style={{
              fontSize: 150,
              color: theme.green(),
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              top: 100,
              bottom: 0,
            }}
          />
        ) : null;
      case 6:
        return null;
      case 7:
        return store?.user?.username === picking && !isBanned && !isPicked ? (
          <BiX
            style={{
              fontSize: 150,
              color: theme.red(),
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              top: 100,
              bottom: 0,
            }}
          />
        ) : null;

      case 8:
        return store?.user?.username === picking && !isBanned && !isPicked ? (
          <BiX
            style={{
              fontSize: 150,
              color: theme.red(),
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              top: 100,
              bottom: 0,
            }}
          />
        ) : null;
      case 9:
        return null;
    }
  };

  const getHoverOpacity = () => {
    if (loading) {
      return 0.6;
    }

    if (picking === store?.user?.username) {
      // banning
      switch (state) {
        case 1:
        case 2:
        case 7:
        case 8:
          if (!isPicked && !isBanned) {
            return 1;
          }
          return 0.6;
        case 3:
        case 5:
          if (!isPicked && !isBanned) {
            return 1;
          }
          return 0.6;
        case 4:
        case 6:
          if (isPicked && needsSide) {
            return 1;
          } else {
            return 0.6;
          }
        case 9:
          if (!isPicked && !isBanned) {
            return 1;
          } else {
            return 0.6;
          }
        case 10:
          return 0.6;
      }
    }
  };

  const getRegularOpacity = () => {
    if (loading) {
      return 0.6;
    }

    // if its a picking side round only highlight the map
    // that needs a side
    if (state === 10) {
      if (match?.mapsPlayed?.includes(map)) {
        return 1;
      } else {
        return 0.2;
      }
    }

    if (state === 4 || state === 6) {
      if (
        isPicked &&
        needsSide &&
        !isBanned &&
        store?.user?.username === picking
      ) {
        return 1;
      } else {
        return 0.6;
      }
    }

    if (state === 9) {
      if (!isPicked && !isBanned && store?.user?.username === picking) {
        return 1;
      } else {
        return 0.6;
      }
    }

    if (!isPicked && !isBanned && store?.user?.username === picking) {
      return 1;
    }
    return 0.6;
  };

  const getCursor = () => {
    if (loading) {
      return "not-allowed";
    }

    if (store?.user?.username !== picking && state !== 10) {
      return "not-allowed";
    }

    if (state === 4 || state === 6) {
      if (
        isPicked &&
        needsSide &&
        !isBanned &&
        store?.user?.username === picking
      ) {
        return "default";
      } else {
        return "not-allowed";
      }
    }

    if (state === 9) {
      if (!isPicked && !isBanned && store?.user?.username === picking) {
        return "default";
      } else {
        return "not-allowed";
      }
    }

    if (
      state === 1 ||
      state === 2 ||
      state === 7 ||
      state === 8 ||
      state === 3 ||
      state === 5
    ) {
      if (store?.user?.username === picking && !isBanned && !isPicked) {
        return "pointer";
      } else {
        return "not-allowed";
      }
    }

    if (state === 10) {
      return "default";
    }
  };

  const getBorder = () => {};

  const getShieldOrSword = () => {
    if (isPicked && hasSide) {
      const sideObj = match?.sidesPerMap?.filter((obj) => obj?.map === map)[0];
      let redSide;
      let blueSide;

      if (sideObj?.team === "red") {
        redSide = sideObj?.choice;
        blueSide = sideObj?.choice === 1 ? 2 : 1;
      } else {
        blueSide = sideObj?.choice;
        redSide = sideObj?.choice === 1 ? 2 : 1;
      }

      if (isRedTeam(store?.user?.username, match)) {
        if (redSide === 1) {
          // return attack
          return (
            <>
              <RiSwordFill
                style={{
                  fontSize: 100,
                  color: theme.green(),
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  right: 0,
                  left: 0,
                  top: 125,
                  opacity: state === 10 ? 0.8 : 1,
                }}
              />
            </>
          );
        } else {
          // return defense
          return (
            <>
              <FaShieldAlt
                style={{
                  fontSize: 100,
                  color: theme.red(),
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  top: 125,
                  opacity: state === 10 ? 0.8 : 1,
                }}
              />
            </>
          );
        }
      } else if (isBlueTeam(store?.user?.username, match)) {
        if (blueSide === 1) {
          // return attack
          return (
            <>
              <RiSwordFill
                style={{
                  fontSize: 100,
                  color: theme.green(),
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  right: 0,
                  left: 0,
                  top: 125,
                  opacity: state === 10 ? 0.8 : 1,
                }}
              />
            </>
          );
        } else {
          // return defense
          return (
            <>
              <FaShieldAlt
                style={{
                  fontSize: 100,
                  color: theme.red(),
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  top: 125,
                  opacity: state === 10 ? 0.8 : 1,
                }}
              />
            </>
          );
        }
      }
    }
  };

  // effects

  // styles
  const styles = {};

  return (
    <Grid
      item
      sx={{
        boxSizing: "border-box",
        height: 350,
        width: 175,
        borderRadius: 2,
        border: `1px solid #000`,
        backgroundImage: `url(${getImageForMap(map)})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        boxShadow: theme.shadow(),
        position: "relative",
        opacity: getRegularOpacity(),
        border: getBorder(state),
        "&:hover": {
          cursor: getCursor(),
          opacity: getHoverOpacity(),
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        if ((isPicked && hasSide) || isBanned || loading) {
          return;
        }
        onClick(map, side);
      }}
    >
      {hovered ? getStateHover(state) : null}

      {mapLoading ? (
        <CircularProgress
          size={50}
          sx={{
            color: theme.text(),
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            top: 150,
            bottom: 0,
          }}
        />
      ) : null}

      {isBanned ? (
        <BiX
          style={{
            fontSize: 150,
            color: theme.red(),
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            top: 100,
            bottom: 0,
          }}
        />
      ) : null}

      {isPicked && needsSide && picking !== store?.user?.username ? (
        <BiCheck
          style={{
            fontSize: 150,
            color: theme.green(),
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            top: 100,
            bottom: 0,
          }}
        />
      ) : null}

      {(state === 9 &&
        !isPicked &&
        !isBanned &&
        store?.user?.username === picking) ||
      (isPicked && needsSide && picking === store?.user?.username) ? (
        <>
          <FaShieldAlt
            style={{
              fontSize: 100,
              color: theme.red(),
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              bottom: 10,
              cursor: defenseHovered && !loading ? "pointer" : "default",
              filter:
                defenseHovered && !loading
                  ? "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))"
                  : null,
            }}
            onMouseEnter={() => setDefenseHovered(true)}
            onMouseLeave={() => setDefenseHovered(false)}
            onClick={(e) => {
              if (loading) {
                return;
              }

              if ((isPicked && hasSide) || isBanned) {
                e.stopPropagation();
                return;
              }
              e.stopPropagation();
              onClick(map, 2);
            }}
          />

          <RiSwordFill
            style={{
              fontSize: 100,
              color: theme.green(),
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              right: 0,
              left: 0,
              top: 0,
              cursor: attackHovered && !loading ? "pointer" : "default",
              filter:
                attackHovered && !loading
                  ? "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))"
                  : null,
            }}
            onMouseEnter={() => setAttackHovered(true)}
            onMouseLeave={() => setAttackHovered(false)}
            onClick={(e) => {
              if (loading) {
                return;
              }

              if ((isPicked && hasSide) || isBanned) {
                e.stopPropagation();
                return;
              }
              e.stopPropagation();
              onClick(map, 1);
            }}
          />
        </>
      ) : null}

      {getShieldOrSword()}

      {state === 10 && match?.mapsPlayed?.includes(map) ? (
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 700,
            color: theme.text(),
            position: "absolute",
            top: 0,
            left: 5,
            textShadow: `1px 2px 3px ${theme.background()}`,
          }}
        >
          Map #{match?.mapsPlayed?.indexOf(map) + 1}
        </Typography>
      ) : null}

      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <Grid item>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              color: theme.text(),
              textShadow: `1px 2px 3px ${theme.background()}`,
            }}
          >
            {map.toUpperCase()}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VetoMapCard;
