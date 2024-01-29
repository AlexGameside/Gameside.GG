import { Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";

const Header = (props) => {
  const { label } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const styles = {
    title: {
      fontSize: 32,
      fontWeight: 700,
      color: theme.text(),
    },
  };

  return <Typography sx={styles.title}>{label}</Typography>;
};

export default Header;
