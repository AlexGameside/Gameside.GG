import { Grid } from "@mui/material";
import { useContext, useState } from "react";
import { RiSwordFill } from "react-icons/ri";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import BadgeHover from "./BadgeHover";

const StaffBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const [hovered, setHovered] = useState(false);

  return (
    <Grid
      item
      sx={{
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: theme.complementary(),
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          height: 50,
          paddingTop: 0.5,
          position: "relative",
        }}
      >
        <Grid item>
          <RiSwordFill style={{ fontSize: 32, color: theme.text() }} />
        </Grid>

        {hovered ? <BadgeHover label="Staff" /> : null}
      </Grid>
    </Grid>
  );
};

export default StaffBadge;
