import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";

const DownToTokenBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge label="Down To Token" color={"#transparent"}>
      <img
        src={"https://c.tenor.com/0b7HmfdXS0wAAAAd/ash.gif"}
        height={52}
        width={52}
        style={{ borderRadius: 50 }}
      />
    </Badge>
  );
};

export default DownToTokenBadge;
