export const API_BASE_URL = 'https://fakestoreapi.com';

export const ENDPOINTS = {
    products: '/products',
    productById: (id: number) => `/products/${id}`,
    categories: '/products/categories',
    productsByCategory: (category: string) =>
        `/products/category/${category}`,
    carts: '/carts',
    cartsByUser: (userId: number) => `/carts/user/${userId}`,
} as const;
