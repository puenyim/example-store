import axiosClient from '@/core/api/axiosClient';
import { ENDPOINTS } from '@/core/constants/apiEndpoints';
import type { Product, Category } from '@/core/types/product.types';

export const getProducts = async (): Promise<Product[]> => {
    const { data } = await axiosClient.get<Product[]>(ENDPOINTS.products);
    return data;
};

export const getProductById = async (id: number): Promise<Product> => {
    const { data } = await axiosClient.get<Product>(ENDPOINTS.productById(id));
    return data;
};

export const getCategories = async (): Promise<Category[]> => {
    const { data } = await axiosClient.get<Category[]>(ENDPOINTS.categories);
    return data;
};

export const getProductsByCategory = async (
    category: string
): Promise<Product[]> => {
    const { data } = await axiosClient.get<Product[]>(
        ENDPOINTS.productsByCategory(category)
    );
    return data;
};
