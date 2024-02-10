import NewListItem from "../custom_components/NewListItem";
import { FaSkullCrossbones, FaPiggyBank, FaCrown } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { RiUserAddFill } from "react-icons/ri";
import NewTeamModal from "./NewTeamModal";
import { FaTrophy } from "react-icons/fa";
import NewCreateTeamModal from "./NewCreateTeamModal";
import { BiPlus } from "react-icons/bi";
import { getTournamentDate } from "../utils/helperMethods";
import {
  Typography,
  Button,
  Grid,
  Drawer,
  Divider,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { HiHome } from "react-icons/hi";
import Avatar from "avataaars";
import NewSignupLoginModal from "./NewSignupLoginModal";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";

const NavDrawer = (props) => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const [profileHovered, setProfileHovered] = useState(false);
  const [inviteHovered, setInviteHovered] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const {
    setDrawerHovered,
    inviteModalOpen,
    setSelectedTeam,
    selectedTeam,
    setCreateTeamOpen,
    handleAddTeam,
    setHoveredTeam,
    drawerOpen,
    setInviteModalOpen,
    createTeamOpen,
    selected,
    hoveredTeam,
    loading,
  } = props;
  const navigate = useNavigate();
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const styles = {
    username: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.text(),
    },
    balance: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.green(),
    },
    navTitle: {
      fontSize: 16,
      fontWeight: 600,
      color: theme.text(),
    },
    teamName: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.text(),
    },
    createTeam: {
      color: theme.metaText(),
      fontSize: 15,
      textTransform: "none",
      fontWeight: 500,
      borderRadius: 2,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: "100%",
      height: 36,
      backgroundColor: theme.border(),
      "&:hover": {
        backgroundColor: theme.border(),
        boxShadow: "0 0",
        backgroundImage: theme.buttonHover(),
      },
    },
  };

  return (
    <Drawer
      variant="permanent"
      className="drawer-scroll"
      open={drawerOpen}
      sx={{
        [`& .MuiDrawer-paper`]: {
          width: 280,
          boxSizing: "border-box",
          backgroundColor: theme.cardDark(),
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          overflowX: "hidden",
          minHeight: "100vh",
          paddingBottom: 9,
          paddingLeft: 0.5,
        },
      }}
      onMouseEnter={() => setDrawerHovered(true)}
      onMouseLeave={() => setDrawerHovered(false)}
    >
      <NewSignupLoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        handleMenuClose={() => {}}
      />

      <NewTeamModal
        open={inviteModalOpen}
        onClose={() => {
          setInviteModalOpen(false);
          setInviteHovered(null);
        }}
        team={inviteHovered}
      />

      <NewCreateTeamModal
        open={createTeamOpen}
        onClose={() => setCreateTeamOpen(false)}
        handleAddTeam={handleAddTeam}
        fromCreateMenu={true}
      />

      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="start"
        gap={{ xs: 1 }}
        className="scroll-container"
        sx={{
          paddingTop: 8,
          paddingLeft: 1,
          paddingRight: 1,
          minHeight: "100%",
          overflowY: "auto",
        }}
        wrap="nowrap"
      >
        <Grid item sx={{ width: "100%" }}>
          <Typography
            sx={{ fontSize: 22, color: theme.text(), fontWeight: 700 }}
          >
            Menu
          </Typography>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Grid container direction="column" alignItems="start">
            <NewListItem
              selected={selected === "home"}
              label="Valorant Home"
              onClick={() => {
                navigate("/valorant");
              }}
            >
              <HiHome
                style={{
                  color: theme.text(),
                  fontSize: 24,
                }}
              />
            </NewListItem>

            <NewListItem
              selected={selected === "cash"}
              label="Cash Matches"
              onClick={() => {
                navigate("/valorant/cash-matches");
              }}
            >
              <FaPiggyBank
                style={{
                  color: theme.text(),
                  fontSize: 24,
                }}
              />
            </NewListItem>

            <NewListItem
              selected={selected === "tournaments"}
              label="Tournaments"
              onClick={() => {
                navigate("/valorant/tournaments");
              }}
            >
              <FaTrophy
                style={{
                  color: theme.text(),
                  fontSize: 24,
                }}
              />
            </NewListItem>

            {/* <NewListItem
              selected={selected === "leaderboard"}
              label="Leaderboard"
              onClick={() => {
                navigate("/valorant/leaderboard");
              }}
            >
              <MdLeaderboard
                style={{
                  color: theme.text(),
                  fontSize: 24,
                }}
              />
            </NewListItem> */}

            {/* <NewListItem
              selected={selected === "premium"}
              label="Premium"
              onClick={() => {
                navigate("/valorant/premium");
              }}
            >
              <FaCrown
                style={{
                  color: theme.text(),
                  fontSize: 24,
                }}
              />
            </NewListItem> */}
          </Grid>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Divider sx={{ backgroundColor: theme.border() }} />
        </Grid>

        <>
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Grid item>
                <Grid
                  container
                  justifyContent="start"
                  alignItems="center"
                  gap={{ xs: 1 }}
                >
                  <Grid item>
                    <Typography sx={styles.navTitle}>
                      Your Upcoming Tournaments
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <>
            {!store?.user ||
            store?.user?.user_tournaments?.upcoming?.length < 1 ? null : (
              <Grid
                item
                sx={{
                  width: "100%",
                }}
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="start"
                  gap={{ xs: 0.5 }}
                >
                  {store?.user?.user_tournaments?.upcoming?.map(
                    (tournament, i) => {
                      return (
                        <Grid
                          item
                          key={i}
                          sx={{
                            width: "100%",
                            transition: "all .2s ease-in-out",
                            padding: 1,
                            borderRadius: 2,
                            overflowX: "hidden",
                            "&:hover": {
                              cursor: "pointer",
                              backgroundColor: theme.cardHover(),
                            },
                          }}
                          onClick={() =>
                            navigate(`/tournament/${tournament?._id}`)
                          }
                        >
                          <Grid
                            container
                            justifyContent="start"
                            alignItems="center"
                            gap={{ xs: 2 }}
                          >
                            <Grid
                              item
                              sx={{
                                borderRadius: 2,
                                height: 60,
                                width: 60,
                                backgroundImage: `url(${tournament?.thumbnail})`,
                                backgroundPosition: "center center",
                              }}
                            ></Grid>

                            <Grid item>
                              <Grid
                                container
                                direction="column"
                                alignItems="start"
                                justifyContent="center"
                              >
                                <Grid item>
                                  <Typography
                                    sx={{
                                      fontSize: 15,
                                      fontWeight: 600,
                                      color: theme.text(),
                                    }}
                                    noWrap
                                  >
                                    {tournament?.title}
                                  </Typography>
                                </Grid>

                                <Grid item>
                                  <Typography
                                    sx={{
                                      fontSize: 14,
                                      fontWeight: 600,
                                      color: theme.metaText(),
                                    }}
                                  >
                                    {getTournamentDate(tournament?.start_date)}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    }
                  )}
                </Grid>
              </Grid>
            )}
            <Button
              variant="cotained"
              size="large"
              sx={styles.createTeam}
              onClick={() => {
                if (!store?.user) {
                  setLoginOpen(true);
                } else {
                  navigate("/valorant/tournaments");
                }
              }}
            >
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                gap={{ xs: 1 }}
              >
                <Grid item sx={{ marginTop: 1 }}>
                  <FaTrophy style={{ color: theme.text(), fontSize: 18 }} />
                </Grid>

                <Grid item>
                  <Typography
                    sx={{
                      fontSize: 15,
                      color: theme.text(),
                      fontWeight: 500,
                    }}
                  >
                    Find Tournaments
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </>

          <Grid item sx={{ width: "100%" }}>
            <Divider sx={{ backgroundColor: theme.border() }} />
          </Grid>

          <Grid
            item
            sx={{
              width: "100%",
            }}
          >
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Grid item>
                <Grid
                  container
                  justifyContent="start"
                  alignItems="center"
                  gap={{ xs: 1 }}
                >
                  <Grid item>
                    <Typography sx={styles.navTitle}>Your Teams</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <>
            {!store?.user || store?.user?.userTeams?.length < 1 ? null : (
              <Grid
                item
                sx={{
                  width: "100%",
                }}
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="start"
                  gap={{ xs: 0.5 }}
                >
                  <>
                    {store?.user?.userTeams?.map((team, i) => {
                      return (
                        <Grid
                          item
                          key={i}
                          sx={{
                            width: "100%",
                            borderRadius: 2,
                            backgroundColor: "transparent",
                            transition: "all .2s ease-in-out",
                            padding: 1,
                            position: "relative",
                            overflowX: "hidden",
                            zIndex: 0,
                            "&:hover": {
                              cursor: "pointer",
                              backgroundColor: theme.cardHover(),
                            },
                          }}
                          onMouseEnter={() => setHoveredTeam(team?._id)}
                          onMouseLeave={() => setHoveredTeam(null)}
                          onClick={() => {
                            setSelectedTeam(team);
                            navigate(`/valorant/profile/team/${team?._id}`, {
                              state: {
                                team,
                                index: i,
                              },
                            });
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            alignItems="start"
                            justifyContent="center"
                          >
                            <Grid item>
                              <Typography
                                sx={{
                                  ...styles.teamName,
                                  color: theme.text(),
                                  zIndex: 1,
                                  position: "relative",
                                }}
                                noWrap
                              >
                                {team?.name}
                              </Typography>
                            </Grid>

                            <Grid item>
                              <Typography
                                sx={{
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: theme.metaText(),
                                }}
                              >
                                {team?.usernames?.length} members
                              </Typography>
                            </Grid>
                          </Grid>
                          {hoveredTeam === team?._id ? (
                            <RiUserAddFill
                              style={{
                                color:
                                  inviteHovered?._id === team?._id
                                    ? theme.green()
                                    : theme.metaText(),
                                fontSize: 24,
                                position: "absolute",
                                right: 10,
                                top: 18,
                                zIndex: 100,
                              }}
                              onMouseEnter={() => setInviteHovered(team)}
                              onClick={(e) => {
                                e.stopPropagation();
                                setInviteModalOpen(true);
                              }}
                            />
                          ) : null}
                        </Grid>
                      );
                    })}
                  </>
                </Grid>
              </Grid>
            )}
            <Grid item sx={{ width: "100%", paddingBottom: 2 }}>
              <Button
                variant="cotained"
                size="large"
                sx={styles.createTeam}
                onClick={() => {
                  if (!store?.user) {
                    setLoginOpen(true);
                  } else {
                    setCreateTeamOpen(true);
                  }
                }}
              >
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  gap={{ xs: 1 }}
                >
                  <Grid item sx={{ marginTop: 1 }}>
                    <BiPlus style={{ color: theme.text(), fontSize: 18 }} />
                  </Grid>

                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: 15,
                        color: theme.text(),
                        fontWeight: 500,
                      }}
                    >
                      Create Team
                    </Typography>
                  </Grid>
                </Grid>
              </Button>
            </Grid>
          </>

          <Grid
            item
            sx={{
              width: 280,
              transition: "all .2s ease-in-out",
              padding: 1,
              backgroundColor: theme.cardDark(),
              cursor: profileHovered ? "pointer" : "default",
              "&:hover": {
                backgroundColor: store?.user
                  ? theme.cardHover()
                  : theme.cardDark(),
              },
              position: "fixed",
              bottom: 0,
              boxSizing: "border-box",
              borderTop: `1px solid ${theme.border()}`,
              left: -1,
              zIndex: 10000000000,
            }}
            onClick={() => {
              if (store?.user) {
                navigate("/valorant/profile/teams");
              }
            }}
            onMouseEnter={() => {
              if (store?.user) {
                setProfileHovered(true);
              }
            }}
            onMouseLeave={() => {
              if (store?.user) {
                setProfileHovered(false);
              }
            }}
          >
            {store?.user ? (
              <Grid
                container
                justifyContent="start"
                alignItems="center"
                gap={{ xs: 2 }}
              >
                <Grid item>
                  <Avatar
                    style={{ width: 55, height: 55 }}
                    avatarStyle="Circle"
                    {...store?.user?.avatar[0]}
                  />
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="column"
                    alignItems="start"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Typography sx={styles.username}>
                        {store?.user?.username}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={styles.balance}>
                        {numFormatter.format(store?.user?.balance)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : loading ? (
              <Grid
                container
                justifyContent="start"
                alignItems="center"
                gap={{ xs: 2 }}
              >
                <Grid item>
                  <Skeleton
                    variant="circular"
                    width={50}
                    height={50}
                    sx={{ bgcolor: theme.skeleton() }}
                    animation="wave"
                  />
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="column"
                    alignItems="start"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Skeleton
                        variant="text"
                        width={65}
                        height={15}
                        sx={{ bgcolor: theme.skeleton() }}
                        animation="wave"
                      />
                    </Grid>

                    <Grid item>
                      <Skeleton
                        variant="text"
                        width={65}
                        height={15}
                        sx={{ bgcolor: theme.skeleton() }}
                        animation="wave"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ padding: 1 }}
              >
                <Grid item sx={{ width: "100%" }}>
                  <NewPrimaryButton
                    label="Signup/login"
                    fullWidth
                    onClick={() => setLoginOpen(true)}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </>
      </Grid>
    </Drawer>
  );
};

export default NavDrawer;
