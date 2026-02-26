import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { useCart } from '../hooks/useCart';
import './CartPage.css';

const CartPage = () => {
    const { items } = useCart();

    return (
        <div className="cart-page">
            <h1 className="cart-page__title">Your Cart</h1>

            {items.length === 0 ? (
                <div className="cart-page__empty">
                    <span className="cart-page__empty-icon">🛒</span>
                    <p>Your cart is empty.</p>
                    <a href="/" className="cart-page__shop-link">Start Shopping</a>
                </div>
            ) : (
                <div className="cart-page__layout">
                    <div className="cart-page__items">
                        {items.map((item: import('@/core/types/cart.types').CartItem) => (
                            <CartItem key={item.product.id} item={item} />
                        ))}
                    </div>
                    <CartSummary />
                </div>
            )}
        </div>
    );
};

export default CartPage;
