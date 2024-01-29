import { Grid, CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { StoreContext } from "../../context/NewStoreContext";
import createTheme from "../../utils/theme";
import SearchResultItem from "./SearchResultItem";

const useOutsideClick = (ref, containerRef, callback) => {
  const handleClick = (e) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      containerRef.current &&
      !containerRef.current.contains(e.target)
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

const SearchResults = (props) => {
  // variables
  const {
    open,
    results,
    loading,
    setUserSelected,
    setOpen,
    containerRef,
    profileOpen,
    onClose,
    search,
  } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const wrapperRef = useRef(null);

  // state

  // methods

  // effects
  useOutsideClick(wrapperRef, containerRef, () => {
    if (open) {
      if (!profileOpen) {
        onClose();
      }
    }
  });

  // styles
  const styles = {};

  return (
    <Grid
      item
      sx={{
        borderRadius: 2,
        backgroundColor: theme.card(),
        minWidth: 300,
        zIndex: 20000000000000,
        boxShadow: theme.shadow(),
        border: `1px solid ${theme.border()}`,
      }}
      ref={wrapperRef}
    >
      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <Grid
          item
          sx={{
            width: "100%",
            paddingTop: 2,
            paddingLeft: 2,
            paddingRight: 2,
            paddingBottom: 1,
          }}
        >
          <Grid
            container
            justifyContent="start"
            alignItems="center"
            gap={{ xs: 1 }}
          >
            <Grid item>
              <BiSearch style={{ fontSize: 30, color: theme.text() }} />
            </Grid>

            <Grid item>
              <Typography
                sx={{ fontSize: 18, color: theme.text(), fontWeight: 400 }}
              >
                {search}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {loading ? (
          <Grid item alignSelf="center" sx={{ padding: 1 }}>
            <CircularProgress size={30} sx={{ color: theme.primary() }} />
          </Grid>
        ) : null}

        {results?.length > 0 ? (
          <>
            {results?.map((user, i) => (
              <SearchResultItem
                user={user}
                key={i}
                setUserSelected={setUserSelected}
                setOpen={setOpen}
              />
            ))}
          </>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default SearchResults;
