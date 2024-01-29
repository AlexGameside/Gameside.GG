import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../context/NewStoreContext";
import NewPrimaryButton from "../../../custom_components/NewPrimaryButton";
import useSocket from "../../../utils/useSocket";
import { isBlueTeam, isRedTeam, isVisitor } from "../utils/matchHelpers";

const CompletedStateButtons = (props) => {
  const { match } = props;
  const store = useContext(StoreContext);
  const { sendRematchEvent } = useSocket(match?.wagerid);

  const [loading, setLoading] = useState(false);

  const handleRequestRematch = () => {
    if (isVisitor(store?.user?.username, match)) return;

    if (match?.rematchSent) return;

    setLoading(true);
    sendRematchEvent({
      tokenId: match?.wagerid,
      playerSendingInvite: store?.user?.username,
    });
  };

  useEffect(() => {
    if (match?.rematchSent) {
      setLoading(false);
    }
  }, [match]);

  if (isVisitor(store?.user?.username, match)) return null;

  if (isRedTeam(store?.user?.username, match) && match?.winner === 2)
    return null;

  if (isBlueTeam(store?.user?.username, match) && match?.winner === 1)
    return null;

  if (match?.isTourneyMatch) return null;

  return (
    <Grid item>
      <NewPrimaryButton
        label={match?.rematchSent ? "Rematch Sent" : "Request Rematch"}
        onClick={handleRequestRematch}
        disabled={match?.rematchSent}
        loading={loading}
        small={true}
      />
    </Grid>
  );
};

export default CompletedStateButtons;
