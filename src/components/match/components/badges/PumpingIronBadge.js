import Badge from "./Badge";

const PumpingIronBadge = () => {
  return (
    <Badge label="Pumping Iron" color={"#transparent"}>
      <img
        src={"https://c.tenor.com/Pxjl73jOnXIAAAAd/arnold-schwarzenegger.gif"}
        height={52}
        width={52}
        style={{ borderRadius: 50 }}
      />
    </Badge>
  );
};

export default PumpingIronBadge;
