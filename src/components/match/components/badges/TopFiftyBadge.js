import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import TopFiftyClub from "../../../../svgs/TopFiftyClub";

const TopFiftyClubBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge label="Top 50 Earned Club" color={"transparent"}>
      <TopFiftyClub size={52} />
    </Badge>
  );
};

export default TopFiftyClubBadge;
