import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  Grid,
  Alert,
  Divider,
} from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import CloseIcon from "@mui/icons-material/Close";
import NewDropdown from "./NewDropdown";
import NewInput from "./NewInput";
import useAxios from "../utils/useAxios";
import {
  determineTeamSizeOptions,
  getNumWinnersOptions,
  getTournamentDate,
  determineRegion,
} from "../utils/helperMethods";
import BubbleButton from "../custom_components/BubbleButton";
import { createBracketTournament } from "../utils/API";
import FileBase64 from "react-file-base64";
import { useLocation } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import NewSecondaryButton from "../custom_components/NewSecondaryButton";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";
import { BiCheck } from "react-icons/bi";

const NewCreateBracketTournamentModal = (props) => {
  // variables
  const { open, onClose, addTournament } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const api = useAxios();
  const Img = styled("img")``;
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // state
  const [closeHovered, setCloseHovered] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const location = useLocation();
  const isSpectre = location.pathname.startsWith("/spectre") || location.pathname === 'spectre'; 
  const isValorant = location.pathname.startsWith("/valorant");

  const [game, setGame] = useState(isSpectre ? "SD" : isValorant ? "VAL" : null);
  const [region, setRegion] = useState(null);
  const [matchType, setMatchType] = useState("VOTE");
  const [teamSize, setTeamSize] = useState(null);
  const [numTeams, setNumTeams] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [firstTo, setFirstTo] = useState(null);
  const [numWinners, setNumWinners] = useState(null);
  const [showEntryFee, setShowEntryFee] = useState(null);
  const [entryFee, setEntryFee] = useState(null);
  const [prizePool, setPrizePool] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [freeTournament, setFreeTournament] = useState(false);

  // methods
  const clearValues = () => {
    setStep(1);
    setSuccess(null);
    setGame("VAL");
    setRegion(null);
    setMatchType(null);
    setTeamSize(null);
    setNumTeams(null);
    setFirstTo(null);
    setNumWinners(null);
    setShowEntryFee(null);
    setEntryFee(null);
    setPrizePool(null);
    setTitle(null);
    setDescription(null);
    setThumbnail(null);
    setLoading(false);
    setFreeTournament(false);
  };

  const handleClose = () => {
    clearValues();
    setError(null);
    onClose();
  };

  const createTournament = () => {
    setLoading(true);
    // if (
    //   (entryFee == null || entryFee === 0) &&
    //   (prizePool == null || prizePool === 0)
    // ) {
    //   setLoading(false);
    //   setError("You must enter a prize pool or an entry fee.");
    //   return;
    // }
    if (numWinners > numTeams) {
      setLoading(false);
      setError("Number of winners cannot be larger than number of teams.");
      return;
    }

    if (new Date(date + " " + time) < new Date()) {
      setLoading(false);
      setError("Start date cannot be a date in the past.");
      return;
    }

    const tournamentObject = {
      start_date: new Date(date + " " + time),
      team_size: teamSize,
      game,
      region,
      match_type: "VOTE",
      first_to: 13,
      num_teams: numTeams,
      prize: entryFee == null ? prizePool : entryFee * teamSize * numTeams,
      num_winners: freeTournament ? 1 : numWinners,
      admins: "",
      format: 1,
      title,
      description,
      hosted_by: store.user?.username,
      entry_fee: entryFee ?? 0,
      thumbnail,
    };

    createBracketTournament(api, tournamentObject).then((res) => {
      if (!res?.error) {
        setLoading(false);
        addTournament(res?.tournament);
        handleClose();
        return;
      } else {
        setLoading(false);
        setError(res?.message);
        return;
      }
    });
  };

  // effects

  // style
  const styles = {
    card: {
      backgroundColor: theme.card(),
      minWidth: isDesktop ? 450 : isMobile ? "95%" : 0,
      maxWidth: 450,
      padding: 4,
      borderRadius: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: 600,
      color: theme.text(),
    },
    subtitle: {
      fontSize: 16,
      fontWeight: 400,
      color: theme.metaText(),
      marginBottom: 4,
    },
    closeButton: {
      color: theme.icon(),
      backgroundColor: "transparent",
      borderRadius: 100,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: 10,
      top: 10,
      transition: "all .2s ease-in-out",
    },
    step: {
      fontSize: 15,
      fontWeight: 600,
      color: theme.green(),
    },
    unselectedStep: {
      fontSize: 15,
      color: theme.metaText(),
      fontWeight: 600,
    },
    label: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.text(),
    },
    prizePool: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.green(),
    },
    warning: {
      fontSize: 14,
      fontWeight: 500,
      color: theme.red(),
    },
    hostedByWarning: {
      fontSize: 14,
      fontWeight: 500,
      color: theme.orange(),
    },
    detailsLabel: {
      fontSize: 15,
      fontWeight: 600,
      color: theme.metaText(),
    },
    value: {
      fontSize: 15,
      fontWeight: 600,
      color: theme.text(),
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ style: styles.card }}
    >
      <DialogTitle sx={styles.title}>
        <Typography style={styles.title}>Create Tournament</Typography>
        <Typography sx={styles.subtitle}>
          Create a classic bracket style tournament.
        </Typography>
        <Grid item sx={{ width: "100%" }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item sx={{ flexGrow: 1 }}>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="center"
                gap={{ xs: 1 }}
              >
                <Grid item>
                  <Typography sx={styles.step}>Details</Typography>
                </Grid>

                <Grid
                  item
                  style={{
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    height: 6,
                    width: "100%",
                    backgroundColor: theme.green(),
                  }}
                ></Grid>
              </Grid>
            </Grid>

            <Grid item sx={{ flexGrow: 1 }}>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="center"
                gap={{ xs: 1 }}
              >
                <Grid item>
                  <Typography
                    sx={
                      step === 2 || step === 3 || step === 4
                        ? styles.step
                        : styles.unselectedStep
                    }
                  >
                    Teams
                  </Typography>
                </Grid>

                <Grid
                  item
                  style={{
                    height: 6,
                    width: "100%",
                    backgroundColor:
                      step === 2 || step === 3 || step === 4
                        ? theme.green()
                        : theme.border(),
                  }}
                ></Grid>
              </Grid>
            </Grid>

            <Grid item sx={{ flexGrow: 1 }}>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="center"
                gap={{ xs: 1 }}
              >
                <Grid item>
                  <Typography
                    sx={
                      step === 3 || step === 4
                        ? styles.step
                        : styles.unselectedStep
                    }
                  >
                    Winners
                  </Typography>
                </Grid>

                <Grid
                  item
                  style={{
                    height: 6,
                    width: "100%",
                    backgroundColor:
                      step === 3 || step === 4 ? theme.green() : theme.border(),
                  }}
                ></Grid>
              </Grid>
            </Grid>

            <Grid item sx={{ flexGrow: 1 }}>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="center"
                gap={{ xs: 1 }}
              >
                <Grid item>
                  <Typography
                    sx={step === 4 ? styles.step : styles.unselectedStep}
                  >
                    Overview
                  </Typography>
                </Grid>

                <Grid
                  item
                  style={{
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    height: 6,
                    width: "100%",
                    backgroundColor:
                      step === 4 ? theme.green() : theme.border(),
                  }}
                ></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={styles.closeButton}
            onMouseEnter={() => setCloseHovered(true)}
            onMouseLeave={() => setCloseHovered(false)}
          >
            <CloseIcon
              sx={{
                color: closeHovered ? theme.text() : theme.metaText(),
                fontSize: 18,
              }}
            />
          </IconButton>
        ) : null}
        {error ? (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={{ xs: 3 }}
        >
          <Grid item sx={{ width: "100%" }}>
            <Divider sx={{ width: "100%", backgroundColor: theme.border() }} />
          </Grid>

          {
            // STEP ONE
          }
          {step === 1 ? (
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                gap={{ xs: 3 }}
              >
                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="start"
                    alignItems="start"
                    gap={{ xs: 1 }}
                  >
                    <Grid item sx={{ width: "100%" }}>
                      <Typography style={styles.label}>Title*</Typography>
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                      <NewInput
                        placeholder="Title"
                        onChange={(value) => {
                          setTitle(value);
                        }}
                        value={title}
                        type="text"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="start"
                    alignItems="start"
                    gap={{ xs: 1 }}
                  >
                    <Grid item sx={{ width: "100%" }}>
                      <Typography style={styles.label}>Description*</Typography>
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                      <NewInput
                        placeholder="Description"
                        onChange={(value) => {
                          setDescription(value);
                        }}
                        value={description}
                        type="text"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="start"
                    alignItems="start"
                    rowSpacing={{ xs: 1 }}
                  >
                    <Grid item sx={{ width: "100%" }}>
                      <Typography style={styles.label}>Region*</Typography>
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                      <NewDropdown
                        options={determineRegion(game)}
                        placeholder="Select region"
                        onChange={(value) => setRegion(value)}
                        game={game}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="start"
                    alignItems="start"
                    rowSpacing={{ xs: 1 }}
                  >
                    <Grid item sx={{ width: "100%" }}>
                      <Typography style={styles.label}>Start Date*</Typography>
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="start"
                        gap={{ xs: 1 }}
                      >
                        <Grid item sx={{ flexGrow: 1 }}>
                          <NewInput
                            placeholder="Date"
                            onChange={setDate}
                            type="date"
                            value={date}
                            min={new Date()}
                          />
                        </Grid>
                        <Grid item sx={{ flexGrow: 1 }}>
                          <NewInput
                            placeholder="Time"
                            onChange={setTime}
                            type="time"
                            value={time}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="start"
                    alignItems="start"
                    rowSpacing={{ xs: 1 }}
                  >
                    <Grid item sx={{ width: "100%" }}>
                      <Typography style={styles.label}>Thumbnail*</Typography>
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                      <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setThumbnail(base64)}
                      />
                    </Grid>
                    {thumbnail ? (
                      <Grid item sx={{ width: "100%" }}>
                        <Img
                          src={thumbnail}
                          alt="thumbnail"
                          sx={{
                            maxWidth: 200,
                            borderRadius: 2,
                          }}
                        />
                      </Grid>
                    ) : null}
                    <Grid item sx={{ width: "100%" }}>
                      <Typography style={styles.hostedByWarning}>
                        PLEASE make sure your thumbnail is 336x190.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : null}

          {
            // STEP TWO
          }
          {step === 2 ? (
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                gap={{ xs: 3 }}
              >
                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="start"
                    alignItems="start"
                    gap={{ xs: 1 }}
                  >
                    <Grid item sx={{ width: "100%" }}>
                      <Typography style={styles.label}>Team Size*</Typography>
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                      <NewDropdown
                        options={determineTeamSizeOptions(game, matchType)}
                        placeholder="Select match type"
                        onChange={(value) => setTeamSize(value)}
                        game={game}
                        tournament
                        matchType={matchType}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="start"
                    alignItems="start"
                    gap={{ xs: 1 }}
                  >
                    <Grid item sx={{ width: "100%" }}>
                      <Typography style={styles.label}>
                        Number of Teams
                      </Typography>
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={{ xs: 1 }}
                      >
                        { store.user.role > 500 &&
                          <Grid item>
                            <BubbleButton
                              title={"2"}
                              selected={numTeams === 2}
                              onClick={() => setNumTeams(2)}
                              size="small"
                            />
                          </Grid>
                        }
                        { store.user.role > 500 &&
                          <Grid item>
                            <BubbleButton
                              title={"4"}
                              selected={numTeams === 4}
                              onClick={() => setNumTeams(4)}
                              size="small"
                            />
                          </Grid>
                        }
                        <Grid item>
                          <BubbleButton
                            title={"8"}
                            selected={numTeams === 8}
                            onClick={() => setNumTeams(8)}
                            size="small"
                          />
                        </Grid>
                        <Grid item>
                          <BubbleButton
                            title={"16"}
                            selected={numTeams === 16}
                            onClick={() => setNumTeams(16)}
                            size="small"
                          />
                        </Grid>
                        <Grid item>
                          <BubbleButton
                            title={"32"}
                            selected={numTeams === 32}
                            onClick={() => setNumTeams(32)}
                            size="small"
                          />
                        </Grid>
                        <Grid item>
                          <BubbleButton
                            title={"64"}
                            selected={numTeams === 64}
                            onClick={() => setNumTeams(64)}
                            size="small"
                          />
                        </Grid>
                        <Grid item>
                          <BubbleButton
                            title={"128"}
                            selected={numTeams === 128}
                            onClick={() => setNumTeams(128)}
                            size="small"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : null}

          {
            // STEP THREE
          }
          {step === 3 ? (
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                gap={{ xs: 3 }}
              >
                <Grid item sx={{ width: "100%", marginTop: 1 }}>
                  <Grid
                    container
                    justifyContent="start"
                    alignItems="center"
                    gap={{ xs: 2 }}
                  >
                    <Grid
                      item
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => setFreeTournament(!freeTournament)}
                    >
                      <div
                        style={{
                          height: 30,
                          width: 30,
                          backgroundColor: freeTournament
                            ? theme.primary()
                            : theme.background(),
                          border: `2px solid ${theme.border()}`,
                          borderRadius: 4,
                        }}
                      >
                        {freeTournament ? (
                          <BiCheck
                            style={{ color: theme.white(), fontSize: 24 }}
                          />
                        ) : null}
                      </div>
                    </Grid>

                    <Grid item>
                      <Typography sx={styles.label}>
                        No Prize Pool or Entry Fee
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                {freeTournament ? null : (
                  <Grid item sx={{ width: "100%" }}>
                    <Grid
                      container
                      direction="column"
                      justifyContent="start"
                      alignItems="start"
                      gap={{ xs: 1 }}
                    >
                      <Grid item sx={{ width: "100%" }}>
                        <Typography style={styles.label}>
                          Number of Winners
                        </Typography>
                      </Grid>
                      <Grid item sx={{ width: "100%" }}>
                        <NewDropdown
                          options={getNumWinnersOptions(numTeams)}
                          placeholder="Select Num of Winners"
                          onChange={(value) => setNumWinners(value)}
                          game={game}
                          tournament
                          matchType={matchType}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                {freeTournament ? null : (
                  <Grid item sx={{ width: "100%" }}>
                    <Grid
                      container
                      direction="column"
                      justifyContent="start"
                      alignItems="start"
                      rowSpacing={{ xs: 1 }}
                    >
                      <Grid item sx={{ width: "100%" }}>
                        <Typography style={styles.label}>Entry Fee*</Typography>
                      </Grid>
                      <Grid item sx={{ width: "100%" }}>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justifyContent="start"
                          columnSpacing={{ xs: 2 }}
                        >
                          <Grid item>
                            <BubbleButton
                              title={"Free Entry"}
                              selected={showEntryFee === false}
                              onClick={() => {
                                setEntryFee(null);
                                setShowEntryFee(false);
                              }}
                              size="small"
                            />
                          </Grid>
                          <Grid item>
                            <BubbleButton
                              title={"Add Entry Fee"}
                              selected={showEntryFee === true}
                              onClick={() => {
                                setEntryFee(null);
                                setShowEntryFee(true);
                              }}
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                {showEntryFee && !freeTournament ? (
                  <>
                    <Grid item sx={{ width: "100%" }}>
                      <NewInput
                        placeholder="Price"
                        onChange={(value) => {
                          setEntryFee(value);
                        }}
                        value={entryFee}
                        type="number"
                      />
                    </Grid>

                    <Grid item sx={{ width: "100%" }}>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          <Typography sx={styles.label}>Prize Pool</Typography>
                        </Grid>
                        <Grid item>
                          <Typography sx={styles.prizePool}>
                            {numFormatter.format(
                              entryFee * teamSize * numTeams
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                ) : null}

                {entryFee == null &&
                showEntryFee === false &&
                !freeTournament ? (
                  <Grid item sx={{ width: "100%" }}>
                    <Grid
                      container
                      direction="column"
                      justifyContent="start"
                      alignItems="start"
                      rowSpacing={{ xs: 1 }}
                    >
                      <Grid item sx={{ width: "100%" }}>
                        <Typography style={styles.label}>
                          Prize Pool*
                        </Typography>
                      </Grid>
                      <Grid item sx={{ width: "100%" }}>
                        <NewInput
                          placeholder="Price"
                          onChange={(value) => {
                            setPrizePool(value);
                          }}
                          value={prizePool}
                          type="number"
                        />
                      </Grid>
                      <Grid item sx={{ width: "100%" }}>
                        <Typography style={styles.warning}>
                          The prize pool will be taken from your current
                          balance.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          ) : null}

          {step === 4 ? (
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                gap={{ xs: 3 }}
              >
                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography style={styles.detailsLabel}>Title</Typography>
                    </Grid>

                    <Grid item>
                      <Typography style={styles.value}>{title}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography style={styles.detailsLabel}>
                        Description
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography style={styles.value}>
                        {description}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography style={styles.detailsLabel}>
                        Region
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography style={styles.value}>{region}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography style={styles.detailsLabel}>
                        Start Date
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography style={styles.value}>
                        {getTournamentDate(new Date(date + " " + time))}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography style={styles.detailsLabel}>
                        Team Size
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography style={styles.value}>{teamSize}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography style={styles.detailsLabel}>
                        Number of Teams
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography style={styles.value}>{numTeams}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography style={styles.detailsLabel}>
                        Number of Winners
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography style={styles.value}>{numWinners}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography style={styles.detailsLabel}>
                        Entry Fee
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography style={styles.value}>
                        {numFormatter.format(entryFee)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography style={styles.detailsLabel}>
                        Prize Pool
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography style={styles.value}>
                        {numFormatter.format(prizePool)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : null}

          <Grid item sx={{ width: "100%" }}>
            <Divider sx={{ width: "100%", backgroundColor: theme.border() }} />
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item alignSelf="start">
                <NewSecondaryButton
                  label={step === 1 ? "Cancel" : "Previous"}
                  onClick={() =>
                    step === 1 ? handleClose() : setStep(step - 1)
                  }
                />
              </Grid>

              <Grid item alignSelf="end">
                <NewPrimaryButton
                  label={step === 4 ? "Create" : "next"}
                  loading={loading}
                  onClick={() =>
                    step === 4 ? createTournament() : setStep(step + 1)
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewCreateBracketTournamentModal;
