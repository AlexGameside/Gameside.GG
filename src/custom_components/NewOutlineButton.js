import { Grid } from "@mui/material";
import { useContext, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";

const NewOutlineButton = (props) => {
  const {
    label,
    onClick,
    complementary = false,
    fontSize = 14,
    hasIcon = false,
  } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const [hovered, setHovered] = useState(false);

  const getTextColor = () => {
    return hovered && !complementary
      ? theme.primary(true)
      : complementary && !hovered
      ? theme.complementary()
      : complementary && hovered
      ? theme.complementary(true)
      : theme.primary();
  };

  const styles = {
    button: {
      backgroundColor: "transparent",
      transition: "all .2s ease-in-out",
      cursor: hovered ? "pointer" : "default",
    },
    text: {
      fontSize: fontSize,
      fontWeight: 600,
      color: getTextColor(),
    },
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={styles.button}
      onClick={onClick}
    >
      {hasIcon ? (
        <Grid
          container
          justifyContent="start"
          alignItems="center"
          gap={{ xs: 0.5 }}
        >
          <Grid item>
            <span style={styles.text}>{label}</span>
          </Grid>

          <Grid item sx={{ paddingTop: 0.7 }}>
            <BsArrowRight
              style={{
                fontSize: fontSize + 2,
                color: getTextColor(),
              }}
            />
          </Grid>
        </Grid>
      ) : (
        <span style={styles.text}>{label}</span>
      )}
    </div>
  );
};

export default NewOutlineButton;
