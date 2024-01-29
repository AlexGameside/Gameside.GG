import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import SectionHeader from "../../../../../custom_components/SectionHeader";
import { giveOrTakeBadge } from "../../../../../utils/api/admin";
import useAxios from "../../../../../utils/useAxios";
import DevBadge from "../../../../match/components/badges/DevBadge";
import DroolerBadge from "../../../../match/components/badges/DroolerBadge";
import EightyEightBadge from "../../../../match/components/badges/EightyEightBadge";
import HerJettBadge from "../../../../match/components/badges/HerJettBadge";
import HisSageBadge from "../../../../match/components/badges/HisSageBadge";
import RematchRiderBadge from "../../../../match/components/badges/RematchRiderBadge";
import SimpBadge from "../../../../match/components/badges/SimpBadge";
import SoftAimBadge from "../../../../match/components/badges/SoftAimBadge";
import TknsBuddyBadge from "../../../../match/components/badges/TknsBuddyBadge";
import VerifiedBadge from "../../../../match/components/badges/VerifiedBadge";
import BadgeButton from "../../../../match/components/badges/BadgeButton";

const StaffPanelSearchUserBadges = (props) => {
  const { badges, username } = props;
  const api = useAxios();

  const [isDev, setIsDev] = useState(false);
  const [is88, setIs88] = useState(false);
  const [isTknsBuddy, setIsTknsBuddy] = useState(false);
  const [isCheating, setIsCheating] = useState(false);
  const [isRematch, setIsRematch] = useState(false);
  const [isDrooler, setIsDrooler] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSimp, setIsSimp] = useState(false);
  const [hisSage, setHisSage] = useState(false);
  const [herJett, setHerJett] = useState(false);

  useEffect(() => {
    setIsDev(badges?.isDev?.hasBadge ?? false);
    setIs88(badges?.isEightyEight?.hasBadge ?? false);
    setIsTknsBuddy(badges?.isTknsBuddy?.hasBadge ?? false);
    setIsCheating(badges?.isCheating?.hasBadge ?? false);
    setIsRematch(badges?.isRematch?.hasBadge ?? false);
    setIsDrooler(badges?.isDrooler?.hasBadge ?? false);
    setIsVerified(badges?.isVerified?.hasBadge ?? false);
    setIsSimp(badges?.isSimp?.hasBadge ?? false);
    setHisSage(badges?.hisSage?.hasBadge ?? false);
    setHerJett(badges?.herJett?.hasBadge ?? false);
  }, [badges]);

  const setBadgeType = (val, badgeType) => {
    switch (badgeType) {
      case "isDev":
        setIsDev(val);
        break;
      case "isEightyEight":
        setIs88(val);
        break;
      case "isTknsBuddy":
        setIsTknsBuddy(val);
        break;
      case "isCheating":
        setIsCheating(val);
        break;
      case "isRematch":
        setIsRematch(val);
        break;
      case "isDrooler":
        setIsDrooler(val);
        break;
      case "isVerified":
        setIsVerified(val);
        break;
      case "isSimp":
        setIsSimp(val);
        break;
      case "hisSage":
        setHisSage(val);
        break;
      case "herJett":
        setHerJett(val);
    }
  };

  const giveOrRemoveBadge = (badgeType, value, label, description) => {
    setBadgeType(value, badgeType);
    giveOrTakeBadge(api, username, badgeType, {
      hasBadge: value,
      isHidden: false,
      label,
      description,
    }).then((res) => {
      if (res?.error) {
        setBadgeType(!value, badgeType);
      }
    });
  };

  return (
    <Grid sx={{ width: "100%" }}>
      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="center"
        gap={{ xs: 2 }}
      >
        <Grid item>
          <SectionHeader label="Badges" />
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            gap={{ xs: 2 }}
            justifyContent="start"
            alignItems="center"
          >
            <Grid item sx={{ position: "relative" }}>
              <BadgeButton
                hasBadge={is88}
                onClick={() =>
                  giveOrRemoveBadge(
                    "isEightyEight",
                    !is88,
                    "88",
                    "Achieved by being a member of 88."
                  )
                }
              />
              <EightyEightBadge />
            </Grid>

            <Grid item sx={{ position: "relative" }}>
              <BadgeButton
                hasBadge={isDev}
                onClick={() =>
                  giveOrRemoveBadge(
                    "isDev",
                    !isDev,
                    "TknsGG Developer",
                    "Achieved by being a developer for TknsGG."
                  )
                }
              />
              <DevBadge />
            </Grid>

            <Grid item sx={{ position: "relative" }}>
              <BadgeButton
                hasBadge={isTknsBuddy}
                onClick={() =>
                  giveOrRemoveBadge(
                    "isTknsBuddy",
                    !isTknsBuddy,
                    "Tkns Buddy",
                    "Given from a staff member."
                  )
                }
              />
              <TknsBuddyBadge />
            </Grid>

            <Grid item sx={{ position: "relative" }}>
              <BadgeButton
                hasBadge={isCheating}
                onClick={() =>
                  giveOrRemoveBadge(
                    "isCheating",
                    !isCheating,
                    "Softaim Accusations",
                    "Achieved for having suspect aim."
                  )
                }
              />
              <SoftAimBadge />
            </Grid>

            <Grid item sx={{ position: "relative" }}>
              <BadgeButton
                hasBadge={isRematch}
                onClick={() =>
                  giveOrRemoveBadge(
                    "isRematch",
                    !isRematch,
                    "Rematch Rider",
                    "Achieved by riding Rematch."
                  )
                }
              />
              <RematchRiderBadge />
            </Grid>

            <Grid item sx={{ position: "relative" }}>
              <BadgeButton
                hasBadge={isDrooler}
                onClick={() =>
                  giveOrRemoveBadge(
                    "isDrooler",
                    !isDrooler,
                    "Drooler",
                    "Achieved by being a straight drooler."
                  )
                }
              />
              <DroolerBadge />
            </Grid>

            <Grid item sx={{ position: "relative" }}>
              <BadgeButton
                hasBadge={isVerified}
                onClick={() =>
                  giveOrRemoveBadge(
                    "isVerified",
                    !isVerified,
                    "Community Figure",
                    "Achieved by being verified."
                  )
                }
              />
              <VerifiedBadge />
            </Grid>

            <Grid item sx={{ position: "relative" }}>
              <BadgeButton
                hasBadge={isSimp}
                onClick={() =>
                  giveOrRemoveBadge(
                    "isSimp",
                    !isSimp,
                    "Verified Simp",
                    "Achieved by being a simp."
                  )
                }
              />
              <SimpBadge />
            </Grid>

            <Grid item sx={{ position: "relative" }}>
              <BadgeButton
                hasBadge={herJett}
                onClick={() =>
                  giveOrRemoveBadge(
                    "herJett",
                    !herJett,
                    "Her Jett",
                    "Achieved by being her Jett <3."
                  )
                }
              />
              <HerJettBadge />
            </Grid>

            <Grid item sx={{ position: "relative" }}>
              <BadgeButton
                hasBadge={hisSage}
                onClick={() =>
                  giveOrRemoveBadge(
                    "hisSage",
                    !hisSage,
                    "His Sage",
                    "Achieved by being his Sage <3."
                  )
                }
              />
              <HisSageBadge />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StaffPanelSearchUserBadges;
