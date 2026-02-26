import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Product, Category } from '@/core/types/product.types';
import { isApiError } from '@/core/api/interceptors';
import {
    getProducts,
    getProductById,
    getCategories,
    getProductsByCategory,
} from '../services/productService';

// ── Helpers ───────────────────────────────────────────────────────────────────

const extractError = (err: unknown, fallback: string): string =>
    isApiError(err) ? err.message : err instanceof Error ? err.message : fallback;

// ── State interface ───────────────────────────────────────────────────────────

interface ProductState {
    // State
    products: Product[];
    selectedProduct: Product | null;
    categories: Category[];
    selectedCategory: string | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchProducts: () => Promise<void>;
    fetchProductById: (id: number) => Promise<void>;
    fetchCategories: () => Promise<void>;
    fetchProductsByCategory: (category: string) => Promise<void>;
    setSelectedCategory: (category: string | null) => void;
    clearSelectedProduct: () => void;
}

// ── Store ─────────────────────────────────────────────────────────────────────

const useProductStore = create<ProductState>()(
    devtools(
        (set) => ({
            // Initial state
            products: [],
            selectedProduct: null,
            categories: [],
            selectedCategory: null,
            isLoading: false,
            error: null,

            // Actions
            fetchProducts: async () => {
                set({ isLoading: true, error: null });
                try {
                    const products = await getProducts();
                    set({ products, isLoading: false });
                } catch (err) {
                    set({
                        error: extractError(err, 'Failed to fetch products.'),
                        isLoading: false,
                    });
                }
            },

            fetchProductById: async (id: number) => {
                set({ isLoading: true, error: null, selectedProduct: null });
                try {
                    const product = await getProductById(id);
                    set({ selectedProduct: product, isLoading: false });
                } catch (err) {
                    set({
                        error: extractError(err, 'Failed to fetch product.'),
                        isLoading: false,
                    });
                }
            },

            fetchCategories: async () => {
                try {
                    const categories = await getCategories();
                    set({ categories });
                } catch (err) {
                    set({
                        error: extractError(err, 'Failed to fetch categories.'),
                    });
                }
            },

            fetchProductsByCategory: async (category: string) => {
                set({ isLoading: true, error: null });
                try {
                    const products = await getProductsByCategory(category);
                    set({ products, selectedCategory: category, isLoading: false });
                } catch (err) {
                    set({
                        error: extractError(err, 'Failed to fetch products by category.'),
                        isLoading: false,
                    });
                }
            },

            setSelectedCategory: (category) => set({ selectedCategory: category }),
            clearSelectedProduct: () => set({ selectedProduct: null }),
        }),
        { name: 'ProductStore' }
    )
);

export default useProductStore;
