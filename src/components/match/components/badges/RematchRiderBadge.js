import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import RematchRider from "../../../../svgs/RematchRider";

const RematchRiderBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge label="Rematch Rider" color={"transparent"}>
      <RematchRider size={58} />
    </Badge>
  );
};

export default RematchRiderBadge;
