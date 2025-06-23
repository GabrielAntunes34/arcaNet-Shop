import { BrowserRouter } from 'react-router-dom';
import './App.css'
import AppRoutes from './routes/AppRoutes';
import { AuthProvider, useAuth } from './features/auth/AuthContext';
import { FortuneProvider } from './features/wheelOfFortune/fortuneContext';
import { CartProvider } from './context/CartContext';

// Component to handle loading state
const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return <AppRoutes />;
};

// Instanciates a BrowserRouter and recives applys the navbar and
// Header for all pages
const App = () => {
  return (
    <>
      <AuthProvider>
        <FortuneProvider>
          <BrowserRouter>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </BrowserRouter> 
        </FortuneProvider>
      </AuthProvider>

    </>
  );
};

export default App;