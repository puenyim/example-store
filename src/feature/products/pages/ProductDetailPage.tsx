import { useParams, useNavigate } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProductDetail';
import { formatPrice } from '@/core/utils/formatPrice';
import { useCart } from '@/feature/cart/hooks/useCart';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { product, isLoading, error } = useProductDetail(Number(id));
    const { addItem, isInCart } = useCart();

    if (isLoading) {
        return (
            <div className="detail-loading">
                <div className="spinner" />
                <span>Loading product...</span>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="detail-error">
                <p>⚠️ {error ?? 'Product not found.'}</p>
                <button onClick={() => navigate('/')}>← Back to Products</button>
            </div>
        );
    }

    return (
        <div className="product-detail">
            <button className="product-detail__back" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="product-detail__content">
                <div className="product-detail__image-wrapper">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="product-detail__image"
                    />
                </div>

                <div className="product-detail__info">
                    <span className="product-detail__category">{product.category}</span>
                    <h1 className="product-detail__title">{product.title}</h1>

                    <div className="product-detail__rating">
                        <span className="product-detail__stars">
                            {'★'.repeat(Math.round(product.rating.rate))}
                            {'☆'.repeat(5 - Math.round(product.rating.rate))}
                        </span>
                        <span className="product-detail__rating-score">
                            {product.rating.rate.toFixed(1)}
                        </span>
                        <span className="product-detail__rating-count">
                            · {product.rating.count} reviews
                        </span>
                    </div>

                    <p className="product-detail__description">{product.description}</p>

                    <div className="product-detail__price-row">
                        <span className="product-detail__price">
                            {formatPrice(product.price)}
                        </span>
                        <button
                            className={`product-detail__cart-btn ${isInCart(product.id) ? 'product-detail__cart-btn--added' : ''}`}
                            onClick={() => addItem(product)}
                        >
                            {isInCart(product.id) ? '✓ Added to Cart' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
