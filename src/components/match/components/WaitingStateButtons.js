import { Grid } from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../../../context/NewStoreContext";
import NewSecondaryButton from "../../../custom_components/NewSecondaryButton";
import { cancelWager } from "../../../utils/API";
import useAxios from "../../../utils/useAxios";
import { isVisitor } from "../utils/matchHelpers";

const WaitingStateButtons = (props) => {
  const { match } = props;
  const store = useContext(StoreContext);
  const api = useAxios();

  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setLoading(true);
    cancelWager(api, match?.wagerid, store?.user?.username).then((res) => {
      setLoading(false);
    });
  };

  if (isVisitor(store?.user?.username, match)) {
    return null;
  }

  return (
    <Grid item>
      <NewSecondaryButton
        label="cancel"
        loading={loading}
        onClick={handleCancel}
        small={true}
      />
    </Grid>
  );
};

export default WaitingStateButtons;
