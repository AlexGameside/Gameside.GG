import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import NewLoginModalContent from "./NewLoginModalContent";
import { useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NewSignupModalContent from "./NewSignupModalContent";
import NewForgotModalContent from "./NewForgotModalContent";
import { useSearchParams, useLocation } from "react-router-dom";
import NewResetPassModalContent from "./NewResetPassModalContent";
import whiteLogo from "../assets/blue-logo.png";
import gamesideLogo from "../assets/gameside-logo.png";
import NewAlert from "../custom_components/NewAlert";
import { addRefCodeView } from "../utils/API";
import CountdownSignupModalContent from "./CountdownSignupModalContent";

const CountdownSignupModal = (props) => {
  // variables
  const { open, onClose, handleMenuClose } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const location = useLocation();

  // state
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [searchParams, _] = useSearchParams();
  const [closeHovered, setCloseHovered] = useState(false);
  const [banned, setBanned] = useState(false);
  const [discordFailed, setDiscordFailed] = useState(false);
  const [error, setError] = useState(null);

  // methods
  const handleClose = () => {
    setShowForgot(false);
    setShowSignup(false);
    setShowReset(false);
    setShowLogin(true);
    setBanned(false);
    setDiscordFailed(false);
    setError(null);
    onClose();
    handleMenuClose();
  };

  const handleShowLogin = () => {
    setShowForgot(false);
    setShowSignup(false);
    setShowReset(false);
    setShowLogin(true);
  };

  const handleShowSignup = () => {
    setShowForgot(false);
    setShowLogin(false);
    setShowReset(false);
    setShowSignup(true);
  };

  const handleShowForgot = () => {
    setShowLogin(false);
    setShowSignup(false);
    setShowReset(false);
    setShowForgot(true);
  };

  const handleShowReset = () => {
    setShowLogin(false);
    setShowSignup(false);
    setShowForgot(false);
    setShowReset(true);
  };

  // useEffects
  useEffect(() => {
    const code = searchParams.get("code");
    const verify = searchParams.get("verify");
    const forgot = searchParams.get("forgot");
    const failed = searchParams.get("failed");
    const banned = searchParams.get("banned");
    if (code) {
      // save code in local storage
      if (localStorage.getItem("ref_code") !== code) {
        // add view
        addRefCodeView(code);
      }
      localStorage.setItem("ref_code", code);
      handleShowSignup();
      return;
    }
    if (verify) {
      handleShowLogin();
      return;
    }
    if (forgot) {
      handleShowReset();
      return;
    }
    if (banned) {
      setBanned(true);
    }
    if (failed) {
      setDiscordFailed(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (banned) {
      setError("You are currently banned!");
    }
  }, [banned]);

  useEffect(() => {
    if (discordFailed) {
      setError("Discord login failed!");
    }
  }, [discordFailed]);

  useEffect(() => {
    const path = location?.pathname;

    if (path === "/signup") {
      handleShowSignup();
      return;
    }

    if (path === "/login") {
      handleShowLogin();
      return;
    }
  }, [location]);

  // styles
  const styles = {
    card: {
      backgroundColor: theme.card(),
      minWidth: isDesktop ? 450 : isMobile ? "95%" : 0,
      maxWidth: 450,
      paddingTop: 4,
      paddingBottom: 4,
      paddingLeft: isDesktop ? 12 : 0,
      paddingRight: isDesktop ? 12 : 0,
      borderRadius: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: 600,
      color: theme.text(),
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
    <>
      <Dialog open={open} onClose={onClose} PaperProps={{ style: styles.card }}>
        {error ? (
          <NewAlert label={error} clearMessage={() => setError(null)} />
        ) : null}
        <DialogTitle sx={styles.title}>
          <img src={gamesideLogo} style={{ width: 100 }} />
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
        </DialogTitle>
        <CountdownSignupModalContent />
      </Dialog>
    </>
  );
};

export default CountdownSignupModal;