import Badge from "./Badge";

const TournamentWinnerBadge = () => {
  return (
    <Badge label="Tournament Champ" color={"#transparent"} size={64}>
      <img
        src={
          "https://gifimage.net/wp-content/uploads/2018/05/spongebob-transparent-gif-11.gif"
        }
        height={64}
        width={64}
      />
    </Badge>
  );
};

export default TournamentWinnerBadge;
