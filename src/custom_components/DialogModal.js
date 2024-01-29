import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { useState, useContext } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import NewAlert from "./NewAlert";

const DialogModal = (props) => {
  // constants
  const {
    title,
    description,
    children,
    onClose,
    open,
    button,
    error,
    setError,
    success,
    setSuccess,
    icon,
    checkout = false,
    centerTitle = false,
  } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");

  // state
  const [closeHovered, setCloseHovered] = useState(false);

  // methods
  const handleClose = () => {
    setCloseHovered(false);
    onClose();
  };

  // styles
  const styles = {
    card: {
      backgroundColor: theme.card(),
      minWidth: isDesktop ? 450 : isMobile ? "95%" : 0,
      maxWidth: 450,
      padding: 4,
      borderRadius: 16,
      boxShadow: theme.shadow(),
    },
    title: {
      fontSize: 32,
      fontWeight: 600,
      color: theme.text(),
      textAlign: centerTitle ? "center" : "left",
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
    label: {
      fontSize: 14,
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
        {icon ? <img src={icon} /> : null}
        <Typography style={styles.title}>{title}</Typography>
        {description != null ? (
          <Typography sx={styles.subtitle}>{description}</Typography>
        ) : null}
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
          <NewAlert label={error} clearMessage={() => setError(null)} />
        ) : null}
        {success ? (
          <NewAlert
            label={success}
            clearMessage={() => setSuccess(null)}
            type="success"
          />
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
            {children}
          </Grid>

          {button != null ? (
            <Grid
              item
              sx={{ minWidth: checkout ? "100%" : isDesktop ? 0 : "100%" }}
              alignSelf="end"
            >
              {button}
            </Grid>
          ) : null}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DialogModal;
