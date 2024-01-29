import { Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { FaWallet } from "react-icons/fa";
import NewWalletMenu from "../components/NewWalletMenu";
import { MdNotifications } from "react-icons/md";
import { BiPlus, BiWallet } from "react-icons/bi";
import NewCreateMenu from "../components/NewCreateMenu";

const CustomIconButton = (props) => {
  const { type, selected = false, onClick } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const [hovered, setHovered] = useState(false);
  const [walletAnchor, setWalletAnchor] = useState(null);
  const [createAnchor, setCreateAnchor] = useState(null);

  const getIconType = (iconType) => {
    switch (iconType) {
      case "wallet":
        return <BiWallet style={{ fontSize: 20, color: theme.icon() }} />;
      case "notifications":
        return (
          <MdNotifications style={{ fontSize: 20, color: theme.icon() }} />
        );
      case "create":
        return <BiPlus style={{ fontSize: 20, color: theme.icon() }} />;
    }
  };

  const getIconLabel = (iconType) => {
    switch (iconType) {
      case "wallet":
        return (
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 500,
              color: "#fff",
              paddingLeft: 1,
              paddingRight: 1,
            }}
          >
            Wallet
          </Typography>
        );
      case "notifications":
        return (
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 500,
              color: "#fff",
              paddingLeft: 1,
              paddingRight: 1,
            }}
          >
            Notifications
          </Typography>
        );
      case "create":
        return (
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 500,
              color: "#fff",
              paddingLeft: 1,
              paddingRight: 1,
            }}
          >
            Create
          </Typography>
        );
    }
  };

  const handleWalletClick = (e) => {
    e.stopPropagation();
    setHovered(false);
    setWalletAnchor(e.currentTarget);
  };

  const handleWalletClose = (e) => {
    e.stopPropagation();
    setWalletAnchor(null);
  };

  const handleCreateClick = (e) => {
    e.stopPropagation();
    setHovered(false);
    setCreateAnchor(e.currentTarget);
  };

  const handleCreateClose = (e) => {
    e.stopPropagation();
    setCreateAnchor(null);
  };

  const handleOnClick = (e) => {
    onClick(e);
  };

  const styles = {};

  return (
    <Grid
      item
      sx={{
        height: 40,
        width: 40,
        borderRadius: 100,
        backgroundColor: theme.iconButton(),
        position: "relative",
        transition: "all .2s ease-in-out",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: theme.border(),
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        if (type === "notifications") {
          handleOnClick(e);
          return;
        }

        if (type === "wallet") {
          handleWalletClick(e);
          return;
        }

        if (type === "create") {
          handleCreateClick(e);
          return;
        }
      }}
    >
      <NewWalletMenu anchor={walletAnchor} handleClose={handleWalletClose} />
      <NewCreateMenu anchor={createAnchor} handleClose={handleCreateClose} />

      <span style={{ position: "absolute", left: 10, top: 10 }}>
        {getIconType(type)}
      </span>
      {hovered ? (
        <div
          style={{
            backgroundColor: "#000",
            borderRadius: 2,
            boxShadow: theme.shadow(),
            minWidth: 50,
            height: 20,
            position: "absolute",
            bottom: -25,
            left: type === "wallet" ? -5 : type === "notifications" ? -20 : -7,
            textAlign: "center",
          }}
        >
          {getIconLabel(type)}
        </div>
      ) : null}
      {type === "notifications" &&
      store?.user?.notifications?.filter((noti) => noti?.read === false)
        ?.length > 0 ? (
        <div
          style={{
            backgroundColor: theme.red(),
            width: 20,
            height: 20,
            borderRadius: 50,
            padding: 2,
            position: "absolute",
            top: -2,
            right: -3,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{ color: theme.white(), fontSize: 10, fontWeight: 700 }}
          >
            {
              store?.user?.notifications?.filter((noti) => noti?.read === false)
                ?.length
            }
          </Typography>
        </div>
      ) : null}
    </Grid>
  );
};

export default CustomIconButton;
