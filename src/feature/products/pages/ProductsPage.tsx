import { useProducts } from '../hooks/useProducts';
import ProductList from '../components/ProductList';
import Spinner from '@/core/components/Spinner';
import ErrorMessage from '@/core/components/ErrorMessage';
import useProductStore from '../store/productStore';
import './ProductsPage.css';

const ProductsPage = () => {
    const {
        products,
        categories,
        selectedCategory,
        isLoading,
        error,
        handleCategoryChange,
    } = useProducts();

    const fetchProducts = useProductStore((s) => s.fetchProducts);
    const fetchCategories = useProductStore((s) => s.fetchCategories);

    const handleRetry = () => {
        fetchProducts();
        fetchCategories();
    };

    return (
        <div className="products-page">
            <div className="products-page__header">
                <h1 className="products-page__title">All Products</h1>
                <p className="products-page__subtitle">
                    {!isLoading && !error ? `${products.length} items available` : '\u00a0'}
                </p>
            </div>

            {/* Category Filter */}
            <div className="products-page__filters">
                <button
                    className={`filter-btn ${!selectedCategory ? 'filter-btn--active' : ''}`}
                    onClick={() => handleCategoryChange(null)}
                >
                    All
                </button>
                {categories.map((cat: string) => (
                    <button
                        key={cat}
                        className={`filter-btn ${selectedCategory === cat ? 'filter-btn--active' : ''}`}
                        onClick={() => handleCategoryChange(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* States */}
            {isLoading && <Spinner fullPage label="Loading products..." />}

            {!isLoading && error && (
                <ErrorMessage
                    message={error}
                    onRetry={handleRetry}
                    fullPage
                />
            )}

            {!isLoading && !error && <ProductList products={products} />}
        </div>
    );
};

export default ProductsPage;
