import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import Verified from "../../../../svgs/Verified";

const VerifiedBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge label="Community Figure" color={"transparent"}>
      <Verified size={58} />
    </Badge>
  );
};

export default VerifiedBadge;
