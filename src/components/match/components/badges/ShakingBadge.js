import Badge from "./Badge";

const ShakingBadge = () => {
  return (
    <Badge label="Needs Funds" color={"#transparent"}>
      <img
        src={
          "https://66.media.tumblr.com/fbee9a85f303a558b5d886a48674843e/tumblr_nllarc7D8Y1qa1s2no3_r1_250.gif"
        }
        height={52}
        width={52}
        style={{ borderRadius: 50 }}
      />
    </Badge>
  );
};

export default ShakingBadge;
