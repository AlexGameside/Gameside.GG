import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import EightyEight from "../../../../svgs/EightyEight";

const EightyEightBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge label="88" color={"#a2ad59"} moveDown={0.5}>
      <EightyEight size={34} />
    </Badge>
  );
};

export default EightyEightBadge;
