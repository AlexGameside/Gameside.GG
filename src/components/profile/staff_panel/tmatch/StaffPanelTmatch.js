import {
    Grid,
  } from "@mui/material";
  import { useContext, useEffect, useState } from "react";
  import { StoreContext }   from "../../../../context/NewStoreContext";
  import createTheme        from "../../../../utils/theme";
  import SectionHeader      from "../../../../custom_components/SectionHeader";
  import NewInput           from "../../../NewInput";
  import useAxios           from "../../../../utils/useAxios";
  import NewPrimaryButton from "../../../../custom_components/NewPrimaryButton";
  import NewSecondaryButton from "../../../../custom_components/NewSecondaryButton";
  import { isUserInWager, getCurrentWagerStatus } from "../../../../utils/API.js";
  
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
    const [wagerDetails, setWagerDetails] = useState(null);
    
    const [first, setFirst] = useState(true);
  
    // methods
    // const handleResetWager = () => {
      
    // }

    const searchByUsername = () => {
        setSearchLoading(true);
        setError(null);
        isUserInWager(api, username.toLowerCase()).then( async (res) => {
            if(first) { setFirst(false); }
            if(res?.error) {
              setSearchLoading(false);
              setError(res?.message);
              setWagerId(""); 
              return;
            }
            if (!res?.error) {
                if(res.wager) { 
                    let wagerStuff; 
                    try {
                        wagerStuff = await getCurrentWagerStatus(api, res.wager, username.toLowerCase());
                        if(wagerStuff && !wagerStuff.error) {
                            setWagerId(res.wager);
                            setWagerDetails(wagerStuff.wagerStatus);
                            console.log("wagerStuff:", wagerStuff);
                        } else {
                          res.message = 'Error getting wager details.';
                          throw new Error("Error.");
                        }
                    }
                    catch(e) {
                      console.log("ERROR: isUserInWager:", res);
                      setError(res?.message);
                      setWagerId("");
                      setWagerDetails(null);
                      return;
                    }
                }
                else {
                    setWagerId(""); 
                }
                setError("");
            }
            setSearchLoading(false);
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
        { wagerId && wagerDetails && !searchLoading &&
            <Grid 
              container 
              direction="column"
              gap={{ xs: 1 }} 
              item 
              className={`w-full bg-[#10141a] rounded-lg p-4 border-solid border-[1px] border-[#242c39]`
            }>
                <Grid item className="flex justify-between pb-2 mb-2 border-b-[1px] border-solid border-[#242c39]">
                  <SectionHeader label="Current Active Wager" />
                    <NewPrimaryButton
                      label={"Reset Wager"}
                      className="w-full"
                      small
                      loading={false}
                      onClick={() => {
                        return;
                      }}
                    />
                </Grid>
                <Grid item>State of Wager: {wagerDetails.state}</Grid>
                <Grid item>Is Tournament Match: {wagerDetails.isTourneyMatch.toString()}</Grid>
                <Grid item><span className="text-blue-400">Blue Submit:</span> {wagerDetails.bluesubmit}</Grid>
                <Grid item><span className="text-red-400">Red Submit:</span> {wagerDetails.redsubmit}</Grid>
                <Grid item>Readied users: {wagerDetails.readied_users.join(', ')}</Grid>
                <Grid item className='w-full flex justify-center'>
                    <NewPrimaryButton
                      label={"Reset Wager"}
                      className="w-full"
                      small
                      loading={false}
                      onClick={() => {
                        return;
                      }}
                    />
                </Grid>
            </Grid>
        }
        {
            searchLoading && 
            <Grid item className={`w-full bg-[#10141a] rounded-lg p-4 border-solid border-[1px] border-[#242c39]`}>
                Fetching wager
            </Grid>
        }
        {
            !error && !wagerId && !first && !searchLoading &&
            <Grid item className={`w-full bg-[#10141a] rounded-lg p-4 border-solid border-[1px] border-[#242c39]`}>
                User or Wager not found.
            </Grid>
        }
        { error && 
            <Grid item className={`w-full bg-[#10141a] rounded-lg p-4 border-solid border-[1px] border-[#242c39]`}>
                ERROR: { error }
            </Grid>
        }

      </Grid>
    );
  };
  
  export default StaffPanelSearch;
  