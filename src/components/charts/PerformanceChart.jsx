import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { motion } from 'framer-motion'

const PerformanceChart = ({ data }) => {
  const chartData = data.map((item, index) => ({
    day: `Day ${index + 1}`,
    dials: item.dials || Math.floor(Math.random() * 50) + 20,
    sets: item.sets || Math.floor(Math.random() * 30) + 10,
    showed: item.showed || Math.floor(Math.random() * 20) + 5,
    closed: item.closed || Math.floor(Math.random() * 10) + 2,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 rounded-xl p-6"
    >
      <h3 className="text-xl font-bold text-white mb-4">Performance Trends</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="day" 
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
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="dials" 
              stroke="#14b8a6" 
              strokeWidth={3}
              dot={{ fill: '#14b8a6', strokeWidth: 2, r: 4 }}
              name="Dials"
            />
            <Line 
              type="monotone" 
              dataKey="sets" 
              stroke="#06b6d4" 
              strokeWidth={3}
              dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
              name="Sets"
            />
            <Line 
              type="monotone" 
              dataKey="showed" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              name="Showed"
            />
            <Line 
              type="monotone" 
              dataKey="closed" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              name="Closed"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default PerformanceChart
