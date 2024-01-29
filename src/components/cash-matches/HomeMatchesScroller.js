import { Grid } from "@mui/material";
import NewCashMatchItem from "../NewCashMatchItem";
import SectionHeader from "../../custom_components/SectionHeader";
import NewOutlineButton from "../../custom_components/NewOutlineButton";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import useDraggableScroll from "use-draggable-scroll";

const HomeMatchesScroller = (props) => {
  const { cashMatches } = props;
  const ref = useRef(null);
  const navigate = useNavigate();
  const { onMouseDown } = useDraggableScroll(ref, {
    direction: "horizontal",
  });

  return (
    <Grid
      item
      sx={{
        width: "100%",
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="center"
        sx={{ width: "100%" }}
        wrap="nowrap"
        gap={{ xs: 1 }}
      >
        <Grid item sx={{ width: "100%" }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <SectionHeader label="Find Cash Matches" home />
            </Grid>

            <Grid item>
              <NewOutlineButton
                label="View All"
                onClick={() => navigate("/cash-matches")}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          className="cash-scroll"
          sx={{
            width: "100%",
            overflowX: "auto",
            paddingBottom: 2,
          }}
          ref={ref}
          onMouseDown={onMouseDown}
        >
          <Grid
            container
            justifyContent="start"
            alignItems="center"
            gap={{ xs: 1 }}
            wrap="nowrap"
          >
            {cashMatches?.map((match, i) => {
              return <NewCashMatchItem match={match} key={i} home />;
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomeMatchesScroller;
