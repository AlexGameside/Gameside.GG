import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";

const EgoBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge label="Has An Ego" color={"#transparent"}>
      <img
        src={"https://i.gifer.com/VtWU.gif"}
        height={52}
        width={52}
        style={{ borderRadius: 50 }}
      />
    </Badge>
  );
};

export default EgoBadge;
