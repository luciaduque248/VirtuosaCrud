import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "virtuosa_favorites_v1";
const FavoritesContext = createContext(null);

const readFavorites = () => {
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
};

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(readFavorites);

    const toggleFavorite = useCallback((product) => {
        setFavorites((current) => {
            const exists = current.some((item) => Number(item.id) === Number(product.id));
            const next = exists ? current.filter((item) => Number(item.id) !== Number(product.id)) : [...current, product];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            return next;
        });
    }, []);

    const isFavorite = useCallback((productId) => favorites.some((item) => Number(item.id) === Number(productId)), [favorites]);
    const value = useMemo(() => ({ favorites, favoriteCount: favorites.length, toggleFavorite, isFavorite }), [favorites, isFavorite, toggleFavorite]);

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) throw new Error("useFavorites debe utilizarse dentro de FavoritesProvider.");
    return context;
}
