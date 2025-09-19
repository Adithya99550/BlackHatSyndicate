/**
 * Data Module - CSV Schema and Sample Data
 * Contains all data structures and sample data for the forecasting system
 */

// CSV Data Schema for Prophet forecasting
export const csvDataSchema = {
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
export const sampleCsvData = {
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

// Price data for graphs (Last 12 months)
export const priceData = {
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

// Prophet Forecasting Configuration
export const prophetConfig = {
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

// Crop recommendations data
export const recommendations = {
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

// Export all data
export { recommendations, sampleCsvData, priceData, prophetConfig, csvDataSchema };
