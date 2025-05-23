import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, 
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Components
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import KPICard from '../components/KPICard';
import DataTable from '../components/DataTable';

// Sample data
const salesData = [
  { name: 'Jan', value: 4000, target: 2400 },
  { name: 'Feb', value: 3000, target: 2400 },
  { name: 'Mar', value: 2000, target: 2400 },
  { name: 'Apr', value: 2780, target: 2400 },
  { name: 'May', value: 1890, target: 2400 },
  { name: 'Jun', value: 2390, target: 2400 },
  { name: 'Jul', value: 3490, target: 2400 },
  { name: 'Aug', value: 4000, target: 2400 },
  { name: 'Sep', value: 5000, target: 2400 },
  { name: 'Oct', value: 6000, target: 2400 },
  { name: 'Nov', value: 7000, target: 2400 },
  { name: 'Dec', value: 8000, target: 2400 },
];

const revenueData = [
  { name: 'Jan', actual: 4000, forecast: 4200 },
  { name: 'Feb', actual: 3000, forecast: 3100 },
  { name: 'Mar', actual: 2000, forecast: 2300 },
  { name: 'Apr', actual: 2780, forecast: 2600 },
  { name: 'May', actual: 1890, forecast: 2000 },
  { name: 'Jun', actual: 2390, forecast: 2500 },
  { name: 'Jul', actual: 3490, forecast: 3400 },
  { name: 'Aug', actual: 4000, forecast: 4100 },
  { name: 'Sep', actual: 5000, forecast: 4800 },
  { name: 'Oct', actual: 6000, forecast: 5800 },
  { name: 'Nov', actual: 7000, forecast: 6800 },
  { name: 'Dec', actual: 8000, forecast: 7900 },
];

const marketShareData = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 300 },
  { name: 'Product D', value: 200 },
  { name: 'Product E', value: 100 },
];

const customerData = [
  { name: 'Jan', new: 40, returning: 24 },
  { name: 'Feb', new: 30, returning: 28 },
  { name: 'Mar', new: 20, returning: 26 },
  { name: 'Apr', new: 27, returning: 32 },
  { name: 'May', new: 18, returning: 35 },
  { name: 'Jun', new: 23, returning: 38 },
  { name: 'Jul', new: 34, returning: 30 },
];

const COLORS = ['#4f46e5', '#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('last30days');

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate total sales and growth
  const totalSales = salesData.reduce((sum, item) => sum + item.value, 0);
  const previousTotalSales = totalSales * 0.9; // Simulated previous period
  const salesGrowth = ((totalSales - previousTotalSales) / previousTotalSales) * 100;

  // Calculate total revenue and growth
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.actual, 0);
  const previousTotalRevenue = totalRevenue * 0.85; // Simulated previous period
  const revenueGrowth = ((totalRevenue - previousTotalRevenue) / previousTotalRevenue) * 100;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-white">Executive Dashboard</h1>
          <p className="text-gray-400">Welcome back, John. Here's what's happening with your business today.</p>
        </motion.div>
        
        <motion.div 
          className="mt-4 md:mt-0 flex space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisYear">This Year</option>
          </select>
          
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 transition-colors duration-200">
            Export
          </button>
        </motion.div>
      </div>

      {/* KPI summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <KPICard 
            title="Total Sales"
            value={`$${(totalSales / 1000).toFixed(1)}k`}
            change={salesGrowth.toFixed(1)}
            changeType={salesGrowth >= 0 ? "positive" : "negative"}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            loading={loading}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <KPICard 
            title="Revenue"
            value={`$${(totalRevenue / 1000).toFixed(1)}k`}
            change={revenueGrowth.toFixed(1)}
            changeType={revenueGrowth >= 0 ? "positive" : "negative"}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            loading={loading}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <KPICard 
            title="Customers"
            value="1,254"
            change="12.5"
            changeType="positive"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            loading={loading}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <KPICard 
            title="Conversion Rate"
            value="32.8%"
            change="4.2"
            changeType="positive"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
            loading={loading}
          />
        </motion.div>
      </div>

      {/* Main charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ChartCard title="Sales Performance" subtitle="Monthly sales vs target">
            {loading ? (
              <div className="h-72 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={salesData}
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
                  <Bar dataKey="value" name="Sales" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" name="Target" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <ChartCard title="Revenue Trend" subtitle="Actual vs forecast">
            {loading ? (
              <div className="h-72 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={revenueData}
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
                  <Line type="monotone" dataKey="actual" name="Actual" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#0EA5E9" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </motion.div>
      </div>

      {/* Secondary charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="lg:col-span-2"
        >
          <ChartCard title="Customer Acquisition" subtitle="New vs returning customers">
            {loading ? (
              <div className="h-72 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={customerData}
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
                  <Area type="monotone" dataKey="new" name="New Customers" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="returning" name="Returning Customers" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <ChartCard title="Market Share" subtitle="By product category">
            {loading ? (
              <div className="h-72 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={marketShareData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {marketShareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                    itemStyle={{ color: '#F3F4F6' }}
                    labelStyle={{ color: '#F3F4F6' }}
                    formatter={(value) => [`$${value}k`, 'Value']}
                  />
                  <Legend 
                    wrapperStyle={{ color: '#9CA3AF' }}
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
