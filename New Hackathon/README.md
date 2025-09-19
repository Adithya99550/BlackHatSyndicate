# AgriPredict AI - Modular Architecture

A comprehensive AI-powered agricultural forecasting and recommendation system built with modular JavaScript architecture.

## 📁 Project Structure

```
├── app.html              # Main HTML file
├── styles.css            # CSS styles
├── main.js              # Main application entry point
├── data.js              # Data schemas and sample data
├── translations.js      # Multi-language translations
├── forecasting.js       # Prophet forecasting algorithms
├── recommendation.js    # Crop recommendation logic
├── utils.js            # Utility functions
├── script.js           # Legacy monolithic script (deprecated)
└── README.md           # This file
```

## 🚀 Quick Start

1. **Open `app.html`** in a modern web browser
2. **No build process required** - uses ES6 modules
3. **All features work immediately**

## 📦 Module Overview

### `main.js` - Application Entry Point
- Initializes all modules
- Handles DOM events
- Manages application state
- Coordinates between modules

### `data.js` - Data Management
- CSV data schema definitions
- Sample crop data (Tomatoes, Cucumbers, Lettuce)
- Price data for charts
- Prophet configuration
- Crop recommendation mappings

### `translations.js` - Internationalization
- English and Kannada translations
- All UI text and content
- Modal content translations
- Easy to add new languages

### `forecasting.js` - Prophet Algorithms
- Prophet data preparation
- Linear regression forecasting (Prophet.js fallback)
- Volatility calculations
- Chart.js integration
- Time series analysis

### `recommendation.js` - AI Recommendations
- Crop recommendation algorithm
- Profit calculation logic
- Risk assessment
- UI integration for recommendations
- Waste minimization logic

### `utils.js` - Utility Functions
- Translation helper functions
- UI update utilities
- Currency and number formatting
- Risk level calculations
- Notification system
- Validation functions

## 🔧 Configuration

### Adding New Crops
1. **Update `data.js`**:
   ```javascript
   // Add to sampleCsvData
   'NewCrop': [
       ['2024-01-01', price, demand, supply, cost],
       // ... more data points
   ]
   ```

2. **Update `translations.js`**:
   ```javascript
   // Add translations for new crop
   'new-crop': 'New Crop Name',
   'new-crop-title': 'Detailed New Crop Forecast',
   // ... more translations
   ```

3. **Update `recommendation.js`**:
   ```javascript
   // Add to cropIcons and reasons objects
   'NewCrop': '🌱',
   'NewCrop': 'Description for new crop',
   ```

### Modifying Data Sources
Replace `sampleCsvData` in `data.js` with real CSV data:
```javascript
// Import your CSV data
import { parseCSV } from './csv-parser.js';
const realData = parseCSV('your-data.csv');
```

### Adding New Languages
1. **Add language to `translations.js`**:
   ```javascript
   fr: {
       'app-name': 'AgriPredict AI',
       'tagline': 'Insights That Empower Every Farmer',
       // ... all translations
   }
   ```

2. **Update language selector in `app.html`**:
   ```html
   <button class="language-option" data-lang="fr">Français</button>
   ```

## 🎯 Key Features

### AI Crop Recommendation
- **Prophet-based forecasting** for price and demand
- **Profit optimization** with waste minimization
- **Risk assessment** with confidence scoring
- **Real-time updates** with refresh functionality

### Data Schema (CSV Compatible)
- **Required columns**: date, crop, price_per_kg, quantity_sold_kg, quantity_harvested_kg, cost_per_kg
- **Optional columns**: region, channel, weather_condition, season
- **Easy integration** with existing data sources

### Interactive Charts
- **Price trend visualization** for last 12 months
- **Chart.js integration** with professional styling
- **Responsive design** for all screen sizes
- **Interactive tooltips** with detailed information

### Multilingual Support
- **English and Kannada** fully supported
- **Easy language switching** with UI updates
- **Modal content translation** for detailed analysis
- **Extensible** for additional languages

## 🔄 Migration from Monolithic Version

The original `script.js` file has been split into modules:

| Original Location | New Module | Purpose |
|------------------|------------|---------|
| `translations` object | `translations.js` | All language data |
| `priceData` object | `data.js` | Price and sample data |
| `recommendations` object | `data.js` | Crop recommendation data |
| `forecastWithProphet` | `forecasting.js` | Forecasting algorithms |
| `calculateCropRecommendation` | `recommendation.js` | Recommendation logic |
| `translate`, `updateUI` | `utils.js` | Utility functions |
| Main application logic | `main.js` | Application coordination |

## 🛠️ Development

### Adding New Features
1. **Create new module** (e.g., `weather.js`)
2. **Import in `main.js`**: `import { weatherFunction } from './weather.js'`
3. **Use in application**: Call functions as needed

### Testing
- **No build process** - test directly in browser
- **Module isolation** - test individual modules
- **Easy debugging** - clear separation of concerns

### Performance
- **Lazy loading** - modules loaded on demand
- **Tree shaking** - unused code eliminated
- **Caching** - modules cached by browser

## 📊 Data Requirements

### Minimum Data Points
- **12+ weeks** of historical data
- **Weekly or daily** resolution
- **Price, demand, supply, cost** data
- **Consistent date format** (ISO 8601)

### Data Quality
- **No missing values** in required columns
- **Consistent units** (kg for quantities, ₹ for prices)
- **Realistic ranges** for all metrics
- **Recent data** for accurate forecasting

## 🚀 Production Deployment

### Replace Sample Data
1. **Update `data.js`** with real CSV data
2. **Implement real Prophet.js** in `forecasting.js`
3. **Add API integration** for live data
4. **Configure production settings**

### Performance Optimization
1. **Minify modules** for production
2. **Add service worker** for caching
3. **Implement lazy loading** for large datasets
4. **Add error handling** for network failures

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/new-feature`
3. **Make changes** following the modular structure
4. **Test thoroughly** in multiple browsers
5. **Submit pull request** with clear description

## 📞 Support

For questions or issues:
1. **Check the documentation** in each module
2. **Review the code comments** for implementation details
3. **Test with sample data** before using real data
4. **Open an issue** for bugs or feature requests
