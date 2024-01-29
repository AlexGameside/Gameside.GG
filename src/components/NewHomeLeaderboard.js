import { Grid } from "@mui/material";
import { useRef, useEffect } from "react";
import { generateRandomAvatarOptions } from "../utils/generateRandomAvatarOptions";
import NewHomeLeaderboardItem from "./NewHomeLeaderboardItem";

const NewHomeLeaderboard = () => {
  // variables
  const avatar1 = useRef();
  const avatar2 = useRef();
  const avatar3 = useRef();

  // useEffects
  useEffect(() => {
    avatar1.current = generateRandomAvatarOptions();
    avatar2.current = generateRandomAvatarOptions();
    avatar3.current = generateRandomAvatarOptions();
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      rowSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <NewHomeLeaderboardItem
        username={"Dalya"}
        rank={1}
        earnings={1000}
        avatar={avatar1.current}
      />
      <NewHomeLeaderboardItem
        username={"Jonathon"}
        rank={2}
        earnings={800}
        avatar={avatar2.current}
      />
      <NewHomeLeaderboardItem
        username={"Lucas"}
        rank={3}
        earnings={600}
        avatar={avatar3.current}
      />
    </Grid>
  );
};

export default NewHomeLeaderboard;
