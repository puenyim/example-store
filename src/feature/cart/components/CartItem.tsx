import type { CartItem as CartItemType } from '@/core/types/cart.types';
import { formatPrice } from '@/core/utils/formatPrice';
import { useCart } from '../hooks/useCart';
import './CartItem.css';

interface Props {
    item: CartItemType;
}

const CartItem = ({ item }: Props) => {
    const { removeItem, updateQuantity } = useCart();
    const { product, quantity } = item;

    return (
        <div className="cart-item">
            <div className="cart-item__image-wrapper">
                <img
                    src={product.image}
                    alt={product.title}
                    className="cart-item__image"
                />
            </div>
            <div className="cart-item__details">
                <h4 className="cart-item__title">{product.title}</h4>
                <span className="cart-item__category">{product.category}</span>
                <span className="cart-item__unit-price">{formatPrice(product.price)} each</span>
            </div>
            <div className="cart-item__controls">
                <div className="cart-item__qty">
                    <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>
                    <span className="cart-item__qty-value">{quantity}</span>
                    <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
                <span className="cart-item__subtotal">
                    {formatPrice(product.price * quantity)}
                </span>
                <button
                    className="cart-item__remove"
                    onClick={() => removeItem(product.id)}
                    aria-label="Remove item"
                >
                    🗑
                </button>
            </div>
        </div>
    );
};

export default CartItem;
