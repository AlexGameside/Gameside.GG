const shouldShowFiveM = (user) => {
  return user?.role > 500 ? true : false;
};

const shouldShowTournaments = (user) => {
  let users = [
    "arya",
    "alex",
    "gunhours",
    "arya",
    "natebrzz",
    "vokes",
    "retro",
    "wxtrz",
    "edwin",
    "arzsalvo",
    "wedito",
    "_bacca",
    "bestinmyprime",
    "alpine",
    "kidas",
    "bradyily",
    "ashton",
    "p2angel",
    "liljay",
    "wunder",
    "bdawgfn",
    "renuityfn",
    "duba",
    "lauper",
    "verny",
    "gunhoursmod",
    "team1",
    "team3",
    "team2",
    "team4",
    "aryamod2",
    "jquery4dayz",
    "gunhoursmod",
    "etzo",
    "gunhoursmod2",
    "gunhoursmod3",
    "daniel",
    "belthy1x",
    "deity4l",
    "numbb",
    "aspects",
    "becklovesadxmr",
    "cesarq",
    "vehxy",
    "ashton",
    "retro",
    "eetoh",
    "foltzy",
    "etzo",
    "bizzie",
    "feeik",
    "bubzie",
    "gozillafn",
    "raulteculea",
    "bopyy",
    "zuxsen",
    "free",
  ];

  if (users?.includes(user?.username)) {
    return true;
  }
  return false;
};

const canCreateTournaments = (user) => {
  return user?.role > 501 || user?.role === 69;
};

export { shouldShowFiveM, shouldShowTournaments, canCreateTournaments };
