import { motion } from 'framer-motion'

const ExecutiveMetricsCard = ({ percentage, title, achieved, total, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 hover:border-teal-700/50 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/10"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2, type: 'spring' }}
        className="text-7xl font-black bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent mb-4"
      >
        {percentage}%
      </motion.div>
      <div className="text-lg font-medium text-gray-400 mb-2">{title}</div>
      <div className="text-2xl font-bold text-teal-300">
        {achieved} / {total}
      </div>
    </motion.div>
  )
}

export default ExecutiveMetricsCard

