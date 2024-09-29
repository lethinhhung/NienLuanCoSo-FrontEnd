import { Navigate } from 'react-router-dom';
import { useAuth } from '~/contexts/Auth';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
