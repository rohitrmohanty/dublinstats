// Utility functions

/**
 * Debounce function for handling resize events
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Format percentage values
 */
export function formatPercent(value) {
    return `${value.toFixed(1)}%`;
}

/**
 * Format quarter display
 */
export function formatQuarter(quarter) {
    return quarter.replace(' ', ' '); // Ensures consistent spacing
}