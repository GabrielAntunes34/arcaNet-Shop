import { Routes, Route } from 'react-router-dom';

// imports for specific components
import Layout from '../components/Layout/Layout';
import ProtectedRoutes from './ProtectedRoutes';

// Imports for pages
import HomePage from '../pages/HomePage';
import ProductListPage from '../features/products/ProductListPage';
import LoginPage from '../features/auth/LoginPage';
import SignUpPage from '../features/auth/SignupPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProductDetailPage from '../features/products/ProductDetailPage';
import ProfilePage from '../features/auth/ProfilePage';
import CartPage from '../features/cart/CartPage';
import PaymentPage from '../features/cart/PaymentPage';
import WheelOfFortunePage from '../features/wheelOfFortune/WheelOfFortunePage';
import AdminDashboardPage from '../features/admin/AdminDashboardPage';
import AdminCreatePage from '../features/admin/AdminCreatePage';
import AdminUpdatePage from '../features/admin/AdminUpdatePage';

// Keeps the list of routes of our application
const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>

				{/* Public routes */}
				<Route path='' element={<HomePage />} />
				<Route path='*' element={<NotFoundPage />} />

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
					<Route path='dashboard/:entity' element={<AdminDashboardPage />} />
					<Route path='create/:entity' element={<AdminCreatePage />} />
					<Route path='update/:entity/:id' element={<AdminUpdatePage />} />
				</Route>

			</Route>
		</Routes>
	);
}

export default AppRoutes;


/*
TEMPORARY NOTES:
 - AS ROTAS DOS IMPORTS DAS PÁGINAS PODEM MUDAR!!!

 - a rota /product/:id recebe um número em ':id'
 - Esse valor deve ser acessado no .jsx da página com o hook useParams
 - ele é necessário para buscar o produto exato no banco de dados
 - const { id } = useParams();

 - ProfilePage não precisa de um id na rota pois usaremos o cookie
  do usuário autenticado e o context da lógica que desenvolveremos
 - Isso é melhor para a segurança também; evita IDOR
*/