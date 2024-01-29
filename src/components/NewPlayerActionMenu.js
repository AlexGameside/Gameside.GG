import { Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import NewPlayerActionModal from "./NewPlayerActionModal";

const NewPlayerActionMenu = (props) => {
  // variables
  const { anchor, handleClose, user } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  // state
  const [openModal, setOpenModal] = useState(false);

  // methods
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    handleClose();
  };

  // styles
  const styles = {
    menuContainer: {
      borderRadius: 16,
      boxShadow: theme.shadow(),
      backgroundColor: theme.card(),
      color: theme.text(),
    },
    menuText: {
      fontColor: theme.text(),
      fontSize: 16,
      fontWeight: 900,
    },
    icon: {
      fontSize: 30,
      fontWeight: 900,
      color: theme.text(),
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
      <NewPlayerActionModal
        user={user}
        onClose={handleCloseModal}
        open={openModal}
      />
      <MenuItem
        sx={{ "&:hover": { backgroundColor: theme.cardHover() } }}
        onClick={handleOpenModal}
      >
        <Typography sx={styles.menuText}>Report {user?.username}</Typography>
      </MenuItem>
    </Menu>
  );
};

export default NewPlayerActionMenu;
