import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { BiX } from "react-icons/bi";

const NewAlertTypeEnum = {
  error: "error",
  success: "success",
};

const NewAlert = (props) => {
  const { type = NewAlertTypeEnum.error, label, clearMessage } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");

  const [message, setMessage] = useState(label);
  const [hovered, setHovered] = useState(false);
  const [timer, setTimer] = useState(null);

  const styles = {
    container: {
      backgroundColor:
        type === NewAlertTypeEnum.error ? theme.red() : theme.green(),
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      position: "fixed",
      boxShadow: theme.shadow(),
      bottom: isDesktop ? 55 : 10,
      minWidth: isDesktop ? 450 : isMobile ? "95%" : 0,
      zIndex: 1,
    },
  };

  useEffect(() => {
    if (label) {
      setMessage(label);
      setTimer(5000);
      document.getElementById("toast-progress").classList.add("active");
      return;
    }
  }, [label]);

  useEffect(() => {
    if (timer === 0) {
      setTimer(null);
      clearMessage();
    }
  }, [timer]);

  useEffect(() => {
    if (timer !== 0 && timer != null) {
      const timerId = setTimeout(() => {
        setTimer(timer - 1000);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  return message ? (
    <Grid item sx={styles.container}>
      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="center"
      >
        <Grid item sx={{ padding: 2, width: "100%" }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            gap={{ xs: 2 }}
            sx={{ width: "100%" }}
          >
            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="center"
              >
                <Grid item>
                  <Typography
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: theme.white(),
                    }}
                  >
                    {type === NewAlertTypeEnum.error ? "Error" : "Success"}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      color: theme.white(),
                    }}
                  >
                    {message}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              sx={{ "&:hover": { cursor: "pointer" } }}
              onClick={clearMessage}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <BiX
                style={{
                  color: hovered ? theme.text() : theme.white(),
                  fontSize: 24,
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          id="toast-progress"
          style={{
            width: "100%",
            backgroundColor:
              type === NewAlertTypeEnum.error ? "#fc8d98" : "#88fce1",
            height: 4,
          }}
        />
      </Grid>
    </Grid>
  ) : null;
};

export default NewAlert;
