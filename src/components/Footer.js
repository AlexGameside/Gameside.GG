import createTheme from "../utils/theme";
import { Grid, Typography, AppBar, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { FaTiktok, FaTwitter } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
import blackFullLogo from "../assets/black-half-logo.png";
import whiteFullLogo from "../assets/tkns-red-logo-word.png";
import gamesideWhiteWord from "../assets/Gameside_White_Word.png"
import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";

const Footer = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const tknsLogo = store.mode === "dark" ? whiteFullLogo : blackFullLogo;
  const navigate = useNavigate();
  const Img = styled("img")``;
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");

  // styles
  const styles = {
    card: {
      bottom: 0,
      justifyContent: "center",
      backgroundColor: "transparent",
      minHeight: 200,
      borderTop: `1px solid ${theme.border()}`,
      paddingLeft: isDesktop
        ? "15%"
        : isMobile
        ? 2
        : 4,
      paddingRight: isDesktop
        ? "15%"
        : isMobile
        ? 2
        : 4,
      paddingBottom: isDesktop ? 0 : 6,
      paddingTop: 0,
    },
    icons: {
      color: theme.text(),
      fontSize: 40,
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.1)",
      },
    },
    supportLinks: {
      color: theme.text(),
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.1)",
      },
    },
  };

  return (
    <AppBar elevation={0} position="relative" sx={styles.card}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%" }}
        rowSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Grid item onClick={() => navigate("/")}>
              <Img
                src={gamesideWhiteWord}
                alt="Logo"
                sx={{
                  maxWidth: 150,
                  transition: "all .3s ease-in-out",
                  "&:hover": {
                    cursor: "pointer",
                    transform: "scale(1.1)",
                  },
                }}
              />
            </Grid>

            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item>
                  <Typography
                    sx={styles.icons}
                    onClick={() =>
                      window.open("https://twitter.com/GamesideGG", "_blank")
                    }
                  >
                    <FaTwitter />
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    sx={styles.icons}
                    onClick={() =>
                      window.open("https://discord.gg/QHMPUC3xk9", "_blank")
                    }
                  >
                    <BsDiscord />
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    sx={styles.icons}
                    onClick={() =>
                      window.open("https://www.tiktok.com/@tkns.gg_", "_blank")
                    }
                  >
                    <FaTiktok />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={{ xs: 1 }}
          >
            <Grid item>
              <Typography sx={{ color: theme.text() }}>
                &copy; 2024 Gameside LLC
              </Typography>
            </Grid>

            <Grid item>
              <span style={{ fontWeight: 900, color: theme.text() }}>•</span>
            </Grid>

            <Grid item>
              <Typography
                sx={styles.supportLinks}
                onClick={() => navigate("/support/privacy-policy")}
              >
                Privacy Policy
              </Typography>
            </Grid>

            <Grid item>
              <span style={{ fontWeight: 900, color: theme.text() }}>•</span>
            </Grid>

            <Grid item>
              <Typography
                sx={styles.supportLinks}
                onClick={() => navigate("/support/tos")}
              >
                Terms of Service
              </Typography>
            </Grid>

            <Grid item>
              <span style={{ fontWeight: 900, color: theme.text() }}>•</span>
            </Grid>

            <Grid item>
              <Typography
                sx={styles.supportLinks}
                onClick={() => navigate("/support/contact")}
              >
                Contact Us
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Footer;
