import { useAuth } from '../../context/LoginContext';
import { Navigate } from "react-router";
import { UrlConstants } from '../../constants/url.contants';

export const ProtectedRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const { getToken } = useAuth();
  const token = getToken();

  return token ? (
    <Component {...rest} />
  ) : (
    <Navigate to={UrlConstants.LOGIN} />
  )
}
