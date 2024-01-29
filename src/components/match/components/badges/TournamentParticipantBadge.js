import Badge from "./Badge";

const TournamentParticipantBadge = () => {
  return (
    <Badge label="Tournament Participant" color={"#transparent"} size={64}>
      <img
        src={
          "http://freeuncopyrightedgifswww.weebly.com/uploads/4/7/3/7/47378723/3230980_orig.gif"
        }
        height={64}
        width={64}
      />
    </Badge>
  );
};

export default TournamentParticipantBadge;
