import { Grid } from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import BadgeHover from "./BadgeHover";

const Badge = (props) => {
  const {
    label,
    children,
    color,
    glow,
    gradient = null,
    moveDown = 0,
    onClick,
    size = 50,
  } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const [hovered, setHovered] = useState(false);

  return (
    <Grid
      item
      sx={{
        height: size,
        width: size,
        borderRadius: 100,
        backgroundColor: color,
        "&:hover": {
          cursor: "pointer",
        },
        boxShadow: glow ? glow : null,
        backgroundImage: gradient,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          height: size,
          position: "relative",
        }}
      >
        <Grid item sx={{ paddingTop: moveDown }}>
          {children}
        </Grid>

        {hovered ? <BadgeHover label={label} /> : null}
      </Grid>
    </Grid>
  );
};

export default Badge;
