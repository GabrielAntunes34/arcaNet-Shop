// src/components/Layout/Layout.jsx (ou onde estiver seu arquivo)
import { Outlet } from "react-router-dom";
import NavBar from './NavBar';
import Footer from './Footer';
import './Layout.css'; // Crie este arquivo CSS

const Layout = () => {
    return (
        <div className="layout-container"> {/* Nova div encapsuladora */}
            <NavBar />
            <main className="layout-main-content"> {/* Classe para o conteúdo principal */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;