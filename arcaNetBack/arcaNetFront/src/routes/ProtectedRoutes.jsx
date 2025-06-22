import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Envolve rotas que exigem autenticação.
 * Redireciona para login se o usuário não estiver logado.
 * Também pode receber `requiredRole` para restringir por tipo de usuário (ex: "admin").
 */
const ProtectedRoutes = ({ children, requiredRole }) => {
  const { user } = useAuth();

  // Se ainda não sabe se há usuário (pode colocar um loader, se quiser)
  if (user === undefined) return null;

  // Se não está logado, redireciona para login
  if (!user) return <Navigate to="/login" replace />;

  // Se precisa ser admin e não é
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Caso autorizado, renderiza a rota
  return children;
};

export default ProtectedRoutes;