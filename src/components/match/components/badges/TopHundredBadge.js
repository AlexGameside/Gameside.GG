import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import TopHundred from "../../../../svgs/TopHundredClub";

const TopHundredBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge label="Top 100 Earned Club" color={"transparent"}>
      <TopHundred size={56} />
    </Badge>
  );
};

export default TopHundredBadge;
