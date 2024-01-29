import Badge from "./Badge";
import Snitch from "../../../../svgs/Snitch";

const SnitchBadge = () => {
  return (
    <Badge label="Snitch" color={"#transparent"}>
      <Snitch size={58} />
    </Badge>
  );
};

export default SnitchBadge;
