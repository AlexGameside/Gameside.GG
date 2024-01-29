import { useContext } from "react";
import { StoreContext } from "../../../context/NewStoreContext";
import createTheme from "../../../utils/theme";
import WaitingStateButtons from "./WaitingStateButtons";
import { Grid } from "@mui/material";
import ReadyStateButtons from "./ReadyStateButtons";
import PlayingStateButtons from "./PlayingStateButtons";
import DisputeStateButtons from "./DisputeStateButtons";
import CompletedStateButtons from "./CompletedStateButtons";
import NewPrimaryButton from "../../../custom_components/NewPrimaryButton";

const StateButtons = (props) => {
  // variables
  const { match, setSelected, agreedUsers } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  // methods
  const getStateButtons = () => {
    switch (match?.state) {
      case -1:
        return null;
      case 0:
        return <WaitingStateButtons match={match} />;
      case 1:
        return <ReadyStateButtons match={match} />;
      case 2:
        return match?.state === 2 && match?.isVoting ? (
          <Grid item>
            <NewPrimaryButton
              label="Pick Maps"
              onClick={() => setSelected("map")}
              small={true}
            />
          </Grid>
        ) : (
          <PlayingStateButtons match={match} agreedUsers={agreedUsers} />
        );
      case 4:
        return <DisputeStateButtons match={match} />;
      case 3:
        return <CompletedStateButtons match={match} />;
      default:
        return null;
    }
  };

  return (
    <Grid item>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        gap={{ xs: 1 }}
      >
        {getStateButtons(match?.state)}
      </Grid>
    </Grid>
  );
};

export default StateButtons;
