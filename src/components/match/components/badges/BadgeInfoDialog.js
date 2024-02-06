import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import DialogModal from "../../../../custom_components/DialogModal";
import createTheme from "../../../../utils/theme";
import DevBadge from "./DevBadge";
import NotZeroEarnedBadge from "./NotZeroEarnedBadge";

const BadgeInfoDialog = (props) => {
  const { open, onClose, badge, label } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const getBadge = () => {
    switch (badge) {
      case "Not Zero Earned":
        return <NotZeroEarnedBadge size={150} />;
      case "Gameside Developer":
        return <DevBadge size={150} />;
    }
  };

  return (
    <DialogModal centerTitle title={badge} open={open} onClose={onClose}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%" }}
        gap={{ xs: 2 }}
      >
        <Grid item>{getBadge()}</Grid>

        <Grid item>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 400,
              color: theme.text(),
              textAlign: "center",
            }}
          >
            {label}
          </Typography>
        </Grid>
      </Grid>
    </DialogModal>
  );
};

export default BadgeInfoDialog;
