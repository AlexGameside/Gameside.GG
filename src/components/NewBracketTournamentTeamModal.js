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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "avataaars";
import UserProfileModal from "./user/UserProfileModal";

const NewBracketTournamentTeamModal = (props) => {
  // variables
  const { open, onClose, team } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");

  // state
  const [closeHovered, setCloseHovered] = useState(false);
  const [userHovered, setUserHovered] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userSelected, setUserSelected] = useState(null);

  // methods
  const handleClose = () => {
    onClose();
  };

  const handleOpenProfile = () => {
    setProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setUserHovered(null);
    setUserSelected(null);
    setProfileOpen(false);
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
    value: {
      fontWeight: 600,
      fontSize: 18,
      color: theme.text(),
    },
    label: {
      fontSize: 15,
      fontWeight: 400,
      color: theme.metaText(),
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ style: styles.card }}
    >
      <DialogTitle sx={styles.title}>
        <Typography style={styles.title}>Team Roster</Typography>
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
          <UserProfileModal
            username={userSelected}
            open={profileOpen}
            onClose={handleCloseProfile}
          />
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="start"
              gap={{ xs: 1 }}
            >
              {team?.map((user, i) => {
                return (
                  <Grid
                    key={i}
                    item
                    sx={{
                      width: "100%",
                      border: `2px solid ${theme.border()}`,
                      borderRadius: 2,
                      paddingLeft: 2,
                      backgroundColor: theme.background(),
                    }}
                  >
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent="start"
                      columnSpacing={{ sm: 2 }}
                    >
                      <Grid item>
                        <Avatar
                          style={{ width: 60, height: 60 }}
                          avatarStyle="Circle"
                          {...user?.avatar[0]}
                        />
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="start"
                        >
                          <Grid item>
                            <Typography sx={styles.label}>Username</Typography>
                          </Grid>

                          <Grid
                            item
                            onMouseEnter={() => setUserHovered(user?.username)}
                            onMouseLeave={() => setUserHovered(null)}
                            onClick={() => {
                              setUserSelected(user?.username);
                              handleOpenProfile();
                            }}
                          >
                            <Typography
                              sx={{
                                ...styles.value,
                                color:
                                  userHovered === user?.username
                                    ? theme.primary()
                                    : theme.text(),
                                cursor:
                                  userHovered === user?.username
                                    ? "pointer"
                                    : "default",
                              }}
                            >
                              {user?.username}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewBracketTournamentTeamModal;
