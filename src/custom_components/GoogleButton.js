import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import NewPrimaryButton from "./NewPrimaryButton";
import constants from "../utils/constants";
import google from "../assets/google.svg";

const GoogleButton = (props) => {
  const { label } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const verifyGoogle = () => {
    window.open(`${constants.serverUrl}/api/google-signup`, "_self");
  };

  return (
    <NewPrimaryButton
      label={label}
      backgroundColor={theme.white()}
      fullWidth
      onClick={verifyGoogle}
      textColor={theme.black()}
    >
      <img src={google} width={26} />
    </NewPrimaryButton>
  );
};

export default GoogleButton;
