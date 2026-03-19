import { Navigate } from "react-router-dom";
import { useAuth, ROLE_ROUTES, UserRole } from "@/contexts/AuthContext";

interface Props {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    const defaultRoute = ROLE_ROUTES[user.role][0].path;
    return <Navigate to={defaultRoute} replace />;
  }

  return <>{children}</>;
}
