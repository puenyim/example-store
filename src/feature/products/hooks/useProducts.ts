import { useEffect } from 'react';
import useProductStore from '../store/productStore';

/**
 * Convenience hook for the products page.
 * Fetches all products on mount and exposes store state + actions.
 */
export const useProducts = () => {
    const {
        products,
        categories,
        selectedCategory,
        isLoading,
        error,
        fetchProducts,
        fetchCategories,
        fetchProductsByCategory,
        setSelectedCategory,
    } = useProductStore();

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [fetchProducts, fetchCategories]);

    const handleCategoryChange = (category: string | null) => {
        setSelectedCategory(category);
        if (category) {
            fetchProductsByCategory(category);
        } else {
            fetchProducts();
        }
    };

    return {
        products,
        categories,
        selectedCategory,
        isLoading,
        error,
        handleCategoryChange,
    };
};
