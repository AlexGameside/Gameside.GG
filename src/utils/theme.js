import bg from "../assets/liquid-cheese-light.svg";
import darkBG from "../assets/liquid-cheese.svg";

// color theme for the website
const createTheme = (mode) => {
  const changeWebsiteBackground = () => {
    const body = document.body.style;
    if (mode === "dark") {
      body.backgroundColor = "#0d1116";
    } else {
      body.backgroundColor = "#F7F7F8";
    }
  };

  const background = () => {
    if (mode === "dark") {
      return "#0d1116";
    } else {
      return "#ffffff";
    }
  };

  const primary = (hovered = false) => {
    return hovered ? "#3171bd" : "#4399FF";
  };

  const complementary = (hovered = false) => {
    return hovered ? "#bd7632" : "#F09641";
  };

  const red = () => {
    return "#FF5465";
  };

  const card = () => {
    if (mode === "dark") {
      return "#141920";
    } else {
      return "#ffffff";
    }
  };

  const cardDark = () => {
    return "#10141a";
  };

  const cardHover = () => {
    if (mode === "dark") {
      return "#2c3543";
    } else {
      return "#1f1f26";
    }
  };

  const border = (hovered = false) => {
    return hovered ? "#1e1e23" : "#242c39";
  };

  const text = () => {
    if (mode === "dark") {
      return "#E4E6EB";
    } else {
      return "#4a4b5e";
    }
  };

  const metaText = () => {
    if (mode == "dark") {
      return "#969a9e";
    } else {
      return "#B8BACC";
    }
  };

  const iconBackground = (hovered = false) => {
    return hovered ? "#35455d" : "#2a3546";
  };

  const glow = (color) => {
    return ` 0 0 2px ${color}, 0 0 6px ${color}, 0 0 8px ${color}, 0 0 10px ${color}, 0 0 12px ${color}, 0 0 14px ${color}`;
  };

  const emptyListIconStyle = () => {
    return { fontSize: 40, color: metaText() };
  };

  ////////////////////////////////////////////

  const logoColor = () => {
    return "#FFB601";
  };

  const subText = () => {
    if (mode === "dark") {
      return "#b4bcc7";
    } else {
      return "#B8BACC";
    }
  };

  const buttonHover = () => {
    return "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25))";
  };

  const shadow = () => {
    if (mode === "dark") {
      return "1px 1px 5px 1px rgb(0 0 0 / 50%)";
    } else {
      return "1px 1px 3px 1px rgb(79 82 102 / 20%)";
    }
  };

  const chatShadow = () => {
    if (mode === "dark") {
      return "0px 15px 3px -15px rgb(0 0 0 / 75%)";
    } else {
      return "0px 15px 3px -15px rgb(79 82 102 / 20%)";
    }
  };

  const chatShadowTop = () => {
    if (mode === "dark") {
      return "0px -15px 5px -15px rgb(0 0 0 / 75%)";
    } else {
      return "0px -15px 5px -15px rgb(79 82 102 / 20%)";
    }
  };

  // const cardDark = () => {
  //   if (mode === "dark") {
  //     return "#111115";
  //   } else {
  //     return "#fff";
  //   }
  // };

  const skeleton = () => {
    if (mode === "dark") {
      return "#212734";
    } else {
      return "#F2F2F3";
    }
  };

  const iconButton = () => {
    if (mode === "dark") {
      return "#262831";
    } else {
      return "#4a4b5e";
    }
  };

  const icon = () => {
    if (mode === "dark") {
      return "#959AA2";
    } else {
      return "#505266";
    }
  };

  const blue = () => {
    return "#4399FF";
  };

  // 09bc8a
  const green = () => {
    return "#46B99E";
  };

  const purple = () => {
    return "#9665E6";
  };

  const white = () => {
    return "#f5f7ff";
  };

  const offWhite = () => {
    return "#D7D9E8";
  };

  const black = () => {
    return "#4a4b5e";
  };

  const offBlack = () => {
    return "#B8BACC";
  };

  const orange = () => {
    return "#F09641";
  };

  const gold = () => {
    return "#ffee54";
  };

  return {
    changeWebsiteBackground,
    primary,
    logoColor,
    complementary,
    text,
    subText,
    background,
    shadow,
    card,
    cardHover,
    icon,
    blue,
    green,
    red,
    purple,
    white,
    skeleton,
    chatShadow,
    chatShadowTop,
    offWhite,
    black,
    offBlack,
    border,
    orange,
    metaText,
    gold,
    cardDark,
    iconButton,
    buttonHover,
    iconBackground,
    glow,
    emptyListIconStyle,
  };
};

export default createTheme;
