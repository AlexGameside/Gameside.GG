import { Grid } from "@mui/material";
import { useContext } from "react";
import { GlobalStateContext } from "../context/StoreContext";
import TokenItem from "./TokenItem";

const TokensContainer = (props) => {
  const { wagers } = props;
  const store = useContext(GlobalStateContext);

  if (!wagers) {
    return null;
  }

  const filteredTokens = wagers?.filter((wager) => {
    return !wager?.blueteam_users?.includes(store?.user?.username);
  });

  return (
    <Grid
      container
      justifyContent="space-between"
      rowSpacing={{ xs: 1 }}
      columnSpacing={{ xs: 10 }}
    >
      {filteredTokens?.map((wager, i) => (
        <>
          <TokenItem wager={wager} key={i} />
        </>
      ))}
    </Grid>
  );
};

export default TokensContainer;
