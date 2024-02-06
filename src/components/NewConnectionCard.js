import {
  Grid,
  useMediaQuery,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import {
  StoreContext,
  StoreDispatch,
  SET_USER,
} from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { MdRefresh } from "react-icons/md";
import useAxios from "../utils/useAxios";
import NewInput from "./NewInput";
import {
  refreshUserEpic,
  resetTempEpic,
  setTempEpic,
  submitClashId,
  submitFiveMID,
  submitValId,
} from "../utils/API";
import { FaCopy } from "react-icons/fa";
import useEpic from "../utils/useEpic";

const NewConnectionCard = (props) => {
  // variables
  const { connection, setSuccess, setError } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const dispatch = useContext(StoreDispatch);
  const api = useAxios();
  const { sendTempEpic, epic } = useEpic(store?.user?.username);

  // state
  const [loading, setLoading] = useState(false);
  const [epicLoading, setEpicLoading] = useState(false);
  const [riotLoading, setRiotLoading] = useState(false);
  const [fiveMLoading, setFiveMLoading] = useState(false);
  const [clashLoading, setClashLoading] = useState(false);
  const [newEpic, setNewEpic] = useState(null);
  const [newVal, setNewVal] = useState(null);
  const [newClash, setNewClash] = useState(null);
  const [newFiveM, setNewFiveM] = useState(null);
  const [showFortInput, setShowFortInput] = useState(false);
  const [showValInput, setShowValInput] = useState(false);
  const [showFiveMInput, setShowFiveMInput] = useState(false);
  const [showClashInput, setShowClashInput] = useState(false);
  const [linkAgain, setLinkAgain] = useState(false);
  const [linkFiveMAgain, setLinkFiveMAgain] = useState(false);

  // methods
  const handleCopyEpicBotName = () => {
    navigator.clipboard.writeText("Gameside");
  };

  const handleRefreshEpic = () => {
    if (loading) {
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);
    setEpicLoading(true);
    refreshUserEpic(
      api,
      store?.user?.username,
      store?.user?.verifyEpicData[0]?.id
    ).then((res) => {
      if (!res.error) {
        setEpicLoading(false);
        setLoading(false);
        let newUser = store?.user;
        newUser.epic = res?.epic;
        dispatch({ type: SET_USER, payload: { ...newUser } });
      } else {
        setEpicLoading(false);
        setLoading(false);
        setError(res?.message);
      }
    });
  };

  const handleResetEpic = () => {
    setNewEpic("");
    setSuccess("");
    setShowFortInput(false);
    setEpicLoading(true);
    resetTempEpic(api, store?.user?.username).then((res) => {
      if (!res?.error) {
        sendTempEpic("");
        setEpicLoading(false);
        let newUser = store?.user;
        newUser.verifyEpicData = [];
        dispatch({ type: SET_USER, payload: { ...newUser } });
      } else {
        setEpicLoading(false);
        setError("Failed to reset temporary Epic!");
      }
    });
  };

  const handleSubmitEpic = () => {
    setEpicLoading(true);
    setError("");
    setTempEpic(api, store?.user?.username, newEpic).then((res) => {
      if (!res?.error) {
        setEpicLoading(false);
        sendTempEpic(newEpic);
        let newUser = store?.user;
        newUser.verifyEpicData = [];
        newUser.verifyEpicData.push({
          epic: newEpic,
          username: store?.user?.username,
          id: "",
        });
        dispatch({ type: SET_USER, payload: { ...newUser } });
      } else {
        setEpicLoading(false);
        setError("Failed to send Epic for verification!");
      }
    });
  };

  const handleSubmitRiot = () => {
    if (newVal == "" || newVal == null) return;
    setError("");
    setRiotLoading(true);
    submitValId(api, newVal).then((res) => {
      if (!res?.error) {
        setRiotLoading(false);
        setNewVal("");
        let newUser = store?.user;
        if (newUser?.connections?.length < 1) {
          newUser.connections = [null, null];
          newUser.connections[0] = {
            valId: res?.valId,
          };
          setShowValInput(false);
        } else {
          newUser.connections[0] = { valId: res?.valId };
        }
        dispatch({ type: SET_USER, payload: { ...newUser } });
        return;
      } else {
        setRiotLoading(false);
        setError(res?.message);
      }
    });
  };

  const handleSubmitFiveM = () => {
    if (newFiveM == "" || newFiveM == null) return;
    setError("");
    setFiveMLoading(true);
    submitFiveMID(api, newFiveM).then((res) => {
      if (!res?.error) {
        setFiveMLoading(false);
        setNewFiveM("");
        let newUser = store?.user;
        if (newUser?.connections?.length < 1) {
          newUser.connections = [null, null];
          newUser.connections[2] = {
            fivemID: res?.fivemID,
          };
          setShowFiveMInput(false);
        } else {
          newUser.connections[2] = { fivemID: res?.fivemID };
        }
        dispatch({ type: SET_USER, payload: { ...newUser } });
        return;
      } else {
        setFiveMLoading(false);
        setError(res?.message);
      }
    });
  };

  const handleSubmitClash = () => {
    setError("");
    setClashLoading(true);
    submitClashId(api, newClash).then((res) => {
      if (!res?.error) {
        setClashLoading(false);
        setNewClash("");
        setShowClashInput(false);
        let newUser = store?.user;
        if (newUser?.connections?.length < 1) {
          newUser.connections = [
            null,
            {
              clashId: res?.clashId?.clashId,
            },
          ];
        } else {
          newUser.connections[1] = { clashId: res?.clashId?.clashId };
        }
        dispatch({ type: SET_USER, payload: { ...newUser } });
        return;
      } else {
        setClashLoading(false);
        setError(res?.message);
      }
    });
  };

  const getConnectionColor = () => {
    switch (connection) {
      case "FN":
        return theme.blue();
      case "VAL":
        return theme.green();
      case "CLASH":
        return theme.red();
      case "FIVEM":
        return theme.orange();
      default:
        return theme.blue();
    }
  };

  const getConnectionTitle = () => {
    switch (connection) {
      case "FN":
        return "Fortnite";
      case "VAL":
        return "Valorant";
      case "CLASH":
        return "Clash Royale";
      case "FIVEM":
        return "FiveM";
      default:
        return "None";
    }
  };

  const getFortniteMeta = () => {
    if (store?.user?.epic && store?.user?.verifyEpicData[0]?.id) {
      return (
        <Grid
          item
          sx={{
            transition: ".2s ease-in-out",
            "&:hover": {
              cursor: "pointer",
              transform: "scale(1.1)",
            },
          }}
          alignSelf="end"
          onClick={handleRefreshEpic}
        >
          <MdRefresh style={{ color: getConnectionColor(), fontSize: 35 }} />
        </Grid>
      );
    } else {
      return null;
    }
  };

  const getValMeta = () => {
    if (store?.user?.connections[0]) {
      return (
        <Grid
          item
          sx={{
            transition: ".2s ease-in-out",
            "&:hover": {
              cursor: "pointer",
              transform: "scale(1.1)",
            },
          }}
          onClick={() => setLinkAgain(!linkAgain)}
        >
          <Typography
            sx={{ color: getConnectionColor(), fontSize: 16, fontWeight: 900 }}
          >
            {linkAgain ? "Hide" : "Link Again"}
          </Typography>
        </Grid>
      );
    }
    return null;
  };

  const getFiveMMeta = () => {
    if (store?.user?.connections[2]) {
      return (
        <Grid
          item
          sx={{
            transition: ".2s ease-in-out",
            "&:hover": {
              cursor: "pointer",
              transform: "scale(1.1)",
            },
          }}
          onClick={() => setLinkFiveMAgain(!linkFiveMAgain)}
        >
          <Typography
            sx={{ color: getConnectionColor(), fontSize: 16, fontWeight: 900 }}
          >
            {linkFiveMAgain ? "Hide" : "Link Again"}
          </Typography>
        </Grid>
      );
    }
    return null;
  };

  const getClashMeta = () => {
    return null;
  };

  const getConnectionMeta = () => {
    switch (connection) {
      case "FN":
        return getFortniteMeta();
      case "VAL":
        return getValMeta();
      case "CLASH":
        return getClashMeta();
      case "FIVEM":
        return getFiveMMeta();
      default:
        return "None";
    }
  };

  const getFortniteLinkButton = () => {
    if (
      store?.user?.verifyEpicData &&
      store?.user?.verifyEpicData[0]?.id &&
      (store?.user?.epic !== "" || store?.user?.epic == null)
    ) {
      return (
        <Grid item sx={{ width: "100%" }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography sx={styles.label}>Epic: </Typography>
            </Grid>

            <Grid item>
              <Typography sx={styles.value}>{store?.user?.epic}</Typography>
            </Grid>
          </Grid>
        </Grid>
      );
    }

    if (
      (store?.user?.epic == null || store?.user?.epic === "") &&
      (store?.user?.verifyEpicData[0]?.id == null ||
        store?.user?.verifyEpicData?.length < 1 ||
        !store?.user?.verifyEpicData)
    ) {
      if (showFortInput) {
        return (
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              rowSpacing={{ xs: 2 }}
            >
              <Grid item sx={{ width: "100%" }}>
                <NewInput
                  onChange={setNewEpic}
                  value={newEpic}
                  placeholder="Epic Games Username"
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <Button
                  disabled={loading || newEpic === "" || newEpic == null}
                  variant="contained"
                  size="large"
                  sx={styles.link}
                  onClick={handleSubmitEpic}
                >
                  {epicLoading ? (
                    <CircularProgress size={30} sx={{ color: theme.white() }} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        );
      } else {
        return (
          <Grid item sx={{ width: "100%" }}>
            <Button
              variant="contained"
              size="large"
              sx={styles.link}
              onClick={() => setShowFortInput(!showFortInput)}
            >{`Link ${getConnectionTitle()}`}</Button>
          </Grid>
        );
      }
    }

    if (
      (store?.user?.epic == null || store?.user?.epic === "") &&
      store?.user?.verifyEpicData &&
      store?.user?.verifyEpicData?.length > 0 &&
      (store?.user?.verifyEpicData[0]?.id === "" ||
        store?.user?.verifyEpicData[0]?.id == null)
    ) {
      return (
        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
            rowSpacing={{ xs: 4 }}
          >
            <Grid item>
              <Typography style={styles.enterMessage}>
                Epic Sent:{" "}
                <span style={styles.epicName}>
                  {store?.user?.verifyEpicData[0]?.epic}
                </span>
              </Typography>
            </Grid>
            <Grid item>
              <Typography style={styles.epicMessage}>
                Put the wrong Epic? Press reset
              </Typography>
              <Typography style={styles.epicMessage}>
                to restart the process. Capitalization does not matter.
              </Typography>
            </Grid>

            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="center"
                rowSpacing={{ xs: 1 }}
              >
                <Grid item>
                  <Typography style={styles.enterMessage}>
                    How To Verify Epic:
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography style={styles.steps}>
                    1. On{" "}
                    <span style={{ color: theme.blue(), fontWeight: 900 }}>
                      Fortnite
                    </span>
                    , add{" "}
                    <div
                      style={styles.epicCopy}
                      onClick={handleCopyEpicBotName}
                    >
                      Gameside <FaCopy style={styles.epicCopy} />
                    </div>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography style={styles.steps}>
                    2. Once Verified Successfully,
                  </Typography>
                  <Typography style={styles.steps}>
                    this page will update{" "}
                    <span style={styles.auto}>automatically</span>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <Button
                variant="contained"
                size="large"
                style={styles.link}
                onClick={handleResetEpic}
              >
                {epicLoading ? (
                  <CircularProgress size={30} sx={{ color: theme.white() }} />
                ) : (
                  "Reset"
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      );
    }
  };

  const getValLinkButton = () => {
    if (store?.user?.connections[0] == null) {
      if (showValInput) {
        return (
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              rowSpacing={{ xs: 2 }}
            >
              <Grid item sx={{ width: "100%" }}>
                <NewInput
                  onChange={setNewVal}
                  value={newVal}
                  placeholder="Riot Id"
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <Button
                  disabled={loading || newVal == "" || newVal == null}
                  variant="contained"
                  size="large"
                  sx={styles.link}
                  onClick={handleSubmitRiot}
                >
                  {riotLoading ? (
                    <CircularProgress size={30} sx={{ color: theme.white() }} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        );
      } else {
        return (
          <Grid item sx={{ width: "100%" }}>
            <Button
              variant="contained"
              size="large"
              sx={styles.link}
              onClick={() => setShowValInput(!showValInput)}
            >{`Link ${getConnectionTitle()}`}</Button>
          </Grid>
        );
      }
    } else {
      return (
        <Grid item sx={{ width: "100%" }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography sx={styles.label}>Riot Id: </Typography>
            </Grid>

            <Grid item>
              <Typography sx={styles.value}>
                {store?.user?.connections[0]?.valId}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      );
    }
  };

  const getFiveMLinkButton = () => {
    if (store?.user?.connections[2] == null) {
      if (showFiveMInput) {
        return (
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              rowSpacing={{ xs: 2 }}
            >
              <Grid item sx={{ width: "100%" }}>
                <NewInput
                  onChange={setNewFiveM}
                  value={newFiveM}
                  placeholder="FiveM Id"
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <Button
                  disabled={loading || newFiveM == "" || newFiveM == null}
                  variant="contained"
                  size="large"
                  sx={styles.link}
                  onClick={handleSubmitFiveM}
                >
                  {fiveMLoading ? (
                    <CircularProgress size={30} sx={{ color: theme.white() }} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        );
      } else {
        return (
          <Grid item sx={{ width: "100%" }}>
            <Button
              variant="contained"
              size="large"
              sx={styles.link}
              onClick={() => setShowFiveMInput(!showFiveMInput)}
            >{`Link ${getConnectionTitle()}`}</Button>
          </Grid>
        );
      }
    } else {
      return (
        <Grid item sx={{ width: "100%" }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography sx={styles.label}>FiveM Id: </Typography>
            </Grid>

            <Grid item>
              <Typography sx={styles.value}>
                {store?.user?.connections[2]?.fivemID}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      );
    }
  };

  const handleRenderValorantLinkAgain = () => {
    if (connection === "VAL") {
      if (linkAgain) {
        return (
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              rowSpacing={{ xs: 2 }}
            >
              <Grid item sx={{ width: "100%" }}>
                <NewInput
                  onChange={setNewVal}
                  value={newVal}
                  placeholder="Riot Id"
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <Button
                  disabled={loading || newVal == "" || newVal == null}
                  variant="contained"
                  size="large"
                  sx={styles.link}
                  onClick={handleSubmitRiot}
                >
                  {riotLoading ? (
                    <CircularProgress size={30} sx={{ color: theme.white() }} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        );
      }
    }

    return null;
  };

  const handleRenderFiveMLinkAgain = () => {
    if (connection === "FIVEM") {
      if (linkFiveMAgain) {
        return (
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              rowSpacing={{ xs: 2 }}
            >
              <Grid item sx={{ width: "100%" }}>
                <NewInput
                  onChange={setNewFiveM}
                  value={newFiveM}
                  placeholder="FiveM Id"
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <Button
                  disabled={loading || newFiveM == "" || newFiveM == null}
                  variant="contained"
                  size="large"
                  sx={styles.link}
                  onClick={handleSubmitFiveM}
                >
                  {fiveMLoading ? (
                    <CircularProgress size={30} sx={{ color: theme.white() }} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        );
      }
    }

    return null;
  };

  const getClashLinkButton = () => {
    if (store?.user?.connections[1] == null) {
      if (showClashInput) {
        return (
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              rowSpacing={{ xs: 2 }}
            >
              <Grid item sx={{ width: "100%" }}>
                <NewInput
                  onChange={setNewClash}
                  value={newClash}
                  placeholder="#8c8jg594"
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <Typography sx={styles.clashWarning}>
                  You can only link ONE clash account!
                </Typography>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <Button
                  disabled={loading || newClash == "" || newClash == null}
                  variant="contained"
                  size="large"
                  sx={styles.link}
                  onClick={handleSubmitClash}
                >
                  {clashLoading ? (
                    <CircularProgress size={30} sx={{ color: theme.white() }} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        );
      } else {
        return (
          <Grid item sx={{ width: "100%" }}>
            <Button
              variant="contained"
              size="large"
              sx={styles.link}
              onClick={() => setShowClashInput(!showClashInput)}
            >{`Link ${getConnectionTitle()}`}</Button>
          </Grid>
        );
      }
    } else {
      return (
        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            columnSpacing={{ xs: 1 }}
          >
            <Grid item>
              <Typography sx={styles.label}>Clash Id: </Typography>
            </Grid>

            <Grid item>
              <Typography sx={styles.value}>
                {store?.user?.connections[1]?.clashId}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      );
    }
  };

  const handleRenderLinkButton = () => {
    switch (connection) {
      case "FN":
        return getFortniteLinkButton();
      case "VAL":
        return getValLinkButton();
      case "CLASH":
        return getClashLinkButton();
      case "FIVEM":
        return getFiveMLinkButton();
    }
  };

  // effects
  useEffect(() => {
    if (epic == null || epic == "") return;
    let newUser = store?.user;
    newUser.epic = epic;
    dispatch({ type: SET_USER, payload: { ...newUser } });
  }, [epic]);

  // styles
  const styles = {
    card: {
      backgroundColor: theme.card(),
      borderRadius: 6,
      padding: 2,
      boxShadow: theme.shadow(),
      minWidth: isDesktop ? 275 : 0,
      borderLeft: `6px solid ${getConnectionColor()}`,
      borderBottom: `6px solid ${getConnectionColor()}`,
    },
    title: {
      fontSize: 26,
      fontWeight: 900,
      color: theme.text(),
    },
    link: {
      color: theme.white(),
      fontSize: 18,
      textTransform: "none",
      fontWeight: 900,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .3s ease-in-out",
      backgroundColor: getConnectionColor(),
      "&:hover": {
        backgroundColor: getConnectionColor(),
        color: theme.white(),
        boxShadow: theme.shadow(),
        transform: "scale(1.1)",
      },
      width: "100%",
    },
    label: {
      fontSize: 20,
      fontWeight: 900,
      color: theme.subText(),
    },
    value: {
      fontSize: 20,
      fontWeight: 900,
      color: getConnectionColor(),
    },
    epicCopy: {
      display: "inline-block",
      fontWeight: 900,
      fontSize: 20,
      color: theme.text(),
      transition: "all .2s ease-in-out",
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.1)",
      },
    },
    enterMessage: {
      fontSize: 18,
      fontWeight: 900,
      color: theme.text(),
    },
    epicMessage: {
      fontSize: 16,
      fontWeight: 900,
      color: theme.subText(),
    },
    steps: {
      fontSize: 16,
      fontWeight: 500,
      color: theme.text(),
    },
    clashWarning: {
      fontSize: 16,
      fontWeight: 900,
      color: theme.red(),
    },
  };

  return (
    <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
      <Paper sx={styles.card}>
        <Grid
          container
          direction="column"
          alignItems="start"
          justifyContent="space-around"
          rowSpacing={{ xs: 2 }}
          sx={{ minHeight: isDesktop ? 125 : 0 }}
        >
          <Grid item sx={{ width: "100%" }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography sx={styles.title}>
                  {getConnectionTitle()}
                </Typography>
              </Grid>
              {getConnectionMeta()}
            </Grid>
          </Grid>

          {handleRenderLinkButton()}
          {handleRenderValorantLinkAgain()}
          {handleRenderFiveMLinkAgain()}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default NewConnectionCard;
