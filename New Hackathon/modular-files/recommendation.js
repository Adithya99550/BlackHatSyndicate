/**
 * Recommendation Module
 * Contains crop recommendation algorithms and UI integration
 */

import { sampleCsvData } from './data.js';
import { forecastWithProphet, calculateVolatility } from './forecasting.js';

/**
 * Calculate crop recommendations based on Prophet forecasting
 * @returns {Array} Sorted array of crop recommendations
 */
export const calculateCropRecommendation = async () => {
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

/**
 * Display recommendation in the UI
 * @param {Function} translateFn - Translation function
 */
export const displayRecommendation = async (translateFn) => {
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
