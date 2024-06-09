const getTokenMatchType = (matchType) => {
  switch (matchType) {
    case "ZW":
      return "Zone Wars";
    case "BOX":
      return "Box Fights";
    case "REAL":
      return "Realistics";
    case "PG":
      return "Build Fights";
    case "RACE":
      return "Unranked Kill Race";
    case "ARENA_RACE":
      return "Ranked Kill Race";
    case "ASCENT":
      return "Ascent";
    case "BIND":
      return "Bind";
    case "HAVEN":
      return "Haven";
    case "SPLIT":
      return "Split";
    case "PEARL":
      return "Pearl";
    case "FRACTURE":
      return "Fracture";
    case "ICEBOX":
      return "Icebox";
    case "BREEZE":
      return "Breeze";
    case "BATTLE":
      return "Battle";
    case "RAMPS":
      return "Ramps";
    case "BIG_ARENA":
      return "Big Arena";
    case "STABLES":
      return "Stables";
    case "PARK":
      return "Park";
    case "VANS":
      return "Vans";
    default:
      return null;
  }
};

const getCurrentTokenRegion = (region) => {
  switch (region) {
    case "NAE":
      return "NA East";
    case "NAW":
      return "NA West";
    case "CENTRAL":
      return "NA Central";
    case "EU":
      return "Europe";
    case "OCE":
      return "Oceania";
    case "ASIA":
      return "Asia";
  }
};

const getCurrentTokenTitle = (teamSize, matchType) => {
  const getTokenSize = () => {
    switch (teamSize) {
      case 1:
        return "1v1";
      case 2:
        return "2v2";
      case 3:
        return "3v3";
      case 4:
        return "4v4";
      case 5:
        return "5v5";
    }
  };
  const title = `${getTokenSize()} ${getTokenMatchType(matchType)}`;
  return title;
};

