import type { Product } from '@/core/types/product.types';
import ProductCard from './ProductCard';
import './ProductList.css';

interface Props {
    products: Product[];
}

const ProductList = ({ products }: Props) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
