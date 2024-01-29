import { Grid } from "@mui/material";
import { useContext, useState } from "react";
import { FaCrown } from "react-icons/fa";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import BadgeHover from "./BadgeHover";
import PremiumColorModal from "./PremiumColorModal";

const PremiumBadge = (props) => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const { color = theme.primary() } = props;

  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <PremiumColorModal open={open} onClose={() => setOpen(false)} />

      <Grid
        item
        sx={{
          height: 50,
          width: 50,
          borderRadius: 50,
          backgroundColor: color,
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setOpen(true)}
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
            <FaCrown style={{ fontSize: 32, color: theme.text() }} />
          </Grid>

          {hovered ? <BadgeHover label="Premium" /> : null}
        </Grid>
      </Grid>
    </>
  );
};

export default PremiumBadge;
