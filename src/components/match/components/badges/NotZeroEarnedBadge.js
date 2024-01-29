import Badge from "./Badge";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";

const NotZeroEarnedBadge = (props) => {
  const { onClick, size = 52 } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge
      label="Not Zero Earned"
      color={"#transparent"}
      onClick={onClick}
      size={size}
    >
      <img
        src={"https://c.tenor.com/RCBLM9AmJzkAAAAd/dollar-bills-cash.gif"}
        height={size}
        width={size}
        style={{ borderRadius: 50 }}
      />
    </Badge>
  );
};

export default NotZeroEarnedBadge;
