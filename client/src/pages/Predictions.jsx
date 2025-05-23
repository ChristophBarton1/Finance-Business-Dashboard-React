import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChartCard from '../components/ChartCard';
import StatCard from '../components/StatCard';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ReferenceLine, Brush, ComposedChart
} from 'recharts';

// Generate forecasting data with increasing confidence intervals
const generateForecastData = () => {
  const historical = Array.from({ length: 24 }, (_, i) => {
    const base = 1000 + i * 50 + Math.sin(i/3) * 200;
    return {
      month: `${2023 + Math.floor(i/12)}-${String(i % 12 + 1).padStart(2, '0')}`,
      actual: Math.round(base + Math.random() * 100),
      type: 'historical'
    };
  });
  
  const forecast = Array.from({ length: 12 }, (_, i) => {
    const lastActual = historical[historical.length - 1].actual;
    const growthRate = 1.02; // 2% monthly growth
    const base = lastActual * Math.pow(growthRate, i + 1);
    const uncertainty = 0.02 * (i + 1); // Increasing uncertainty
    
    return {
      month: `${2025}-${String(i + 1).padStart(2, '0')}`,
      forecast: Math.round(base),
      forecastLower: Math.round(base * (1 - uncertainty)),
      forecastUpper: Math.round(base * (1 + uncertainty)),
      type: 'forecast'
    };
  });
  
  return [...historical, ...forecast];
};

// Generate seasonal forecast
const generateSeasonalForecast = () => {
  const data = [];
  const years = ['2023', '2024', '2025'];
  
  years.forEach((year, yearIndex) => {
    const isHistorical = yearIndex < 2; // 2023 and 2024 are historical
    
    Array.from({ length: 12 }, (_, month) => {
      // Create seasonal pattern
      let base = 1000 + yearIndex * 200; // Yearly growth
      
      // Add seasonality
      if (month >= 10 || month <= 1) { // Winter holiday spike
        base *= 1.5;
      } else if (month >= 5 && month <= 7) { // Summer spike
        base *= 1.3;
      } else if (month === 3 || month === 8) { // Spring and fall dips
        base *= 0.9;
      }
      
      const value = Math.round(base + (Math.random() * 100 - 50));
      
      data.push({
        month: `${year}-${String(month + 1).padStart(2, '0')}`,
        [isHistorical ? 'actual' : 'forecast']: value,
        forecastLower: isHistorical ? null : Math.round(value * 0.9),
        forecastUpper: isHistorical ? null : Math.round(value * 1.1),
      });
    });
  });
  
  return data;
};

// Sample forecast scenarios
const scenarios = [
  { id: 1, name: 'Base Case', probability: 60, change: '+8.5%', impact: 'Moderate' },
  { id: 2, name: 'Optimistic', probability: 25, change: '+15.2%', impact: 'High Positive' },
  { id: 3, name: 'Pessimistic', probability: 15, change: '-3.2%', impact: 'Negative' },
];

