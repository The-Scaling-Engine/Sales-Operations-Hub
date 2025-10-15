import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const Sparkline = ({ data, color = '#14b8a6', height = 32 }) => {
  const sparklineData = data || [
    { value: 20 }, { value: 25 }, { value: 18 }, { value: 30 }, 
    { value: 22 }, { value: 28 }, { value: 35 }, { value: 32 }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
      style={{ height: `${height}px` }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sparklineData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export default Sparkline
