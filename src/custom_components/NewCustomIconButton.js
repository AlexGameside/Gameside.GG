import { Grid } from "@mui/material";
import { useContext, useState } from "react";
import BadgeHover from "../components/match/components/badges/BadgeHover";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import constants from "../utils/constants";

const NewCustomIconButton = (props) => {
  const { children, selected, onClick, unreadNotiCount = 0, label } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const [hovered, setHovered] = useState(false);

  return (
    <Grid
      item
      sx={{
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: selected ? constants.primaryRed : theme.iconBackground(),
        transition: "all .1s ease-in-out",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: theme.iconBackground(true),
        },
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: 40, paddingTop: 0.5, position: "relative" }}
      >
        {hovered ? <BadgeHover label={label} /> : null}

        {unreadNotiCount > 0 ? (
          <Grid
            item
            sx={{
              position: "absolute",
              height: 20,
              width: 20,
              borderRadius: 50,
              backgroundColor: theme.red(),
              top: -5,
              right: 0,
            }}
          >
            <span
              style={{
                color: theme.white(),
                position: "absolute",
                left: 0,
                right: 0,
                fontWeight: 600,
                textAlign: "center",
                marginLeft: "auto",
                marginRight: "auto",
                top: 2,
                fontSize: 11,
              }}
            >
              {unreadNotiCount > 9 ? "9+" : unreadNotiCount}
            </span>
          </Grid>
        ) : null}
        <Grid item>{children}</Grid>
      </Grid>
    </Grid>
  );
};

export default NewCustomIconButton;
