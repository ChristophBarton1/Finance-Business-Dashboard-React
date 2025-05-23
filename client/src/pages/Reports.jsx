import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChartCard from '../components/ChartCard';
import DataTable from '../components/DataTable';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Sample report data
const salesByRegionData = [
  { name: 'North America', value: 4200 },
  { name: 'Europe', value: 3800 },
  { name: 'Asia Pacific', value: 2900 },
  { name: 'Latin America', value: 1500 },
  { name: 'Middle East', value: 980 },
  { name: 'Africa', value: 670 },
];

const salesByProductData = [
  { name: 'Product A', value: 2400 },
  { name: 'Product B', value: 1800 },
  { name: 'Product C', value: 3200 },
  { name: 'Product D', value: 1500 },
  { name: 'Product E', value: 2100 },
];

const quarterlyTrendsData = [
  { quarter: 'Q1 2024', revenue: 18500, expenses: 12300, profit: 6200 },
  { quarter: 'Q2 2024', revenue: 20700, expenses: 13100, profit: 7600 },
  { quarter: 'Q3 2024', revenue: 22400, expenses: 14000, profit: 8400 },
  { quarter: 'Q4 2024', revenue: 26800, expenses: 15200, profit: 11600 },
  { quarter: 'Q1 2025', revenue: 21500, expenses: 13800, profit: 7700 },
];

const topCustomersData = [
  { id: 1, customer: 'Acme Corporation', revenue: 524600, orders: 42, growth: 12.5 },
  { id: 2, customer: 'Globex Industries', revenue: 418300, orders: 36, growth: 8.2 },
  { id: 3, customer: 'Stark Enterprises', revenue: 365400, orders: 28, growth: 15.7 },
  { id: 4, customer: 'Wayne Enterprises', revenue: 289700, orders: 23, growth: 5.3 },
  { id: 5, customer: 'Oscorp', revenue: 276500, orders: 19, growth: -2.1 },
  { id: 6, customer: 'Umbrella Corporation', revenue: 253800, orders: 22, growth: 7.4 },
  { id: 7, customer: 'Cyberdyne Systems', revenue: 217600, orders: 18, growth: 9.9 },
  { id: 8, customer: 'Initech', revenue: 198400, orders: 15, growth: 3.5 },
];

const topCustomersColumns = [
  { key: 'id', header: 'Rank' },
  { key: 'customer', header: 'Customer' },
  { key: 'revenue', header: 'Revenue', render: (row) => `$${row.revenue.toLocaleString()}` },
  { key: 'orders', header: 'Orders' },
  { 
    key: 'growth', 
    header: 'Growth', 
    render: (row) => (
      <div className={`flex items-center ${row.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {row.growth >= 0 ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
          </svg>
        )}
        {row.growth}%
      </div>
    )
  },
];

const COLORS = ['#4f46e5', '#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState('sales');
  const [reportPeriod, setReportPeriod] = useState('quarterly');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Change report loading state when type or period changes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [reportType, reportPeriod]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-white">Business Reports</h1>
          <p className="text-gray-400">Standard reports and custom analysis</p>
        </motion.div>
        
        <motion.div 
          className="mt-4 md:mt-0 flex space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <select 
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="sales">Sales Report</option>
            <option value="financial">Financial Report</option>
            <option value="marketing">Marketing Report</option>
            <option value="operations">Operations Report</option>
          </select>
          
          <select 
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
            <option value="custom">Custom Range</option>
          </select>
          
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 transition-colors duration-200">
            Export Report
          </button>
        </motion.div>
      </div>

      {/* Report summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card p-5"
      >
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-indigo-600/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Q2 2025 Sales Report</h2>
                <p className="text-gray-400">Generated on May 23, 2025</p>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 space-y-2">
              <div className="text-sm text-gray-400">Report Period</div>
              <div className="text-lg font-medium text-white">April 1 - June 30, 2025</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Total Revenue</div>
              <div className="text-2xl font-bold text-white">$26.8M</div>
              <div className="flex items-center text-sm text-green-500 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                12.4% from previous period
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Gross Profit</div>
              <div className="text-2xl font-bold text-white">$11.6M</div>
              <div className="flex items-center text-sm text-green-500 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                8.7% from previous period
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Profit Margin</div>
              <div className="text-2xl font-bold text-white">43.2%</div>
              <div className="flex items-center text-sm text-red-500 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                </svg>
                1.2% from previous period
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts and tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ChartCard title="Sales by Region" subtitle="Geographic distribution">
            {loading ? (
              <div className="h-72 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={salesByRegionData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" tick={{ fill: '#9CA3AF' }} />
                  <YAxis dataKey="name" type="category" tick={{ fill: '#9CA3AF' }} width={100} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                    itemStyle={{ color: '#F3F4F6' }}
                    labelStyle={{ color: '#F3F4F6' }}
                    formatter={(value) => [`$${value}k`, 'Sales']}
                  />
                  <Legend wrapperStyle={{ color: '#9CA3AF' }} />
                  <Bar dataKey="value" name="Sales (in thousands)" fill="#4F46E5" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ChartCard title="Sales by Product" subtitle="Product category breakdown">
            {loading ? (
              <div className="h-72 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={salesByProductData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {salesByProductData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                    itemStyle={{ color: '#F3F4F6' }}
                    labelStyle={{ color: '#F3F4F6' }}
                    formatter={(value) => [`$${value}k`, 'Sales']}
                  />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    wrapperStyle={{ color: '#9CA3AF' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </motion.div>
      </div>

      {/* Quarterly trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <ChartCard title="Quarterly Performance" subtitle="Revenue, expenses, and profit trends">
          {loading ? (
            <div className="h-72 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={quarterlyTrendsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="quarter" tick={{ fill: '#9CA3AF' }} />
                <YAxis tick={{ fill: '#9CA3AF' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#F3F4F6' }}
                  labelStyle={{ color: '#F3F4F6' }}
                  formatter={(value) => [`$${value}`, '']}
                />
                <Legend wrapperStyle={{ color: '#9CA3AF' }} />
                <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#4F46E5" strokeWidth={3} dot={{ r: 6, strokeWidth: 2 }} />
                <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#EF4444" strokeWidth={3} dot={{ r: 6, strokeWidth: 2 }} />
                <Line type="monotone" dataKey="profit" name="Profit" stroke="#10B981" strokeWidth={3} dot={{ r: 6, strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </motion.div>

      {/* Top customers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <ChartCard title="Top Customers" subtitle="Revenue and growth by customer">
          <DataTable
            columns={topCustomersColumns}
            data={topCustomersData}
            loading={loading}
          />
        </ChartCard>
      </motion.div>
    </div>
  );
};

export default Reports;
