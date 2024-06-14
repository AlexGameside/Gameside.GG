import { Menu, MenuItem, Typography, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { FaShare } from "react-icons/fa";
import constants from "../utils/constants";
import { FaRocket } from "react-icons/fa";

const NewBracketMenu = (props) => {
  // variables
  const { anchor, handleClose, matchId } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

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
      fontSize: 14,
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
          "&:hover": { backgroundColor: theme.skeleton() },
        }}
        onClick={() =>
          window.open(`${constants.clientUrl}/token/${matchId}`, "_blank")
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
            <FaRocket style={{ color: theme.metaText(), fontSize: 16 }} />
          </Grid>

          <Grid item>
            <Typography sx={styles.menuText}>View Match</Typography>
          </Grid>
        </Grid>
      </MenuItem>
    </Menu>
  );
};

export default NewBracketMenu;
