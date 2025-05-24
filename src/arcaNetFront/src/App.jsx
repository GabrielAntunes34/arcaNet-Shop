import { BrowserRouter } from 'react-router-dom';
import './App.css'
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './features/auth/AuthContext';

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
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter> 
      </AuthProvider>
    </>
  );
};

export default App;
