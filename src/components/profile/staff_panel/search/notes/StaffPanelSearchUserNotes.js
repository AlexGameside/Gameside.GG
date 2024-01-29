import { CircularProgress, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { StoreContext } from "../../../../../context/NewStoreContext";
import NewPrimaryButton from "../../../../../custom_components/NewPrimaryButton";
import SectionHeader from "../../../../../custom_components/SectionHeader";
import { getUserNotes } from "../../../../../utils/api/admin";
import createTheme from "../../../../../utils/theme";
import useAxios from "../../../../../utils/useAxios";
import StaffPanelSearchUserNotesAddNoteDialog from "./StaffPanelSearchUserNotesAddNoteDialog";

const StaffPanelSearchUserNotes = (props) => {
  const { username } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const api = useAxios();

  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState(null);
  const [noNotes, setNoNotes] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (notes == null) {
      getUserNotes(api, username).then((res) => {
        setLoading(false);
        if (!res?.error) {
          setNotes(res);
          return;
        } else {
          setNoNotes(true);
          return;
        }
      });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Grid item sx={{ width: "100%" }}>
      <StaffPanelSearchUserNotesAddNoteDialog
        open={open}
        onClose={() => setOpen(false)}
        username={username}
        notes={notes}
        setNotes={setNotes}
      />
      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="center"
        gap={{ xs: 2 }}
      >
        {loading ? (
          <Grid item alignSelf="center" sx={{ marginTop: 10 }}>
            <CircularProgress size={50} sx={{ color: theme.primary() }} />
          </Grid>
        ) : null}

        {!noNotes && !loading && notes?.length > 0 ? (
          <>
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <Grid item>
                  <SectionHeader label="Notes" />
                </Grid>

                <Grid item>
                  <NewPrimaryButton
                    label="New Note"
                    small
                    onClick={() => setOpen(true)}
                  />
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
                {notes?.map((note, i) => {
                  return (
                    <Grid
                      item
                      sx={{
                        width: "100%",
                        padding: 2,
                        backgroundColor: theme.card(),
                        borderRadius: 2,
                      }}
                      key={i}
                    >
                      <Grid
                        container
                        direction="column"
                        alignItems="start"
                        justifyContent="center"
                        gap={{ xs: 1 }}
                      >
                        <Grid item>
                          <Typography
                            sx={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: theme.metaText(),
                            }}
                          >
                            Note
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: theme.text(),
                          fontWeight: 400,
                        }}
                      >
                        {note}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </>
        ) : null}

        {notes?.length < 1 && !loading ? (
          <Grid item alignSelf="center" sx={{ width: "100%", marginTop: 4 }}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <FaList style={{ fontSize: 40, color: theme.metaText() }} />
              </Grid>

              <Grid item>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: theme.metaText(),
                  }}
                >
                  No notes!
                </Typography>
              </Grid>

              <Grid item>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: theme.metaText(),
                  }}
                >
                  When a user receives notes, they will show up here.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default StaffPanelSearchUserNotes;
