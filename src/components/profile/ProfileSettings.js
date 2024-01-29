import { Grid, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/NewStoreContext";
import createTheme from "../../utils/theme";
import Header from "../../custom_components/Header";
import SectionHeader from "../../custom_components/SectionHeader";
import NewInput from "../NewInput";

const ProfileSettings = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  // state
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("Christopher");
  const [birthday, setBirthday] = useState("03/10/1997");

  // effects
  useEffect(() => {
    if (store?.user) {
      setLoading(false);
    }
  }, [store]);

  // methods

  // styles
  const styles = {
    subtitle: {
      fontSize: 18,
      fontWeight: 400,
      color: theme.metaText(),
    },
  };

  return loading ? null : (
    <Grid
      container
      direction="column"
      alignItems="start"
      justifyContent="center"
      gap={{ xs: 4 }}
    >
      <Grid item sx={{ width: "100%" }}>
        <Grid
          container
          direction="column"
          alignItems="start"
          justifyContent="center"
        >
          <Grid item>
            <Header label="Profile Settings" />
          </Grid>
          <Grid item>
            <Typography sx={styles.subtitle}>
              Other users cannot see your personal information.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item sx={{ width: "100%" }}>
        <Grid
          container
          direction="column"
          alignItems="start"
          justifyContent="center"
          gap={{ xs: 1 }}
        >
          <Grid item>
            <SectionHeader label="Full name" />
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <NewInput
              value={fullName}
              placeholder="Full name"
              onChange={setFullName}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item sx={{ width: "100%" }}>
        <Grid
          container
          direction="column"
          alignItems="start"
          justifyContent="center"
          gap={{ xs: 1 }}
        >
          <Grid item>
            <SectionHeader label="Date of birth" />
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <NewInput
              value={birthday}
              placeholder="Birthday"
              onChange={setBirthday}
              disabled
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileSettings;
