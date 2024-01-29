import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import styled from "styled-components";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

// const styles
const DropDownContainer = styled.div`
  font-family: "Inter";
  min-width: 100%;
  border: none;
  position: relative;
`;
const DropDownHeaderContainer = styled.button`
  font-family: "Inter";
  min-height: 40px;
  min-width: 100%;
  border-radius: 10px;
  background-color: ${(props) => props.backgroundColor};
  padding: 3%;
  padding-left: 10px;
  text-align: left;
  border: 2px solid ${(props) => props.color};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    border: 2px solid ${(props) => props.blue};
  }
`;
const DropDownList = styled.div`
  font-family: "Inter";
  border: 1px solid ${(props) => props.color};
  border-radius: 6px;
  box-shadow: ${(props) => props.shadow};
  margin-top: -1px;
  background-color: ${(props) => props.background};
  overflow-y: auto;
  max-height: 400px;
  min-width: 100%;
  position: absolute;
  z-index: 50;
`;
const DropDownListItem = styled.button`
  font-family: "Inter";
  text-align: left;
  min-width: 100%;
  background-color: ${(props) =>
    props.selected ? props.selectedBackground : "transparent"};
  padding: 3%;
  border: none;
  transition: all 0.2s ease-in-out;
  height: 35px;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.background};
  }
`;

const NewDropdown = (props) => {
  // variables
  const {
    options,
    placeholder,
    onChange,
    game = null,
    team = false,
    matchType = false,
    tournament = false,
    defaultOption = null,
  } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  // state
  const [listOpen, setListOpen] = useState(false);
  const [title, setTitle] = useState(placeholder);

  // methods
  const toggleOpen = () => {
    setListOpen(!listOpen);
  };

  // useEffects
  useEffect(() => {
    if (game) {
      setTitle(placeholder);
    }
  }, [game]);

  useEffect(() => {
    if (team) {
      setTitle(placeholder);
    }
    if (tournament) {
      setTitle(placeholder);
    }
  }, [matchType]);

  useEffect(() => {
    if (defaultOption) {
      setTitle(defaultOption?.title);
    }
  }, [defaultOption]);

  // styles
  const styles = {
    icon: {
      color: theme.text(),
      float: "right",
      marginTop: "auto",
      marginBottom: "auto",
      top: "50%",
    },
    title: {
      fontSize: 15,
      fontWeight: 400,
      color: theme.text(),
    },
    placeholder: {
      fontSize: 15,
      fontWeight: 400,
      color: "#4f525f",
    },
    options: {
      fontSize: 15,
      fontWeight: 400,
      color: theme.text(),
    },
  };

  return (
    <DropDownContainer shadow={theme.shadow()}>
      <DropDownHeaderContainer
        type="button"
        onClick={toggleOpen}
        color={theme.border()}
        backgroundColor={"#0d1015"}
        blue={theme.primary()}
      >
        <span style={title !== placeholder ? styles.title : styles.placeholder}>
          {title}
        </span>
        {listOpen ? (
          <FaAngleUp style={styles.icon} />
        ) : (
          <FaAngleDown style={styles.icon} />
        )}
      </DropDownHeaderContainer>
      {listOpen && (
        <DropDownList
          color={theme.border()}
          shadow={theme.shadow()}
          background={"#0d1015"}
        >
          {options?.map((option, i) => (
            <DropDownListItem
              type="button"
              onClick={() => {
                if (option.title === "None") {
                  setTitle(placeholder);
                  onChange(null);
                  setListOpen(false);
                  return;
                } else {
                  if (team) {
                    setTitle(option.title);
                    onChange(option.value, option.teamMembers);
                    setListOpen(false);
                    return;
                  }
                  setTitle(option.title);
                  onChange(option.value);
                  setListOpen(false);
                }
              }}
              key={i}
              selected={option.title === title}
              background={theme.cardHover()}
              selectedBackground={theme.primary()}
            >
              <span style={styles.options}>{option?.title}</span>
            </DropDownListItem>
          ))}
        </DropDownList>
      )}
    </DropDownContainer>
  );
};

export default NewDropdown;
