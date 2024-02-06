import { useContext } from "react";
import { FaKeyboard } from "react-icons/fa";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import Badge from "./Badge";

const DevBadge = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Badge label="Gameside Developer" color={theme.purple()} moveDown={0.5}>
      <FaKeyboard style={{ fontSize: 32, color: theme.text() }} />
    </Badge>
  );
};

export default DevBadge;
