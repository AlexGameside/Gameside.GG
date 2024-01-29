import BackStabberBadge from "./BackStabberBadge";
import CaughtEmAllBadge from "./CaughtEmAllBadge";
import DevBadge from "./DevBadge";
import DownBadBadge from "./DownBadBadge";
import DownToTokenBadge from "./DownToTokenBadge";
import DroolerBadge from "./DroolerBadge";
import DuoBadge from "./DuoBadge";
import EgoBadge from "./EgoBadge";
import EightyEightBadge from "./EightyEightBadge";
import HerJettBadge from "./HerJettBadge";
import HisSageBadge from "./HisSageBadge";
import NotZeroEarnedBadge from "./NotZeroEarnedBadge";
import OGBadge from "./OGBadge";
import PopularBadge from "./PopularBadge";
import PremiumBadge from "./PremiumBadge";
import ProfanityBadge from "./ProfanityBadge";
import PumpingIronBadge from "./PumpingIronBadge";
import RematchRiderBadge from "./RematchRiderBadge";
import ScrimPlayerBadge from "./ScrimPlayerBadge";
import ShakingBadge from "./ShakingBadge";
import SimpBadge from "./SimpBadge";
import SnitchBadge from "./SnitchBadge";
import SoftAimBadge from "./SoftAimBadge";
import StaffBadge from "./StaffBadge";
import TknsBuddyBadge from "./TknsBuddyBadge";
import TopEarnerBadge from "./TopEarnerBadge";
import TopFiftyClubBadge from "./TopFiftyBadge";
import TopHundredBadge from "./TopHundredBadge";
import TopTenClubBadge from "./TopTenClubBadge";
import TournamentHostBadge from "./TournamentHostBadge";
import TournamentParticipantBadge from "./TournamentParticipantBadge";
import TournamentWinnerBadge from "./TournamentWinnerBadge";
import ValorantPointBadge from "./ValorantPointBadge";
import VerifiedBadge from "./VerifiedBadge";
import BoomerBadge from "./BoomerBadge";
import BadgeButton from "./BadgeButton";
import { useEffect, useState } from "react";
import useAxios from "../../../../utils/useAxios";
import { hideOrShowBadge } from "../../../../utils/API";

const BadgeItem = (props) => {
  const { type, canEdit = false, hidden, badge = {} } = props;
  const api = useAxios();

  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsHidden(hidden);
  }, [hidden]);

  const showOrHideBadge = (hidden) => {
    setIsHidden(!isHidden);
    hideOrShowBadge(api, type, hidden).then((res) => {
      if (res?.error) {
        setIsHidden(!isHidden);
      }
    });
  };

  const getBadge = () => {
    switch (type) {
      case "isStaff":
        return <StaffBadge />;
      case "isPremium":
        return <PremiumBadge color={badge?.extras} />;
      case "isDownBad":
        return <DownBadBadge />;
      case "isEightyEight":
        return <EightyEightBadge />;
      case "isDev":
        return <DevBadge />;
      case "notZeroEarned":
        return <NotZeroEarnedBadge />;
      case "isOG":
        return <OGBadge />;
      case "isTopTenEarned":
        return <TopTenClubBadge />;
      case "isTopFiftyEarned":
        return <TopFiftyClubBadge />;
      case "isTopHundredEarned":
        return <TopHundredBadge />;
      case "isTopOneEarned":
        return <TopEarnerBadge />;
      case "isTknsBuddy":
        return <TknsBuddyBadge />;
      case "isCheating":
        return <SoftAimBadge />;
      case "downToToken":
        return <DownToTokenBadge />;
      case "isRematch":
        return <RematchRiderBadge />;
      case "isDrooler":
        return <DroolerBadge />;
      case "hasScrimmed":
        return <ScrimPlayerBadge />;
      case "verified":
        return <VerifiedBadge />;
      case "hasADuo":
        return <DuoBadge />;
      case "hasAnEgo":
        return <EgoBadge />;
      case "gainedVal":
        return <ValorantPointBadge />;
      case "backstabber":
        return <BackStabberBadge />;
      case "popular":
        return <PopularBadge />;
      case "hasPumpedIron":
        return <PumpingIronBadge />;
      case "isProfane":
        return <ProfanityBadge />;
      case "isSnitch":
        return <SnitchBadge />;
      case "caughtEmAll":
        return <CaughtEmAllBadge />;
      case "isShakingCup":
        return <ShakingBadge />;
      case "isSimp":
        return <SimpBadge />;
      case "herJett":
        return <HerJettBadge />;
      case "hisSage":
        return <HisSageBadge />;
      case "isTournamentWinner":
        return <TournamentWinnerBadge />;
      case "hasPlayedTourney":
        return <TournamentParticipantBadge />;
      case "hasHostedTourney":
        return <TournamentHostBadge />;
      case "isBoomer":
        return <BoomerBadge />;
    }
  };

  return canEdit ? (
    <div style={{ position: "relative" }}>
      {type === "isStaff" || type === "isPremium" ? null : (
        <BadgeButton
          hasBadge={!isHidden}
          onClick={() => showOrHideBadge(!isHidden)}
        />
      )}
      {getBadge()}
    </div>
  ) : (
    <>{getBadge()}</>
  );
};

export default BadgeItem;
