import { Menu, MenuItem, Typography, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { FaShare } from "react-icons/fa";
import { GiPodium } from "react-icons/gi";
import constants from "../utils/constants";
import { FaCopy } from "react-icons/fa";

const NewTournamentMenu = (props) => {
  // variables
  const { anchor, handleClose, tournamentId } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  // state
  const [copied, setCopied] = useState(false);

  // methods
  const handleCopyTournamentURL = () => {
    navigator.clipboard.writeText(
      `${constants.clientURL}/tournament/${tournamentId}`
    );
    setCopied(true);
  };

  // styles
  const styles = {
    menuContainer: {
      borderRadius: 6,
      boxShadow: theme.shadow(),
      backgroundColor: theme.card(),
      color: theme.text(),
      minWidth: 150,
    },
    menuText: {
      color: theme.text(),
      fontSize: 16,
      fontWeight: 600,
    },
  };

  return (
    <Menu
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={handleClose}
      PaperProps={{
        style: styles.menuContainer,
      }}
    >
      <MenuItem
        sx={{
          "&:hover": { backgroundColor: theme.cardHover() },
        }}
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?url=https%3A%2F%2Ftkns.gg%2Ftournament%2F${tournamentId}&text=Check%20out%20this%20tournament%20on%20TknsGG%21`,
            "_blank"
          )
        }
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="start"
          columnSpacing={{ xs: 1 }}
          sx={{ width: "100%" }}
        >
          <Grid item>
            <FaShare style={{ color: theme.metaText(), fontSize: 16 }} />
          </Grid>

          <Grid item>
            <Typography sx={styles.menuText}>Share</Typography>
          </Grid>
        </Grid>
      </MenuItem>

      <MenuItem
        sx={{ "&:hover": { backgroundColor: theme.skeleton() } }}
        onClick={() =>
          (window.location.href = `${constants.clientURL}/tournament/${tournamentId}`)
        }
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="start"
          columnSpacing={{ xs: 1 }}
          sx={{ width: "100%" }}
        >
          <Grid item>
            <GiPodium style={{ color: theme.metaText(), fontSize: 16 }} />
          </Grid>

          <Grid item>
            <Typography sx={styles.menuText}>View Tournament</Typography>
          </Grid>
        </Grid>
      </MenuItem>

      <MenuItem
        sx={{ "&:hover": { backgroundColor: theme.skeleton() } }}
        onClick={handleCopyTournamentURL}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="start"
          columnSpacing={{ xs: 1 }}
          sx={{ width: "100%" }}
        >
          <Grid item>
            <FaCopy style={{ color: theme.metaText(), fontSize: 16 }} />
          </Grid>

          <Grid item>
            <Typography sx={styles.menuText}>
              {copied ? "Copied URL!" : "Copy Tournament URL"}
            </Typography>
          </Grid>
        </Grid>
      </MenuItem>
    </Menu>
  );
};

export default NewTournamentMenu;
