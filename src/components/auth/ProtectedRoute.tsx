import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type Roles = 'admin' | 'user' | 'editor';

interface RolesUser {
    allowedRoles: [Roles, ...Roles[]];
};

const ProtectedRoute = ({allowedRoles}: RolesUser) => {
    const { isLoggedIn, isLoading, user } = useAuth();

    if (isLoading) {
        return ( 
            <div>Cargando...</div>
        );
    }
    
    if (!isLoggedIn) {
        return <Navigate to='/login' replace/>
    }
    
    const hasPermission = user?.role && allowedRoles.includes(user.role as Roles);
    
    if (!hasPermission) {
        return <Navigate to='/login' replace/>
    }

    return <Outlet />
}

export default ProtectedRoute;