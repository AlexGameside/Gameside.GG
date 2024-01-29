import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import styled from "styled-components";

// styles
const ChatInput = styled.input`
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #4f525f;
    font-weight: 500;
    font-size: 15px;
  }
  :-ms-input-placeholder {
    color: ${(props) => props.placeholderColor};
  }
  background-color: #15151c;
  color: ${(props) => props.color};
  border-radius: 8px;
  min-height: 45px;
  font-size: 15px;
  padding-left: 16px;
  padding-right: 16px;
  outline: none;
  font-family: "Inter";
  font-weight: 400;
  border: none;
  width: 100%;
  webkit-appearance: none;
  border: 2px solid ${(props) => props.border};
  transition: all 0.2s ease-in-out;
  &:hover {
    border: 2px solid ${(props) => props.borderHover};
  }
  &:focus {
    border: 2px solid ${(props) => props.borderHover};
  }
  ::-webkit-calendar-picker-indicator {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 24"><path fill="%23bbbbbb" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>');
  }
`;

const NewChatInput = (props) => {
  // variables
  const { placeholder, handleSendMessage, disabled = false } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  // state
  const [inputValue, setInputValue] = useState(null);

  // methods
  const handleKeyPress = (e, value) => {
    if (e.key === "Enter") {
      handleSendMessage(value);
      setInputValue("");
    }
    return;
  };

  return (
    <ChatInput
      border={theme.border()}
      borderHover={theme.green()}
      backgroundColor={theme.cardDark()}
      color={theme.text()}
      placeholderColor={theme.metaText()}
      value={inputValue}
      placeholder={placeholder}
      onChange={(e) => {
        setInputValue(e.target.value);
      }}
      disabled={disabled}
      onKeyPress={(e) => handleKeyPress(e, inputValue)}
    />
  );
};

export default NewChatInput;
