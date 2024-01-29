import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import DownBad from "../../../../svgs/DownBad";

const DownBadBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge label="Down Horrendous" color={theme.offWhite()}>
      <DownBad size={34} />
    </Badge>
  );
};

export default DownBadBadge;
