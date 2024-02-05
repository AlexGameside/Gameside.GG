import { useContext } from "react";
import { FaTwitch } from "react-icons/fa";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import NewPrimaryButton from "./NewPrimaryButton";
import constants from "../utils/constants";

const TwitchButton = (props) => {
  const { label } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const verifyTwitch = () => {
    window.open(`${constants.serverUrl}/api/twitch-signup`, "_self");
  };

  return (
    <NewPrimaryButton
      label={label}
      backgroundColor="#6441a5"
      fullWidth
      onClick={verifyTwitch}
    >
      <FaTwitch style={{ fontSize: 22, color: theme.white() }} />
    </NewPrimaryButton>
  );
};

export default TwitchButton;
