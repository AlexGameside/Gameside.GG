import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import styled from "styled-components";
import { Grid, Typography } from "@mui/material";
import constants from "../utils/constants";

// styles
const TknsInput = styled.input`
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${(props) => props.placeholderColor};
    font-weight: 500;
    font-size: 15px;
  }
  :-ms-input-placeholder {
    color: ${(props) => props.placeholderColor};
  }
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border-radius: ${(props) => props.borderRadius}px;
  border-left: ${(props) =>
    props.type === "number" ? "none" : `2px solid ${props.border}`};
  min-height: 45px;
  font-size: 15px;
  padding-left: 16px;
  padding-right: 16px;
  outline: none;
  font-family: "Inter";
  font-weight: 400;
  border: none;
  min-width: 100%;
  webkit-appearance: none;
  border: 2px solid ${(props) => props.border};
  transition: all 0.2s ease-in-out;
  &:hover {
    border: 2px solid ${(props) => props.borderHover};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
  }
  &:focus {
    border: 2px solid ${(props) => props.borderHover};
  }
  ::-webkit-calendar-picker-indicator {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 24"><path fill="%23bbbbbb" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>');
  }
`;

const NewInput = (props) => {
  // variables
  const {
    placeholder,
    value,
    onChange,
    onKeyDown,
    onBlur,
    onFocus,
    type = "text",
    lowercase = false,
    max = 0,
    min = 0,
    step = 0,
    disabled = false,
  } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return type === "number" ? (
    <Grid
      container
      sx={{ width: "100%" }}
      justifyContent="start"
      alignItems="stretch"
    >
      <Grid
        item
        sx={{
          backgroundColor: theme.border(),
          height: 45,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          textAlign: "center",
          minWidth: 35,
        }}
      >
        <Typography
          sx={{
            fontSize: 15,
            color: "#EFF2F5",
            fontWeight: 400,
            paddingTop: 1.3,
          }}
        >
          $
        </Typography>
      </Grid>

      <Grid item sx={{ flexGrow: 1 }}>
        <TknsInput
          border={theme.border()}
          borderHover={disabled ? theme.border() : constants.primaryRed}
          borderRadius={type === "number" ? 0 : 8}
          backgroundColor={"#0d1015"}
          color={disabled ? theme.metaText() : theme.text()}
          placeholderColor={type === "number" ? theme.text() : "#4f525f"}
          type={type}
          value={value}
          placeholder={type === "number" ? 0 : placeholder}
          min={min}
          max={max}
          step={step}
          autoComplete="new-password"
          onChange={(e) => {
            if (lowercase) {
              onChange(e.target.value.toLowerCase());
              return;
            }
            onChange(e.target.value);
            return;
          }}
        />
      </Grid>

      <Grid
        item
        sx={{
          backgroundColor: theme.border(),
          height: 45,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          textAlign: "center",
          minWidth: 70,
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 15,
            color: "#EFF2F5",
            fontWeight: 400,
            paddingTop: 1.3,
          }}
        >
          {numFormatter.format(value)}
        </Typography>
      </Grid>
    </Grid>
  ) : (
    <TknsInput
      border={theme.border()}
      borderHover={disabled ? theme.border() : constants.primaryRed}
      borderRadius={8}
      backgroundColor={disabled ? theme.cardHover() : theme.cardDark()}
      color={disabled ? theme.metaText() : theme.text()}
      placeholderColor={theme.metaText()}
      type={type}
      value={value}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      autoComplete="new-password"
      disabled={disabled}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          onKeyDown();
          return;
        }
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={(e) => {
        if (lowercase) {
          onChange(e.target.value.toLowerCase());
          return;
        }
        onChange(e.target.value);
        return;
      }}
    />
  );
};

export default NewInput;
