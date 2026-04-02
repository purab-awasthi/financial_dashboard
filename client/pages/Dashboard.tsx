import React from "react";
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import BorderGlow from "@/components/ui/BorderGlow"; // Ensure this path matches where you saved it!

// Mock Data for Charts
const balanceData = [
  { name: "Jan", balance: 19000 },
  { name: "Feb", balance: 28500 },
  { name: "Mar", balance: 26000 },
  { name: "Apr", balance: 32000 },
  { name: "May", balance: 35000 },
  { name: "Jun", balance: 38000 },
  { name: "Jul", balance: 43250 },
];

const spendingData = [
  { name: "Shopping", value: 35, color: "#38bdf8" }, 
  { name: "Food", value: 25, color: "#818cf8" },     
  { name: "Transport", value: 20, color: "#c084fc" },
  { name: "Bills", value: 20, color: "#10b981" },    
];

// Dark theme background for the cards
const CARD_BG = "#0f131f"; 

export default function Dashboard() {
  return (
    <div className="w-full pb-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* Total Balance Card (Cyan Glow) */}
        <BorderGlow
          className="h-full"
          backgroundColor={CARD_BG}
          glowColor="199 89 48" // Cyan HSL
          colors={['#38bdf8', '#818cf8', '#0ea5e9']}
          borderRadius={16}
          animated={true}
          animationDelay={0}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-muted-foreground">Total Balance</span>
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2 tracking-tight">$43,250</h2>
            <div className="flex items-center text-sm">
              <span className="flex items-center text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full font-medium">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                5%
              </span>
              <span className="text-muted-foreground ml-2">from last month</span>
            </div>
          </div>
        </BorderGlow>

        {/* Income Card (Emerald Glow) */}
        <BorderGlow
          className="h-full"
          backgroundColor={CARD_BG}
          glowColor="141 73 42" // Emerald HSL
          colors={['#10b981', '#34d399', '#059669']}
          borderRadius={16}
          animated={true}
          animationDelay={0}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-muted-foreground">Income</span>
              <div className="p-2 rounded-xl bg-white/5 text-muted-foreground">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2 tracking-tight">$8,500</h2>
            <div className="flex items-center text-sm">
              <span className="flex items-center text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full font-medium">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                12%
              </span>
              <span className="text-muted-foreground ml-2">from last month</span>
            </div>
          </div>
        </BorderGlow>

        {/* Expenses Card (Rose Glow) */}
        <BorderGlow
          className="h-full"
          backgroundColor={CARD_BG}
          glowColor="343 81 45" // Rose HSL
          colors={['#f43f5e', '#fb7185', '#e11d48']}
          borderRadius={16}
          animated={true}
          animationDelay={0}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-muted-foreground">Expenses</span>
              <div className="p-2 rounded-xl bg-white/5 text-muted-foreground">
                <TrendingDown className="w-5 h-5" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2 tracking-tight">$3,200</h2>
            <div className="flex items-center text-sm">
              <span className="flex items-center text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded-full font-medium">
                <ArrowDownRight className="w-3 h-3 mr-1" />
                3%
              </span>
              <span className="text-muted-foreground ml-2">from last month</span>
            </div>
          </div>
        </BorderGlow>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        
        {/* Area Chart - Balance Trend */}
        <BorderGlow
          className="h-full flex flex-col"
          backgroundColor={CARD_BG}
          glowColor="226 71 60" // Indigo HSL
          colors={['#818cf8', '#c084fc', '#38bdf8']}
          borderRadius={16}
        >
          <div className="p-6 flex-1 flex flex-col">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Balance Trend</h3>
              <p className="text-sm text-muted-foreground">Your account balance over the last 7 months</p>
            </div>
            <div className="flex-1 min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={balanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#38bdf8' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#38bdf8"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorBalance)"
                    activeDot={{ r: 6, fill: '#38bdf8', stroke: '#09090b', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </BorderGlow>

        {/* Pie Chart - Spending by Category */}
        <BorderGlow
          className="h-full flex flex-col"
          backgroundColor={CARD_BG}
          glowColor="226 71 60" 
          colors={['#818cf8', '#c084fc', '#38bdf8']}
          borderRadius={16}
        >
          <div className="p-6 flex-1 flex flex-col">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Spending by Category</h3>
              <p className="text-sm text-muted-foreground">Breakdown of your expenses</p>
            </div>
            <div className="flex-1 min-h-[300px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value) => [`${value}%`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center Text in Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-foreground">100%</span>
                <span className="text-sm text-muted-foreground">Total</span>
              </div>
            </div>
            
            {/* Custom Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {spendingData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name} ({item.value}%)
                </div>
              ))}
            </div>
          </div>
        </BorderGlow>

      </div>
    </div>
  );
}