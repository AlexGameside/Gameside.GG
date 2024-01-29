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
import youtube from "../../assets/youtube.svg";
import useAxios from "../../utils/useAxios";
import { submitYoutube } from "../../utils/API";

const YoutubeConnectionModal = (props) => {
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
  const [newLink, setNewLink] = useState(null);
  const [loading, setLoading] = useState(false);

  // methods
  const handleClose = () => {
    setError(null);
    setNewLink(null);
    setCloseHovered(false);
    setLoading(false);
    onClose();
  };

  const handleLinkYoutube = () => {
    if (newLink === "" || newLink == null) return;

    setLoading(true);
    submitYoutube(api, newLink).then((res) => {
      if (!res?.error) {
        let newUser = store?.user;
        newUser.connections[7] = { youtubeURL: newLink };
        dispatch({ type: SET_USER, payload: { ...newUser } });
        setLoading(false);
        handleClose();
        return;
      }
      setError(res?.message);
      setLoading(false);
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
        <img src={youtube} />
        <Typography style={styles.title}>Link Your Youtube Channel</Typography>
        <Typography sx={styles.subtitle}>
          Link your Youtube Channel to gain more exposure.
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
                  {store?.user?.connections[7]
                    ? store?.user?.connections[7]?.youtubeURL
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
                  Current Youtube URL
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <NewInput
              placeholder="Youtube URL"
              onChange={setNewLink}
              value={newLink}
            />
          </Grid>

          <Grid item alignSelf="end">
            <NewPrimaryButton
              label="Link"
              loading={loading}
              onClick={handleLinkYoutube}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default YoutubeConnectionModal;
