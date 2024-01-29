import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";

const DroolerBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge label="Drooler" color={"#transparent"}>
      <img
        src={"https://c.tenor.com/fHHAqXvvcvAAAAAC/sponge-bob-square-pants.gif"}
        height={52}
        width={52}
        style={{ borderRadius: 50 }}
      />
    </Badge>
  );
};

export default DroolerBadge;
