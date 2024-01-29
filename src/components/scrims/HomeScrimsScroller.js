import { Grid } from "@mui/material";
import NewMatchItem from "../NewMatchItem";
import SectionHeader from "../../custom_components/SectionHeader";
import NewOutlineButton from "../../custom_components/NewOutlineButton";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import useDraggableScroll from "use-draggable-scroll";

const HomeScrimsScroller = (props) => {
  const { scrims } = props;
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
      >
        <Grid item sx={{ width: "100%" }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <SectionHeader label="Find Scrims" home />
            </Grid>

            <Grid item>
              <NewOutlineButton
                label="View All"
                onClick={() => navigate("/scrims")}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          className="scrim-scroll"
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
            {scrims?.map((scrim, i) => {
              return <NewMatchItem scrim={scrim} key={i} home />;
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomeScrimsScroller;
