import { useContext, useState } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import { BiPlus, BiX } from "react-icons/bi";

const BadgeButton = (props) => {
  const { hasBadge, onClick } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        height: 20,
        width: 20,
        borderRadius: 50,
        right: -5,
        top: -5,
        backgroundColor: hasBadge ? theme.red() : theme.green(),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: theme.shadow(),
        zIndex: 10,
        cursor: hovered ? "pointer" : "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {!hasBadge ? (
        <BiPlus style={{ fontSize: 20, color: theme.white() }} />
      ) : (
        <BiX style={{ fontSize: 20, color: theme.white() }} />
      )}
    </div>
  );
};

export default BadgeButton;
