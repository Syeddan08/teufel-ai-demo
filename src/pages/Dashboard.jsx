import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';
import Header from '../components/Header';
import { TrendingUp, Headphones, Euro, Zap } from 'lucide-react';

const Dashboard = () => {
  const roiData = [
    { month: 'Jan 2026', savings: 15000, cost: 5000 },
    { month: 'Feb 2026', savings: 32000, cost: 5500 },
    { month: 'Mar 2026', savings: 48000, cost: 6200 },
    { month: 'Apr 2026', savings: 74000, cost: 7800 },
    { month: 'May 2026', savings: 96000, cost: 9100 },
    { month: 'Jun 2026', savings: 134000, cost: 10500 },
  ];

  return (
    <div className="main-content">
      <Header title="Business KPI Dashboard" />
      <div className="page-container">
        
        <div className="grid-cols-4">
          <div className="glass-panel kpi-card">
            <div className="kpi-header">
              <span>R&D Efficiency Gain</span>
              <Euro size={18} />
            </div>
            <div className="kpi-value">314%</div>
            <div className="kpi-trend positive"><TrendingUp size={14} /> +18.5% this month</div>
          </div>
          <div className="glass-panel kpi-card">
            <div className="kpi-header">
              <span>Active AI Users</span>
              <Headphones size={18} />
            </div>
            <div className="kpi-value">284</div>
            <div className="kpi-trend positive"><TrendingUp size={14} /> +24% vs last Q</div>
          </div>
          <div className="glass-panel kpi-card">
            <div className="kpi-header">
              <span>Avg. Tuning Latency</span>
              <Zap size={18} />
            </div>
            <div className="kpi-value">380ms</div>
            <div className="kpi-trend positive"><TrendingUp size={14} /> -8% improved</div>
          </div>
          <div className="glass-panel kpi-card">
            <div className="kpi-header">
              <span>Cost Per Model Evaluation</span>
              <Euro size={18} />
            </div>
            <div className="kpi-value">€0.003</div>
            <div className="kpi-trend positive"><TrendingUp size={14} /> -15% cheaper</div>
          </div>
        </div>

        <div className="grid-cols-2">
          {/* Chart 1: ROI over time */}
          <div className="glass-panel p-6" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="mb-4 text-main">Hardware DSP Dev Savings vs AI expenditure</h3>
            <div style={{ flex: 1, width: '100%', minHeight: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={roiData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EB0000" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#EB0000" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `€${value}`} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#14161c', borderColor: '#323741' }} formatter={(value) => `€${value}`} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '14px', color: '#f9fafb' }} />
                  <Area name="DSP Savings" type="monotone" dataKey="savings" stroke="#10b981" fillOpacity={1} fill="url(#colorSavings)" />
                  <Area name="AI Expenditure" type="monotone" dataKey="cost" stroke="#EB0000" fillOpacity={1} fill="url(#colorCost)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Adoption by Department */}
          <div className="glass-panel p-6" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="mb-4 text-main">AI Workload Distribution</h3>
            <div style={{ flex: 1, width: '100%', minHeight: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'DSP Firmware', calls: 4000 },
                  { name: 'Acoustics R&D', calls: 3000 },
                  { name: 'Customer Support', calls: 2000 },
                  { name: 'Marketing & Sales', calls: 2780 },
                  { name: 'Procurement', calls: 1890 },
                ]} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                  <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} width={100} interval={0} />
                  <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#14161c', borderColor: '#323741' }} />
                  <Bar dataKey="calls" fill="#EB0000" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