const getDateForMatch = (id) => {
  const timestamp = id?.toString().substring(0, 8);
  const date = new Date(parseInt(timestamp, 16) * 1000);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const getTimeForMatch = (id) => {
  const timestamp = id?.toString().substring(0, 8);
  const date = new Date(parseInt(timestamp, 16) * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, "0");
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

const getFullDateForMatch = (id) => {
  const timestamp = id?.toString().substring(0, 8);
  return new Date(parseInt(timestamp, 16) * 1000);
};

const getColorForGame = (game) => {
  switch (game) {
    case "FN":
      return "#00bbf9";
    case "VAL":
      return "#FF4653";
    case "CLASH":
      return "#06d6a0";
    case "FIVEM":
      return "#fe8739";
  }
};

const getTournamentDate = (startDate) => {
  const date = new Date(startDate);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, "0");
  let strTime = hours + ":" + minutes + " " + ampm;
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  const strDate = date.toLocaleDateString("en-US", options);
  return `${strDate}, ${strTime}`;
};

const getGame = (g) => {
  switch (g) {
    case "FN":
      return "Fortnite";
    case "VAL":
      return "Valorant";
    case "CLASH":
      return "Clash Royale";
    case "FIVEM":
      return "FiveM";
    default:
      return "Fortnite";
  }
};

const getMatchType = (type) => {
  switch (type) {
    case "ZW":
      return `Zone Wars`;
    case "REAL":
      return `Realistics`;
    case "BOX":
      return `Box Fights`;
    case "PG":
      return `PG/Build Fights`;
    case "RACE":
      return `Kill Race`;
    case "ARENA_RACE":
      return `Arena Kill Race`;
    case "BIND":
      return "Bind";
    case "FRACTURE":
      return "Fracture";
    case "ICEBOX":
      return "Icebox";
    case "BREEZE":
      return "Breeze";
    case "SPLIT":
      return "Split";
    case "HAVEN":
      return "Haven";
    case "ASCENT":
      return "ASCENT";
    case "BATTLE":
      return "Battle 1v1";
    case "VOTE":
      return "Pick/Ban Map";
    default:
      return "";
  }
};

const getDayLabel = (days) => {
  if (days < 1) {
    return "";
  }

  if (days === 1) {
    return "day";
  }

  if (days > 1) {
    return "days";
  }
};

const getHourLabel = (hours) => {
  if (hours < 1) {
    return "";
  }

  if (hours === 1) {
    return "hour";
  }

  if (hours > 1) {
    return "hours";
  }
};

const getMinuteLabel = (minutes) => {
  if (minutes < 1) {
    return "";
  }

  if (minutes === 1) {
    return "minute";
  }

  if (minutes > 1) {
    return "minutes";
  }
};

const getSecondLabel = (seconds) => {
  if (seconds < 1) {
    return "0 seconds";
  }

  if (seconds === 1) {
    return "second";
  }

  if (seconds > 1) {
    return "seconds";
  }
};

const timeRemaining = (startDate) => {
  return new Date(startDate) - new Date();
};

const isTeamInTournament = (userTeams, currentWagerId) => {
  for (let i = 0; i < userTeams?.length; i++) {
    if (userTeams[i]?.in_wager && userTeams[i]?.wager_id === "") {
      return true;
    }
  }
  return false;
};

const getTournamentCountdownDate = (days, hours, minutes, seconds) => {
  const d = days < 1 ? "" : days;
  const h = hours < 1 ? "" : hours;
  const m = minutes < 1 ? "" : minutes;
  const s = seconds < 1 ? "" : seconds;

  return `${d} ${getDayLabel(days)} ${h} ${getHourLabel(
    hours
  )} ${m} ${getMinuteLabel(minutes)} ${s} ${getSecondLabel(seconds)}`;
};

const getNumWinnersOptions = (numTeams) => {
  switch (numTeams) {
    case 8:
      return [
        { title: "1", value: 1 },
        { title: "2", value: 2 },
        { title: "4", value: 4 },
      ];
    case 16:
      return [
        { title: "1", value: 1 },
        { title: "2", value: 2 },
        { title: "4", value: 4 },
        { title: "8", value: 8 },
      ];
    case 32:
      return [
        { title: "1", value: 1 },
        { title: "2", value: 2 },
        { title: "4", value: 4 },
        { title: "8", value: 8 },
        { title: "16", value: 16 },
      ];
    case 64:
      return [
        { title: "1", value: 1 },
        { title: "2", value: 2 },
        { title: "4", value: 4 },
        { title: "8", value: 8 },
        { title: "16", value: 16 },
        { title: "32", value: 32 },
      ];
    case 128:
      return [
        { title: "1", value: 1 },
        { title: "2", value: 2 },
        { title: "4", value: 4 },
        { title: "8", value: 8 },
        { title: "16", value: 16 },
        { title: "32", value: 32 },
        { title: "64", value: 64 },
      ];
  }
};

// match type options
const fortMatchOptions = [
  { title: "None", value: null },
  { title: "Zone Wars", value: "ZW" },
  { title: "Box Fights", value: "BOX" },
  { title: "Realistics", value: "REAL" },
  { title: "Build Fight", value: "PG" },
  { title: "Ranked Kill Race", value: "ARENA_RACE" },
  { title: "Unranked Kill Race", value: "RACE" },
];
const ValMatchOptions = [
  { title: "None", value: null },
  { title: "Pick/Ban", value: "VOTE" },
  { title: "Icebox", value: "ICEBOX" },
  { title: "Bind", value: "BIND" },
  { title: "Haven", value: "HAVEN" },
  { title: "Pearl", value: "PEARL" },
  { title: "Ascent", value: "ASCENT" },
  { title: "Breeze", value: "BREEZE" },
  { title: "Fracture", value: "FRACTURE" },
];
const ValCreateMatchOptions = [
  { title: "None", value: null },
  { title: "Icebox", value: "ICEBOX" },
  { title: "Bind", value: "BIND" },
  { title: "Haven", value: "HAVEN" },
  { title: "Pearl", value: "PEARL" },
  { title: "Ascent", value: "ASCENT" },
  { title: "Breeze", value: "BREEZE" },
  { title: "Fracture", value: "FRACTURE" },
];
const clashMatchOptions = [
  { title: "None", value: null },
  { title: "1v1 Battle", value: "BATTLE" },
];
const fivemMatchOptions = [
  { title: "None", value: null },
  { title: "Vans", value: "VANS" },
  { title: "Big Arena", value: "BIG_ARENA" },
  { title: "Stables", value: "STABLES" },
  { title: "Ramps", value: "RAMPS" },
];

// region options
const fortRegions = [
  { title: "None", value: null },
  { title: "Europe", value: "EU" },
  { title: "North America East", value: "NAE" },
  { title: "North America West", value: "NAW" },
  { title: "Oceania", value: "OCE" },
];

const valRegions = [
  { title: "None", value: null },
  { title: "NA East", value: "NAE" },
  { title: "NA West", value: "NAW" },
  { title: "NA Central", value: "CENTRAL" },
  { title: "Europe", value: "EU" },
  { title: "Oceania", value: "OCE" },
  { title: "Asia", value: "ASIA" },
];

// first to options
const fortFirstToOptions = [
  { title: "None", value: null },
  { title: "First to 3", value: 3 },
  { title: "First to 5", value: 5 },
  { title: "First to 7", value: 7 },
];
const fortFirstToRaceOptions = [
  { title: "None", value: null },
  { title: "First to 1", value: 1 },
  { title: "First to 3", value: 3 },
];
const valFirstToOptions = [
  { title: "None", value: null },
  { title: "First to 5", value: 5 },
  { title: "First to 7", value: 7 },
  { title: "First to 9", value: 9 },
  { title: "First to 13", value: 13 },
];

const fivemFirstToOptions = [
  { title: "None", value: null },
  { title: "First to 5", value: 5 },
];

const rankOptions = [
  { title: "Any", value: null },
  { title: "Iron", value: "IRON" },
  { title: "Bronze", value: "BRONZE" },
  { title: "Silver", value: "SILVER" },
  { title: "Gold", value: "GOLD" },
  { title: "Platinum", value: "PLAT" },
  { title: "Diamond", value: "DIAMOND" },
  { title: "Ascendant", value: "ASCENDANT" },
  { title: "Immortal", value: "IMM" },
  { title: "Radiant", value: "RADIANT" },
];

const getRankLabel = (rank) => {
  switch (rank) {
    case "IRON":
      return "Iron";
    case "BRONZE":
      return "Bronze";
    case "SILVER":
      return "Silver";
    case "GOLD":
      return "Gold";
    case "PLAT":
      return "Platinum";
    case "DIAMOND":
      return "Diamond";
    case "ASCENDANT":
      return "Ascendant";
    case "IMM":
      return "Immortal";
    case "RADIANT":
      return "Radiant";
  }
};

const determineRounds = (g, matchType, teamSize) => {
  switch (g) {
    case "FN":
      return matchType === "ARENA_RACE" || matchType === "RACE"
        ? fortFirstToRaceOptions
        : fortFirstToOptions;
    case "VAL":
      if (teamSize > 3) {
        return [
          { title: "None", value: null },
          { title: "First to 13", value: 13 },
        ];
      }
      return valFirstToOptions;
    case "CLASH":
      return [
        { title: "None", value: null },
        { title: "First to 1", value: 1 },
      ];
    case "FIVEM":
      return fivemFirstToOptions;
  }
};

const determineMatchOptions = (g) => {
  switch (g) {
    case "FN":
      return fortMatchOptions;
    case "VAL":
      return ValCreateMatchOptions;
    case "CLASH":
      return clashMatchOptions;
    case "FIVEM":
      return fivemMatchOptions;
  }
};

const determineRegion = (g) => {
  switch (g) {
    case "FN":
      return fortRegions;
    case "VAL":
      return valRegions;
    case "CLASH":
      return fortRegions;
    case "FIVEM":
      return fortRegions;
  }
};

const determinePlaceEnd = (place) => {
  switch (place) {
    case "1":
      return "st";
    case "2":
      return "nd";
    case "3":
      return "rd";
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "11":
    case "12":
    case "13":
    case "14":
    case "15":
    case "16":
    case "17":
    case "18":
    case "19":
    case "20":
      return "th";
    case "21":
      return "st";
    case "22":
      return "nd";
    case "23":
      return "rd";
    case "24":
    case "25":
    case "26":
    case "27":
    case "28":
    case "29":
    case "30":
      return "th";
    case "31":
      return "st";
    case "32":
      return "nd";
  }
};

const determineTeamSizeOptions = (g, matchType) => {
  switch (g) {
    case "FN":
      return [
        { title: "None", value: null },
        { title: "1v1", value: 1 },
        { title: "2v2", value: 2 },
        { title: "3v3", value: 3 },
        { title: "4v4", value: 4 },
      ];
    case "VAL":
      return [
        { title: "None", value: null },
        { title: "2v2", value: 2 },
        { title: "3v3", value: 3 },
        { title: "4v4", value: 4 },
        { title: "5v5", value: 5 },
      ];
    case "CLASH":
      return [
        { title: "None", value: null },
        { title: "1v1", value: 1 },
      ];
    case "FIVEM":
      if (matchType === "RAMPS" || matchType === "VANS") {
        return [
          { title: "None", value: null },
          { title: "1v1", value: 1 },
          { title: "2v2", value: 2 },
        ];
      }
      if (matchType === "BIG_ARENA" || matchType === "STABLES") {
        return [
          { title: "None", value: null },
          { title: "3v3", value: 3 },
          { title: "4v4", value: 4 },
          { title: "5v5", value: 5 },
        ];
      }
  }
};

const teamOptions = (userTeams, matchType, game, teamSize) => {
  let teamOpts = [{ title: "None", value: null }];

  // check clash teams
  if (game === "CLASH") {
    userTeams = userTeams?.filter((team) => team?.usernames?.length < 2);
  }

  // check fortnite teams
  if (matchType === "ARENA_RACE" || matchType === "PG") {
    userTeams = userTeams?.filter((team) => team?.usernames?.length < 2);
  }

  if (matchType === "RACE") {
    userTeams = userTeams?.filter((team) => team?.usernames?.length < 3);
  }

  // check val
  if (game === "VAL") {
    userTeams = userTeams?.filter((team) => team?.usernames?.length > 0);
  }

  // check team size
  userTeams = userTeams?.filter((team) => team?.usernames?.length === teamSize);

  userTeams?.forEach((team) => {
    teamOpts.push({
      title: team?.name,
      value: team?._id,
      teamMembers: team?.usernames,
    });
  });

  return teamOpts;
};

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return null;
  } else {
    // Render a countdown
    return (
      <span style={{ fontWeight: 600 }}>
        {getTournamentCountdownDate(days, hours, minutes, seconds)}
      </span>
    );
  }
};

