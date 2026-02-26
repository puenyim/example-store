/**
 * Format a number as a USD price string.
 * @example formatPrice(29.99) → "$29.99"
 */
export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
};

/**
 * Clamp a number between min and max.
 */
export const clamp = (value: number, min: number, max: number): number =>
    Math.min(Math.max(value, min), max);
