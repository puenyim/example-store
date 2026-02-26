import { Routes, Route } from 'react-router-dom';
import ProductsPage from '@/feature/products/pages/ProductsPage';
import ProductDetailPage from '@/feature/products/pages/ProductDetailPage';
import CartPage from '@/feature/cart/pages/CartPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
        </Routes>
    );
};

export default AppRouter;
