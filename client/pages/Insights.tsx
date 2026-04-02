import {
  TrendingUp,
  Target,
  BarChart3,
  TrendingDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import BorderGlow from "@/components/ui/BorderGlow"; // Make sure this path is correct!

// Mock Data
const categorySpendingData = [
  { category: "Shopping", amount: 1200 },
  { category: "Food", amount: 850 },
  { category: "Transport", amount: 650 },
  { category: "Utilities", amount: 500 },
  { category: "Entertainment", amount: 400 },
];

const monthlyComparisonData = [
  { month: "Oct", income: 5500, expenses: 3200 },
  { month: "Nov", income: 5500, expenses: 3400 },
  { month: "Dec", income: 8500, expenses: 3200 },
];

const categoryDistribution = [
  { name: "Shopping", value: 35, color: "#38bdf8" }, // Cyan
  { name: "Food", value: 25, color: "#818cf8" },     // Indigo
  { name: "Transport", value: 20, color: "#c084fc" },// Purple
  { name: "Utilities", value: 15, color: "#10b981" },// Emerald
  { name: "Other", value: 5, color: "#f43f5e" },     // Rose
];

const CARD_BG = "#0f131f";

export default function Insights() {
  return (
    <div className="flex-1 p-8 pt-10 w-full overflow-x-hidden animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">
            Insights
          </h1>
        </div>
        <p className="text-muted-foreground">
          Detailed analysis of your spending and income patterns.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Metric 1 */}
        <BorderGlow
          className="h-full"
          backgroundColor={CARD_BG}
          glowColor="199 89 48" // Cyan HSL
          colors={['#38bdf8', '#818cf8', '#0ea5e9']}
          borderRadius={16}
          animated={true}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Average Monthly Spend</span>
                <h2 className="text-3xl font-bold text-foreground mt-1 tracking-tight">$3,267</h2>
              </div>
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Based on last 3 months</p>
            <div className="flex items-center text-sm">
              <span className="flex items-center text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded-full font-medium">
                <TrendingDown className="w-3 h-3 mr-1" />
                5% increase
              </span>
            </div>
          </div>
        </BorderGlow>

        {/* Metric 2 */}
        <BorderGlow
          className="h-full"
          backgroundColor={CARD_BG}
          glowColor="270 70 60" // Purple HSL
          colors={['#c084fc', '#e879f9', '#a855f7']}
          borderRadius={16}
          animated={true}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Highest Expense</span>
                <h2 className="text-3xl font-bold text-foreground mt-1 tracking-tight">Shopping</h2>
              </div>
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <Target className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">35% of total spending</p>
            <div className="flex items-center text-sm">
              <span className="flex items-center text-zinc-300 bg-zinc-500/20 px-2 py-0.5 rounded-full font-medium">
                Target: Reduce by 10%
              </span>
            </div>
          </div>
        </BorderGlow>

        {/* Metric 3 */}
        <BorderGlow
          className="h-full"
          backgroundColor={CARD_BG}
          glowColor="141 73 42" // Emerald HSL
          colors={['#10b981', '#34d399', '#059669']}
          borderRadius={16}
          animated={true}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">MoM Growth</span>
                <h2 className="text-3xl font-bold text-foreground mt-1 tracking-tight">+12%</h2>
              </div>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Income growth this month</p>
            <div className="flex items-center text-sm">
              <span className="flex items-center text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full font-medium">
                Excellent progress
              </span>
            </div>
          </div>
        </BorderGlow>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        
        {/* Category Spending Chart */}
        <BorderGlow
          className="h-full flex flex-col"
          backgroundColor={CARD_BG}
          glowColor="226 71 60" 
          colors={['#818cf8', '#c084fc', '#38bdf8']}
          borderRadius={16}
        >
          <div className="p-6 flex-1 flex flex-col w-full overflow-x-auto">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Spending by Category</h3>
              <p className="text-sm text-muted-foreground">Monthly breakdown</p>
            </div>
            <div className="flex-1 min-h-[300px] w-full min-w-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categorySpendingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="category" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip
                    cursor={{ fill: '#ffffff', opacity: 0.05 }}
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#38bdf8' }}
                  />
                  <Bar dataKey="amount" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </BorderGlow>

        {/* Income vs Expenses Chart */}
        <BorderGlow
          className="h-full flex flex-col"
          backgroundColor={CARD_BG}
          glowColor="226 71 60" 
          colors={['#818cf8', '#c084fc', '#38bdf8']}
          borderRadius={16}
        >
          <div className="p-6 flex-1 flex flex-col w-full overflow-x-auto">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Income vs Expenses</h3>
              <p className="text-sm text-muted-foreground">Monthly comparison</p>
            </div>
            <div className="flex-1 min-h-[300px] w-full min-w-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip
                    cursor={{ fill: '#ffffff', opacity: 0.05 }}
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Income" />
                  <Bar dataKey="expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </BorderGlow>

        {/* Category Distribution Pie Chart */}
        <BorderGlow
          className="h-full flex flex-col lg:col-span-2"
          backgroundColor={CARD_BG}
          glowColor="199 89 48" 
          colors={['#38bdf8', '#818cf8', '#0ea5e9']}
          borderRadius={16}
        >
          <div className="p-6 w-full">
            <div className="mb-6 text-center">
              <h3 className="text-lg font-semibold text-foreground">Overall Category Distribution</h3>
            </div>
            
            {/* Locked height to prevent Recharts infinite stretch bug */}
            <div className="w-full relative h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryDistribution.map((entry, index) => (
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
            </div>

            {/* Custom Legend underneath */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {categoryDistribution.map((item, index) => (
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