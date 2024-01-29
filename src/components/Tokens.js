import TokensContainer from "./TokensContainer";
import TokenFilters from "./TokenFilters";
import { Grid, Typography, Button, IconButton } from "@mui/material";
import constants from "../utils/constants";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GlobalState, { GlobalStateContext } from "../context/StoreContext";
import { useContext, useState } from "react";

const Tokens = () => {
  const store = useContext(GlobalStateContext);
  const { wagers } = useContext(GlobalStateContext);
  const [page, setPage] = useState(1);
  const itemsPerPage = store?.currentWagerId ? 10 : 12;

  const styles = {
    arrowIcon: {
      color: constants.blue,
      fontSize: 35,
    },
  };

  const calculateWagers = (pageNum, itemsPer, wagerArr) => {
    if (!wagerArr) {
      return [];
    }
    const lastNum = pageNum * itemsPer;
    const firstNum = lastNum - itemsPer;

    return wagerArr.slice(firstNum, lastNum);
  };

  const calculateTokensLabel = (pageNum, itemsPer, wagerArr) => {
    if (!wagerArr) {
      return `0 of 0 Tokens`;
    }
    if (wagerArr.length < 10) {
      return `${wagerArr.length} of ${wagerArr.length} Tokens`;
    }
    if (calculateWagers(pageNum, itemsPer, wagerArr).length < itemsPer) {
      return `${wagerArr.length} of ${wagerArr.length}`;
    }
    const lastNum = wagerArr.length;
    const firstNum = pageNum * itemsPer;
    return `${firstNum} of ${lastNum} Tokens`;
  };

  return (
    <>
      <Grid container alignItems="center" sx={{ width: "100%" }}>
        <TokenFilters />
        <TokensContainer wagers={calculateWagers(page, itemsPerPage, wagers)} />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item sx={{ marginTop: 2 }}>
            <Typography sx={{ color: constants.black }}>
              {calculateTokensLabel(page, itemsPerPage, wagers)}
            </Typography>
          </Grid>
          <Grid item sx={{ marginTop: 1 }}>
            {page === 1 ? null : (
              <IconButton
                onClick={() => {
                  if (page > 1) {
                    const newPage = page - 1;
                    setPage(newPage);
                  }
                }}
              >
                <ArrowBackIcon sx={styles.arrowIcon} />
              </IconButton>
            )}
            {calculateWagers(page, itemsPerPage, wagers).length <
              itemsPerPage || wagers?.length <= 10 ? null : (
              <IconButton
                onClick={() => {
                  const newPage = page + 1;
                  setPage(newPage);
                }}
              >
                <ArrowForwardIcon sx={styles.arrowIcon} />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Tokens;
