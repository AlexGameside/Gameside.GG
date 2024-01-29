import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NewSecondaryButton from "../custom_components/NewSecondaryButton";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";

const NewBracketTournamentEarnedModal = (props) => {
  // variables
  const { open, onClose, tournament } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // state
  const [closeHovered, setCloseHovered] = useState(false);

  // methods
  const handleClose = () => {
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
    label: {
      fontSize: 18,
      fontWeight: 300,
      color: theme.text(),
      lineHeight: 1.5,
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ style: styles.card }}
    >
      <DialogTitle sx={styles.title}>
        <Typography style={styles.title}>
          You have earned in{" "}
          <span style={{ color: theme.blue() }}>{tournament?.title}</span>
        </Typography>
        <Typography style={styles.subtitle}>
          Congratulations {store?.user?.username}!
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
            <Divider sx={{ backgroundColor: theme.border() }} />
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="start"
              rowSpacing={{ xs: 1 }}
            >
              <Grid item sx={{ width: "100%" }}>
                <Typography sx={styles.label}>
                  Congratulations! You have earned{" "}
                  <span style={{ fontWeight: 600, color: theme.green() }}>
                    {numFormatter.format(tournament?.prize)}
                  </span>{" "}
                  in{" "}
                  <span style={{ fontWeight: 600, color: theme.blue() }}>
                    {tournament?.title}
                  </span>
                  ! Your earnings will appear in your balance and should be
                  available for withdrawal at any time.
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              rowSpacing={{ xs: 1 }}
            >
              <Grid
                item
                alignSelf="start"
                sx={{ minWidth: isDesktop ? 0 : "100%" }}
              >
                <NewSecondaryButton label="dismiss" onClick={handleClose} />
              </Grid>

              <Grid
                item
                alignSelf="end"
                sx={{ minWidth: isDesktop ? 0 : "100%" }}
              >
                <NewPrimaryButton
                  label="share results"
                  onClick={() => {
                    window.open(
                      `https://twitter.com/intent/tweet?url=https%3A%2F%2Ftkns.gg%2Ftournament%2F${
                        tournament?._id
                      }&text=Bagged%20${numFormatter.format(
                        tournament?.prize
                      )}%20in%20${tournament?.title}%20on%20TknsGG%21`,
                      "_blank"
                    );
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewBracketTournamentEarnedModal;
