import { useEffect } from 'react';
import useProductStore from '../store/productStore';

/**
 * Hook for the product detail page.
 * Fetches a single product by ID.
 */
export const useProductDetail = (id: number) => {
    const {
        selectedProduct,
        isLoading,
        error,
        fetchProductById,
        clearSelectedProduct,
    } = useProductStore();

    useEffect(() => {
        fetchProductById(id);
        return () => clearSelectedProduct();
    }, [id, fetchProductById, clearSelectedProduct]);

    return { product: selectedProduct, isLoading, error };
};
