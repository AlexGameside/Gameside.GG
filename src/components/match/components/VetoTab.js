import { useContext, useRef, useState, useEffect } from "react";
import { StoreContext } from "../../../context/NewStoreContext";
import { Grid, CircularProgress, Typography } from "@mui/material";
import useDraggableScroll from "use-draggable-scroll";
import createTheme from "../../../utils/theme";
import useAxios from "../../../utils/useAxios";
import { banMap, pickMap, pickSide } from "../../../utils/API";
import VetoMapCard from "./VetoMapCard";
import { getVetoTitle } from "../utils/matchHelpers";

const Veto = (props) => {
  // variables
  const { match } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, {
    direction: "horizontal",
  });
  const api = useAxios();

  // state
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState(false);
  const [mapLoading, setMapLoading] = useState(null);
  const [banLoading, setBanLoading] = useState(false);
  const [pickMapLoading, setPickMapLoading] = useState(false);
  const [pickSideLoading, setPickSideLoading] = useState(false);
  const [vetoState, setVetoState] = useState(0);
  const [currentlyPicking, setCurrentlyPicking] = useState(null);

  // methods
  const voteToBan = (mapToBan, wagerid) => {
    setBanLoading(true);
    setMapLoading(mapToBan);
    setError(null);
    banMap(api, mapToBan, wagerid).then((res) => {
      if (res?.error) {
        setError(res?.message);
      }
      setBanLoading(false);
      setMapLoading(null);
    });
  };

  const voteToPickMap = (mapToPlay, wagerid) => {
    setPickMapLoading(true);
    setMapLoading(mapToPlay);
    setError(null);
    pickMap(api, mapToPlay, wagerid).then((res) => {
      if (res?.error) {
        setError(res?.message);
      }
      setPickMapLoading(false);
      setMapLoading(null);
    });
  };

  const voteToPickSide = (mapToPlay, wagerid, attOrDef) => {
    setPickSideLoading(true);
    setMapLoading(mapToPlay);
    pickSide(api, mapToPlay, wagerid, attOrDef).then((res) => {
      if (res?.error) {
        setError(res?.message);
      }
      setPickSideLoading(false);
      setMapLoading(null);
    });
  };

  const handleMapClick = (map, side) => {
    if (store?.user?.username !== currentlyPicking) {
      return;
    }

    if (vetoState === 10) {
      return;
    }

    switch (vetoState) {
      case 1:
      case 2:
      case 7:
      case 8:
        voteToBan(map, match?.wagerid);
        return;
      case 3:
      case 5:
        voteToPickMap(map, match?.wagerid);
        return;
      case 4:
      case 6:
      case 9:
        voteToPickSide(map, match?.wagerid, side);
        return;
      case 10:
        return;
    }
  };

  // effects
  useEffect(() => {
    const mapsAvailable = match?.mapsAvailable?.length;
    const mapsPlayed = match?.mapsPlayed?.length;
    const sidesPicked = match?.sidesPerMap?.length;
    // set the veto state
    if (mapsAvailable === 7 && match?.state === 2) {
      // host bans
      setVetoState(1);
      setCurrent(1);
    }
    if (mapsAvailable === 6) {
      // non host bans
      setVetoState(2);
      setCurrent(1);
    }
    if (mapsAvailable === 5) {
      // host picks map
      setVetoState(3);
      setCurrent(2);
    }
    if (mapsAvailable === 4 && mapsPlayed === 1) {
      // non host picks side
      setVetoState(4);
      setCurrent(2);
    }
    if (mapsAvailable === 4 && mapsPlayed === 1 && sidesPicked === 1) {
      // non host picks map 2
      setVetoState(5);
      setCurrent(2);
    }
    if (mapsAvailable === 3 && mapsPlayed === 2 && sidesPicked === 1) {
      // host picks side for map 2
      setVetoState(6);
      setCurrent(2);
    }
    if (mapsAvailable === 3 && mapsPlayed === 2 && sidesPicked === 2) {
      // host bans map 2
      setVetoState(7);
      setCurrent(3);
    }
    if (mapsAvailable === 2 && mapsPlayed === 2 && sidesPicked === 2) {
      // non host bans map 2
      setVetoState(8);
      setCurrent(3);
    }
    if (mapsAvailable === 1 && mapsPlayed === 2 && sidesPicked === 2) {
      // host picks side for last map
      setVetoState(9);
      setCurrent(4);
    }
    if (mapsAvailable === 0) {
      // voting has finished start playing
      setVetoState(10);
      setCurrent(5);
    }
  }, [match?.mapsAvailable, match?.mapsPlayed, match?.sidesPerMap]);

  useEffect(() => {
    if (!match?.hasVoting || match?.state !== 2) {
      return;
    }

    // see whos picking
    const host =
      match?.host === "Red"
        ? match?.redteam_users[0]
        : match?.blueteam_users[0];
    const nonhost =
      match?.host === "Red"
        ? match?.blueteam_users[0]
        : match?.redteam_users[0];

    switch (vetoState) {
      case 1:
        setCurrentlyPicking(host);
        return;
      case 2:
        setCurrentlyPicking(nonhost);
        return;
      case 3:
        setCurrentlyPicking(host);
        return;
      case 4:
        setCurrentlyPicking(nonhost);
        return;
      case 5:
        setCurrentlyPicking(nonhost);
        return;
      case 6:
        setCurrentlyPicking(host);
        return;
      case 7:
        setCurrentlyPicking(host);
        return;
      case 8:
        setCurrentlyPicking(nonhost);
        return;
      case 9:
        setCurrentlyPicking(host);
        return;
      case 10:
        setCurrentlyPicking(null);
        return;
    }
  }, [vetoState]);

  // styles
  const styles = {
    currentBackground: {
      height: 10,
      width: "100%",
      backgroundColor: theme.primary(),
    },
    nonCurrentBackground: {
      height: 10,
      width: "100%",
      backgroundColor: theme.border(),
      opacity: 0.5,
    },
    currentText: {
      fontSize: 16,
      fontWeight: 700,
      color: theme.text(),
    },
    nonCurrentText: {
      fontSize: 16,
      fontWeight: 700,
      color: theme.text(),
      opacity: 0.5,
    },
  };

  return (
    <Grid item sx={{ width: "100%" }}>
      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="center"
        gap={{ xs: 2 }}
      >
        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            justifyContent="start"
            alignItems="start"
            wrap="nowrap"
            sx={{
              width: "100%",
              overflowX: "auto",
              paddingBottom: 2,
              boxSizing: "border-box",
            }}
            ref={ref}
            onMouseDown={onMouseDown}
          >
            <Grid item sx={{ flexGrow: 1 }}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                gap={{ xs: 2 }}
              >
                <Grid item>
                  <Typography
                    sx={
                      current === 1 ? styles.currentText : styles.nonCurrentText
                    }
                  >
                    Ban 2 Maps
                  </Typography>
                </Grid>

                <Grid
                  item
                  sx={
                    current === 1
                      ? {
                          ...styles.currentBackground,
                          borderTopLeftRadius: 8,
                          borderBottomLeftRadius: 8,
                        }
                      : {
                          ...styles.nonCurrentBackground,
                          borderTopLeftRadius: 8,
                          borderBottomLeftRadius: 8,
                        }
                  }
                ></Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                gap={{ xs: 2 }}
              >
                <Grid item>
                  <Typography
                    sx={
                      current === 2 ? styles.currentText : styles.nonCurrentText
                    }
                  >
                    Pick 2 Maps
                  </Typography>
                </Grid>

                <Grid
                  item
                  sx={
                    current === 2
                      ? styles.currentBackground
                      : styles.nonCurrentBackground
                  }
                ></Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                gap={{ xs: 2 }}
              >
                <Grid item>
                  <Typography
                    sx={
                      current === 3 ? styles.currentText : styles.nonCurrentText
                    }
                  >
                    Ban 2 Maps
                  </Typography>
                </Grid>

                <Grid
                  item
                  sx={
                    current === 3
                      ? styles.currentBackground
                      : styles.nonCurrentBackground
                  }
                ></Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                gap={{ xs: 2 }}
              >
                <Grid item>
                  <Typography
                    sx={
                      current === 4 ? styles.currentText : styles.nonCurrentText
                    }
                  >
                    Host Picks Side
                  </Typography>
                </Grid>

                <Grid
                  item
                  sx={
                    current === 4
                      ? styles.currentBackground
                      : styles.nonCurrentBackground
                  }
                ></Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                gap={{ xs: 2 }}
              >
                <Grid item>
                  <Typography
                    sx={
                      current === 5 ? styles.currentText : styles.nonCurrentText
                    }
                  >
                    Play Matches
                  </Typography>
                </Grid>

                <Grid
                  item
                  sx={
                    current === 5
                      ? {
                          ...styles.currentBackground,
                          borderTopRightRadius: 8,
                          borderBottomRightRadius: 8,
                        }
                      : {
                          ...styles.nonCurrentBackground,
                          borderTopRightRadius: 8,
                          borderBottomRightRadius: 8,
                        }
                  }
                ></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            gap={{ xs: 2 }}
          >
            {vetoState === 10 || match?.state != 2 ? null : (
              <Grid item>
                <CircularProgress size={20} sx={{ color: theme.text() }} />
              </Grid>
            )}

            {match?.state !== 1 && match?.state !== 0 ? (
              <Grid item>
                <Typography
                  sx={{ fontSize: 20, fontWeight: 700, color: theme.text() }}
                >
                  {getVetoTitle(vetoState, currentlyPicking)}
                </Typography>
              </Grid>
            ) : (
              <Grid item>
                <Typography
                  sx={{ fontSize: 20, fontWeight: 700, color: theme.text() }}
                >
                  {match?.state === 0
                    ? "Waiting for another team to join"
                    : "Ready up to start the voting process"}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>

        {vetoState !== 10 ? (
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              gap={{ xs: 1 }}
            >
              <VetoMapCard
                map="ascent"
                state={vetoState}
                picking={currentlyPicking}
                isBanned={match?.mapsBanned?.includes("ascent")}
                isPicked={match?.mapsPlayed?.includes("ascent")}
                needsSide={
                  match?.mapsPlayed?.includes("ascent") &&
                  match?.sidesPerMap?.filter((obj) => obj?.map === "ascent")
                    ?.length < 1
                }
                hasSide={
                  match?.mapsPlayed?.includes("ascent") &&
                  match?.sidesPerMap?.filter((obj) => obj?.map === "ascent")
                    ?.length > 0
                }
                onClick={handleMapClick}
                match={match}
                loading={banLoading || pickMapLoading || pickSideLoading}
                mapLoading={mapLoading === "ascent"}
              />
              <VetoMapCard
                map="bind"
                state={vetoState}
                picking={currentlyPicking}
                isBanned={match?.mapsBanned?.includes("bind")}
                isPicked={match?.mapsPlayed?.includes("bind")}
                needsSide={
                  match?.mapsPlayed?.includes("bind") &&
                  match?.sidesPerMap?.filter((obj) => obj?.map === "bind")
                    ?.length < 1
                }
                hasSide={
                  match?.mapsPlayed?.includes("bind") &&
                  match?.sidesPerMap?.filter((obj) => obj?.map === "bind")
                    ?.length > 0
                }
                onClick={handleMapClick}
                match={match}
                loading={banLoading || pickMapLoading || pickSideLoading}
                mapLoading={mapLoading === "bind"}
              />
              <VetoMapCard
                map="fracture"
                state={vetoState}
                picking={currentlyPicking}
                isBanned={match?.mapsBanned?.includes("fracture")}
                isPicked={match?.mapsPlayed?.includes("fracture")}
                needsSide={
                  match?.mapsPlayed?.includes("fracture") &&
                  match?.sidesPerMap?.filter((obj) => obj?.map === "fracture")
                    ?.length < 1
                }
                hasSide={
                  match?.mapsPlayed?.includes("fracture") &&
                  match?.sidesPerMap?.filter((obj) => obj?.map === "fracture")
                    ?.length > 0
                }
                onClick={handleMapClick}
                match={match}
                loading={banLoading || pickMapLoading || pickSideLoading}
                mapLoading={mapLoading === "fracture"}
              />
              <VetoMapCard
                map="icebox"
                state={vetoState}
                picking={currentlyPicking}
                isBanned={match?.mapsBanned?.includes("icebox")}
                isPicked={match?.mapsPlayed?.includes("icebox")}
                needsSide={
                  match?.mapsPlayed?.includes("icebox") &&
                  match?.sidesPerMap?.filter((obj) => obj?.map === "icebox")
                    ?.length < 1
                }
                hasSide={
                  match?.mapsPlayed?.includes("icebox") &&
                  match?.sidesPerMap?.filter((obj) => obj?.map === "icebox")
                    ?.length > 0
                }
                onClick={handleMapClick}
                match={match}
                loading={banLoading || pickMapLoading || pickSideLoading}
                mapLoading={mapLoading === "icebox"}
              />
              <VetoMapCard
                map="pearl"
                state={vetoState}
                picking={currentlyPicking}
                isBanned={match?.mapsBanned?.includes("pearl")}
                isPicked={match?.mapsPlayed?.includes("pearl")}
                needsSide={
                  match?.mapsPlayed?.includes("pearl") &&
                  match?.sidesPerMap?.filter((obj) => obj?.map === "pearl")
                    ?.length < 1
                }
                hasSide={
                  match?.mapsPlayed?.includes("pearl") &&
                  match?.sidesPerMap?.filter((obj) => obj?.map === "pearl")
                    ?.length > 0
                }
                onClick={handleMapClick}
                match={match}
                loading={banLoading || pickMapLoading || pickSideLoading}
                mapLoading={mapLoading === "pearl"}
              />
              <VetoMapCard
                map="haven"
                state={vetoState}
                picking={currentlyPicking}
                isBanned={match?.mapsBanned?.includes("haven")}
                isPicked={match?.mapsPlayed?.includes("haven")}
                needsSide={
                  match?.mapsPlayed?.includes("haven") &&
                  match?.sidesPerMap?.filter((obj) => obj?.map === "haven")
                    ?.length < 1
                }
                hasSide={
                  match?.mapsPlayed?.includes("haven") &&
                  match?.sidesPerMap?.filter((obj) => obj?.map === "haven")
                    ?.length > 0
                }
                onClick={handleMapClick}
                match={match}
                loading={banLoading || pickMapLoading || pickSideLoading}
                mapLoading={mapLoading === "haven"}
              />
              <VetoMapCard
                map="breeze"
                state={vetoState}
                picking={currentlyPicking}
                isBanned={match?.mapsBanned?.includes("breeze")}
                isPicked={match?.mapsPlayed?.includes("breeze")}
                needsSide={
                  match?.mapsPlayed?.includes("breeze") &&
                  match?.sidesPerMap?.filter((obj) => obj?.map === "breeze")
                    ?.length < 1
                }
                hasSide={
                  match?.mapsPlayed?.includes("breeze") &&
                  match?.sidesPerMap?.filter((obj) => obj?.map === "breeze")
                    ?.length > 0
                }
                onClick={handleMapClick}
                match={match}
                loading={banLoading || pickMapLoading || pickSideLoading}
                mapLoading={mapLoading === "breeze"}
              />
            </Grid>
          </Grid>
        ) : null}

        {vetoState === 10 ? (
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              gap={{ xs: 1 }}
            >
              {match?.sidesPerMap?.map((mapObj, i) => {
                return (
                  <VetoMapCard
                    key={i}
                    state={vetoState}
                    picking={null}
                    isBanned={false}
                    isPicked={true}
                    needsSide={false}
                    hasSide={true}
                    match={match}
                    map={mapObj?.map}
                  />
                );
              })}
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default Veto;
