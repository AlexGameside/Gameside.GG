import {
  Grid,
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import constants from "../utils/constants";
import { useState } from "react";

const SubmitWonModal = (props) => {
  const { open, onClose, team, handleSubmit } = props;
  const [loading, setLoading] = useState(false);

  const styles = {
    button: {
      border: `2px solid ${
        team === "blue" ? constants.newBlue : constants.newOrange
      }`,
      fontSize: 18,
      width: "100%",
      color: constants.white,
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor:
        team === "blue" ? constants.newBlue : constants.newOrange,
      "&:hover": {
        backgroundColor:
          team === "blue" ? constants.newBlue : constants.newOrange,
        opacity: 0.7,
        color: constants.white,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{ fontWeight: 900, color: constants.newGray, fontSize: 26 }}
      >
        Submit Win?
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minWidth: 200, padding: 2, width: "100%" }}
        >
          <Grid item>
            <Button
              disabled={loading}
              variant="contained"
              size="large"
              sx={styles.button}
              onClick={() => handleSubmit(1, team, setLoading)}
            >
              My Team Won
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitWonModal;