import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import OGFN from "./OGFN";

const OGBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge label="TknsGG OG User" color={theme.offWhite()}>
      <OGFN size={36} />
    </Badge>
  );
};

export default OGBadge;
