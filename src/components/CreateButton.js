import { BiPlus } from "react-icons/bi";
import { StoreContext } from "../context/NewStoreContext";
import { useContext, useRef, useState } from "react";
import createTheme from "../utils/theme";
import NewCreateMenu from "../components/NewCreateMenu";
import NewSignupLoginModal from "./NewSignupLoginModal";
import { useMediaQuery } from "@mui/material";
import BadgeHover from "./match/components/badges/BadgeHover";

const CreateButton = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const containerRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width:1025px)");

  // state
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(null);

  // methods
  const handleCreateClose = () => {
    setOpen(false);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleCreateOpen = () => {
    if (open) {
      handleCreateClose();
      return;
    }

    if (store?.user) {
      setOpen(true);
      return;
    } else {
      setOpenLoginModal(true);
      return;
    }
  };

  // styles
  // "#4B4C4F"
  const styles = {
    container: {
      padding: 0,
      position: "fixed",
      borderRadius: 50,
      height: 48,
      width: 48,
      bottom: isDesktop ? 20 : 60,
      right: 30,
      backgroundColor: open ? theme.complementary() : theme.primary(),
      boxShadow: theme.shadow(),
      transition: "all .2s ease-in-out",
      cursor: hovered ? "pointer" : "default",
      backgroundImage: hovered ? theme.buttonHover() : null,
      zIndex: 1000000,
    },
  };

  return (
    <>
      <NewCreateMenu
        open={open}
        handleClose={handleCreateClose}
        containerRef={containerRef}
      />

      <NewSignupLoginModal
        open={openLoginModal}
        onClose={handleCloseLoginModal}
        handleMenuClose={() => {}}
      />

      <div
        style={styles.container}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleCreateOpen}
        ref={containerRef}
      >
        {hovered ? <BadgeHover label="Create" position="top" /> : null}
        <BiPlus
          style={{
            color: theme.white(),
            fontSize: 30,
            position: "absolute",
            right: 9,
            top: 9,
            transform: open ? "rotate(45deg)" : "",
            transition: "transform 150ms ease",
          }}
        />
      </div>
    </>
  );
};

export default CreateButton;
