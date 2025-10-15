import { motion } from 'framer-motion'
import { Phone, Users, DollarSign, TrendingUp, Target } from 'lucide-react'

const MetricsBar = ({ metrics }) => {
  const getIconForMetric = (label) => {
    if (label.includes('Calls Due')) return <Phone className="w-5 h-5 text-teal-400" />
    if (label.includes('Unique Leads')) return <Users className="w-5 h-5 text-teal-400" />
    if (label.includes('Revenue')) return <DollarSign className="w-5 h-5 text-teal-400" />
    if (label.includes('Close Rate')) return <Target className="w-5 h-5 text-teal-400" />
    if (label.includes('Set Rate')) return <TrendingUp className="w-5 h-5 text-teal-400" />
    return <DollarSign className="w-5 h-5 text-teal-400" />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 hover:border-teal-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/20 hover:scale-105"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                {metric.label}
              </div>
              {metric.sublabel && (
                <div className="text-sm text-gray-500 mb-3">{metric.sublabel}</div>
              )}
              <div className="text-4xl font-black text-white">{metric.value}</div>
            </div>
            <div className="p-2 bg-teal-600/20 rounded-lg">
              {getIconForMetric(metric.label)}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default MetricsBar

