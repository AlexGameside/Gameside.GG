import { useContext } from "react";
import { StoreContext } from "../../../context/NewStoreContext";
import createTheme from "../../../utils/theme";
import { Grid, Typography } from "@mui/material";
import { BsCheck } from "react-icons/bs";

const StateScrollItem = (props) => {
  // variables
  const {
    current = false,
    finished = false,
    title,
    description,
    isLast = false,
  } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  // styles
  const styles = {
    title: {
      fontSize: 18,
      fontWeight: 700,
      color: theme.text(),
      textShadow: `1px 1px #000`,
    },
    titleUnselected: {
      fontSize: 18,
      fontWeight: 700,
      color: theme.text(),
      opacity: 0.5,
      textShadow: `1px 1px #000`,
    },
    subTitle: {
      fontSize: 15,
      fontWeight: 400,
      color: theme.subText(),
      textShadow: `1px 1px #000`,
    },
    subTitleUnselected: {
      fontSize: 15,
      fontWeight: 400,
      color: theme.subText(),
      opacity: 0.5,
      textShadow: `1px 1px #000`,
    },
  };

  return (
    <Grid item sx={{ flexGrow: 1, minWidth: isLast ? 200 : 300 }}>
      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="center"
        gap={{ xs: 2 }}
      >
        <Grid item sx={{ width: "100%" }}>
          <Grid container justifyContent="start" alignItems="center">
            <Grid
              item
              sx={{
                height: 32,
                width: 32,
                borderRadius: 100,
                boxSizing: "border-box",
                border: `2px solid ${theme.border()}`,
                textAlign: "center",
                backgroundColor: current
                  ? theme.complementary()
                  : finished
                  ? theme.primary()
                  : theme.background(),
              }}
            >
              {finished ? (
                <BsCheck
                  style={{ color: theme.text(), fontSize: 24, marginTop: 2 }}
                />
              ) : null}
            </Grid>

            {isLast ? null : (
              <Grid item sx={{ flexGrow: 1 }}>
                <div
                  style={{
                    height: 2,
                    backgroundColor: theme.border(),
                    width: "100%",
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
          >
            <Grid item>
              <Typography sx={current ? styles.title : styles.titleUnselected}>
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                sx={current ? styles.subTitle : styles.subTitleUnselected}
              >
                {description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StateScrollItem;
