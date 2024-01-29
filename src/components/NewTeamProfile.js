import createTheme from "../utils/theme";
import { useContext, useEffect, useRef, useState } from "react";
import {
  StoreContext,
  StoreDispatch,
  SET_USER,
} from "../context/NewStoreContext";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { FaPiggyBank, FaSkull, FaTrophy } from "react-icons/fa";
import { kickUser, leaveTeam } from "../utils/API";
import useAxios from "../utils/useAxios";
import NewTeamModal from "./NewTeamModal";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "avataaars";
import NewOutlineButton from "../custom_components/NewOutlineButton";
import Header from "../custom_components/Header";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";
import SectionHeader from "../custom_components/SectionHeader";
import BoxContainer from "../custom_components/BoxContainer";
import NewSecondaryButton from "../custom_components/NewSecondaryButton";
import NewAlert from "../custom_components/NewAlert";
import useDraggableScroll from "use-draggable-scroll";
import UserProfileModal from "./user/UserProfileModal";
import useNotifications from "../utils/useNotifications";

const NewTeamProfile = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const api = useAxios();
  const dispatch = useContext(StoreDispatch);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, {
    direction: "horizontal",
  });
  const { newTeam, teamToRemove } = useNotifications(store?.user?.username);

  // state
  const [team, setTeam] = useState(null);
  const [teamIndex, setTeamIndex] = useState(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [kickLoading, setKickLoading] = useState(null);
  const [error, setError] = useState(null);
  const [userHovered, setUserHovered] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // methods
  const handleRemoveTeam = (team) => {
    setLeaveLoading(true);
    leaveTeam(api, team?._id, store?.user?.username).then((res) => {
      if (!res?.error) {
        const userTeams = store?.user?.userTeams;
        const newTeams = userTeams;
        newTeams?.splice(teamIndex, 1);
        let newUserData = store?.user;
        newUserData.userTeams = [...newTeams];
        dispatch({ type: SET_USER, payload: newUserData });
        setLeaveLoading(false);
        navigate("/profile/teams");
        return;
      } else {
        setError(res?.message);
        setLeaveLoading(false);
      }
    });
  };

  const handleKickUser = (user, teamId, team) => {
    setKickLoading(user);
    kickUser(api, teamId, user).then((res) => {
      if (!res.error) {
        setKickLoading(false);
        return;
        // const userTeams = store?.user?.userTeams;
        // const newUserTeam = team;
        // const playerIndex = team?.usernames?.indexOf(user);
        // newUserTeam?.usernames?.splice(playerIndex, 1);
        // setTeam(newUserTeam);
        // const teamIndex = userTeams?.indexOf(team);
        // const newTeams = userTeams;
        // newTeams[teamIndex] = newUserTeam;
        // let newUserData = store?.user;
        // newUserData.userTeams = [...newTeams];
        // dispatch({ type: SET_USER, payload: newUserData });
        // setTeam(newUserTeam);
        // setKickLoading(null);
      } else {
        setKickLoading(null);
        setError(res?.message);
      }
    });
  };

  const isTeamHost = () => {
    return store?.user?.username === team?.usernames[0];
  };

  // effects
  useEffect(() => {
    setTeam(location?.state?.team);
    setTeamIndex(location?.state?.index);
  }, [location]);

  useEffect(() => {
    if (store?.user) {
      if (newTeam) {
        setTeam(newTeam);
      }
    }
  }, [newTeam]);

  useEffect(() => {
    if (teamToRemove) {
      navigate("/profile/teams");
      return;
    }
  }, [teamToRemove]);

  // styles
  const styles = {
    label: {
      fontWeight: 500,
      fontSize: 15,
      color: theme.metaText(),
    },
    value: {
      fontWeight: 500,
      fontSize: 15,
      color: theme.text(),
    },
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="start"
      justifyContent="center"
      gap={{ xs: 2 }}
    >
      <UserProfileModal
        username={selectedUser}
        open={open}
        onClose={() => {
          setOpen(false);
          setUserHovered(null);
          setSelectedUser(null);
        }}
      />
      {error ? (
        <NewAlert label={error} clearMessage={() => setError(null)} />
      ) : null}
      <NewTeamModal
        open={inviteModalOpen}
        onClose={() => {
          setInviteModalOpen(false);
        }}
        team={team}
      />
      <Grid item>
        <NewOutlineButton
          onClick={() => navigate("/profile/teams")}
          label={"Back to Teams"}
        />
      </Grid>

      <Grid item sx={{ width: "100%" }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Grid item>
            <Header label={team?.name} />
          </Grid>
          <Grid item>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              gap={{ xs: 1 }}
            >
              <Grid item>
                <NewSecondaryButton
                  label="leave team"
                  onClick={() => handleRemoveTeam(team)}
                  loading={leaveLoading}
                />
              </Grid>

              <Grid item>
                <NewPrimaryButton
                  label={"invite"}
                  onClick={() => setInviteModalOpen(true)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item sx={{ width: "100%" }}>
        <Grid
          container
          direction="column"
          alignItems="start"
          justifyContent="center"
          gap={{ xs: 1 }}
        >
          <Grid item>
            <SectionHeader label="Record" />
          </Grid>

          <Grid
            item
            sx={{ width: "100%" }}
            onMouseDown={onMouseDown}
            overflow="auto"
          >
            <Grid
              container
              justifyContent="start"
              alignItems="center"
              gap={{ xs: 1 }}
              wrap="nowrap"
            >
              <BoxContainer label={"Wins"} value={team?.wins}>
                <FaTrophy style={{ fontSize: 24, color: theme.metaText() }} />
              </BoxContainer>

              <BoxContainer label={"Losses"} value={team?.losses}>
                <FaSkull style={{ fontSize: 24, color: theme.metaText() }} />
              </BoxContainer>

              <BoxContainer
                label={"Earnings"}
                value={numFormatter.format(team?.win - team?.loss)}
              >
                <FaPiggyBank
                  style={{ fontSize: 24, color: theme.metaText() }}
                />
              </BoxContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item sx={{ width: "100%" }}>
        <Grid
          container
          direction="column"
          alignItems="start"
          justifyContent="center"
          gap={{ xs: 1 }}
        >
          <Grid item>
            <SectionHeader label="Members" />
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="column"
              alignItems="start"
              justifyContent="center"
            >
              {team?.avatars?.map((user, i) => {
                return (
                  <Grid
                    item
                    key={i}
                    sx={{
                      width: "100%",
                      padding: 1,
                      borderBottom:
                        i === team?.avatars?.length - 1
                          ? null
                          : `1px solid ${theme.border()}`,
                    }}
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Grid
                          container
                          justifyContent="start"
                          alignItems="center"
                          gap={{ xs: 1 }}
                        >
                          <Grid item>
                            <Avatar
                              style={{ width: 70, height: 70 }}
                              avatarStyle="Circle"
                              {...user?.avatar[0]}
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
                                <Typography sx={styles.label}>
                                  Username
                                </Typography>
                              </Grid>

                              <Grid item>
                                <Typography
                                  sx={{
                                    ...styles.value,
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color:
                                      userHovered === user?.username
                                        ? theme.primary()
                                        : theme.text(),
                                    cursor:
                                      userHovered === user?.username
                                        ? "pointer"
                                        : "default",
                                  }}
                                  onMouseEnter={() =>
                                    setUserHovered(user?.username)
                                  }
                                  onMouseLeave={() => setUserHovered(null)}
                                  onClick={() => {
                                    setSelectedUser(user?.username);
                                    setOpen(true);
                                  }}
                                >
                                  {user?.username}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      {isTeamHost() &&
                      store?.user?.username !== user?.username ? (
                        <Grid item>
                          <NewSecondaryButton
                            label="kick"
                            small={true}
                            onClick={() =>
                              handleKickUser(user?.username, team?._id, team)
                            }
                            loading={kickLoading === user?.username}
                          />
                        </Grid>
                      ) : null}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewTeamProfile;
