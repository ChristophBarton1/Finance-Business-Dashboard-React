import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = {
  // Dashboard data
  getDashboardData: async () => {
    try {
      const response = await axios.get(`${API_URL}/dashboard`);
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  },
  
  // Time series data with optional parameters
  getTimeSeriesData: async (params = {}) => {
    try {
      const response = await axios.get(`${API_URL}/timeseries`, { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching time series data:", error);
      throw error;
    }
  },
  
  // Sales reports
  getSalesReports: async () => {
    try {
      const response = await axios.get(`${API_URL}/reports/sales`);
      return response.data;
    } catch (error) {
      console.error("Error fetching sales reports:", error);
      throw error;
    }
  },
  
  // Fallback to static data if API is not available
  getFallbackData: (dataType) => {
    // This would contain static data similar to what we'd get from the API
    const fallbackData = {
      dashboard: {
        kpis: [
          {
            id: 'sales',
            title: 'Total Sales',
            value: '$125.4k',
            change: '12.5',
            changeType: 'positive',
            trend: [45, 52, 49, 60, 55, 65, 70]
          },
          {
            id: 'revenue',
            title: 'Revenue',
            value: '$235.7k',
            change: '8.2',
            changeType: 'positive',
            trend: [50, 55, 45, 50, 60, 65, 70]
          },
          {
            id: 'customers',
            title: 'Customers',
            value: '1,254',
            change: '12.5',
            changeType: 'positive',
            trend: [40, 45, 50, 55, 60, 65, 70]
          },
          {
            id: 'conversion',
            title: 'Conversion Rate',
            value: '32.8%',
            change: '4.2',
            changeType: 'positive',
            trend: [35, 40, 45, 50, 45, 50, 55]
          }
        ],
        salesByRegion: [
          { name: 'North America', value: 4200 },
          { name: 'Europe', value: 3800 },
          { name: 'Asia Pacific', value: 2900 },
          { name: 'Latin America', value: 1500 },
          { name: 'Middle East', value: 980 },
          { name: 'Africa', value: 670 }
        ],
        salesByProduct: [
          { name: 'Product A', value: 2400 },
          { name: 'Product B', value: 1800 },
          { name: 'Product C', value: 3200 },
          { name: 'Product D', value: 1500 },
          { name: 'Product E', value: 2100 }
        ]
      }
    };
    
    return fallbackData[dataType] || {};
  }
};

export default api;
