import { Outlet } from "react-router-dom";
import NavBar from './NavBar';
import Footer from './Footer';
import './Layout.css'; 

const Layout = () => {
    return (
        <div className="layout-container">
            <NavBar />
            <main className="layout-main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;