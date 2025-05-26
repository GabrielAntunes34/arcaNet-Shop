import { BrowserRouter } from 'react-router-dom';
import './App.css'
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';

// =================================================
// |  Mockup functions - Place your tests here :)  |
// =================================================
import { simulateUserInQuery } from './tests/mockAuth';

simulateUserInQuery();


// Instanciates a BrowserRouter and recives applys the navbar and
// Header for all pages
const App = () => {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </BrowserRouter> 
    </>
  );
};

export default App;
