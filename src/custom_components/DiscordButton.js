import { useContext } from "react";
import { FaDiscord } from "react-icons/fa";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import NewPrimaryButton from "./NewPrimaryButton";
import constants from "../utils/constants";

const DiscordButton = (props) => {
  const { label } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const verifyDiscord = () => {
    window.open(`${constants.serverUrl}/api/verifyDiscord`, "_self");
  };

  return (
    <NewPrimaryButton
      label={label}
      backgroundColor="#7289da"
      fullWidth
      onClick={verifyDiscord}
    >
      <FaDiscord style={{ fontSize: 22, color: theme.white() }} />
    </NewPrimaryButton>
  );
};

export const JoinDiscordButton = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const joinDiscord = () => {
    window.open('https://discord.gg/EZvFmXgam2', '_blank');
  };

  return (
    <NewPrimaryButton
      label={'Join the Discord'}
      backgroundColor="#7289da"
      fullWidth
      onClick={joinDiscord}
    >
      <FaDiscord style={{ fontSize: 22, color: theme.white() }} />
    </NewPrimaryButton>
  );
};

export default DiscordButton;