const createSections = (items) => {
  if (items?.length < 1) return;

  let newSectionMap = {};

  items?.forEach((item) => {
    const itemDate = getDateForMatch(item?._id);

    if (newSectionMap[itemDate]) {
      newSectionMap[itemDate] = [...newSectionMap[itemDate], item];
    } else {
      newSectionMap[itemDate] = [item];
    }
  });
  return Object?.entries(newSectionMap);
};

const currencyOptions = [
  { title: "None", value: null },
  { title: "USD", value: "USD" },
  { title: "EUR", value: "EUR" },
  { title: "GBP", value: "GBP" },
  { title: "CAD", value: "CAD" },
  { title: "INR", value: "INR" },
  { title: "AED", value: "AED" },
  { title: "ARS", value: "ARS" },
  { title: "AUD", value: "AUD" },
  { title: "BDT", value: "BDT" },
  { title: "BGN", value: "BGN" },
  { title: "BRL", value: "BRL" },
  { title: "BWP", value: "BWP" },
  { title: "CHF", value: "CHF" },
  { title: "CLP", value: "CLP" },
  { title: "CNY", value: "CNY" },
  { title: "COP", value: "COP" },
  { title: "CRC", value: "CRC" },
  { title: "CZK", value: "CZK" },
  { title: "DKK", value: "DKK" },
  { title: "EGP", value: "EGP" },
  { title: "FJD", value: "FJD" },
  { title: "FJD", value: "FJD" },
  { title: "GEL", value: "GEL" },
  { title: "GHS", value: "GHS" },
  { title: "HKD", value: "HKD" },
  { title: "HRK", value: "HRK" },
  { title: "HUF", value: "HUF" },
  { title: "IDR", value: "IDR" },
  { title: "ILS", value: "ILS" },
  { title: "INR", value: "INR" },
  { title: "JPY", value: "JPY" },
  { title: "KES", value: "KES" },
  { title: "KRW", value: "KRW" },
  { title: "LKR", value: "LKR" },
  { title: "MAD", value: "MAD" },
  { title: "MXN", value: "MXN" },
  { title: "MYR", value: "MYR" },
  { title: "NGN", value: "NGN" },
  { title: "NOK", value: "NOK" },
  { title: "NPR", value: "NPR" },
  { title: "NZD", value: "NZD" },
  { title: "PHP", value: "PHP" },
  { title: "PKR", value: "PKR" },
  { title: "PLN", value: "PLN" },
  { title: "RON", value: "RON" },
  { title: "RUB", value: "RUB" },
  { title: "SEK", value: "SEK" },
  { title: "SGD", value: "SGD" },
  { title: "THB", value: "THB" },
  { title: "TRY", value: "TRY" },
  { title: "TZS", value: "TZS" },
  { title: "UAH", value: "UAH" },
  { title: "UGX", value: "UGX" },
  { title: "UYU", value: "UYU" },
  { title: "VND", value: "VND" },
  { title: "XOF", value: "XOF" },
  { title: "ZAR", value: "ZAR" },
  { title: "ZMW", value: "ZMW" },
];

