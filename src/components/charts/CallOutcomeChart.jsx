import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { motion } from 'framer-motion'

const CallOutcomeChart = ({ data }) => {
  const outcomeData = [
    { name: 'Successful Demos', value: data.successfulDemos, color: '#10b981' },
    { name: 'Follow-up Scheduled', value: data.followUpScheduled, color: '#f59e0b' },
    { name: 'No Answer', value: data.noAnswer, color: '#f97316' },
    { name: 'Not Interested', value: data.notInterested, color: '#ef4444' },
    { name: 'Closed Lost', value: data.closedLost, color: '#dc2626' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 rounded-xl p-6"
    >
      <h3 className="text-xl font-bold text-white mb-4">Call Outcomes</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={outcomeData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {outcomeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: '#0d2626',
                border: '1px solid #14b8a6',
                borderRadius: '8px',
                color: '#ffffff'
              }}
              formatter={(value, name) => [value, name]}
            />
            <Legend 
              wrapperStyle={{
                color: '#ffffff',
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default CallOutcomeChart
