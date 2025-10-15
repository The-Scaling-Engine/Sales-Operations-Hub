import { motion } from 'framer-motion'

const CallOutcomeCard = ({ title, count, percentage, color, delay = 0 }) => {
  const colorMap = {
    green: {
      bar: 'bg-green-500',
      text: 'text-green-400',
    },
    yellow: {
      bar: 'bg-yellow-500',
      text: 'text-yellow-400',
    },
    orange: {
      bar: 'bg-orange-500',
      text: 'text-orange-400',
    },
    red: {
      bar: 'bg-red-500',
      text: 'text-red-400',
    },
  }

  const colors = colorMap[color] || colorMap.green

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 hover:border-teal-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/20 hover:scale-105"
    >
      <div className="text-sm text-gray-400 mb-3 uppercase tracking-wider">{title}</div>
      <div className="text-4xl font-black text-white mb-4">{count}</div>
      <div className="space-y-2">
        <div className="h-2 bg-teal-950 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: delay + 0.3 }}
            className={`h-full ${colors.bar} shadow-lg`}
          />
        </div>
        <div className={`text-sm font-bold ${colors.text} text-right`}>{percentage}%</div>
      </div>
    </motion.div>
  )
}

export default CallOutcomeCard

