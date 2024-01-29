import axios from "axios";
import createTokenProvider from "./TokenUtils";
import constants from "./constants";

const baseURL = `${constants.serverURL}/api`;

const useAxios = (token = null) => {
  const accessToken = token ?? localStorage.getItem("accessToken");
  const tokenProvider = createTokenProvider();
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const userToken = token ?? (await tokenProvider.getToken());
    req.headers.Authorization = `Bearer ${userToken}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
