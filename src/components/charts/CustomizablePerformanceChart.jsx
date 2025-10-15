import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { motion } from 'framer-motion'
import { Settings, TrendingUp, TrendingDown } from 'lucide-react'

const CustomizablePerformanceChart = ({ data, onDateRangeChange }) => {
  const [selectedMetrics, setSelectedMetrics] = useState({
    dials: true,
    sets: true,
    showed: true,
    closed: true
  })
  
  const [isCustomizing, setIsCustomizing] = useState(false)

  // Generate chart data based on filtered data
  const generateChartData = () => {
    if (!data || data.length === 0) return []
    
    // Group data by date and calculate daily metrics
    const dailyData = {}
    
    data.forEach(call => {
      const date = call.date || call.call_date || call.created_at
      if (!date) return
      
      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          dials: 0,
          sets: 0,
          showed: 0,
          closed: 0
        }
      }
      
      // Count dials (all calls)
      dailyData[date].dials++
      
      // Count sets (booked calls)
      if (call.status !== 'Set') {
        dailyData[date].sets++
      }
      
      // Count showed (completed calls)
      if (call.status === 'Completed' || call.status === 'Closed_Won' || call.status === 'Closed_Lost') {
        dailyData[date].showed++
      }
      
      // Count closed (won deals)
      if (call.status === 'Closed_Won') {
        dailyData[date].closed++
      }
    })
    
    // Convert to array and sort by date
    return Object.values(dailyData).sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  const chartData = generateChartData()

  const metricOptions = [
    { key: 'dials', label: 'Dials', color: '#14b8a6', icon: '📞' },
    { key: 'sets', label: 'Sets', color: '#06b6d4', icon: '📈' },
    { key: 'showed', label: 'Showed', color: '#3b82f6', icon: '👥' },
    { key: 'closed', label: 'Closed', color: '#10b981', icon: '🎯' },
  ]

  const toggleMetric = (metric) => {
    setSelectedMetrics(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }))
  }

  // Remove date range handling since it's now handled by the parent

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 rounded-xl p-6"
    >
      {/* Header with Controls */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Performance Trends</h3>
        
        <button
          onClick={() => setIsCustomizing(!isCustomizing)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            isCustomizing 
              ? 'bg-teal-600/30 text-teal-300' 
              : 'bg-teal-900/30 text-gray-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          Customize Metrics
        </button>
      </div>

      {/* Metric Toggle Panel */}
      {isCustomizing && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-4 bg-[#0d2626]/40 rounded-lg border border-teal-900/20"
        >
          <h4 className="text-sm font-medium text-gray-300 mb-3">Select Metrics to Display</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {metricOptions.map((metric) => (
              <button
                key={metric.key}
                onClick={() => toggleMetric(metric.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedMetrics[metric.key]
                    ? 'bg-teal-600/30 text-teal-300 border border-teal-500/30'
                    : 'bg-gray-800/30 text-gray-400 border border-gray-700/30 hover:text-white'
                }`}
              >
                <span>{metric.icon}</span>
                <span>{metric.label}</span>
                {selectedMetrics[metric.key] && <TrendingUp className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9ca3af"
              fontSize={12}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              }}
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
              labelStyle={{ color: '#ffffff' }}
              labelFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })
              }}
            />
            <Legend />
            
            {selectedMetrics.dials && (
              <Line 
                type="monotone" 
                dataKey="dials" 
                stroke="#14b8a6" 
                strokeWidth={3}
                dot={{ fill: '#14b8a6', strokeWidth: 2, r: 4 }}
                name="Dials"
              />
            )}
            {selectedMetrics.sets && (
              <Line 
                type="monotone" 
                dataKey="sets" 
                stroke="#06b6d4" 
                strokeWidth={3}
                dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                name="Sets"
              />
            )}
            {selectedMetrics.showed && (
              <Line 
                type="monotone" 
                dataKey="showed" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                name="Showed"
              />
            )}
            {selectedMetrics.closed && (
              <Line 
                type="monotone" 
                dataKey="closed" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="Closed"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      {chartData.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {metricOptions.map((metric) => {
            if (!selectedMetrics[metric.key]) return null
            
            const latestValue = chartData[chartData.length - 1]?.[metric.key] || 0
            const previousValue = chartData[chartData.length - 2]?.[metric.key] || 0
            const change = latestValue - previousValue
            const changePercent = previousValue > 0 ? Math.round((change / previousValue) * 100) : 0
            
            return (
              <div key={metric.key} className="text-center">
                <div className="text-2xl font-bold text-white">{latestValue}</div>
                <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
                <div className={`flex items-center justify-center gap-1 text-xs ${
                  change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(changePercent)}%
                </div>
              </div>
            )
          })}
        </div>
      )}
      
      {chartData.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-sm">No data available for the selected date range</div>
        </div>
      )}
    </motion.div>
  )
}

export default CustomizablePerformanceChart
