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
    window.open(`${constants.serverURL}/api/verifyDiscord`, "_self");
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

export default DiscordButton;
