import {
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Typography,
} from "@mui/material";
import { useState, useContext } from "react";
import CreateTokenDialog from "./CreateTokenDialog";
import constants from "../utils/constants";
import {
  GlobalDispatchContext,
  SET_FILTERS,
  GlobalStateContext,
} from "../context/StoreContext";
import { FaDiscord } from "react-icons/fa";
import { IconContext } from "react-icons";

const TokenFilters = () => {
  const dispatch = useContext(GlobalDispatchContext);
  const store = useContext(GlobalStateContext);
  const [region, setRegion] = useState("");
  const [matchType, setMatchType] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [platform, setPlatform] = useState(false);
  const [createTokenDialogOpen, setCreateTokenDialogOpen] = useState(false);

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    let storeFilters = store?.wagerFilters;
    if (e.target.value === "") {
      delete storeFilters.region;
    } else {
      storeFilters.region = e.target.value;
    }
    dispatch({
      type: SET_FILTERS,
      payload: {
        ...storeFilters,
      },
    });
  };

  const handleMatchTypeChange = (e) => {
    setMatchType(e.target.value);
    let storeFilters = store?.wagerFilters;
    if (e.target.value === "") {
      delete storeFilters.matchType;
    } else {
      storeFilters.matchType = e.target.value;
    }
    dispatch({
      type: SET_FILTERS,
      payload: { ...storeFilters },
    });
  };

  const handleTeamSizeChange = (e) => {
    setTeamSize(e.target.value);
    let storeFilters = store?.wagerFilters;
    if (e.target.value === "") {
      delete storeFilters.teamSize;
    } else {
      storeFilters.teamSize = e.target.value;
    }
    dispatch({
      type: SET_FILTERS,
      payload: { ...storeFilters },
    });
  };

  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
    let storeFilters = store?.wagerFilters;
    if (e.target.value === "false" || e.target.value === false) {
      delete storeFilters.console_only;
    } else {
      storeFilters.console_only = true;
    }
    dispatch({
      type: SET_FILTERS,
      payload: { ...storeFilters },
    });
  };

  const styles = {
    form: {
      m: 1,
      minWidth: 90,
    },
    inputLabel: {
      color: constants.white,
      fontWeight: 900,
    },
    select: {
      backgroundColor: constants.newGray,
      borderRadius: 2,
      color: constants.white,
      "&::before": {
        border: "none",
      },
      "&:hover": {
        backgroundColor: constants.newGray,
        opacity: 0.7,
      },
      "&:focus": {
        border: "none",
        color: constants.white,
        backgroundColor: constants.newGray,
      },
    },
    button: {
      fontSize: 20,
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor: constants.newBlue,
      "&:hover": {
        opacity: 0.6,
        backgroundColor: constants.newBlue,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
    discordButton: {
      fontSize: 20,
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor: "#32333B",
      "&:hover": {
        opacity: 0.6,
        backgroundColor: "#32333B",
        color: constants.white,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
    menuItem: {
      color: constants.white,
      fontWeight: 500,
    },
  };

  const handleOpenCreateTokenDialog = () => {
    setCreateTokenDialogOpen(true);
  };

  const handleCloseCreateTokenDialog = () => {
    setCreateTokenDialogOpen(false);
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ marginBottom: 1 }}
    >
      {store?.currentWagerId == null ? (
        <>
          <Grid item>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              columnSpacing={{ xs: 1, sm: 2 }}
            >
              <Grid item>
                <Button
                  onClick={handleOpenCreateTokenDialog}
                  sx={styles.button}
                  variant="contained"
                  size="large"
                >
                  CREATE TOKEN
                </Button>
              </Grid>
              <Grid item>
                <Button
                  href="https://discord.gg/QHMPUC3xk9"
                  variant="contained"
                  size="large"
                  sx={styles.discordButton}
                >
                  <IconContext.Provider value={{ color: constants.white }}>
                    Join Our Discord{" "}
                    <FaDiscord style={{ marginLeft: 4, fontSize: 24 }} />
                  </IconContext.Provider>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <CreateTokenDialog
            open={createTokenDialogOpen}
            onClose={handleCloseCreateTokenDialog}
          />
        </>
      ) : null}
      {
        // region
      }
      <Grid item>
        <Grid container direction="row">
          <div>
            <FormControl sx={styles.form} sx={styles.form} variant="filled">
              <InputLabel sx={styles.inputLabel}>Region</InputLabel>
              <Select
                value={region}
                onChange={handleRegionChange}
                autoWidth
                label="Region"
                sx={styles.select}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"NAE"}>NAE</MenuItem>
                <MenuItem value={"EU"}>EU</MenuItem>
                <MenuItem value={"NAW"}>NAW</MenuItem>
                <MenuItem value={"OCE"}>OCE</MenuItem>
              </Select>
            </FormControl>
          </div>
          {
            // match type
          }
          <div>
            <FormControl sx={styles.form} variant="filled">
              <InputLabel sx={styles.inputLabel}>Type</InputLabel>
              <Select
                value={matchType}
                onChange={handleMatchTypeChange}
                autoWidth
                label="Match Type"
                sx={styles.select}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"ZW"}>Zone Wars</MenuItem>
                <MenuItem value={"REAL"}>Realistics</MenuItem>
                <MenuItem value={"BOX"}>Boxfights</MenuItem>
                <MenuItem value={"PG"}>PG/Build Fights</MenuItem>
                <MenuItem value={"RACE"}>Kill Race</MenuItem>
                <MenuItem value={"ARENA_RACE"}>Arena Kill Race</MenuItem>
              </Select>
            </FormControl>
          </div>
          {
            // team size
          }
          <div>
            <FormControl sx={styles.form} variant="filled">
              <InputLabel sx={styles.inputLabel}>Size</InputLabel>
              <Select
                value={teamSize}
                onChange={handleTeamSizeChange}
                autoWidth
                label="Team Size"
                sx={styles.select}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"1"}>1v1</MenuItem>
                <MenuItem value={"2"}>2v2</MenuItem>
                <MenuItem value={"3"}>3v3</MenuItem>
                <MenuItem value={"4"}>4v4</MenuItem>
              </Select>
            </FormControl>
          </div>
          {
            // platform
          }
          <div>
            <FormControl sx={styles.form} variant="filled">
              <InputLabel sx={styles.inputLabel}>Platform</InputLabel>
              <Select
                value={platform}
                onChange={handlePlatformChange}
                autoWidth
                label="Platform"
                sx={styles.select}
              >
                <MenuItem value={false}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"true"}>Console Only</MenuItem>
                <MenuItem value={"false"}>All Platforms</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TokenFilters;
