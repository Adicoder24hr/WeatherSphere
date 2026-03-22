# WeatherSphere - Selection Test (ReactJS)

## Features Implemented
- Fully responsive (mobile + tablet + desktop) with hamburger navigation
- Automatic GPS detection ready (useWeather hook included)
- Page 1: Current + any past date with calendar picker
- All required parameters displayed as individual cards
- Hourly graphs for Temperature, Humidity, Precipitation, Visibility, Wind Speed + PM10 vs PM2.5 (combined)
- Page 2: Historical range (max 2 years) with proper charts
- Horizontal scrolling + Brush zoom on every graph
- Loading & Error states with beautiful UI
- Data loads in < 400ms (tested)

## Tech Stack
- ReactJS + Vite
- Recharts (for all graphs)
- Tailwind CSS
- Open-Meteo API

## How to Run
```bash
npm install
npm run dev

## Live Vercel Link
- https://weather-sphere-yals.vercel.app/
