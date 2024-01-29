// admin panel endpoints

export const getDisputes = async (useAxios) => {
  return await useAxios
    .get(`admin/disputes`)
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const getReferrals = async (useAxios) => {
  return await useAxios
    .get("admin/referrals")
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const createReferral = async (useAxios, code, username) => {
  return await useAxios
    .post("admin/referrals/create", {
      code,
      username,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const getPendingWithdrawals = async (useAxios) => {
  return await useAxios
    .get(`admin/withdrawals`)
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const markPendingWithdrawal = async (useAxios, unique_value) => {
  return await useAxios
    .post(`admin/withdrawals/mark`, {
      unique_value,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const checkForAlts = async (useAxios, username) => {
  const params = {
    username,
  };
  return await useAxios
    .get(`admin/user/alts`, { params })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const giveOrTakeBadge = async (
  useAxios,
  username,
  badgeType,
  badgeObj
) => {
  return await useAxios
    .post(`admin/user/badges/set`, {
      username,
      badgeType,
      value: badgeObj,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.body?.message };
    });
};

export const getUserDeposits = async (useAxios, username) => {
  const params = { username };
  return await useAxios
    .get(`admin/user/deposits`, { params })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.body?.message };
    });
};

export const getUserNotes = async (useAxios, username) => {
  const params = { username };
  return await useAxios
    .get(`admin/user/notes`, { params })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.body?.message };
    });
};

export const createUserNote = async (useAxios, username, note) => {
  return await useAxios
    .post(`admin/user/notes/create`, {
      username,
      note,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.body?.message };
    });
};

export const getUserReports = async (useAxios, username) => {
  const params = { username };
  return await useAxios
    .get(`admin/user/reports`, { params })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const getUserWithdrawals = async (useAxios, username) => {
  const params = { username };
  return await useAxios
    .get(`admin/user/withdrawals`, { params })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const promoteUser = async (useAxios, username, role) => {
  return await useAxios
    .post(`admin/user/promote`, {
      username,
      role,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const getUserInfo = async (useAxios, username) => {
  const params = { username };
  return await useAxios
    .get(`admin/user/info`, { params })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.data?.message };
    });
};

export const banUser = async (useAxios, username) => {
  return await useAxios
    .post(`admin/user/ban`, {
      username,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.body?.message };
    });
};

export const unbanUser = async (useAxios, username) => {
  return await useAxios
    .post(`admin/user/unban`, {
      username,
    })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.body?.message };
    });
};

export const giveUserPremium = async (useAxios, username) => {
  return await useAxios
    .post(`admin/user/premium/set`, { username, length: "monthly" })
    .then((res) => res.data)
    .catch((err) => {
      return { error: true, message: err?.response?.body?.message };
    });
};
