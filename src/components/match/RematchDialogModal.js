import { Grid } from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/NewStoreContext";
import DialogModal from "../../custom_components/DialogModal";
import NewPrimaryButton from "../../custom_components/NewPrimaryButton";
import NewSecondaryButton from "../../custom_components/NewSecondaryButton";
import { acceptRematch } from "../../utils/API";
import constants from "../../utils/constants";
import createTheme from "../../utils/theme";
import useAxios from "../../utils/useAxios";

const RematchDialogModal = (props) => {
  // variables
  const { onClose, open, wager } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const api = useAxios();

  // state
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [error, setError] = useState(null);

  // methods
  const handleClose = () => {
    setAcceptLoading(false);
    setError(null);
    onClose();
  };

  const handleAcceptRematch = () => {
    setAcceptLoading(true);
    acceptRematch(api, wager?.tokendata?.wagerid).then((res) => {
      if (!res?.error) {
        setAcceptLoading(false);
        window.location.href = `${constants.clientUrl}/token/${res?.tokenId}`;
        return;
      }
      setAcceptLoading(false);
      setError(res?.message);
    });
  };

  const handleDeclineRematch = () => {
    handleClose();
  };

  return (
    <DialogModal
      title="Rematch Requested"
      onClose={handleClose}
      open={open}
      description={`${wager?.playerSendingInvite} wants a rematch!`}
      error={error}
      setError={setError}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="end"
        gap={{ xs: 1 }}
        sx={{ width: "100%" }}
      >
        <Grid item>
          <NewPrimaryButton
            label="Accept"
            loading={acceptLoading}
            onClick={handleAcceptRematch}
          />
        </Grid>

        <Grid item>
          <NewSecondaryButton label="Decline" onClick={handleDeclineRematch} />
        </Grid>
      </Grid>
    </DialogModal>
  );
};

export default RematchDialogModal;
