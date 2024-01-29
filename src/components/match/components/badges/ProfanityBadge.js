import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import Profanity from "../../../../svgs/Profanity";

const ProfanityBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge label="Potty Mouth" color={"#transparent"}>
      <Profanity size={52} />
    </Badge>
  );
};

export default ProfanityBadge;
