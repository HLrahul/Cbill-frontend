import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/store";
import axios from "../../api/axios";

const REFRESH_URL = "/token/refresh/";

const RefreshToken = () => {
  const userName = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await axios.post(REFRESH_URL, {
      withCredentials: true,
    });
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