// KPI predictions data
const kpiPredictions = [
  { 
    title: 'Revenue', 
    current: '$1.25M', 
    predicted: '$1.45M', 
    change: '+16.0', 
    confidence: 92,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  { 
    title: 'Customers', 
    current: '2,450', 
    predicted: '2,850', 
    change: '+16.3', 
    confidence: 88,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  { 
    title: 'Profit Margin', 
    current: '24.5%', 
    predicted: '26.8%', 
    change: '+2.3', 
    confidence: 85,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  { 
    title: 'Market Share', 
    current: '12.3%', 
    predicted: '14.5%', 
    change: '+2.2', 
    confidence: 78,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
];

const Predictions = () => {
  const [loading, setLoading] = useState(true);
  const [forecastData, setForecastData] = useState([]);
  const [seasonalData, setSeasonalData] = useState([]);
  const [forecastWindow, setForecastWindow] = useState(12);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setForecastData(generateForecastData());
      setSeasonalData(generateSeasonalForecast());
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-white">Predictive Analytics</h1>
          <p className="text-gray-400">Forecast future trends and business outcomes</p>
        </motion.div>
        
        <motion.div 
          className="mt-4 md:mt-0 flex space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <select 
            value={forecastWindow}
            onChange={(e) => setForecastWindow(Number(e.target.value))}
            className="bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value={3}>3 Month Forecast</option>
            <option value={6}>6 Month Forecast</option>
            <option value={12}>12 Month Forecast</option>
            <option value={24}>24 Month Forecast</option>
          </select>
          
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 transition-colors duration-200">
            Recalculate
          </button>
        </motion.div>
      </div>

      {/* KPI predictions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiPredictions.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
          >
            <div className="card h-full p-5">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-700 rounded w-1/2"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 bg-gray-700 rounded w-1/3"></div>
                    <div className="h-8 bg-gray-700 rounded w-1/3"></div>
                  </div>
                  <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-400">{kpi.title}</h3>
                    <div className="p-2 rounded-lg bg-gray-700/50">
                      {kpi.icon}
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500">Current</div>
                      <div className="text-xl font-bold text-white">{kpi.current}</div>
                    </div>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 self-center" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500">Predicted</div>
                      <div className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 text-transparent bg-clip-text">
                        {kpi.predicted}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center text-sm font-medium ${
                      parseFloat(kpi.change) >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      <span className="mr-1">
                        {parseFloat(kpi.change) >= 0 ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                          </svg>
                        )}
                      </span>
                      {kpi.change}%
                    </div>
                    
                    <div className="text-sm text-gray-400">
                      <span className="font-medium text-indigo-400">{kpi.confidence}%</span> confidence
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main forecast chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <ChartCard title="Revenue Forecast" subtitle="12-month projection with confidence intervals">
          {loading ? (
            <div className="h-80 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart
                data={forecastData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#9CA3AF' }}
                  tickFormatter={(value) => value.split('-')[1]}
                />
                <YAxis tick={{ fill: '#9CA3AF' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#F3F4F6' }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Legend wrapperStyle={{ color: '#9CA3AF' }} />
                
                <ReferenceLine x="2025-01" stroke="#6B7280" strokeDasharray="3 3" label={{ value: 'Forecast Start', fill: '#9CA3AF', position: 'insideTopRight' }} />
                
                <Area 
                  type="monotone" 
                  dataKey="forecastUpper" 
                  name="Upper Bound" 
                  stroke="none" 
                  fill="#4F46E5" 
                  fillOpacity={0.1}
                />
                <Area 
                  type="monotone" 
                  dataKey="forecastLower" 
                  name="Lower Bound" 
                  stroke="none" 
                  fill="#4F46E5" 
                  fillOpacity={0.1}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  name="Historical" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  name="Forecast" 
                  stroke="#4F46E5" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ r: 4, strokeWidth: 2, fill: '#1F2937' }}
                />
                
                <Brush 
                  dataKey="month" 
                  height={30} 
                  stroke="#6B7280"
                  tickFormatter={(value) => value.split('-')[1]}
                  startIndex={forecastData.length - forecastWindow - 6}
                  endIndex={forecastData.length - 1}
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </motion.div>
      
      {/* Secondary charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <ChartCard title="Seasonal Patterns" subtitle="Historical and projected seasonal trends">
            {loading ? (
              <div className="h-72 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={seasonalData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#9CA3AF' }}
                    tickFormatter={(value) => value.split('-')[1]}
                  />
                  <YAxis tick={{ fill: '#9CA3AF' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                    itemStyle={{ color: '#F3F4F6' }}
                    labelStyle={{ color: '#F3F4F6' }}
                  />
                  <Legend wrapperStyle={{ color: '#9CA3AF' }} />
                  <Area 
                    type="monotone" 
                    dataKey="actual" 
                    name="Historical" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="forecast" 
                    name="Forecast" 
                    stroke="#4F46E5" 
                    fill="#4F46E5" 
                    fillOpacity={0.2}
                    strokeDasharray="5 5"
                  />
                  <ReferenceLine x="2025-01" stroke="#6B7280" strokeDasharray="3 3" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <ChartCard title="Forecast Scenarios" subtitle="Impact analysis of different business conditions">
            {loading ? (
              <div className="h-72 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-6 h-[300px] overflow-auto py-2">
                {scenarios.map((scenario, index) => (
                  <div 
                    key={scenario.id}
                    className="glass-card p-4 border-l-4 space-y-3"
                    style={{ 
                      borderLeftColor: 
                        index === 0 ? '#10B981' : 
                        index === 1 ? '#4F46E5' : '#EF4444' 
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">{scenario.name}</h4>
                      <div className="text-sm px-2 py-1 rounded-full bg-gray-700">
                        {scenario.probability}% probability
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Growth Impact</div>
                        <div className={`text-lg font-medium ${
                          scenario.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {scenario.change}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Business Impact</div>
                        <div className="text-lg font-medium text-gray-200">
                          {scenario.impact}
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                      <div 
                        className="h-1.5 rounded-full" 
                        style={{ 
                          width: `${scenario.probability}%`,
                          backgroundColor: 
                            index === 0 ? '#10B981' : 
                            index === 1 ? '#4F46E5' : '#EF4444'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
                
                <div className="text-center text-sm text-gray-400 mt-4">
                  <button className="text-indigo-400 hover:text-indigo-300 underline transition-colors duration-200">
                    Generate additional scenarios
                  </button>
                </div>
              </div>
            )}
          </ChartCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Predictions;
