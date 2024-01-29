import Badge from "./Badge";

const TournamentHostBadge = () => {
  return (
    <Badge label="Tournament Host" color={"#transparent"} size={64}>
      <img
        src={
          "https://i.gifer.com/origin/2d/2d4adaf81d4a24d3da1a5c93834e56b9.gif"
        }
        height={64}
        width={64}
      />
    </Badge>
  );
};

export default TournamentHostBadge;
