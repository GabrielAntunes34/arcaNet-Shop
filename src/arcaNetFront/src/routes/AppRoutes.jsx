import { Routes, Route } from 'react-router-dom';

// imports for specific components
import Layout from '../components/Layout/Layout';
import ProtectedRoutes from './ProtectedRoutes';
import PlaygroundCarousel from '../tests/CarouselMock';
//import ProductListPage from '../tests/ProductGridMock';
import Playground from '../tests/ProductCardMock';
import ProductPage from '../tests/SearchBarMock';

// Imports for pages
import HomePage from '../pages/HomePage';
import ProductListPage from '../features/products/ProductListPage';
import LoginPage from '../features/auth/LoginPage';
import SignUpPage from '../features/auth/SignUpPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProductDetailPage from '../features/products/ProductDetailPage';
import ProfilePage from '../features/auth/ProfilePage';
import CartPage from '../features/cart/CartPage';
import CartItem from '../features/cart/CartItem/CartItem';
import PaymentPage from '../features/cart/PaymentPage';
import WheelOfFortunePage from '../features/wheelOfFortune/WheelOfFortunePage';

// Admin pages
import ManageCategoriesPage from '../features/admin/categories/ManageCategoriesPage';
import AddCategoryPage from '../features/admin/categories/AddCategoryPage';
import ManageProductsPage from '../features/admin/products/ManageProductsPage';
import AddProductPage from '../features/admin/products/AddProductPage';
import ManageUsersPage from '../features/admin/users/ManageUsersPage';

// Keeps the list of routes of our application
const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>

				{/* Public routes */}
				<Route path='' element={<HomePage />} />
				<Route path='*' element={<NotFoundPage />} />

				<Route path="carousel-test" element={<PlaygroundCarousel />} />
				<Route path="product-card" element={<Playground />} />
				<Route path="search-bar" element={<ProductPage />} />

				<Route path='products' element={<ProductListPage />} />
				<Route path='products/:id' element={<ProductDetailPage />} />

				<Route path='login' element={<LoginPage />} />
				<Route path='signup' element={<SignUpPage />} />

				<Route path='cart' element={<CartPage />} />

				<Route path='Wheel-of-fortune' element={<WheelOfFortunePage />} />

				{/* Routes protected for logged Users*/}
				<Route element={<ProtectedRoutes allowedUsers={['admin', 'client']} />}>
					<Route path='profile' element={<ProfilePage />} />
					<Route path='payment' element={<PaymentPage />} />
				</Route>

				{/* Routes protected for administrators */}
				<Route path='admin/' element={<ProtectedRoutes allowedUsers={['admin']} />}>
					<Route path='categories' element={<ManageCategoriesPage />} />
					<Route path='categories/add' element={<AddCategoryPage />} />

					<Route path='products' element={<ManageProductsPage />} />
					<Route path='products/add' element={<AddProductPage />} />

					<Route path='users' element={<ManageUsersPage />} />

				</Route>

			</Route>
		</Routes>
	);
}

export default AppRoutes;