/**
 * 
 * @param {string} password 
 * @returns string
 */
const validatePassword = (password) => {
  // Check if the length is at least 12 characters
  if (password.length < 12) {
    return 'Password must be at least 12 characters long.';
  }

  // Check if contains only letters, numbers, and specific special characters
  const validCharacters = /^[A-Za-z0-9!@#$%^&*(),.?:{}|<>]+$/;
  if (!validCharacters.test(password)) {
    return 'Password contains invalid characters. Only letters, numbers, and special characters are allowed.';
  }

  // Check if contains at least one number
  const hasNumber = /[0-9]/;
  if (!hasNumber.test(password)) {
    return 'Password must contain at least one number.';
  }

  // Check if contains at least one uppercase letter
  const hasUppercase = /[A-Z]/;
  if (!hasUppercase.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }

  return '';
}

export {
  getDateForMatch,
  getTimeForMatch,
  getColorForGame,
  getTournamentDate,
  getGame,
  getTournamentCountdownDate,
  fortMatchOptions,
  ValMatchOptions,
  clashMatchOptions,
  fivemMatchOptions,
  fortRegions,
  valRegions,
  fortFirstToOptions,
  fortFirstToRaceOptions,
  valFirstToOptions,
  fivemFirstToOptions,
  determineMatchOptions,
  determineRegion,
  determineTeamSizeOptions,
  determineRounds,
  teamOptions,
  getMatchType,
  timeRemaining,
  isTeamInTournament,
  getCurrentTokenTitle,
  getFullDateForMatch,
  determinePlaceEnd,
  getNumWinnersOptions,
  renderer,
  getTokenMatchType,
  getCurrentTokenRegion,
  rankOptions,
  getRankLabel,
  createSections,
  ValCreateMatchOptions,
  currencyOptions,
  validatePassword,
};
