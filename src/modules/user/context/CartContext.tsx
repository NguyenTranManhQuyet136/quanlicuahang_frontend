import {
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from "react";

import { CartItem, Product } from "../pages/TechStore/types";

type CartContextValue = {
    items: CartItem[];
    addItem: (product: Product) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    removeItem: (productId: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product) => {
        setItems((prev) => {
            const existing = prev.find(
                (item) => item.product.id === product.id
            );
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId: number, quantity: number) => {
        setItems((prev) =>
            prev
                .map((item) =>
                    item.product.id === productId ? { ...item, quantity } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeItem = (productId: number) => {
        setItems((prev) =>
            prev.filter((item) => item.product.id !== productId)
        );
    };

    const clearCart = () => setItems([]);

    const value = useMemo(
        () => ({
            items,
            addItem,
            updateQuantity,
            removeItem,
            clearCart,
        }),
        [items]
    );

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
};

