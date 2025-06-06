import { BrowserRouter } from 'react-router-dom';
import './App.css'
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './features/auth/AuthContext';
import { CartProvider } from './context/CartContext';

// Instanciates a BrowserRouter and recives applys the navbar and
// Header for all pages
const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </BrowserRouter> 
      </AuthProvider>

    </>
  );
};

export default App;