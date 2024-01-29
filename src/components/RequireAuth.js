import createAuthProvider from "../utils/AuthProvider";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const authProvider = createAuthProvider();
  const [isLogged] = authProvider.useAuth();

  return isLogged === true ? children : <Navigate to="/" replace />;
};

export default RequireAuth;
