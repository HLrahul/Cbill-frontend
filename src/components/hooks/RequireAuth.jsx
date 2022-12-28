import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const user = useSelector((store) => store.user.userName);
  const token = useSelector((store) => store.user.userAccessToken);

  const location = useLocation();

  return user && token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
export default RequireAuth;
