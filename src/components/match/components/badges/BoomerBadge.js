import Badge from "./Badge";
import Boomer from "../../../../svgs/Boomer";

const BoomerBadge = () => {
  return (
    <Badge label="Boomer" color={"#transparent"} size={54}>
      <Boomer size={62} />
    </Badge>
  );
};

export default BoomerBadge;
