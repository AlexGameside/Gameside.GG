import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";

const ScrimPlayerBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge label="Lost Scrim Virginity" color={"#transparent"}>
      <img
        src={"https://c.tenor.com/bU4xAB-jVGcAAAAd/reyna.gif"}
        height={52}
        width={52}
        style={{ borderRadius: 50 }}
      />
    </Badge>
  );
};

export default ScrimPlayerBadge;
