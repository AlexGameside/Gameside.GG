import { Grid, Typography, CircularProgress } from "@mui/material";
import { useEffect, useContext, useState } from "react";
import useAxios from "../../../../utils/useAxios";
import createTheme from "../../../../utils/theme";
import { StoreContext } from "../../../../context/NewStoreContext";
import { RiSwordFill } from "react-icons/ri";
import constants from "../../../../utils/constants";
import EmptyList from "../../../../custom_components/EmptyList";
import NewAlert from "../../../../custom_components/NewAlert";
import { getDisputes } from "../../../../utils/api/admin";

const StaffPanelDisputes = () => {
  // constants
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const api = useAxios();

  // state
  const [disputeIds, setDisputesIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // methods
  const getTokenDisputes = () => {
    getDisputes(api).then((res) => {
      setLoading(false);
      if (!res?.error) {
        setDisputesIds(res?.disputes);
      } else {
        setError(res?.message);
        setDisputesIds([]);
      }
    });
  };

  const openDispute = (dispute) => {
    window.open(dispute, "_blank");
  };

  // effects
  useEffect(() => {
    getTokenDisputes();
  }, []);

  // styles
  const styles = {
    disputeContainer: {
      width: "100%",
      borderRadius: 2,
      padding: 2,
      backgroundColor: theme.card(),
      border: `1px solid ${theme.border()}`,
      "&:hover": {
        cursor: "pointer",
        backgroundColor: theme.cardHover(),
      },
    },
    disputeText: {
      fontSize: 15,
      color: theme.text(),
      fontWeight: 400,
    },
    icon: theme.emptyListIconStyle(),
  };

  return (
    <>
      {loading ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          <Grid item sx={{ marginTop: 10 }}>
            <CircularProgress size={50} sx={{ color: theme.primary() }} />
          </Grid>
        </Grid>
      ) : (
        <>
          {error ? (
            <NewAlert label={error} clearMessage={() => setError(null)} />
          ) : null}
          <Grid
            container
            direction="row"
            columnSpacing={{ xs: 1, sm: 2 }}
            rowSpacing={{ xs: 1, sm: 2 }}
            sx={{ padding: 2 }}
          >
            {disputeIds?.length < 1 ? (
              <EmptyList
                title={"No Disputes Yet!"}
                label={"When Disputes happen, they will show up here."}
                center
              >
                <RiSwordFill style={styles.icon} />
              </EmptyList>
            ) : (
              disputeIds?.map((id, i) => {
                return (
                  <Grid
                    item
                    sx={styles.disputeContainer}
                    key={i}
                    onClick={() =>
                      openDispute(`${constants.clientUrl}/token/${id}`)
                    }
                  >
                    <Typography sx={styles.disputeText}>{id}</Typography>
                  </Grid>
                );
              })
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default StaffPanelDisputes;
