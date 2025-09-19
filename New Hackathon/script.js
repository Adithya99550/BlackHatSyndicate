// AgriPredict AI - Main JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModalButton = document.getElementById('closeModal');
    const closeModalIcon = document.getElementById('closeModal');
    
    const cards = document.querySelectorAll('.hover\\:underline');

    // Translation system
    const translations = {
        en: {
            // Header
            'app-name': 'AgriPredict AI',
            'tagline': 'Insights That Empower Every Farmer',
            'language': 'English',
            
            // Dashboard
            'dashboard': 'Dashboard',
            'welcome': 'Welcome, Farmer!',
            'welcome-subtitle': 'Here is your personalized forecast to help you plan ahead.',
            'view-full-report': 'View Full Report',
            
            // Sections
            'demand-forecasting': 'Demand Forecasting',
            'actionable-recommendations': 'Actionable Recommendations',
            
            // Crops
            'tomatoes': 'Tomatoes',
            'cucumbers': 'Cucumbers',
            'lettuce': 'Lettuce',
            'high-demand': 'High Demand',
            'medium-demand': 'Medium Demand',
            'low-demand': 'Low Demand',
            
            // Crop descriptions
            'tomatoes-desc': 'Expect strong demand over the next 3 weeks due to seasonal market shifts.',
            'cucumbers-desc': 'Demand is stable. Consider staggered harvesting to maintain supply.',
            'lettuce-desc': 'Oversupply is expected next month. Explore alternative distribution channels.',
            'view-detailed-analysis': 'View Detailed Analysis →',
            
            // Recommendations
            'planting-recommendation': 'Planting Recommendation',
            'planting-desc': 'Start planting corn now to capitalize on predicted demand in 4 months.',
            'distribution-guidance': 'Distribution Guidance',
            'distribution-desc': 'Sell 60% of your tomato harvest to local grocers and 40% to wholesalers.',
            'learn-more': 'Learn More',
            
            // Modal
            'key-insights': 'Key Insights',
            'market-analysis': 'Market Analysis',
            'recommendations': 'Recommendations',
            'risk-factors': 'Risk Factors',
            'price-trend': 'Price Trend (Last 12 Months)',
            'price-note': '*Prices shown are average market rates per kg',
            'ai-recommendation': 'AI Crop Recommendation',
            'ai-recommendation-subtitle': 'Get personalized crop suggestions for next month based on market trends',
            'analyzing-data': 'Analyzing market data...',
            'recommended-crop': 'Recommended Crop',
            'expected-profit': 'Expected Profit',
            'expected-demand': 'Expected Demand',
            'risk-level': 'Risk Level',
            'last-updated': 'Last Updated',
            'close': 'Close',
            'take-action': 'Take Action',
            
            // Profile
            'profile': 'Profile',
            'settings': 'Settings',
            'sign-out': 'Sign out',
            
            // Modal detailed content
            'tomatoes-title': 'Detailed Tomato Forecast',
            'tomatoes-insights': 'High demand predicted for the next 3 weeks with peak demand in late October, driven by increased local restaurant usage and decreased imports.',
            'tomatoes-analysis': 'Our AI model indicates a 23% increase in demand compared to last month. Market conditions show strong local consumption patterns with reduced competition from imports.',
            'tomatoes-recommendations': 'Sell your mature crop now to maximize profit. Expand distribution to local markets and specialty stores. Consider increasing production for the next cycle.',
            'tomatoes-risks': 'Potential price volatility due to weather changes. Monitor competitor pricing and adjust strategy accordingly.',
            
            'cucumbers-title': 'Detailed Cucumber Analysis',
            'cucumbers-insights': 'Stable and consistent demand with no significant oversupply or undersupply expected in the current market cycle.',
            'cucumbers-analysis': 'Market shows steady 5% growth month-over-month. Supply chain remains stable with consistent buyer patterns across all distribution channels.',
            'cucumbers-recommendations': 'Implement staggered harvesting schedule to maintain steady supply. Diversify buyers between local supermarkets and farmers markets.',
            'cucumbers-risks': 'Low risk of market saturation. Monitor for any sudden changes in consumer preferences or competitor strategies.',
            
            'lettuce-title': 'Detailed Lettuce Forecast',
            'lettuce-insights': 'Significant oversupply expected next month due to favorable weather conditions across multiple growing regions.',
            'lettuce-analysis': 'Market analysis shows 40% increase in supply compared to demand. Price drop of 15-20% anticipated due to market glut conditions.',
            'lettuce-recommendations': 'Explore alternative distribution channels including food processors and bulk sales to large food service companies. Consider reducing planting for next cycle.',
            'lettuce-risks': 'High risk of crop waste and income loss. Immediate action required to prevent financial impact.'
        },
        kn: {
            // Header
            'app-name': 'ಅಗ್ರಿಪ್ರಿಡಿಕ್ಟ್ AI',
            'tagline': 'ಪ್ರತಿ ರೈತರನ್ನು ಶಕ್ತಿವಂತಗೊಳಿಸುವ ಅಂತರ್ದೃಷ್ಟಿಗಳು',
            'language': 'ಕನ್ನಡ',
            
            // Dashboard
            'dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
            'welcome': 'ಸ್ವಾಗತ, ರೈತರೇ!',
            'welcome-subtitle': 'ಮುಂದೆ ಯೋಜನೆ ಮಾಡಲು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮುನ್ಸೂಚನೆ ಇಲ್ಲಿದೆ.',
            'view-full-report': 'ಪೂರ್ಣ ವರದಿ ವೀಕ್ಷಿಸಿ',
            
            // Sections
            'demand-forecasting': 'ಬೇಡಿಕೆ ಮುನ್ಸೂಚನೆ',
            'actionable-recommendations': 'ಕ್ರಿಯಾತ್ಮಕ ಶಿಫಾರಸುಗಳು',
            
            // Crops
            'tomatoes': 'ಟೊಮಾಟೊಗಳು',
            'cucumbers': 'ಸೌತೆಕಾಯಿಗಳು',
            'lettuce': 'ಲೆಟ್ಯೂಸ್',
            'high-demand': 'ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ',
            'medium-demand': 'ಮಧ್ಯಮ ಬೇಡಿಕೆ',
            'low-demand': 'ಕಡಿಮೆ ಬೇಡಿಕೆ',
            
            // Crop descriptions
            'tomatoes-desc': 'ಋತುಮಾನದ ಮಾರುಕಟ್ಟೆ ಬದಲಾವಣೆಗಳ ಕಾರಣ 3 ವಾರಗಳಲ್ಲಿ ಬಲವಾದ ಬೇಡಿಕೆ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ.',
            'cucumbers-desc': 'ಬೇಡಿಕೆ ಸ್ಥಿರವಾಗಿದೆ. ಪೂರೈಕೆಯನ್ನು ನಿರ್ವಹಿಸಲು ಹಂತಹಂತವಾಗಿ ಕೊಯ್ಲು ಮಾಡುವುದನ್ನು ಪರಿಗಣಿಸಿ.',
            'lettuce-desc': 'ಮುಂದಿನ ತಿಂಗಳಲ್ಲಿ ಹೆಚ್ಚಿನ ಪೂರೈಕೆ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ. ಪರ್ಯಾಯ ವಿತರಣಾ ಚಾನಲ್‌ಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.',
            'view-detailed-analysis': 'ವಿವರವಾದ ವಿಶ್ಲೇಷಣೆ ವೀಕ್ಷಿಸಿ →',
            
            // Recommendations
            'planting-recommendation': 'ನೆಡುವಿಕೆ ಶಿಫಾರಸು',
            'planting-desc': '4 ತಿಂಗಳಲ್ಲಿ ನಿರೀಕ್ಷಿತ ಬೇಡಿಕೆಯನ್ನು ಬಳಸಿಕೊಳ್ಳಲು ಈಗ ಮೆಕ್ಕೆಜೋಳ ನೆಡಲು ಪ್ರಾರಂಭಿಸಿ.',
            'distribution-guidance': 'ವಿತರಣೆ ಮಾರ್ಗದರ್ಶನ',
            'distribution-desc': 'ನಿಮ್ಮ ಟೊಮಾಟೊ ಕೊಯ್ಲಿನ 60% ಸ್ಥಳೀಯ ಅಂಗಡಿಗಳಿಗೆ ಮತ್ತು 40% ಸಗಟು ವ್ಯಾಪಾರಿಗಳಿಗೆ ಮಾರಾಟ ಮಾಡಿ.',
            'learn-more': 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
            
            // Modal
            'key-insights': 'ಪ್ರಮುಖ ಅಂತರ್ದೃಷ್ಟಿಗಳು',
            'market-analysis': 'ಮಾರುಕಟ್ಟೆ ವಿಶ್ಲೇಷಣೆ',
            'recommendations': 'ಶಿಫಾರಸುಗಳು',
            'risk-factors': 'ಅಪಾಯದ ಅಂಶಗಳು',
            'price-trend': 'ಬೆಲೆ ಪ್ರವೃತ್ತಿ (ಕಳೆದ 12 ತಿಂಗಳು)',
            'price-note': '*ದರ್ಶಿಸಲಾದ ಬೆಲೆಗಳು ಪ್ರತಿ ಕೆಜಿಗೆ ಸರಾಸರಿ ಮಾರುಕಟ್ಟೆ ದರಗಳು',
            'ai-recommendation': 'AI ಬೆಳೆ ಶಿಫಾರಸು',
            'ai-recommendation-subtitle': 'ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳ ಆಧಾರದ ಮೇಲೆ ಮುಂದಿನ ತಿಂಗಳಿಗೆ ವೈಯಕ್ತಿಕ ಬೆಳೆ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ',
            'analyzing-data': 'ಮಾರುಕಟ್ಟೆ ಡೇಟಾವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
            'recommended-crop': 'ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆ',
            'expected-profit': 'ನಿರೀಕ್ಷಿತ ಲಾಭ',
            'expected-demand': 'ನಿರೀಕ್ಷಿತ ಬೇಡಿಕೆ',
            'risk-level': 'ಅಪಾಯದ ಮಟ್ಟ',
            'last-updated': 'ಕೊನೆಯ ಬಾರಿ ನವೀಕರಿಸಲಾಗಿದೆ',
            'close': 'ಮುಚ್ಚಿ',
            'take-action': 'ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಿ',
            
            // Profile
            'profile': 'ಪ್ರೊಫೈಲ್',
            'settings': 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
            'sign-out': 'ಸೈನ್ ಔಟ್',
            
            // Modal detailed content
            'tomatoes-title': 'ವಿವರವಾದ ಟೊಮಾಟೊ ಮುನ್ಸೂಚನೆ',
            'tomatoes-insights': 'ಸ್ಥಳೀಯ ರೆಸ್ಟೋರೆಂಟ್ ಬಳಕೆಯ ಹೆಚ್ಚಳ ಮತ್ತು ಆಮದುಗಳ ಕಡಿಮೆಯಿಂದಾಗಿ ಮುಂದಿನ 3 ವಾರಗಳಲ್ಲಿ ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ, ಅಕ್ಟೋಬರ್ ಕೊನೆಯಲ್ಲಿ ಗರಿಷ್ಠ ಬೇಡಿಕೆ.',
            'tomatoes-analysis': 'ನಮ್ಮ AI ಮಾದರಿಯು ಕಳೆದ ತಿಂಗಳಿಗೆ ಹೋಲಿಸಿದರೆ 23% ಬೇಡಿಕೆ ಹೆಚ್ಚಳವನ್ನು ಸೂಚಿಸುತ್ತದೆ. ಮಾರುಕಟ್ಟೆ ಪರಿಸ್ಥಿತಿಗಳು ಆಮದುಗಳಿಂದ ಕಡಿಮೆ ಸ್ಪರ್ಧೆಯೊಂದಿಗೆ ಬಲವಾದ ಸ್ಥಳೀಯ ಬಳಕೆಯ ಮಾದರಿಗಳನ್ನು ತೋರಿಸುತ್ತದೆ.',
            'tomatoes-recommendations': 'ಲಾಭವನ್ನು ಗರಿಷ್ಠಗೊಳಿಸಲು ನಿಮ್ಮ ಪಕ್ವವಾದ ಬೆಳೆಯನ್ನು ಈಗ ಮಾರಾಟ ಮಾಡಿ. ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆಗಳು ಮತ್ತು ವಿಶೇಷ ಅಂಗಡಿಗಳಿಗೆ ವಿತರಣೆಯನ್ನು ವಿಸ್ತರಿಸಿ. ಮುಂದಿನ ಚಕ್ರಕ್ಕಾಗಿ ಉತ್ಪಾದನೆಯನ್ನು ಹೆಚ್ಚಿಸುವುದನ್ನು ಪರಿಗಣಿಸಿ.',
            'tomatoes-risks': 'ಹವಾಮಾನ ಬದಲಾವಣೆಗಳ ಕಾರಣ ಬೆಲೆ ಏರಿಳಿತದ ಸಾಧ್ಯತೆ. ಸ್ಪರ್ಧಿ ಬೆಲೆಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ ಮತ್ತು ತದನುಗುಣವಾಗಿ ತಂತ್ರವನ್ನು ಹೊಂದಿಸಿ.',
            
            'cucumbers-title': 'ವಿವರವಾದ ಸೌತೆಕಾಯಿ ವಿಶ್ಲೇಷಣೆ',
            'cucumbers-insights': 'ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಚಕ್ರದಲ್ಲಿ ಗಮನಾರ್ಹ ಹೆಚ್ಚಿನ ಪೂರೈಕೆ ಅಥವಾ ಕಡಿಮೆ ಪೂರೈಕೆ ನಿರೀಕ್ಷಿಸಲಾಗಿಲ್ಲ, ಸ್ಥಿರ ಮತ್ತು ಸ್ಥಿರವಾದ ಬೇಡಿಕೆ.',
            'cucumbers-analysis': 'ಮಾರುಕಟ್ಟೆಯು ತಿಂಗಳಿಂದ ತಿಂಗಳಿಗೆ 5% ಸ್ಥಿರ ಬೆಳವಣಿಗೆಯನ್ನು ತೋರಿಸುತ್ತದೆ. ಎಲ್ಲಾ ವಿತರಣಾ ಚಾನಲ್‌ಗಳಲ್ಲಿ ಸ್ಥಿರ ಖರೀದಿದಾರರ ಮಾದರಿಗಳೊಂದಿಗೆ ಸರಬರಾಜು ಸರಪಳಿ ಸ್ಥಿರವಾಗಿ ಉಳಿದಿದೆ.',
            'cucumbers-recommendations': 'ಸ್ಥಿರ ಪೂರೈಕೆಯನ್ನು ನಿರ್ವಹಿಸಲು ಹಂತಹಂತವಾಗಿ ಕೊಯ್ಲು ವೇಳಾಪಟ್ಟಿಯನ್ನು ಜಾರಿಗೊಳಿಸಿ. ಸ್ಥಳೀಯ ಸೂಪರ್ ಮಾರ್ಕೆಟ್‌ಗಳು ಮತ್ತು ರೈತರ ಮಾರುಕಟ್ಟೆಗಳ ನಡುವೆ ಖರೀದಿದಾರರನ್ನು ವೈವಿಧ್ಯಗೊಳಿಸಿ.',
            'cucumbers-risks': 'ಮಾರುಕಟ್ಟೆ ತೃಪ್ತಿಯ ಕಡಿಮೆ ಅಪಾಯ. ಗ್ರಾಹಕರ ಆದ್ಯತೆಗಳು ಅಥವಾ ಸ್ಪರ್ಧಿ ತಂತ್ರಗಳಲ್ಲಿ ಯಾವುದೇ ಹಠಾತ್ ಬದಲಾವಣೆಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.',
            
            'lettuce-title': 'ವಿವರವಾದ ಲೆಟ್ಯೂಸ್ ಮುನ್ಸೂಚನೆ',
            'lettuce-insights': 'ಅನೇಕ ಬೆಳೆಯುವ ಪ್ರದೇಶಗಳಲ್ಲಿ ಅನುಕೂಲಕರ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳ ಕಾರಣ ಮುಂದಿನ ತಿಂಗಳಲ್ಲಿ ಗಮನಾರ್ಹ ಹೆಚ್ಚಿನ ಪೂರೈಕೆ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ.',
            'lettuce-analysis': 'ಮಾರುಕಟ್ಟೆ ವಿಶ್ಲೇಷಣೆಯು ಬೇಡಿಕೆಗೆ ಹೋಲಿಸಿದರೆ 40% ಪೂರೈಕೆ ಹೆಚ್ಚಳವನ್ನು ತೋರಿಸುತ್ತದೆ. ಮಾರುಕಟ್ಟೆ ತೃಪ್ತಿ ಪರಿಸ್ಥಿತಿಗಳ ಕಾರಣ 15-20% ಬೆಲೆ ಇಳಿಕೆ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ.',
            'lettuce-recommendations': 'ಆಹಾರ ಸಂಸ್ಕರಣಕಾರರನ್ನು ಮತ್ತು ದೊಡ್ಡ ಆಹಾರ ಸೇವಾ ಕಂಪನಿಗಳಿಗೆ ಸಗಟು ಮಾರಾಟಗಳನ್ನು ಒಳಗೊಂಡಂತೆ ಪರ್ಯಾಯ ವಿತರಣಾ ಚಾನಲ್‌ಗಳನ್ನು ಅನ್ವೇಷಿಸಿ. ಮುಂದಿನ ಚಕ್ರಕ್ಕಾಗಿ ನೆಡುವಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡುವುದನ್ನು ಪರಿಗಣಿಸಿ.',
            'lettuce-risks': 'ಬೆಳೆ ವ್ಯರ್ಥ ಮತ್ತು ಆದಾಯ ನಷ್ಟದ ಹೆಚ್ಚಿನ ಅಪಾಯ. ಹಣಕಾಸಿನ ಪರಿಣಾಮವನ್ನು ತಡೆಯಲು ತಕ್ಷಣ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಬೇಕು.'
        }
    };

    let currentLanguage = 'en';

    // Translation function
    const translate = (key) => {
        return translations[currentLanguage][key] || translations['en'][key] || key;
    };

    // Update UI with translations
    const updateUI = () => {
        // Update elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = translate(key);
        });
        
        // Update modal content if it's currently open
        if (!modal.classList.contains('hidden')) {
            const modalTitle = document.getElementById('modal-title');
            if (modalTitle && modalTitle.textContent) {
                // Find which crop modal is open and refresh its content
                const currentTitle = modalTitle.textContent;
                const cropMapping = {
                    'Detailed Tomato Forecast': 'Tomatoes',
                    'ವಿವರವಾದ ಟೊಮಾಟೊ ಮುನ್ಸೂಚನೆ': 'Tomatoes',
                    'Detailed Cucumber Analysis': 'Cucumbers',
                    'ವಿವರವಾದ ಸೌತೆಕಾಯಿ ವಿಶ್ಲೇಷಣೆ': 'Cucumbers',
                    'Detailed Lettuce Forecast': 'Lettuce',
                    'ವಿವರವಾದ ಲೆಟ್ಯೂಸ್ ಮುನ್ಸೂಚನೆ': 'Lettuce'
                };
                
                const englishCropName = cropMapping[currentTitle];
                if (englishCropName && recommendations[englishCropName]) {
                    displayModal(recommendations[englishCropName]);
                }
            }
        }
    };

    const recommendations = {
        'Tomatoes': {
            titleKey: 'tomatoes-title',
            insightsKey: 'tomatoes-insights',
            analysisKey: 'tomatoes-analysis',
            recommendationsKey: 'tomatoes-recommendations',
            risksKey: 'tomatoes-risks'
        },
        'Cucumbers': {
            titleKey: 'cucumbers-title',
            insightsKey: 'cucumbers-insights',
            analysisKey: 'cucumbers-analysis',
            recommendationsKey: 'cucumbers-recommendations',
            risksKey: 'cucumbers-risks'
        },
        'Lettuce': {
            titleKey: 'lettuce-title',
            insightsKey: 'lettuce-insights',
            analysisKey: 'lettuce-analysis',
            recommendationsKey: 'lettuce-recommendations',
            risksKey: 'lettuce-risks'
        }
    };

    // Price data for graphs (Last 12 months)
    const priceData = {
        'Tomatoes': {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            prices: [45, 52, 48, 38, 42, 55, 68, 72, 65, 58, 49, 46], // Price per kg in ₹
            color: '#ef4444' // Red color for tomatoes
        },
        'Cucumbers': {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            prices: [25, 28, 32, 35, 40, 45, 50, 48, 42, 38, 30, 27], // Price per kg in ₹
            color: '#22c55e' // Green color for cucumbers
        },
        'Lettuce': {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            prices: [35, 38, 42, 45, 50, 55, 60, 58, 52, 48, 40, 37], // Price per kg in ₹
            color: '#3b82f6' // Blue color for lettuce
        }
    };

    // Chart instance
    let priceChart = null;

    // Prophet Forecasting Functions
    const prepareProphetData = (cropData, targetColumn) => {
        // Convert CSV data to Prophet format
        return cropData.map(row => ({
            ds: new Date(row[0]), // date
            y: row[targetColumn]   // target value (price or demand)
        }));
    };

    const forecastWithProphet = async (cropData, targetColumn) => {
        try {
            const prophetData = prepareProphetData(cropData, targetColumn);
            
            // Simple linear regression as Prophet.js fallback
            // In production, replace with actual Prophet.js implementation
            const n = prophetData.length;
            const x = prophetData.map((_, i) => i);
            const y = prophetData.map(d => d.y);
            
            // Calculate linear regression
            const sumX = x.reduce((a, b) => a + b, 0);
            const sumY = y.reduce((a, b) => a + b, 0);
            const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
            const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);
            
            const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
            const intercept = (sumY - slope * sumX) / n;
            
            // Generate forecast for next 30 days
            const forecast = [];
            for (let i = 0; i < prophetConfig.periods; i++) {
                const futureX = n + i;
                const predictedY = slope * futureX + intercept;
                
                // Add some seasonality (simplified)
                const seasonalFactor = 1 + 0.1 * Math.sin(2 * Math.PI * i / 30);
                const finalPrediction = predictedY * seasonalFactor;
                
                forecast.push({
                    date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
                    value: Math.max(0, finalPrediction), // Ensure non-negative
                    confidence_lower: Math.max(0, finalPrediction * 0.85),
                    confidence_upper: finalPrediction * 1.15
                });
            }
            
            return {
                success: true,
                forecast: forecast,
                trend: slope > 0 ? 'increasing' : slope < 0 ? 'decreasing' : 'stable',
                confidence: Math.min(0.95, Math.max(0.6, 1 - Math.abs(slope) / 10))
            };
        } catch (error) {
            console.error('Prophet forecasting error:', error);
            return { success: false, error: error.message };
        }
    };

    // Crop Recommendation Algorithm
    const calculateCropRecommendation = async () => {
        const recommendations = [];
        
        for (const [cropName, cropData] of Object.entries(sampleCsvData)) {
            try {
                // Forecast price and demand
                const priceForecast = await forecastWithProphet(cropData, 1); // price_per_kg
                const demandForecast = await forecastWithProphet(cropData, 2); // quantity_sold_kg
                const supplyForecast = await forecastWithProphet(cropData, 3); // quantity_harvested_kg
                const costForecast = await forecastWithProphet(cropData, 4); // cost_per_kg
                
                if (!priceForecast.success || !demandForecast.success) continue;
                
                // Get next month's forecast (average of next 30 days)
                const avgPrice = priceForecast.forecast.reduce((sum, f) => sum + f.value, 0) / priceForecast.forecast.length;
                const avgDemand = demandForecast.forecast.reduce((sum, f) => sum + f.value, 0) / demandForecast.forecast.length;
                const avgSupply = supplyForecast.forecast.reduce((sum, f) => sum + f.value, 0) / supplyForecast.forecast.length;
                const avgCost = costForecast.forecast.reduce((sum, f) => sum + f.value, 0) / costForecast.forecast.length;
                
                // Calculate metrics
                const expectedSupply = avgSupply;
                const expectedDemand = avgDemand;
                const expectedPrice = avgPrice;
                const expectedCost = avgCost;
                
                // Calculate expected revenue, cost, and waste
                const actualDemand = Math.min(expectedDemand, expectedSupply);
                const expectedRevenue = expectedPrice * actualDemand;
                const expectedTotalCost = expectedCost * expectedSupply;
                const expectedWaste = Math.max(0, expectedSupply - expectedDemand);
                const wasteHandlingCost = expectedWaste * expectedCost * 0.1; // 10% of cost for waste
                
                const expectedNetProfit = expectedRevenue - expectedTotalCost - wasteHandlingCost;
                const wastePercentage = (expectedWaste / expectedSupply) * 100;
                
                // Risk assessment
                const priceVolatility = calculateVolatility(priceForecast.forecast.map(f => f.value));
                const demandVolatility = calculateVolatility(demandForecast.forecast.map(f => f.value));
                const riskScore = (priceVolatility + demandVolatility) / 2;
                
                recommendations.push({
                    crop: cropName,
                    expectedProfit: expectedNetProfit,
                    expectedRevenue: expectedRevenue,
                    expectedCost: expectedTotalCost,
                    expectedWaste: expectedWaste,
                    wastePercentage: wastePercentage,
                    expectedPrice: expectedPrice,
                    expectedDemand: expectedDemand,
                    expectedSupply: expectedSupply,
                    riskScore: riskScore,
                    confidence: (priceForecast.confidence + demandForecast.confidence) / 2,
                    trend: priceForecast.trend,
                    recommendation: wastePercentage < 10 && expectedNetProfit > 0 ? 'recommended' : 'not_recommended'
                });
                
            } catch (error) {
                console.error(`Error processing ${cropName}:`, error);
            }
        }
        
        // Sort by expected profit and filter by waste threshold
        return recommendations
            .filter(rec => rec.wastePercentage < 15) // Max 15% waste
            .sort((a, b) => b.expectedProfit - a.expectedProfit);
    };

    const calculateVolatility = (values) => {
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
        return Math.sqrt(variance) / mean; // Coefficient of variation
    };

    // UI Integration Functions
    const displayRecommendation = async () => {
        const loadingElement = document.getElementById('recommendationLoading');
        const resultElement = document.getElementById('recommendationResult');
        
        // Show loading state
        loadingElement.classList.remove('hidden');
        resultElement.classList.add('hidden');
        
        try {
            // Calculate recommendations
            const recommendations = await calculateCropRecommendation();
            
            if (recommendations.length === 0) {
                throw new Error('No suitable crops found');
            }
            
            const bestCrop = recommendations[0];
            
            // Update UI elements
            document.getElementById('recommendedCropName').textContent = bestCrop.crop;
            document.getElementById('confidenceScore').textContent = `${Math.round(bestCrop.confidence * 100)}% Confidence`;
            document.getElementById('expectedProfit').textContent = `₹${Math.round(bestCrop.expectedProfit).toLocaleString()}`;
            document.getElementById('expectedDemand').textContent = `${Math.round(bestCrop.expectedDemand)} kg`;
            
            // Risk level calculation
            const riskLevel = bestCrop.riskScore < 0.1 ? 'Low' : bestCrop.riskScore < 0.2 ? 'Medium' : 'High';
            const riskColor = bestCrop.riskScore < 0.1 ? 'text-green-400' : bestCrop.riskScore < 0.2 ? 'text-yellow-400' : 'text-red-400';
            document.getElementById('riskLevel').innerHTML = `<span class="${riskColor}">${riskLevel}</span>`;
            
            // Crop icon
            const cropIcons = {
                'Tomatoes': '🍅',
                'Cucumbers': '🥒',
                'Lettuce': '🥬'
            };
            document.getElementById('recommendedCropIcon').textContent = cropIcons[bestCrop.crop] || '🌱';
            
            // Recommendation reason
            const reasons = {
                'Tomatoes': `High demand (${Math.round(bestCrop.expectedDemand)} kg) with good profit margins`,
                'Cucumbers': `Stable market with moderate risk and consistent demand`,
                'Lettuce': `Growing market demand with low waste potential`
            };
            document.getElementById('recommendedCropReason').textContent = reasons[bestCrop.crop] || 'Based on market analysis and profit potential';
            
            // Show result
            loadingElement.classList.add('hidden');
            resultElement.classList.remove('hidden');
            
        } catch (error) {
            console.error('Recommendation error:', error);
            // Show error state
            loadingElement.innerHTML = `
                <div class="text-center py-8">
                    <div class="text-red-400 text-4xl mb-2">⚠️</div>
                    <p class="text-purple-100">Unable to generate recommendation. Please try again.</p>
                </div>
            `;
        }
    };

    // CSV Data Schema and Placeholders
    const csvDataSchema = {
        // Required columns for Prophet forecasting
        columns: [
            'date',              // ISO date string, e.g. 2024-09-01
            'crop',              // crop name, e.g. Tomatoes
            'price_per_kg',      // market price observed (₹ per kg)
            'quantity_sold_kg',  // volume sold that day/week (kg) - proxy for demand
            'quantity_harvested_kg', // quantity harvested (kg) - supply
            'cost_per_kg'        // farmer's production cost per kg (₹)
        ],
        // Optional columns
        optional: [
            'region',            // e.g. 'Karnataka', 'Tamil Nadu'
            'channel',           // e.g. 'wholesale', 'local', 'retail'
            'weather_condition', // e.g. 'sunny', 'rainy', 'cloudy'
            'season'             // e.g. 'monsoon', 'summer', 'winter'
        ]
    };

    // Sample CSV data placeholders (replace with real data)
    const sampleCsvData = {
        'Tomatoes': [
            // Format: [date, price_per_kg, quantity_sold_kg, quantity_harvested_kg, cost_per_kg]
            ['2024-01-01', 45, 1200, 1000, 25],
            ['2024-01-08', 52, 1350, 1100, 26],
            ['2024-01-15', 48, 1100, 1200, 25],
            ['2024-01-22', 38, 900, 1300, 24],
            ['2024-01-29', 42, 1000, 1150, 25],
            ['2024-02-05', 55, 1500, 1000, 27],
            ['2024-02-12', 68, 1800, 900, 28],
            ['2024-02-19', 72, 2000, 850, 29],
            ['2024-02-26', 65, 1600, 950, 28],
            ['2024-03-05', 58, 1400, 1050, 27],
            ['2024-03-12', 49, 1200, 1100, 26],
            ['2024-03-19', 46, 1100, 1150, 25]
        ],
        'Cucumbers': [
            ['2024-01-01', 25, 800, 700, 15],
            ['2024-01-08', 28, 900, 750, 16],
            ['2024-01-15', 32, 1000, 800, 17],
            ['2024-01-22', 35, 1100, 850, 18],
            ['2024-01-29', 40, 1200, 900, 19],
            ['2024-02-05', 45, 1300, 950, 20],
            ['2024-02-12', 50, 1400, 1000, 21],
            ['2024-02-19', 48, 1350, 1050, 20],
            ['2024-02-26', 42, 1200, 1100, 19],
            ['2024-03-05', 38, 1000, 1150, 18],
            ['2024-03-12', 30, 800, 1200, 17],
            ['2024-03-19', 27, 700, 1250, 16]
        ],
        'Lettuce': [
            ['2024-01-01', 35, 600, 500, 20],
            ['2024-01-08', 38, 650, 550, 21],
            ['2024-01-15', 42, 700, 600, 22],
            ['2024-01-22', 45, 750, 650, 23],
            ['2024-01-29', 50, 800, 700, 24],
            ['2024-02-05', 55, 850, 750, 25],
            ['2024-02-12', 60, 900, 800, 26],
            ['2024-02-19', 58, 875, 825, 25],
            ['2024-02-26', 52, 800, 850, 24],
            ['2024-03-05', 48, 750, 875, 23],
            ['2024-03-12', 40, 650, 900, 22],
            ['2024-03-19', 37, 600, 925, 21]
        ]
    };

    // Prophet Forecasting Configuration
    const prophetConfig = {
        // Forecast next 30 days
        periods: 30,
        // Confidence intervals
        confidenceInterval: 0.95,
        // Seasonality settings
        yearlySeasonality: true,
        weeklySeasonality: true,
        dailySeasonality: false,
        // Trend settings
        changepointPriorScale: 0.05,
        seasonalityPriorScale: 10.0
    };

    // Function to create price chart
    const createPriceChart = (cropName) => {
        const canvas = document.getElementById('priceChart');
        if (!canvas) return;

        // Destroy existing chart if it exists
        if (priceChart) {
            priceChart.destroy();
        }

        const data = priceData[cropName];
        if (!data) return;

        const ctx = canvas.getContext('2d');
        priceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: `${cropName} Price (₹/kg)`,
                    data: data.prices,
                    borderColor: data.color,
                    backgroundColor: data.color + '20', // 20% opacity
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: data.color,
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: data.color,
                        borderWidth: 2,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `Price: ₹${context.parsed.y}/kg`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#666666',
                            font: {
                                size: 12,
                                weight: '500'
                            }
                        }
                    },
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#666666',
                            font: {
                                size: 12,
                                weight: '500'
                            },
                            callback: function(value) {
                                return '₹' + value;
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    };

    const displayModal = (data) => {
        // Update title
        modalTitle.textContent = translate(data.titleKey);
        
        // Update structured content
        document.getElementById('modal-insights').querySelector('p').textContent = translate(data.insightsKey);
        document.getElementById('modal-analysis').querySelector('p').textContent = translate(data.analysisKey);
        document.getElementById('modal-recommendations').querySelector('p').textContent = translate(data.recommendationsKey);
        document.getElementById('modal-risks').querySelector('p').textContent = translate(data.risksKey);
        
        // Update timestamp
        const now = new Date();
        const timestamp = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        document.getElementById('modal-timestamp').textContent = timestamp;
        
        // Create price chart
        const cropName = data.titleKey.replace('-title', '').replace('tomatoes', 'Tomatoes').replace('cucumbers', 'Cucumbers').replace('lettuce', 'Lettuce');
        if (cropName === 'Tomatoes' || cropName === 'Cucumbers' || cropName === 'Lettuce') {
            setTimeout(() => {
                createPriceChart(cropName);
            }, 100); // Small delay to ensure modal is rendered
        }
        
        // Show modal
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            modal.querySelector('div').classList.remove('scale-95', 'opacity-0');
            modal.querySelector('div').classList.add('scale-100', 'opacity-100');
        }, 10);
    };

    const hideModal = () => {
        modal.querySelector('div').classList.remove('scale-100', 'opacity-100');
        modal.querySelector('div').classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }, 300);
    };

    // Add click event listeners to forecast cards
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            const cropElement = e.target.closest('.rounded-xl').querySelector('h3');
            const cropKey = cropElement.getAttribute('data-translate');
            
            // Map translated crop names back to English keys
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
        });
    });

    // Modal event listeners
    closeModalButton.addEventListener('click', hideModal);
    closeModalIcon.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Notification bell functionality
    const bellIcon = document.querySelector('.notification-bell');
    if (bellIcon) {
        bellIcon.addEventListener('click', () => {
            alert('No new notifications at this time.');
        });
    }

    // Profile dropdown functionality
    const profileButton = document.querySelector('.profile-button');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    if (profileButton && profileDropdown) {
        profileButton.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('opacity-0');
            profileDropdown.classList.toggle('opacity-100');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            profileDropdown.classList.add('opacity-0');
            profileDropdown.classList.remove('opacity-100');
        });
    }

    // Language switching functionality
    const languageButton = document.getElementById('languageButton');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLanguageSpan = document.getElementById('currentLanguage');
    const languageOptions = document.querySelectorAll('.language-option');

    if (languageButton && languageDropdown) {
        languageButton.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('opacity-0');
            languageDropdown.classList.toggle('opacity-100');
        });

        // Language option click handlers
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedLang = option.getAttribute('data-lang');
                currentLanguage = selectedLang;
                currentLanguageSpan.textContent = translate('language');
                updateUI();
                languageDropdown.classList.add('opacity-0');
                languageDropdown.classList.remove('opacity-100');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            languageDropdown.classList.add('opacity-0');
            languageDropdown.classList.remove('opacity-100');
        });
    }

    // Fix close button functionality
    const closeModalButtons = document.querySelectorAll('#closeModal, #closeModalButton');
    closeModalButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', hideModal);
        }
    });

    // Initialize recommendation system
    const refreshButton = document.getElementById('refreshRecommendation');
    if (refreshButton) {
        refreshButton.addEventListener('click', displayRecommendation);
    }

    // Initialize UI
    updateUI();
    
    // Auto-load recommendation on page load
    setTimeout(() => {
        displayRecommendation();
    }, 1000);
});
