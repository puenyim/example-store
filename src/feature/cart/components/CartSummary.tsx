import { formatPrice } from '@/core/utils/formatPrice';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import './CartSummary.css';

const CartSummary = () => {
    const { totalItems, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    return (
        <div className="cart-summary">
            <h3 className="cart-summary__title">Order Summary</h3>
            <div className="cart-summary__row">
                <span>Items ({totalItems})</span>
                <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="cart-summary__row cart-summary__row--shipping">
                <span>Shipping</span>
                <span className="cart-summary__free">FREE</span>
            </div>
            <div className="cart-summary__divider" />
            <div className="cart-summary__row cart-summary__row--total">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
            </div>
            <button
                className="cart-summary__checkout-btn"
                disabled={totalItems === 0}
            >
                Checkout
            </button>
            <button
                className="cart-summary__continue-btn"
                onClick={() => navigate('/')}
            >
                Continue Shopping
            </button>
            {totalItems > 0 && (
                <button className="cart-summary__clear-btn" onClick={clearCart}>
                    Clear Cart
                </button>
            )}
        </div>
    );
};

export default CartSummary;
