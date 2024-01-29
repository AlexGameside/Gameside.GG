import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import TknsBuddy from "../../../../svgs/TknsBuddy";

const TknsBuddyBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge
      label="Tkns Buddy"
      color={"transparent"}
      gradient={`linear-gradient(${theme.card()}, ${theme.card()}, ${theme.card()}, ${theme.offWhite()})`}
      moveDown={1}
    >
      <TknsBuddy size={32} />
    </Badge>
  );
};

export default TknsBuddyBadge;
