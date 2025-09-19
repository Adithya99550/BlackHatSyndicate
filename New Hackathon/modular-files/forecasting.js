/**
 * Forecasting Module
 * Contains Prophet-based forecasting algorithms and utilities
 */

import { prophetConfig } from './data.js';

// Chart.js is loaded globally from CDN
const Chart = window.Chart;

/**
 * Prepare data for Prophet forecasting
 * @param {Array} cropData - Array of crop data rows
 * @param {number} targetColumn - Column index for target variable
 * @returns {Array} Formatted data for Prophet
 */
export const prepareProphetData = (cropData, targetColumn) => {
    // Convert CSV data to Prophet format
    return cropData.map(row => ({
        ds: new Date(row[0]), // date
        y: row[targetColumn]   // target value (price or demand)
    }));
};

/**
 * Calculate volatility using coefficient of variation
 * @param {Array} values - Array of numeric values
 * @returns {number} Volatility score
 */
export const calculateVolatility = (values) => {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance) / mean; // Coefficient of variation
};

/**
 * Forecast using Prophet algorithm (simplified linear regression implementation)
 * @param {Array} cropData - Crop data array
 * @param {number} targetColumn - Target column index
 * @returns {Object} Forecast results
 */
export const forecastWithProphet = async (cropData, targetColumn) => {
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

/**
 * Create price chart using Chart.js
 * @param {string} cropName - Name of the crop
 * @param {Object} priceData - Price data for the crop
 * @returns {Chart} Chart.js instance
 */
export const createPriceChart = (cropName, priceData) => {
    const canvas = document.getElementById('priceChart');
    if (!canvas) return null;

    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return null;
    }

    // Destroy existing chart if it exists
    if (window.priceChart) {
        window.priceChart.destroy();
    }

    const data = priceData[cropName];
    if (!data) return null;

    const ctx = canvas.getContext('2d');
    window.priceChart = new Chart(ctx, {
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

    return window.priceChart;
};
