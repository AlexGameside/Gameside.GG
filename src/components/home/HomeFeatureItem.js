import { Grid, useMediaQuery, Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../../context/NewStoreContext";
import NewOutlineButton from "../../custom_components/NewOutlineButton";
import createTheme from "../../utils/theme";

const TextTypeEnum = {
  title: "title",
  description: "description",
};

const HomeFeatureItem = (props) => {
  const {
    image,
    title,
    description,
    buttonLabel,
    onClick,
    textRight = false,
    mobileImage,
  } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:600px)");

  const getTextSize = (type) => {
    if (type === TextTypeEnum.title) {
      return isDesktop ? 54 : isMobile ? 34 : 42;
    }

    if (type === TextTypeEnum.description) {
      return isDesktop ? 22 : isMobile ? 16 : 18;
    }
  };

  const styles = {
    title: {
      maxWidth: isDesktop ? 500 : "100%",
      fontSize: getTextSize(TextTypeEnum.title),
      fontWeight: 900,
      color: theme.text(),
    },
    description: {
      maxWidth: isDesktop ? 450 : "100%",
      fontSize: getTextSize(TextTypeEnum.description),
      fontWeight: 400,
      color: theme.text(),
    },
  };

  return (
    <Grid
      item
      sx={{
        width: "100%",
      }}
    >
      <Grid
        container
        justifyContent={isDesktop ? "justify-content" : "center"}
        alignItems="center"
        wrap={isDesktop ? "nowrap" : null}
        sx={{ minWidth: isDesktop ? 0 : "100%" }}
      >
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
            gap={{ xs: 2 }}
          >
            <Grid item>
              <Typography sx={styles.title}>{title}</Typography>
            </Grid>

            <Grid item>
              <Typography sx={styles.description}>{description}</Typography>
            </Grid>

            <Grid item>
              <NewOutlineButton
                label={buttonLabel}
                onClick={onClick}
                fontSize={18}
                hasIcon
                complementary={textRight ? true : false}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <img src={isDesktop ? image : mobileImage} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomeFeatureItem;
