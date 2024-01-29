import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import SoftAim from "../../../../svgs/SoftAim";

const SoftAimBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge label="Softaim Accusations" color={"transparent"}>
      <SoftAim size={48} />
    </Badge>
  );
};

export default SoftAimBadge;
