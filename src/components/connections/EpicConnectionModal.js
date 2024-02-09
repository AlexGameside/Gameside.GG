import {
    useMediaQuery,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    Typography,
    Grid,
    Alert,
  } from "@mui/material";
  import { useContext, useState } from "react";
  import {
    SET_USER,
    StoreContext,
    StoreDispatch,
  } from "../../context/NewStoreContext";
  import createTheme from "../../utils/theme";
  import CloseIcon from "@mui/icons-material/Close";
  import NewInput from "../NewInput";
  import NewPrimaryButton from "../../custom_components/NewPrimaryButton";
  import epicGames from '../../assets/NewAssets/fortnite-logo.PNG';
  import { submitEpicId } from "../../utils/API";
  import useAxios from "../../utils/useAxios";
  
  const EpicConnectionModal = (props) => {
    // variables
    const { open, onClose } = props;
    const store = useContext(StoreContext);
    const theme = createTheme(store.mode);
    const isDesktop = useMediaQuery("(min-width:1025px)");
    const isMobile = useMediaQuery("(max-width:500px)");
    const api = useAxios();
    const dispatch = useContext(StoreDispatch);
  
    // state
    const [closeHovered, setCloseHovered] = useState(false);
    const [error, setError] = useState(null);
    const [newEpic, setNewEpic] = useState(null);
    const [epicLoading, setEpicLoading] = useState(false);
  
    // methods
    const handleClose = () => {
      setError(null);
      setNewEpic(null);
      setEpicLoading(false);
      setCloseHovered(false);
      onClose();
    };
  
    const handleLinkEpic = () => {
      if (newEpic === "" || newEpic == null) return;
      setError("");
      setEpicLoading(true);
      submitEpicId(api, newEpic).then((res) => {
        if (!res?.error) {
          let newUser = store?.user;
          newUser.epic = res?.newEpic;
          dispatch({ type: SET_USER, payload: { ...newUser } });
          setEpicLoading(false);
          handleClose();
          return;
        }
        setError(res?.message);
        setEpicLoading(false);
      });
    };
  
    // effects
  
    // styles
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
    };
  
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ style: styles.card }}
      >
        <DialogTitle sx={styles.title}>
          <img src={epicGames} />
          <Typography style={styles.title}>Link Your Epic Account</Typography>
          <Typography sx={styles.subtitle}>
            Link your Epic account to start competing.
          </Typography>
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
            gap={{ xs: 4 }}
          >
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="center"
              >
                <Grid item>
                  <Typography
                    sx={{ fontSize: 15, fontWeight: 600, color: theme.text() }}
                  >
                    {store?.user?.epic
                      ? store?.user?.epic
                      : "Not Connected"}
                  </Typography>
                </Grid>
  
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: theme.metaText(),
                    }}
                  >
                    Current Epic Id
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
  
            <Grid item sx={{ width: "100%" }}>
                <NewInput
                placeholder="Epic Id"
                onChange={setNewEpic}
                value={newEpic}
              />
            </Grid>
  
            <Grid item alignSelf="end">
                <NewPrimaryButton
                label="Link"
                loading={epicLoading}
                onClick={handleLinkEpic}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default EpicConnectionModal;
  