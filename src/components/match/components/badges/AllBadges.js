import { Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import Header from "../../../../custom_components/Header";
import NotZeroEarnedBadge from "./NotZeroEarnedBadge";
import DevBadge from "./DevBadge";
import DownBadBadge from "./DownBadBadge";
import DroolerBadge from "./DroolerBadge";
import EightyEightBadge from "./EightyEightBadge";
import OGBadge from "./OGBadge";
import PremiumBadge from "./PremiumBadge";
import RematchRiderBadge from "./RematchRiderBadge";
import SoftAimBadge from "./SoftAimBadge";
import StaffBadge from "./StaffBadge";
import TknsBuddyBadge from "./TknsBuddyBadge";
import TopEarnerBadge from "./TopEarnerBadge";
import TopFiftyClubBadge from "./TopFiftyBadge";
import TopTenClubBadge from "./TopTenClubBadge";
import TopHundredBadge from "./TopHundredBadge";
import BadgeInfoDialog from "./BadgeInfoDialog";
import ScrimPlayerBadge from "./ScrimPlayerBadge";
import DownToTokenBadge from "./DownToTokenBadge";
import VerifiedBadge from "./VerifiedBadge";
import DuoBadge from "./DuoBadge";
import EgoBadge from "./EgoBadge";
import ValorantPointBadge from "./ValorantPointBadge";
import BackStabberBadge from "./BackStabberBadge";
import PopularBadge from "./PopularBadge";
import PumpingIronBadge from "./PumpingIronBadge";
import ProfanityBadge from "./ProfanityBadge";
import SnitchBadge from "./SnitchBadge";
import CaughtEmAllBadge from "./CaughtEmAllBadge";
import ShakingBadge from "./ShakingBadge";
import SimpBadge from "./SimpBadge";
import HerJettBadge from "./HerJettBadge";
import HisSageBadge from "./HisSageBadge";
import TournamentWinnerBadge from "./TournamentWinnerBadge";
import TournamentParticipantBadge from "./TournamentParticipantBadge";
import TournamentHostBadge from "./TournamentHostBadge";
import BoomerBadge from "./BoomerBadge";

const AllBadges = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  // state
  // const [open, setOpen] = useState(false);
  // const [selected, setSelected] = useState(null);
  // const [label, setLabel] = useState(null);

  // methods

  // effects
  useEffect(() => {
    theme.changeWebsiteBackground();
  }, [store.mode]);

  // styles
  const styles = {
    subtitle: {
      fontSize: 18,
      fontWeight: 400,
      color: theme.metaText(),
    },
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="start"
      direction="column"
      gap={{ xs: 4 }}
      sx={{
        minHeight: "100vh",
      }}
      wrap="nowrap"
    >
      {/* <BadgeInfoDialog
        badge={selected}
        open={open}
        onClose={() => {
          setOpen(false);
          setLabel(null);
          setSelected(null);
        }}
        label={label}
      /> */}

      <Grid item sx={{ width: "100%" }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="start"
        >
          <Grid item>
            <Header label="Badges" />
          </Grid>
          <Grid item>
            <Typography sx={styles.subtitle}>
              All the badges available on Gameside. Badges are earned through
              website achievements and some can only be received from a staff
              member. We are constantly adding new badges!
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        sx={{
          width: "100%",
          padding: 2,
          borderRadius: 2,
          border: `1px solid ${theme.border()}`,
          backgroundColor: theme.cardDark(),
        }}
      >
        <Grid
          container
          justifyContent="start"
          alignItems="center"
          gap={{ xs: 1 }}
        >
          <NotZeroEarnedBadge
          // onClick={() => {
          //   setSelected("Not Zero Earned");
          //   setLabel("Achieved by earning in a cash match or tournament.");
          //   setOpen(true);
          // }}
          />
          <DevBadge />
          <DownBadBadge />
          <DroolerBadge />
          <EightyEightBadge />
          <OGBadge />
          <PremiumBadge color={theme.primary()} />
          <RematchRiderBadge />
          <DownToTokenBadge />
          <SoftAimBadge />
          <StaffBadge />
          <TopTenClubBadge />
          <TopFiftyClubBadge />
          <TopHundredBadge />
          <TknsBuddyBadge />
          <TopEarnerBadge />
          <ScrimPlayerBadge />
          <VerifiedBadge />
          <DuoBadge />
          <EgoBadge />
          <ValorantPointBadge />
          <BackStabberBadge />
          <PopularBadge />
          <PumpingIronBadge />
          <ProfanityBadge />
          <SnitchBadge />
          <CaughtEmAllBadge />
          <ShakingBadge />
          <SimpBadge />
          <HerJettBadge />
          <HisSageBadge />
          <TournamentWinnerBadge />
          <TournamentParticipantBadge />
          <TournamentHostBadge />
          <BoomerBadge />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AllBadges;
