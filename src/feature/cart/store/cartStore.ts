import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { CartItem } from '@/core/types/cart.types';
import type { Product } from '@/core/types/product.types';

interface CartStore {
    // State
    items: CartItem[];

    // Computed helpers
    totalItems: () => number;
    totalPrice: () => number;

    // Actions
    addItem: (product: Product) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}

const useCartStore = create<CartStore>()(
    devtools(
        persist(
            (set, get) => ({
                items: [],

                totalItems: () =>
                    get().items.reduce((sum, item) => sum + item.quantity, 0),

                totalPrice: () =>
                    get().items.reduce(
                        (sum, item) => sum + item.product.price * item.quantity,
                        0
                    ),

                addItem: (product: Product) => {
                    const existing = get().items.find(
                        (item) => item.product.id === product.id
                    );
                    if (existing) {
                        set((state) => ({
                            items: state.items.map((item) =>
                                item.product.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        }));
                    } else {
                        set((state) => ({
                            items: [...state.items, { product, quantity: 1 }],
                        }));
                    }
                },

                removeItem: (productId: number) => {
                    set((state) => ({
                        items: state.items.filter((item) => item.product.id !== productId),
                    }));
                },

                updateQuantity: (productId: number, quantity: number) => {
                    if (quantity < 1) {
                        get().removeItem(productId);
                        return;
                    }
                    set((state) => ({
                        items: state.items.map((item) =>
                            item.product.id === productId ? { ...item, quantity } : item
                        ),
                    }));
                },

                clearCart: () => set({ items: [] }),
            }),
            { name: 'cart-storage' } // persisted to localStorage
        ),
        { name: 'CartStore' }
    )
);

export default useCartStore;
