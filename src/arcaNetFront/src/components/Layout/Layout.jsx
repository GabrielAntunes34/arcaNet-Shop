import { Outlet } from "react-router-dom";
import NavBar from './NavBar';
import Footer from './Footer';

// This component Encapsulates every main content from the application
// Into the a same Layout composed by NavBar and a Footer.

// Outlet will call our Router to resolve which content display
// Inside main, based on the givven url.

const Layout = () => {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;