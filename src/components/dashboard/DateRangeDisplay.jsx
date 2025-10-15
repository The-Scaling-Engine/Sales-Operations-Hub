import { motion } from 'framer-motion'
import { Calendar, Clock, TrendingUp } from 'lucide-react'

const DateRangeDisplay = ({ dateRange, customStartDate, customEndDate, filteredDataCount, totalDataCount }) => {
  const getRangeDescription = () => {
    if (dateRange === 'custom' && customStartDate && customEndDate) {
      const start = new Date(customStartDate)
      const end = new Date(customEndDate)
      const startStr = start.toLocaleDateString()
      const endStr = end.toLocaleDateString()
      
      if (startStr === endStr) {
        return `Single day: ${startStr}`
      }
      
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      return `${startStr} - ${endStr} (${diffDays} days)`
    }
    
    const today = new Date()
    const start = new Date()
    
    switch (dateRange) {
      case '7d':
        start.setDate(today.getDate() - 7)
        return `Last 7 days (${start.toLocaleDateString()} - ${today.toLocaleDateString()})`
      case '30d':
        start.setDate(today.getDate() - 30)
        return `Last 30 days (${start.toLocaleDateString()} - ${today.toLocaleDateString()})`
      case '90d':
        start.setDate(today.getDate() - 90)
        return `Last 90 days (${start.toLocaleDateString()} - ${today.toLocaleDateString()})`
      default:
        return 'Custom range'
    }
  }

  const getDataCoverage = () => {
    if (totalDataCount === 0) return 0
    return Math.round((filteredDataCount / totalDataCount) * 100)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#0d2626]/40 backdrop-blur-sm border border-teal-900/20 rounded-lg p-3 mb-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-teal-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Date Range</span>
          </div>
          <div className="text-sm text-gray-300">
            {getRangeDescription()}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {filteredDataCount} of {totalDataCount} records
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getDataCoverage()}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
              />
            </div>
            <span className="text-xs text-gray-400">
              {getDataCoverage()}%
            </span>
          </div>
        </div>
      </div>
      
      {filteredDataCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-2 flex items-center gap-2 text-xs text-gray-400"
        >
          <TrendingUp className="w-3 h-3" />
          <span>Data available for selected period</span>
        </motion.div>
      )}
    </motion.div>
  )
}

export default DateRangeDisplay
