import {Navigate, Outlet} from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

// This is a wrapper component to implement access control for
// the pages in the front-end

const ProtectedRoutes = ({ allowedUsers }) => {
    const {user} = useAuth();

    // Case for unlogged clients
    if(!user) {
        return <Navigate to='/login' replace/>;
    }

    // Case for unauthorized access
    if(!allowedUsers.includes(user.role)) {
        return <Navigate to='/' reaplace/>;
    }

    return <Outlet />;
}

export default ProtectedRoutes;

