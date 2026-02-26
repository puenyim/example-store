import type { Product } from '@/core/types/product.types';
import { formatPrice } from '@/core/utils/formatPrice';
import { useCart } from '@/feature/cart/hooks/useCart';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    const navigate = useNavigate();
    const { addItem, isInCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addItem(product);
    };

    return (
        <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
            <div className="product-card__image-wrapper">
                <img
                    src={product.image}
                    alt={product.title}
                    className="product-card__image"
                />
            </div>
            <div className="product-card__body">
                <span className="product-card__category">{product.category}</span>
                <h3 className="product-card__title">{product.title}</h3>
                <div className="product-card__rating">
                    <span className="product-card__stars">
                        {'★'.repeat(Math.round(product.rating.rate))}
                        {'☆'.repeat(5 - Math.round(product.rating.rate))}
                    </span>
                    <span className="product-card__rating-count">
                        ({product.rating.count})
                    </span>
                </div>
                <div className="product-card__footer">
                    <span className="product-card__price">{formatPrice(product.price)}</span>
                    <button
                        className={`product-card__btn ${isInCart(product.id) ? 'product-card__btn--in-cart' : ''}`}
                        onClick={handleAddToCart}
                    >
                        {isInCart(product.id) ? '✓ Added' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
