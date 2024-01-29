import { Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";

const SectionHeader = (props) => {
  const { label, home = false } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const styles = {
    title: {
      fontWeight: home ? 700 : 600,
      fontSize: home ? 24 : 20,
      color: theme.text(),
    },
  };

  return <Typography sx={styles.title}>{label}</Typography>;
};

export default SectionHeader;
