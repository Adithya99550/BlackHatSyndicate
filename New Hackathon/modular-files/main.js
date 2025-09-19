/**
 * Main Application Script
 * Modular version of the AgriPredict AI application
 */

// Import modules
import { translations } from './translations.js';
import { recommendations, priceData } from './data.js';
import { createPriceChart } from './forecasting.js';
import { displayRecommendation } from './recommendation.js';
import { translate, updateUI, getCurrentTimestamp } from './utils.js';

// Global variables
let currentLanguage = 'en';

// Make recommendations available globally for modal updates
window.recommendations = recommendations;

// DOM elements
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const cards = document.querySelectorAll('.hover\\:underline');

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('AgriPredict AI - Modular Version Loaded');
    console.log('Available functions:', { translate, updateUI, displayRecommendation, createPriceChart });
    console.log('Available data:', { recommendations, priceData });
    
    try {
        // Initialize all modules
        console.log('Initializing language switching...');
        initializeLanguageSwitching();
        
        console.log('Initializing modal...');
        initializeModal();
        
        console.log('Initializing recommendation system...');
        initializeRecommendationSystem();
        
        console.log('Initializing cards...');
        initializeCards();
        
        // Update UI with translations
        console.log('Updating UI with translations...');
        updateUI(currentLanguage);
        
        // Auto-load recommendation on page load
        setTimeout(async () => {
            console.log('Loading AI recommendation...');
            try {
                await displayRecommendation((key) => translate(key, currentLanguage));
                console.log('AI recommendation loaded successfully');
            } catch (error) {
                console.error('Error loading AI recommendation:', error);
            }
        }, 1000);
    } catch (error) {
        console.error('Error initializing application:', error);
        // Fallback: show error message
        showFallbackMessage();
    }
});

// Fallback function if modules fail to load
function showFallbackMessage() {
    const loadingElement = document.getElementById('recommendationLoading');
    if (loadingElement) {
        loadingElement.innerHTML = `
            <div class="text-center py-8">
                <div class="text-yellow-400 text-4xl mb-2">⚠️</div>
                <p class="text-purple-100">Loading modules... Please ensure you're running this from a web server.</p>
                <p class="text-purple-200 text-sm mt-2">For local development, use: python -m http.server 8000</p>
            </div>
        `;
    }
}

/**
 * Initialize language switching functionality
 */
function initializeLanguageSwitching() {
    const languageButton = document.getElementById('languageButton');
    const languageOptions = document.querySelectorAll('.language-option');
    const currentLanguageSpan = document.getElementById('currentLanguage');

    if (languageButton) {
        languageButton.addEventListener('click', () => {
            const dropdown = document.getElementById('languageDropdown');
            if (dropdown) {
                dropdown.classList.toggle('hidden');
            }
        });
    }

    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedLang = option.getAttribute('data-lang');
            if (selectedLang && selectedLang !== currentLanguage) {
                currentLanguage = selectedLang;
                
                // Update current language display
                if (currentLanguageSpan) {
                    currentLanguageSpan.textContent = translate('language', currentLanguage);
                }
                
                // Update UI
                updateUI(currentLanguage);
                
                // Close dropdown
                const dropdown = document.getElementById('languageDropdown');
                if (dropdown) {
                    dropdown.classList.add('hidden');
                }
            }
        });
    });
}

/**
 * Initialize modal functionality
 */
function initializeModal() {
    const closeButtons = document.querySelectorAll('#closeModal, #closeModalButton');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', hideModal);
    });

    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }
}

/**
 * Initialize recommendation system
 */
function initializeRecommendationSystem() {
    const refreshButton = document.getElementById('refreshRecommendation');
    if (refreshButton) {
        refreshButton.addEventListener('click', () => {
            displayRecommendation((key) => translate(key, currentLanguage));
        });
    }
}

/**
 * Initialize forecast cards
 */
function initializeCards() {
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const cropElement = card.querySelector('h3');
            if (cropElement) {
                const cropKey = cropElement.getAttribute('data-translate');
                const cropMapping = {
                    'tomatoes': 'Tomatoes',
                    'cucumbers': 'Cucumbers', 
                    'lettuce': 'Lettuce'
                };
                
                const englishCropName = cropMapping[cropKey] || cropElement.textContent.trim();
                const data = recommendations[englishCropName];
                
                if (data) {
                    displayModal(data);
                }
            }
        });
    });
}

/**
 * Display modal with crop data
 * @param {Object} data - Crop recommendation data
 */
function displayModal(data) {
    // Update title
    modalTitle.textContent = translate(data.titleKey, currentLanguage);
    
    // Update structured content
    document.getElementById('modal-insights').querySelector('p').textContent = translate(data.insightsKey, currentLanguage);
    document.getElementById('modal-analysis').querySelector('p').textContent = translate(data.analysisKey, currentLanguage);
    document.getElementById('modal-recommendations').querySelector('p').textContent = translate(data.recommendationsKey, currentLanguage);
    document.getElementById('modal-risks').querySelector('p').textContent = translate(data.risksKey, currentLanguage);
    
    // Update timestamp
    document.getElementById('modal-timestamp').textContent = getCurrentTimestamp();
    
    // Create price chart
    const cropName = data.titleKey.replace('-title', '').replace('tomatoes', 'Tomatoes').replace('cucumbers', 'Cucumbers').replace('lettuce', 'Lettuce');
    if (cropName === 'Tomatoes' || cropName === 'Cucumbers' || cropName === 'Lettuce') {
        setTimeout(() => {
            createPriceChart(cropName, priceData);
        }, 100); // Small delay to ensure modal is rendered
    }
    
    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
        modal.querySelector('div').classList.remove('scale-95', 'opacity-0');
        modal.querySelector('div').classList.add('scale-100', 'opacity-100');
    }, 10);
}

/**
 * Hide modal
 */
function hideModal() {
    if (modal) {
        modal.querySelector('div').classList.remove('scale-100', 'opacity-100');
        modal.querySelector('div').classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }, 300);
    }
}
