import Badge from "./Badge";
import Simp from "../../../../svgs/Simp";

const SimpBadge = () => {
  return (
    <Badge label="Verified Simp" color={"#transparent"} size={64}>
      <Simp size={72} />
    </Badge>
  );
};

export default SimpBadge;
