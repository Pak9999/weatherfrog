<div align="center">
  <img src="src/assets/WF_logo.webp" width="100" height="100">
</div>

# WeatherFrog

A modern, responsive weather forecast application built with React and TypeScript. WeatherFrog provides comprehensive weather information throu a pretty interface, featuring current conditions, hourly forecasts, weekly outlook, and historical weather comparisons.

## Features

### Current Weather
- Real-time weather conditions for any location worldwide
- Current temperature with "feels like" temperature
- Weather descriptions with matching icons
- Sunrise and sunset times
- Wind speed and direction
- Humidity and UV index
- Precipitation data

### Forecasting
- **Hourly Forecast**: Next 12 hours with detailed weather data
- **Weekly Forecast**: 7-day outlook with daily highs and lows
- Interactive carousel displays for easy navigation

### Location Features
- **Geolocation Support**: Automatic detection of user's current location
- **Global Search**: Search for weather in any city worldwide
- **Favorites System**: Save frequently checked locations
- **Recent Searches**: Quick access to previously searched locations

### Historical Weather Analysis
- **5-Year Historical Averages**: Compare current weather with historical data
- **Multi-Location Comparison**: Analyze up to 5 locations simultaneously
- **Interactive Charts**: Visual representation of temperature trends using Chart.js
- **Date Selection**: Choose specific periods for historical analysis

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Fast Performance**: Optimized API calls with caching
- **Accessibility**: Screen reader friendly with proper alt text and labels

## Tech Stack

**Frontend:**
- React 19.1.0 with TypeScript
- Vite for build tooling and development server
- Chart.js & React-Chart.js-2 for historical weather visualization
- Embla Carousel for interactive forecast displays
- Axios for API communication
- CSS3 with modern flexbox and grid layouts

**APIs:**
- [Open-Meteo API](https://open-meteo.com/) for current weather and forecasts
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) for location search
- [Open-Meteo Historical Weather API](https://open-meteo.com/en/docs/historical-weather-api) for historical data
- [Nominatim (OpenStreetMap)](https://nominatim.org/release-docs/develop/api/Reverse/) for reverse geocoding

## Prerequisites

- [Node.js](https://nodejs.org/en) (version 16 or higher) and npm installed on your machine
- Modern web browser with JavaScript enabled
- [VS Code](https://code.visualstudio.com/) (recommended for development)

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pak9999/weatherfrog.git
   cd weatherfrog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Features in Detail

### Weather Display
- **Current Conditions**: Real-time temperature, weather description, and conditions
- **Hourly Forecast**: Detailed 24-hour forecast with temperature and precipitation
- **7-Day Forecast**: Weekly weather outlook with daily highs and lows
- **Weather Icons**: Dynamic weather icons that match current conditions are provided by [mrdarrengriffin](https://github.com/mrdarrengriffin/google-weather-icons) and owned by google

### Location Management
- **Search Functionality**: Search for any city worldwide using the Open-Meteo Geocoding API
- **Geolocation**: Automatic detection of user's current location (with permission)
- **Favorites**: Save frequently checked locations for quick access
- **Recent Searches**: Automatic saving of recently searched locations

### Historical Analysis
- **Historical Data**: Access to historical weather averages for comparison
- **Interactive Charts**: Visual temperature trend analysis using Chart.js
- **Multi-Location Comparison**: Compare weather data across multiple locations
- **Customizable Date Ranges**: Select specific time periods for analysis

### User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Carousel Navigation**: Smooth carousel interactions using Embla Carousel
- **Modern Styling**: Clean, intuitive interface with CSS3 animations
- **Performance Optimized**: Fast loading with intelligent API caching

## Project Structure

```
src/
├── components/          # Reusable UI components
├── services/           # API service functions
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and helpers
├── layout/             # Layout components (header, footer, body)
├── assets/             # Static assets and weather icons
└── App.tsx            # Main application component
```

## API Integration

This application uses the following free APIs:
- **Open-Meteo Weather API**: For current weather and forecasts
- **Open-Meteo Geocoding API**: For location search functionality
- **Open-Meteo Historical API**: For historical weather data
- **Nominatim (OpenStreetMap)**: For reverse geocoding

All APIs are free and require no API keys, making the application easy to deploy and run.

## Browser Support

- Chrome (latest) NOT TESTED
- Firefox (latest)  
- Safari (latest) NOT TESTED
- Edge (latest) NOT TESTED

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Authors

- [@Pak9999](https://www.github.com/pak9999)

- [@infotillandreas](https://www.github.com/infotillandreas)

-[@MalikTallouzi](https://github.com/MalikTallouzi)
