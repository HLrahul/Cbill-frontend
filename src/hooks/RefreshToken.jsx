// Imports
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/store";
import axios from "../api/axios";

// refresh api URL
const REFRESH_URL = "/token/refresh/";

// Actual Refresh functional compoenent
const RefreshToken = () => {
  // constants for the hooks
  const userName = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();

  // async function for refreshing token
  const refresh = async () => {
    const response = await axios.post(REFRESH_URL, {
      withCredentials: true,
    });
    // dispatch the login reducer in the userSlice of the redux toolkit store
    dispatch(
      login({
        username: userName,
        accessToken: response?.data?.access,
      })
    );

    return response.data.access;
  };

  return refresh;
};
export default RefreshToken;
