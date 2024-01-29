import { Class } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { BsPersonBadgeFill } from "react-icons/bs";
import { StoreContext } from "../../context/NewStoreContext";
import EmptyList from "../../custom_components/EmptyList";
import Header from "../../custom_components/Header";
import createTheme from "../../utils/theme";
import BadgeItem from "../match/components/badges/BadgeItem";

const MyBadges = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const [loading, setLoading] = useState(true);
  const [badges, setBadges] = useState(null);

  useEffect(() => {
    if (store?.user) {
      setLoading(false);
      setBadges(store?.user?.connections[9]);
    }
  }, [store?.user]);

  return loading ? null : (
    <Grid
      container
      direction="column"
      alignItems="start"
      justifyContent="center"
      gap={{ xs: 2 }}
    >
      <Grid item sx={{ width: "100%" }}>
        <Header label={"My Badges"} />
      </Grid>

      {badges == null || Object.keys(badges)?.length < 1 ? (
        <EmptyList
          title={"No badges yet!"}
          label={"Any badges you achieve will appear here."}
        >
          <BsPersonBadgeFill
            style={{ fontSize: 40, color: theme.metaText() }}
          />
        </EmptyList>
      ) : (
        <Grid
          items
          sx={{
            width: "100%",
            padding: 2,
            borderRadius: 2,
            border: `1px solid ${theme.border()}`,
            backgroundColor: theme.cardDark(),
          }}
        >
          <Grid
            container
            justifyContent="start"
            alignItems="center"
            gap={{ xs: 1 }}
          >
            {Object.keys(badges)?.map((badge, i) => {
              if (badge === "isNewHere") {
                return null;
              }

              if (badges[badge]?.hasBadge) {
                return (
                  <BadgeItem
                    type={badge}
                    key={i}
                    canEdit={true}
                    hidden={badges[badge].isHidden}
                    key={i}
                    badge={badges[badge]}
                  />
                );
              }

              return null;
            })}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default MyBadges;
