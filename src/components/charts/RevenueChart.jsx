import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const RevenueChart = ({ data }) => {
  const revenueData = [
    { week: 'Week 1', revenue: data.totalRevenue * 0.2, deals: Math.floor(data.closedCalls * 0.2) },
    { week: 'Week 2', revenue: data.totalRevenue * 0.3, deals: Math.floor(data.closedCalls * 0.3) },
    { week: 'Week 3', revenue: data.totalRevenue * 0.25, deals: Math.floor(data.closedCalls * 0.25) },
    { week: 'Week 4', revenue: data.totalRevenue * 0.25, deals: Math.floor(data.closedCalls * 0.25) },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 rounded-xl p-6"
    >
      <h3 className="text-xl font-bold text-white mb-4">Revenue Analysis</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="week" 
              stroke="#9ca3af"
              fontSize={12}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#0d2626',
                border: '1px solid #14b8a6',
                borderRadius: '8px',
                color: '#ffffff'
              }}
              formatter={(value, name) => [
                name === 'revenue' ? `$${value.toLocaleString()}` : value,
                name === 'revenue' ? 'Revenue' : 'Deals'
              ]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#14b8a6"
              strokeWidth={3}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default RevenueChart
