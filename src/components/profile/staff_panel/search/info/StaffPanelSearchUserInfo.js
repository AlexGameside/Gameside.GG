import { Grid } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../../../../../context/NewStoreContext";
import createTheme from "../../../../../utils/theme";
import { getDateForMatch } from "../../../../../utils/helperMethods";
import StaffPanelSearchUserInfoDataRow from "./StaffPanelSearchUserInfoDataRow";

const StaffPanelSearchUserInfo = (props) => {
  const { userData, isBanned, role } = props;
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Grid
      item
      sx={{
        width: "100%",
        padding: 2,
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="center"
        gap={{ xs: 1 }}
      >
        <StaffPanelSearchUserInfoDataRow
          label="Account created on"
          value={getDateForMatch(userData?._id)}
        />

        <StaffPanelSearchUserInfoDataRow
          label="Email"
          value={userData?.email}
        />

        <StaffPanelSearchUserInfoDataRow
          label="Balance"
          value={numFormatter.format(userData?.balance)}
        />

        <StaffPanelSearchUserInfoDataRow
          label="Max withdrawal"
          value={numFormatter.format(userData?.max_withdrawal)}
        />

        <StaffPanelSearchUserInfoDataRow
          label="Banned"
          value={`${isBanned}`}
          color={isBanned ? theme.red() : theme.green()}
        />

        <StaffPanelSearchUserInfoDataRow
          label="Prior bans"
          value={userData?.prior_bans}
        />

        <StaffPanelSearchUserInfoDataRow
          label="Pun points"
          value={userData?.pun_points}
        />

        <StaffPanelSearchUserInfoDataRow label="Role" value={role} />
      </Grid>
    </Grid>
  );
};

export default StaffPanelSearchUserInfo;
