import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import ValorantPoint from "../../../../svgs/ValorantPoint";

const ValorantPointBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge label="VP Collector" color={"transparent"} moveDown={0.5}>
      <ValorantPoint size={52} />
    </Badge>
  );
};

export default ValorantPointBadge;
