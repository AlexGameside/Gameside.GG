import {
    Grid,
    useMediaQuery,
  } from "@mui/material";
  import { useContext, useEffect, useState } from "react";
  import { StoreContext }  from "../../../../context/NewStoreContext";
  import createTheme       from "../../../../utils/theme";
  import SectionHeader     from "../../../../custom_components/SectionHeader";
  import NewInput          from "../../../NewInput";
  import useAxios          from "../../../../utils/useAxios";
  import SetRoleModal      from "../search/SetRoleModal";
  import NewAlert          from "../../../../custom_components/NewAlert";
  import {
    banUser,
    unbanUser,
    giveUserPremium,
  } from "../../../../utils/api/admin";
  import { isUserInWager, getCurrentWagerStatus } from "../../../../utils/API.js";
  
  const StaffPanelSearchUserTabsEnum = {
    info: "info",
    notes: "notes",
    reports: "reports",
    history: "history",
    withdraw: "withdraw",
    deposits: "deposits",
    alts: "alts",
    badges: "badges",
  };
  
  const StaffPanelSearch = () => {
    // variables
    const store = useContext(StoreContext);
    const theme = createTheme(store.mode);
    const api = useAxios();
  
    // state
    const [username, setUsername] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    // const [userRole, setUserRole] = useState(null);
    // const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    // const [success, setSuccess] = useState(null);
    
    const [wagerId, setWagerId] = useState(null);
    
    const [first, setFirst] = useState(true);
  
    // methods
    const searchByUsername = () => {
    setSearchLoading(true);
        setError(null);
        isUserInWager(api, username.toLowerCase()).then( async (res) => {
            setSearchLoading(false);
            if(first) { setFirst(false); }
            if (!res?.error) {
                console.log("RESULT: isUserInWager:", res.wager, res);
                if(res.wager) { 
                    let wagerStuff; 
                    try {
                        wagerStuff = await getCurrentWagerStatus(api, res.wager, username.toLowerCase());
                        if(wagerStuff) {
                            setWagerId(res.wager); 
                            console.log("wagerStuff:", wagerStuff);
                        }
                        else { console.log("WHY THE RUCK NOT?"); }
                    }
                    catch(e) {
                        console.log("WHY THE -f-UCK NOT?");
                    }
                }
                else { 
                    setWagerId(""); 
                }
                setError("");
            } else {
                console.log("ERROR: isUserInWager:", res);
                setError(res?.message);
                setWagerId(""); 
                return;
            }
         });
    };
  
    // effects
    useEffect(()=>{ console.log("wagerId:", wagerId); }, [wagerId]);
  
    // styles
    const styles = {
      searchContainer: {
        width: "100%",
        borderRadius: 2,
        backgroundColor: theme.cardDark(),
        padding: 2,
        border: `1px solid ${theme.border()}`,
      }
    };
    // console.log(`first: ${first}, error: ${error}, wagerId: ${wagerId}`);
    return (
      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="center"
        gap={{ xs: 2 }}
      >
        {/* {error ? (
          <NewAlert label={error} clearMessage={() => setError(null)} />
        ) : null} */}
        {/* {success ? (
          <NewAlert
            type="success"
            label={success}
            clearMessage={() => setSuccess(null)}
          />
        ) : null} */}
        {
        /* <SetRoleModal
          open={open}
          role={userRole}
          onClose={() => setOpen(false)}
          setRole={setUserRole}
          username={userData?.username}
        /> */}
        <Grid item sx={styles.searchContainer}>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
            gap={{ xs: 1 }}
          >
            <Grid item>
              <SectionHeader label="Search for a user" />
            </Grid>
  
            <Grid item>
              <NewInput
                placeholder={"Search"}
                onChange={(value) => {
                  setUsername(value);
                }}
                value={username}
                onKeyDown={searchByUsername}
                disabled={searchLoading}
              />
            </Grid>

          </Grid>
        </Grid>
        
        {/* RESULTS */}
        { wagerId &&
            <Grid item className={`w-full rounded-lg p-4 border-solid border-[1px] border-[#10141a]`}>
                WAGERID: { wagerId }
                {/* DISPLAY A BUTTON HERE TO DO SOMETHING */}
            </Grid>
        }
        {
            !error && !wagerId && !first && 
            <Grid item className={`w-full rounded-lg p-4 border-solid border-[1px] border-[#10141a]`}>
                User or Wager not found.
            </Grid>
        }
        { error && 
            <Grid item className={`w-full rounded-lg p-4 border-solid border-[1px] border-[#10141a]`}>
                ERROR: { error }
            </Grid>
        }

      </Grid>
    );
  };
  
  export default StaffPanelSearch;
  