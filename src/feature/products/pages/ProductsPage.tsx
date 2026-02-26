import { useProducts } from '../hooks/useProducts';
import ProductList from '../components/ProductList';
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

    return (
        <div className="products-page">
            <div className="products-page__header">
                <h1 className="products-page__title">All Products</h1>
                <p className="products-page__subtitle">
                    {products.length} items available
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
            {isLoading && (
                <div className="products-page__loading">
                    <div className="spinner" />
                    <span>Loading products...</span>
                </div>
            )}
            {error && (
                <div className="products-page__error">
                    ⚠️ {error}
                </div>
            )}
            {!isLoading && !error && <ProductList products={products} />}
        </div>
    );
};

export default ProductsPage;
