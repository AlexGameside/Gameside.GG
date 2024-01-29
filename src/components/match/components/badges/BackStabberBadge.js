import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import BackStabber from "../../../../svgs/BackStabber";

const BackStabberBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge label="Back Stabber" color={theme.offWhite()} moveDown={1} size={52}>
      <BackStabber size={38} />
    </Badge>
  );
};

export default BackStabberBadge;
