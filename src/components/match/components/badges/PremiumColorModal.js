import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  SET_USER,
  StoreContext,
  StoreDispatch,
} from "../../../../context/NewStoreContext";
import DialogModal from "../../../../custom_components/DialogModal";
import NewPrimaryButton from "../../../../custom_components/NewPrimaryButton";
import { changePremiumColor } from "../../../../utils/API";
import createTheme from "../../../../utils/theme";
import useAxios from "../../../../utils/useAxios";

const ColorContainer = (props) => {
  const { color, selected, onClick } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Grid
      item
      sx={{
        padding: 1,
        borderRadius: 2,
        backgroundColor: theme.offWhite(),
        maxHeight: 70,
        maxWidth: 70,
        position: "relative",
        border: selected ? `4px solid ${theme.primary()}` : null,
        boxSizing: "border-box",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={onClick}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          item
          sx={{
            width: 50,
            height: 50,
            borderRadius: 2,
            backgroundColor: color,
          }}
        />
      </Grid>
    </Grid>
  );
};

const PremiumColorModal = (props) => {
  const { open, onClose } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const premiumColor = store?.user?.connections[9]?.isPremium?.extras;
  const dispatch = useContext(StoreDispatch);
  const api = useAxios();

  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    setSelected(premiumColor);
    setError(null);
    setSuccess(null);
    setLoading(false);
    onClose();
  };

  const handleChangePremiumColor = () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    changePremiumColor(api, selected).then((res) => {
      setLoading(false);
      if (!res?.error) {
        setSuccess(res?.message);
        let user = store?.user;
        let newConnectionsBadges = store?.user?.connections[9];
        newConnectionsBadges.isPremium.extras = selected;
        user.connections[9] = newConnectionsBadges;
        dispatch({ type: SET_USER, payload: { ...user } });
      } else {
        setError(res?.message);
        setSelected(premiumColor);
      }
    });
  };

  useEffect(() => {
    if (store?.user) {
      setSelected(premiumColor);
    }
  }, [store?.user]);

  return (
    <DialogModal
      title="Edit Premium Color"
      description="Change the color of your premium badge, and the color of your name on your User Profile."
      open={open}
      onClose={handleClose}
      error={error}
      success={success}
      setError={setError}
      setSuccess={setSuccess}
      button={
        <NewPrimaryButton
          loading={loading}
          label="Save"
          disabled={selected === premiumColor}
          onClick={handleChangePremiumColor}
        />
      }
    >
      <Grid
        container
        sx={{ width: "100%" }}
        alignItems="center"
        justifyContent="start"
        gap={{ xs: 1 }}
      >
        <ColorContainer
          color={theme.primary()}
          selected={selected === theme.primary()}
          onClick={() => setSelected(theme.primary())}
        />
        <ColorContainer
          color={theme.red()}
          selected={selected === theme.red()}
          onClick={() => setSelected(theme.red())}
        />
        <ColorContainer
          color={theme.green()}
          selected={selected === theme.green()}
          onClick={() => setSelected(theme.green())}
        />
        <ColorContainer
          color={theme.purple()}
          selected={selected === theme.purple()}
          onClick={() => setSelected(theme.purple())}
        />
        <ColorContainer
          color={theme.complementary()}
          selected={selected === theme.complementary()}
          onClick={() => setSelected(theme.complementary())}
        />
        <ColorContainer
          color={"#000"}
          selected={selected === "#000"}
          onClick={() => setSelected("#000")}
        />
        <ColorContainer
          color={theme.white()}
          selected={selected === theme.white()}
          onClick={() => setSelected(theme.white())}
        />
        <ColorContainer
          color={"#E17F93"}
          selected={selected === "#E17F93"}
          onClick={() => setSelected("#E17F93")}
        />
      </Grid>
    </DialogModal>
  );
};

export default PremiumColorModal;
