import useCartStore from '../store/cartStore';
import type { Product } from '@/core/types/product.types';

/**
 * Convenience hook wrapping the cart store.
 */
export const useCart = () => {
    const {
        items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
    } = useCartStore();

    const isInCart = (productId: number): boolean =>
        items.some((item) => item.product.id === productId);

    const getQuantity = (productId: number): number =>
        items.find((item) => item.product.id === productId)?.quantity ?? 0;

    const handleAdd = (product: Product) => addItem(product);

    return {
        items,
        totalItems: totalItems(),
        totalPrice: totalPrice(),
        isInCart,
        getQuantity,
        addItem: handleAdd,
        removeItem,
        updateQuantity,
        clearCart,
    };
};
