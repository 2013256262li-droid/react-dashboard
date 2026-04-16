const generateTimeRangeData = (days) => {
  const now = new Date();
  const data = [];
  const dayIncrement = days <= 7 ? 1 : days <= 30 ? 2 : 7;
  
  for (let i = days - 1; i >= 0; i -= dayIncrement) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const baseValue = Math.floor(Math.random() * 1000) + 500;
    const variation = Math.floor(Math.random() * 200) - 100;
    
    data.push({
      date: date.toISOString().split('T')[0],
      name: days <= 7 
        ? date.toLocaleDateString('en-US', { weekday: 'short' })
        : days <= 30 
          ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          : date.toLocaleDateString('en-US', { month: 'short' }),
      users: baseValue + variation,
      revenue: (baseValue + variation) * 10,
      sessions: baseValue + Math.floor(Math.random() * 500),
      pageViews: (baseValue + Math.floor(Math.random() * 500)) * 3,
    });
  }
  
  return data;
};

const calculateStats = (data) => {
  if (!data || data.length === 0) {
    return {
      totalUsers: 0,
      totalRevenue: 0,
      avgSessions: 0,
      totalPageViews: 0,
      userGrowth: 0,
      revenueGrowth: 0,
      sessionsGrowth: 0,
      pageViewsGrowth: 0,
    };
  }
  
  const totalUsers = data.reduce((sum, item) => sum + item.users, 0);
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const avgSessions = Math.floor(data.reduce((sum, item) => sum + item.sessions, 0) / data.length);
  const totalPageViews = data.reduce((sum, item) => sum + item.pageViews, 0);
  
  const calculateGrowth = (current, previous) => {
    if (previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 100);
  };
  
  const midPoint = Math.floor(data.length / 2);
  const firstHalf = data.slice(0, midPoint);
  const secondHalf = data.slice(midPoint);
  
  const firstHalfUsers = firstHalf.reduce((sum, item) => sum + item.users, 0);
  const secondHalfUsers = secondHalf.reduce((sum, item) => sum + item.users, 0);
  const userGrowth = calculateGrowth(secondHalfUsers, firstHalfUsers);
  
  const firstHalfRevenue = firstHalf.reduce((sum, item) => sum + item.revenue, 0);
  const secondHalfRevenue = secondHalf.reduce((sum, item) => sum + item.revenue, 0);
  const revenueGrowth = calculateGrowth(secondHalfRevenue, firstHalfRevenue);
  
  const firstHalfSessions = firstHalf.reduce((sum, item) => sum + item.sessions, 0);
  const secondHalfSessions = secondHalf.reduce((sum, item) => sum + item.sessions, 0);
  const sessionsGrowth = calculateGrowth(secondHalfSessions, firstHalfSessions);
  
  const firstHalfPageViews = firstHalf.reduce((sum, item) => sum + item.pageViews, 0);
  const secondHalfPageViews = secondHalf.reduce((sum, item) => sum + item.pageViews, 0);
  const pageViewsGrowth = calculateGrowth(secondHalfPageViews, firstHalfPageViews);
  
  return {
    totalUsers,
    totalRevenue,
    avgSessions,
    totalPageViews,
    userGrowth,
    revenueGrowth,
    sessionsGrowth,
    pageViewsGrowth,
  };
};

export const getDashboardData = (timeframe) => {
  const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
  
  const chartData = generateTimeRangeData(days);
  const stats = calculateStats(chartData);
  
  return {
    chartData,
    stats,
    hasData: chartData.length > 0,
  };
};

export const TIMEFRAMES = [
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '90 Days' },
];

export const DEFAULT_TIMEFRAME = '30d';
