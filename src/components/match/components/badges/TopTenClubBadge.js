import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import TopTenClub from "../../../../svgs/TopTenClub";

const TopTenClubBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge label="Top 10 Earned Club" color={"transparent"}>
      <TopTenClub size={52} />
    </Badge>
  );
};

export default TopTenClubBadge;
