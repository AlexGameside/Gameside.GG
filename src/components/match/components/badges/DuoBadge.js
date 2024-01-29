import Badge from "./Badge";

const DuoBadge = () => {
  return (
    <Badge label="Has a Duo" color={"#transparent"}>
      <img
        src={"https://c.tenor.com/B3s8t5iP3_cAAAAd/cat-hugging.gif"}
        height={52}
        width={52}
        style={{ borderRadius: 50 }}
      />
    </Badge>
  );
};

export default DuoBadge;
