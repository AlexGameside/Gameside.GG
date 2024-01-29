import { Button, Grid, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { StoreContext } from "../../../context/NewStoreContext";
import createTheme from "../../../utils/theme";
import useSocket from "../../../utils/useSocket";

const ReadyStateButtons = (props) => {
  const { match } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const { sendReadyEvent } = useSocket(match?.wagerid);

  const [loading, setLoading] = useState(false);
  const [readied, setReadied] = useState(false);

  const handleOnReadyClick = () => {
    setLoading(true);
    sendReadyEvent({
      username: store?.user?.username,
      wagerId: match?.wagerid,
    });
  };

  useEffect(() => {
    if (match) {
      const index = match?.readied_users?.indexOf(store?.user?.username);
      if (match?.is_readied) {
        if (match?.is_readied[index]) {
          setReadied(true);
          setLoading(false);
        }
      }
    }
  }, [match]);

  const styles = {
    ready: {
      color: theme.white(),
      fontSize: 11,
      fontWeight: 700,
      borderRadius: 2,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: 50,
      height: 30,
      backgroundColor: theme.green(),
      "&:hover": {
        backgroundImage: theme.buttonHover(),
        backgroundColor: theme.green(),
        boxShadow: "0 0",
      },
    },
    readied: {
      color: theme.metaText(),
      fontSize: 11,
      fontWeight: 700,
      borderRadius: 2,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: 50,
      height: 30,
      backgroundColor: theme.border(),
      cursor: "not-allowed",
      "&:hover": {
        backgroundColor: theme.border(),
        boxShadow: "0 0",
        cursor: "not-allowed",
      },
    },
  };

  return (
    <Grid>
      <Button
        size="small"
        variant="contained"
        sx={readied || loading ? styles.readied : styles.ready}
        onClick={handleOnReadyClick}
      >
        {readied ? (
          <BiCheck style={{ fontSize: 24, color: theme.metaText() }} />
        ) : loading ? (
          <CircularProgress size={20} sx={{ color: theme.metaText() }} />
        ) : (
          "READY UP"
        )}
      </Button>
    </Grid>
  );
};

export default ReadyStateButtons;
