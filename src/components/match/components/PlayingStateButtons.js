import { useContext, useState } from "react";
import { StoreContext } from "../../../context/NewStoreContext";
import createTheme from "../../../utils/theme";
import NewSecondaryButton from "../../../custom_components/NewSecondaryButton";
import { Grid } from "@mui/material";
import useSocket from "../../../utils/useSocket";
import MarkMatchCompleteModal from "./MarkMatchCompleteModal";
import { isVisitor } from "../utils/matchHelpers";
import NewPrimaryButton from "../../../custom_components/NewPrimaryButton";

const PlayingStateButtons = (props) => {
  const { match, agreedUsers } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const { sendAgreeCancelEvent, sendRemoveCancelEvent } = useSocket(
    match?.wagerid
  );

  const [cancelLoading, setCancelLoading] = useState(false);
  const [markOpen, setMarkOpen] = useState(false);

  const handleOnVoteToCancelClick = () => {
    setCancelLoading(true);

    if (agreedUsers?.includes(store?.user?.username)) {
      sendRemoveCancelEvent({
        wagerId: match?.wagerid,
        username: store?.user?.username,
      });
      setCancelLoading(false);
      return;
    }

    const allUsers = match?.blue_users?.concat(match?.red_users);
    sendAgreeCancelEvent({
      wagerId: match?.wagerid,
      username: store?.user?.username,
      matchPlayers: allUsers,
    });
    setCancelLoading(false);
  };

  const styles = {};

  return (
    <Grid item>
      <MarkMatchCompleteModal
        match={match}
        open={markOpen}
        onClose={() => setMarkOpen(false)}
      />

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        gap={{ xs: 2 }}
      >
        {match?.isTourneyMatch ||
        isVisitor(store?.user?.username, match) ? null : (
          <Grid item>
            <NewSecondaryButton
              label={
                agreedUsers?.includes(store?.user?.username)
                  ? "Remove Vote"
                  : "Vote to Cancel"
              }
              loading={cancelLoading}
              onClick={handleOnVoteToCancelClick}
              small={true}
            />
          </Grid>
        )}

        {isVisitor(store?.user?.username, match) ? null : (
          <Grid item>
            <NewPrimaryButton
              label={"Submit Results"}
              onClick={() => setMarkOpen(true)}
              small={true}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default PlayingStateButtons;
