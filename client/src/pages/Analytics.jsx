import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChartCard from '../components/ChartCard';
import DataTable from '../components/DataTable';
import { 
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ZAxis, Cell, ComposedChart, Area
} from 'recharts';

// Sample data for our analytics page
const timeSeriesData = Array.from({ length: 50 }, (_, i) => ({
  date: new Date(2025, 0, i + 1).toLocaleDateString(),
  value: 1000 + Math.random() * 5000,
  trend: 2000 + i * 70 + Math.random() * 500,
  forecast: 2000 + i * 80 + Math.random() * 300
}));

const correlationData = Array.from({ length: 50 }, () => ({
  x: Math.random() * 1000,
  y: Math.random() * 1000,
  z: Math.random() * 100
}));

const anomalyData = timeSeriesData.map(item => ({
  ...item,
  anomaly: Math.random() > 0.9 ? item.value * (1 + (Math.random() * 0.5)) : null
}));

const segmentData = [
  { name: 'Segment A', value: 4000 },
  { name: 'Segment B', value: 3000 },
  { name: 'Segment C', value: 2000 },
  { name: 'Segment D', value: 2780 },
  { name: 'Segment E', value: 1890 },
  { name: 'Segment F', value: 2390 },
];

const COLORS = ['#4f46e5', '#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const distributionData = Array.from({ length: 20 }, (_, i) => ({
  range: `${i * 5}-${(i + 1) * 5}`,
  frequency: Math.floor(Math.random() * 100)
}));

const tableData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  metric: `Metric ${i + 1}`,
  value: Math.floor(Math.random() * 10000),
  change: (Math.random() * 20 - 10).toFixed(2),
  status: Math.random() > 0.7 ? 'Critical' : Math.random() > 0.4 ? 'Warning' : 'Normal',
  trend: Math.random() > 0.5 ? 'Up' : 'Down',
  date: new Date(2025, 0, Math.floor(Math.random() * 30) + 1).toLocaleDateString()
}));

const tableColumns = [
  { key: 'id', header: 'ID' },
  { key: 'metric', header: 'Metric' },
  { key: 'value', header: 'Value', render: (row) => `$${row.value.toLocaleString()}` },
  { 
    key: 'change', 
    header: 'Change', 
    render: (row) => (
      <div className={`flex items-center ${parseFloat(row.change) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {parseFloat(row.change) >= 0 ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
          </svg>
        )}
        {row.change}%
      </div>
    )
  },
  { 
    key: 'status', 
    header: 'Status',
    render: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        row.status === 'Critical' ? 'bg-red-500/20 text-red-500' : 
        row.status === 'Warning' ? 'bg-amber-500/20 text-amber-500' : 
        'bg-green-500/20 text-green-500'
      }`}>
        {row.status}
      </span>
    )
  },
  { key: 'trend', header: 'Trend' },
  { key: 'date', header: 'Date' }
];

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('value');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
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
          <h1 className="text-2xl font-bold text-white">Advanced Analytics</h1>
          <p className="text-gray-400">Explore patterns, trends, and insights from your data.</p>
        </motion.div>
        
        <motion.div 
          className="mt-4 md:mt-0 flex space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <select 
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="value">Sales</option>
            <option value="trend">Revenue</option>
            <option value="forecast">Forecast</option>
          </select>
          
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 transition-colors duration-200">
            Run Analysis
          </button>
        </motion.div>
      </div>

      {/* Main visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ChartCard title="Time Series Analysis" subtitle="Trends, forecasts, and anomalies over time">
          {loading ? (
            <div className="h-80 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart
                data={anomalyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#9CA3AF' }}
                  tickFormatter={(value, index) => index % 5 === 0 ? value : ''}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fill: '#9CA3AF' }}
                  domain={['auto', 'auto']}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#F3F4F6' }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Legend wrapperStyle={{ color: '#9CA3AF' }} />
                <Area 
                  type="monotone" 
                  dataKey="trend" 
                  name="Trend" 
                  fill="#4F46E5" 
                  fillOpacity={0.1} 
                  stroke="#4F46E5" 
                  yAxisId="left"
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Actual" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={false}
                  yAxisId="left"
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  name="Forecast" 
                  stroke="#0EA5E9" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                  yAxisId="left"
                />
                <Scatter 
                  dataKey="anomaly" 
                  name="Anomaly" 
                  fill="#EF4444" 
                  shape="circle"
                  yAxisId="left"
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </motion.div>

      {/* Secondary visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ChartCard title="Correlation Analysis" subtitle="Relationship between variables">
            {loading ? (
              <div className="h-72 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="Factor A" 
                    tick={{ fill: '#9CA3AF' }}
                    domain={['auto', 'auto']}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="Factor B" 
                    tick={{ fill: '#9CA3AF' }}
                    domain={['auto', 'auto']}
                  />
                  <ZAxis
                    type="number"
                    dataKey="z"
                    range={[20, 200]}
                    name="Impact"
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                    itemStyle={{ color: '#F3F4F6' }}
                    labelStyle={{ color: '#F3F4F6' }}
                    formatter={(value) => [`${value}`, '']}
                    cursor={{ strokeDasharray: '3 3' }}
                  />
                  <Legend wrapperStyle={{ color: '#9CA3AF' }} />
                  <Scatter 
                    name="Data Points" 
                    data={correlationData} 
                    fill="#8B5CF6"
                    opacity={0.7}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ChartCard title="Segment Analysis" subtitle="Distribution by segment">
            {loading ? (
              <div className="h-72 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={segmentData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} />
                  <YAxis tick={{ fill: '#9CA3AF' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                    itemStyle={{ color: '#F3F4F6' }}
                    labelStyle={{ color: '#F3F4F6' }}
                  />
                  <Legend wrapperStyle={{ color: '#9CA3AF' }} />
                  <Bar dataKey="value" name="Value">
                    {segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </motion.div>
      </div>

      {/* Data table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <ChartCard title="Detailed Metrics" subtitle="Comprehensive view of all metrics">
          <DataTable
            columns={tableColumns}
            data={tableData}
            loading={loading}
          />
        </ChartCard>
      </motion.div>
    </div>
  );
};

export default Analytics;
