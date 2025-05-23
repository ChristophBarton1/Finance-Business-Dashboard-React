const express = require('express');
const cors = require('cors');
const faker = require('faker');
const moment = require('moment');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Generate sample data
const generateTimeSeriesData = (days = 180, baseValue = 1000, trend = 5) => {
  return Array.from({ length: days }, (_, i) => {
    const date = moment().subtract(days - i, 'days').format('YYYY-MM-DD');
    // Create seasonal pattern (higher in winter months, lower in summer)
    const month = moment(date).month();
    const seasonalFactor = month >= 10 || month <= 1 ? 1.2 : // Winter
                           month >= 5 && month <= 7 ? 0.8 : // Summer
                           1.0; // Spring/Fall
                           
    // Add weekly pattern (weekends lower)
    const day = moment(date).day();
    const weekdayFactor = day === 0 || day === 6 ? 0.7 : 1.1;
    
    // Create trend with some randomness
    const trendValue = baseValue + (i * trend) + (Math.random() * trend * 10 - trend * 5);
    const value = Math.round(trendValue * seasonalFactor * weekdayFactor);
    
    return {
      date,
      value,
      forecastLower: null,
      forecastUpper: null,
      forecast: null,
      isForecast: false
    };
  });
};

// Generate forecast data
const generateForecastData = (historicalData, days = 90, uncertainty = 0.02) => {
  const lastValue = historicalData[historicalData.length - 1].value;
  const trend = (historicalData[historicalData.length - 1].value - historicalData[historicalData.length - 30].value) / 30;
  
  return Array.from({ length: days }, (_, i) => {
    const date = moment().add(i + 1, 'days').format('YYYY-MM-DD');
    const month = moment(date).month();
    const seasonalFactor = month >= 10 || month <= 1 ? 1.2 : // Winter
                           month >= 5 && month <= 7 ? 0.8 : // Summer
                           1.0; // Spring/Fall
                           
    const day = moment(date).day();
    const weekdayFactor = day === 0 || day === 6 ? 0.7 : 1.1;
    
    const uncertaintyFactor = uncertainty * (i + 1);
    const forecastValue = Math.round((lastValue + (trend * (i + 1))) * seasonalFactor * weekdayFactor);
    
    return {
      date,
      value: null,
      forecast: forecastValue,
      forecastLower: Math.round(forecastValue * (1 - uncertaintyFactor)),
      forecastUpper: Math.round(forecastValue * (1 + uncertaintyFactor)),
      isForecast: true
    };
  });
};

// Generate KPI data
const generateKpiData = () => {
  return [
    {
      id: 'sales',
      title: 'Total Sales',
      value: `$${(faker.datatype.number({ min: 800, max: 2000 }) / 10).toFixed(1)}k`,
      change: faker.datatype.number({ min: -15, max: 20 }).toFixed(1),
      changeType: faker.datatype.number({ min: 0, max: 10 }) > 3 ? 'positive' : 'negative',
      trend: Array.from({ length: 7 }, () => faker.datatype.number({ min: 30, max: 100 }))
    },
    {
      id: 'revenue',
      title: 'Revenue',
      value: `$${(faker.datatype.number({ min: 1000, max: 2500 }) / 10).toFixed(1)}k`,
      change: faker.datatype.number({ min: -10, max: 25 }).toFixed(1),
      changeType: faker.datatype.number({ min: 0, max: 10 }) > 2 ? 'positive' : 'negative',
      trend: Array.from({ length: 7 }, () => faker.datatype.number({ min: 30, max: 100 }))
    },
    {
      id: 'customers',
      title: 'Customers',
      value: faker.datatype.number({ min: 1000, max: 9999 }).toString(),
      change: faker.datatype.number({ min: -5, max: 30 }).toFixed(1),
      changeType: faker.datatype.number({ min: 0, max: 10 }) > 2 ? 'positive' : 'negative',
      trend: Array.from({ length: 7 }, () => faker.datatype.number({ min: 30, max: 100 }))
    },
    {
      id: 'conversion',
      title: 'Conversion Rate',
      value: `${faker.datatype.number({ min: 10, max: 50 }).toFixed(1)}%`,
      change: faker.datatype.number({ min: -10, max: 20 }).toFixed(1),
      changeType: faker.datatype.number({ min: 0, max: 10 }) > 3 ? 'positive' : 'negative',
      trend: Array.from({ length: 7 }, () => faker.datatype.number({ min: 30, max: 100 }))
    }
  ];
};

// Generate sales by region data
const generateSalesByRegion = () => {
  return [
    { name: 'North America', value: faker.datatype.number({ min: 3000, max: 5000 }) },
    { name: 'Europe', value: faker.datatype.number({ min: 2500, max: 4500 }) },
    { name: 'Asia Pacific', value: faker.datatype.number({ min: 2000, max: 3500 }) },
    { name: 'Latin America', value: faker.datatype.number({ min: 1000, max: 2000 }) },
    { name: 'Middle East', value: faker.datatype.number({ min: 800, max: 1500 }) },
    { name: 'Africa', value: faker.datatype.number({ min: 500, max: 1000 }) }
  ];
};

// Generate sales by product data
const generateSalesByProduct = () => {
  return [
    { name: 'Product A', value: faker.datatype.number({ min: 1500, max: 3000 }) },
    { name: 'Product B', value: faker.datatype.number({ min: 1200, max: 2800 }) },
    { name: 'Product C', value: faker.datatype.number({ min: 2000, max: 3500 }) },
    { name: 'Product D', value: faker.datatype.number({ min: 1000, max: 2000 }) },
    { name: 'Product E', value: faker.datatype.number({ min: 1500, max: 2500 }) }
  ];
};

// Generate top customers data
const generateTopCustomers = (count = 10) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    customer: faker.company.companyName(),
    revenue: faker.datatype.number({ min: 100000, max: 900000 }),
    orders: faker.datatype.number({ min: 10, max: 100 }),
    growth: (faker.datatype.number({ min: -20, max: 40 }) / 10).toFixed(1)
  }));
};

// API Routes
app.get('/api/dashboard', (req, res) => {
  res.json({
    kpis: generateKpiData(),
    salesByRegion: generateSalesByRegion(),
    salesByProduct: generateSalesByProduct(),
  });
});

app.get('/api/timeseries', (req, res) => {
  const days = parseInt(req.query.days || 180);
  const forecast = parseInt(req.query.forecast || 90);
  
  const historicalData = generateTimeSeriesData(days);
  const forecastData = generateForecastData(historicalData, forecast);
  
  res.json([...historicalData, ...forecastData]);
});

app.get('/api/reports/sales', (req, res) => {
  res.json({
    byRegion: generateSalesByRegion(),
    byProduct: generateSalesByProduct(),
    topCustomers: generateTopCustomers(15)
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
