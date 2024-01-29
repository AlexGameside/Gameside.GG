import { Grid, useMediaQuery } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../../context/NewStoreContext";
import NewPrimaryButton from "../../../custom_components/NewPrimaryButton";
import NewSecondaryButton from "../../../custom_components/NewSecondaryButton";
import createTheme from "../../../utils/theme";
import NewModTokenToolsModal from "../../NewModTokenToolsModal";
import useSocket from "../../../utils/useSocket";
import useAxios from "../../../utils/useAxios";
import { cancelWager } from "../../../utils/API";

const StaffTools = (props) => {
  const { match } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const { sendForceEvent, sendResetEvent } = useSocket(match?.wagerid);
  const api = useAxios();

  const [toolsOpen, setToolsOpen] = useState(false);
  const [forceBlueLoading, setForceBlueLoading] = useState(false);
  const [forceRedLoading, setForceRedLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleForceWin = (wagerId, teamNum, username) => {
    if (teamNum === 1) {
      setForceBlueLoading(true);
    }
    if (teamNum === 2) {
      setForceRedLoading(true);
    }

    sendForceEvent({
      wagerId,
      teamNum,
      username,
    });
  };

  const handleReset = () => {
    setResetLoading(true);
    sendResetEvent({
      wagerId: match?.wagerid,
      username: store?.user?.username,
    });
  };

  const handleCancel = () => {
    setCancelLoading(true);
    cancelWager(api, match?.wagerid, store?.user?.username).then((res) => {
      setCancelLoading(false);
    });
  };

  useEffect(() => {
    setCancelLoading(false);
    setResetLoading(false);
    setForceBlueLoading(false);
    setForceRedLoading(false);
  }, [match]);

  return store?.user?.role < 200 ? null : (
    <>
      <NewModTokenToolsModal
        open={toolsOpen}
        onClose={() => setToolsOpen(false)}
        token={match}
        users={match?.blueteam_users?.concat(match?.redteam_users)}
      />

      <Grid item sx={{ width: "100%" }}>
        <Grid
          container
          justifyContent={isDesktop ? "start" : "center"}
          alignItems="center"
          gap={{ xs: 1 }}
        >
          {match?.state !== 2 && match?.state !== 4 ? null : (
            <Grid item>
              <NewPrimaryButton
                label="force win blue"
                loading={forceBlueLoading}
                disabled={
                  forceBlueLoading ||
                  forceRedLoading ||
                  cancelLoading ||
                  resetLoading
                }
                small={true}
                onClick={() =>
                  handleForceWin(match?.wagerid, 1, store?.user?.username)
                }
              />
            </Grid>
          )}

          {match?.state === -1 ||
          match?.state === 3 ||
          match?.isTourneyMatch ? null : (
            <Grid item>
              <NewSecondaryButton
                label="cancel"
                loading={cancelLoading}
                disabled={
                  forceBlueLoading ||
                  forceRedLoading ||
                  cancelLoading ||
                  resetLoading
                }
                small={true}
                onClick={handleCancel}
              />
            </Grid>
          )}

          {match?.state === -1 ||
          match?.state === 2 ||
          match?.isTourneyMatch ? null : (
            <Grid item>
              <NewSecondaryButton
                label="reset"
                loading={resetLoading}
                disabled={
                  resetLoading ||
                  forceRedLoading ||
                  forceBlueLoading ||
                  cancelLoading
                }
                small={true}
                onClick={handleReset}
              />
            </Grid>
          )}

          {match?.isTourneyMatch && store?.user?.role < 502 ? null : (
            <Grid item>
              <NewSecondaryButton
                label="Punish"
                onClick={() => setToolsOpen(true)}
                small={true}
              />
            </Grid>
          )}

          {match?.state !== 2 && match?.state !== 4 ? null : (
            <Grid item>
              <NewPrimaryButton
                label="force win red"
                complementary
                disabled={
                  resetLoading ||
                  forceRedLoading ||
                  forceBlueLoading ||
                  cancelLoading
                }
                loading={forceRedLoading}
                small={true}
                onClick={() =>
                  handleForceWin(match?.wagerid, 2, store?.user?.username)
                }
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default StaffTools;
