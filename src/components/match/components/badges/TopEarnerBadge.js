import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import TopEarner from "../../../../svgs/TopEarner";

const TopEarnerBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge
      label="Most Earned Club"
      color={theme.offWhite()}
      glow={theme.glow(theme.purple())}
    >
      <TopEarner size={48} />
    </Badge>
  );
};

export default TopEarnerBadge;
