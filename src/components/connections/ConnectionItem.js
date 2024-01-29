import { Grid, Typography, CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/NewStoreContext";
import createTheme from "../../utils/theme";
import { BiX } from "react-icons/bi";

const ConnectionItem = (props) => {
  const { children, label, value, onClick, canDelete, loading } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const [closeHovered, setCloseHovered] = useState(false);

  const styles = {
    label: {
      fontSize: 12,
      fontWeight: 400,
      color: theme.subText(),
    },
    value: {
      fontSize: 15,
      fontWeight: 600,
      color: theme.text(),
    },
  };

  return (
    <Grid
      item
      sx={{
        width: "100%",
        borderRadius: 2,
        boxSizing: "border-box",
        backgroundColor: theme.card(),
        padding: 2,
        position: "relative",
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Grid
            container
            justifyContent="start"
            alignItems="center"
            gap={{ xs: 2 }}
          >
            <Grid item>{children}</Grid>

            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="center"
              >
                <Grid item>
                  <Typography sx={styles.value}>{value}</Typography>
                </Grid>

                <Grid item>
                  <Typography sx={styles.label}>{label}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {canDelete ? (
          <>
            {loading ? (
              <Grid item>
                <CircularProgress size={24} sx={{ color: theme.white() }} />
              </Grid>
            ) : (
              <Grid
                item
                onMouseEnter={() => setCloseHovered(true)}
                onMouseLeave={() => setCloseHovered(false)}
                onClick={() => (loading ? null : onClick())}
              >
                <BiX
                  style={{
                    color: closeHovered ? theme.text() : theme.subText(),
                    fontSize: 24,
                    cursor: closeHovered ? "pointer" : "default",
                  }}
                />
              </Grid>
            )}
          </>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default ConnectionItem;
