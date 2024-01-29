import { Grid } from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../../../context/NewStoreContext";
import NewSecondaryButton from "../../../custom_components/NewSecondaryButton";
import { submitWagerResult } from "../../../utils/API";
import useAxios from "../../../utils/useAxios";
import { isVisitor } from "../utils/matchHelpers";

const DisputeStateButtons = (props) => {
  const { match } = props;
  const store = useContext(StoreContext);
  const api = useAxios();

  const [loading, setLoading] = useState(false);

  const handleForfeit = () => {
    if (loading) return;

    if (isVisitor(store?.user?.username, match)) return;

    setLoading(true);
    submitWagerResult(api, 0, match?.wagerid, store?.user?.username).then(
      (res) => {
        setLoading(false);
        return;
      }
    );
  };

  return isVisitor(store?.user?.username, match) ? null : (
    <Grid item>
      <NewSecondaryButton
        label="forfeit"
        loading={loading}
        onClick={handleForfeit}
        small={true}
      />
    </Grid>
  );
};

export default DisputeStateButtons;
