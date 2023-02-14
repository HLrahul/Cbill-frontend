// Imports
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Actual RequireAuth component
const RequireAuth = () => {
  // user from store
  const user = useSelector((store) => store.user);
  const location = useLocation();

  // If user is present return the Outlet or navigate to hompage
  return user.userAccessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
export default RequireAuth;
