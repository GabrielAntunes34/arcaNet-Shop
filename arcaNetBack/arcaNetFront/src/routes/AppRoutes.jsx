// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import ProtectedRoutes from './ProtectedRoutes';

// Páginas públicas
import HomePage from '../pages/HomePage';
import ProductListPage from '../features/products/ProductListPage';
import ProductDetailPage from '../features/products/ProductDetailPage';
import LoginPage from '../features/auth/LoginPage';
import SignUpPage from '../features/auth/SignUpPage';
import CartPage from '../features/cart/CartPage';
import WheelOfFortunePage from '../features/wheelOfFortune/WheelOfFortunePage';
import NotFoundPage from '../pages/NotFoundPage';

// Páginas protegidas (usuário logado)
import ProfilePage from '../features/auth/ProfilePage';
import PaymentPage from '../features/cart/PaymentPage';

// Páginas de administrador
import ManageProductsPage from '../features/admin/products/ManageProductsPage';
import AddProductPage from '../features/admin/products/AddProductPage';
import ManageCategoriesPage from '../features/admin/categories/ManageCategoriesPage';
import AddCategoryPage from '../features/admin/categories/AddCategoryPage';
import ManageUsersPage from '../features/admin/users/ManageUsersPage';

// Rotas de playground / mock (opcionais — remova se não precisar)
import PlaygroundCarousel from '../tests/CarouselMock';
import PlaygroundCard from '../tests/ProductCardMock';
import PlaygroundSearch from '../tests/SearchBarMock';

const AppRoutes = () => (
  <Routes>
    {/* ----- Layout geral com NavBar + Footer ----- */}
    <Route path="/" element={<Layout />}>
      {/* ---------- Rotas públicas ---------- */}
      <Route index element={<HomePage />} />
      <Route path="products" element={<ProductListPage />} />
      <Route path="products/:id" element={<ProductDetailPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="wheel-of-fortune" element={<WheelOfFortunePage />} />

      {/* Playground (desenvolvimento) */}
      <Route path="carousel-test" element={<PlaygroundCarousel />} />
      <Route path="product-card" element={<PlaygroundCard />} />
      <Route path="search-bar" element={<PlaygroundSearch />} />

      {/* ---------- Rotas que exigem login (cliente OU admin) ---------- */}
      <Route
        path="profile"
        element={
          <ProtectedRoutes>
            <ProfilePage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="payment"
        element={
          <ProtectedRoutes>
            <PaymentPage />
          </ProtectedRoutes>
        }
      />

      {/* ---------- Rotas exclusivas para ADMIN ---------- */}
      <Route
        path="admin/products"
        element={
          <ProtectedRoutes requiredRole="admin">
            <ManageProductsPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="admin/products/add"
        element={
          <ProtectedRoutes requiredRole="admin">
            <AddProductPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="admin/categories"
        element={
          <ProtectedRoutes requiredRole="admin">
            <ManageCategoriesPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="admin/categories/add"
        element={
          <ProtectedRoutes requiredRole="admin">
            <AddCategoryPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="admin/users"
        element={
          <ProtectedRoutes requiredRole="admin">
            <ManageUsersPage />
          </ProtectedRoutes>
        }
      />

      {/* ---------- 404 ---------- */}
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
