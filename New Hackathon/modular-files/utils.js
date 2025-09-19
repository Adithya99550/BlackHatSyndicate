/**
 * Utils Module
 * Contains utility functions for the application
 */

import { translations } from './translations.js';

/**
 * Translation function
 * @param {string} key - Translation key
 * @param {string} currentLanguage - Current language code
 * @returns {string} Translated text
 */
export const translate = (key, currentLanguage = 'en') => {
    return translations[currentLanguage][key] || translations['en'][key] || key;
};

/**
 * Update UI with translations
 * @param {string} currentLanguage - Current language code
 */
export const updateUI = (currentLanguage = 'en') => {
    // Update all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translate(key, currentLanguage);
    });

    // Update modal content if it's open
    const modal = document.getElementById('modal');
    if (modal && !modal.classList.contains('hidden')) {
        const modalTitle = document.getElementById('modal-title');
        if (modalTitle) {
            const currentTitle = modalTitle.textContent;
            
            // Map translated titles back to English keys
            const cropMapping = {
                'Detailed Tomato Forecast': 'Tomatoes',
                'ವಿವರವಾದ ಟೊಮ್ಯಾಟೊ ಮುನ್ಸೂಚನೆ': 'Tomatoes',
                'Detailed Cucumber Forecast': 'Cucumbers',
                'ವಿವರವಾದ ಸೌತೆಕಾಯಿ ಮುನ್ಸೂಚನೆ': 'Cucumbers',
                'Detailed Lettuce Forecast': 'Lettuce',
                'ವಿವರವಾದ ಲೆಟ್ಯೂಸ್ ಮುನ್ಸೂಚನೆ': 'Lettuce'
            };
            
            const englishCropName = cropMapping[currentTitle];
            if (englishCropName && window.recommendations && window.recommendations[englishCropName]) {
                const data = window.recommendations[englishCropName];
                document.getElementById('modal-insights').querySelector('p').textContent = translate(data.insightsKey, currentLanguage);
                document.getElementById('modal-analysis').querySelector('p').textContent = translate(data.analysisKey, currentLanguage);
                document.getElementById('modal-recommendations').querySelector('p').textContent = translate(data.recommendationsKey, currentLanguage);
                document.getElementById('modal-risks').querySelector('p').textContent = translate(data.risksKey, currentLanguage);
            }
        }
    }
};

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = '₹') => {
    return `${currency}${Math.round(amount).toLocaleString()}`;
};

/**
 * Format number with units
 * @param {number} value - Value to format
 * @param {string} unit - Unit to append
 * @returns {string} Formatted number string
 */
export const formatNumber = (value, unit = '') => {
    return `${Math.round(value).toLocaleString()}${unit ? ' ' + unit : ''}`;
};

/**
 * Get risk level and color
 * @param {number} riskScore - Risk score (0-1)
 * @returns {Object} Risk level and color
 */
export const getRiskLevel = (riskScore) => {
    if (riskScore < 0.1) {
        return { level: 'Low', color: 'text-green-400' };
    } else if (riskScore < 0.2) {
        return { level: 'Medium', color: 'text-yellow-400' };
    } else {
        return { level: 'High', color: 'text-red-400' };
    }
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Show notification
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info)
 */
export const showNotification = (message, type = 'info') => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    // Set colors based on type
    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    
    notification.className += ` ${colors[type] || colors.info}`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
};

/**
 * Validate email
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Get current timestamp
 * @returns {string} Formatted timestamp
 */
export const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
};
