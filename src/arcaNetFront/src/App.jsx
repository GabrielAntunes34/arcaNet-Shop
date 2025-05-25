import { BrowserRouter } from 'react-router-dom';
import './App.css'
import AppRoutes from './routes/AppRoutes';

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
        <AppRoutes />
      </BrowserRouter> 
    </>
  );
};

export default App;
