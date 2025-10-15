import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { motion } from 'framer-motion'

const ConversionFunnel = ({ data }) => {
  const funnelData = [
    { name: 'Dials', value: data.totalCalls, percentage: 100, color: '#14b8a6' },
    { name: 'Sets', value: data.bookedCalls, percentage: data.bookedPercentage, color: '#06b6d4' },
    { name: 'Showed', value: data.showedCalls, percentage: data.showedPercentage, color: '#3b82f6' },
    { name: 'Closed', value: data.closedCalls, percentage: data.closedPercentage, color: '#10b981' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 rounded-xl p-6"
    >
      <h3 className="text-xl font-bold text-white mb-4">Conversion Funnel</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={funnelData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              type="number"
              stroke="#9ca3af"
              fontSize={12}
            />
            <YAxis 
              dataKey="name" 
              type="category"
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
              formatter={(value, name) => [value, name]}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {funnelData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default ConversionFunnel
