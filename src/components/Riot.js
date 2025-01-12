import React, { useEffect, useState } from "react";

const RiotText = () => {
  const [riotText, setRiotText] = useState("");

  useEffect(() => {
    fetch("/valorant/riot.txt")
      .then((response) => response.text())
      .then((data) => setRiotText(data))
      .catch(() => setRiotText("Error: Could not load riot.txt"));
  }, []);

  return <>{riotText}</>;
};

export default RiotText;
