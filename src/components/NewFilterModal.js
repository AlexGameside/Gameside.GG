import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import {
  useMediaQuery,
  DialogContent,
  Grid,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const NewFilterModal = (props) => {
  // variables
  const { open, onClose, options, title, setFilter } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");

  // state
  const [selected, setSelected] = useState(null);

  // methods
  const handleClose = () => {
    setSelected(null);
    onClose();
  };

  // styles
  const styles = {
    card: {
      backgroundColor: theme.card(),
      minWidth: isDesktop ? 500 : 0,
      padding: "1%",
      borderRadius: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: 900,
      color: theme.text(),
      marginBottom: 4,
    },
    closeButton: {
      color: theme.iconButton(),
      backgroundColor: theme.cardHover(),
      borderRadius: 100,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: 10,
      top: 10,
      transition: "all .3s ease-in-out",
      "&:hover": {
        transform: "scale(1.1)",
        backgroundColor: theme.cardHover(),
      },
    },
    filter: {
      minWidth: 80,
      border: `2px solid ${theme.subText()}`,
      color: theme.subText(),
      fontSize: 14,
      textTransform: "none",
      fontWeight: 900,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .3s ease-in-out",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent",
        boxShadow: "0 0",
        transform: "scale(1.1)",
      },
    },
    selectedFilter: {
      minWidth: 80,
      border: `2px solid ${theme.blue()}`,
      color: theme.white(),
      fontSize: 14,
      textTransform: "none",
      fontWeight: 900,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .3s ease-in-out",
      backgroundColor: theme.blue(),
      "&:hover": {
        backgroundColor: theme.blue(),
        boxShadow: "0 0",
        transform: "scale(1.1)",
      },
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ style: styles.card }}
    >
      <DialogTitle sx={styles.title}>
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={styles.closeButton}
          >
            <CloseIcon sx={{ fontSize: 24 }} />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={{ xs: 4 }}
        >
          <Grid item>
            <Typography style={styles.title}>{title}</Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              rowSpacing={{ xs: 1, sm: 2 }}
            >
              {options?.map((option, i) => (
                <Grid item key={i}>
                  <Button
                    sx={
                      option === selected
                        ? styles?.selectedFilter
                        : styles.filter
                    }
                    onClick={() => {
                      setSelected(option);
                      if (selected === "true") {
                        setFilter.set(true);
                        onClose();
                        return;
                      }
                      if (selected === "false") {
                        setFilter.set(false);
                        setSelected(null);
                        onClose();
                        return;
                      }
                      setFilter.set(option);
                      setSelected(null);
                      onClose();
                      return;
                    }}
                  >
                    {option}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewFilterModal;
