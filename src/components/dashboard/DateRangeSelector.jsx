import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ChevronDown, Clock, CalendarDays, CalendarRange } from 'lucide-react'

const DateRangeSelector = ({ 
  dateRange, 
  onDateRangeChange, 
  customStartDate, 
  setCustomStartDate, 
  customEndDate, 
  setCustomEndDate,
  dateRangeOptions 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showCustom, setShowCustom] = useState(false)
  const [presetRange, setPresetRange] = useState('')
  const [timeRange, setTimeRange] = useState('days')
  const [timeValue, setTimeValue] = useState(7)

  useEffect(() => {
    if (dateRange === 'custom') {
      setShowCustom(true)
    } else {
      setShowCustom(false)
    }
  }, [dateRange])

  const handleRangeSelect = (range) => {
    onDateRangeChange(range)
    if (range === 'custom') {
      setShowCustom(true)
    } else {
      setShowCustom(false)
    }
    setIsOpen(false)
  }

  const handlePresetRange = (preset) => {
    setPresetRange(preset)
    const today = new Date()
    let startDate = new Date()
    
    switch (preset) {
      case 'today':
        startDate = new Date(today)
        break
      case 'yesterday':
        startDate = new Date(today)
        startDate.setDate(today.getDate() - 1)
        break
      case 'thisWeek':
        startDate = new Date(today)
        startDate.setDate(today.getDate() - today.getDay())
        break
      case 'lastWeek':
        startDate = new Date(today)
        startDate.setDate(today.getDate() - today.getDay() - 7)
        break
      case 'thisMonth':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1)
        break
      case 'lastMonth':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        break
      case 'thisQuarter':
        const quarter = Math.floor(today.getMonth() / 3)
        startDate = new Date(today.getFullYear(), quarter * 3, 1)
        break
      case 'lastQuarter':
        const lastQuarter = Math.floor(today.getMonth() / 3) - 1
        const lastQuarterYear = lastQuarter < 0 ? today.getFullYear() - 1 : today.getFullYear()
        const lastQuarterMonth = lastQuarter < 0 ? 9 : lastQuarter * 3
        startDate = new Date(lastQuarterYear, lastQuarterMonth, 1)
        break
      case 'thisYear':
        startDate = new Date(today.getFullYear(), 0, 1)
        break
      case 'lastYear':
        startDate = new Date(today.getFullYear() - 1, 0, 1)
        break
    }
    
    const endDate = preset === 'today' || preset === 'yesterday' ? startDate : today
    
    setCustomStartDate(startDate.toISOString().split('T')[0])
    setCustomEndDate(endDate.toISOString().split('T')[0])
    onDateRangeChange('custom')
  }

  const handleTimeRangeChange = () => {
    const today = new Date()
    const startDate = new Date()
    
    if (timeRange === 'days') {
      startDate.setDate(today.getDate() - timeValue)
    } else if (timeRange === 'weeks') {
      startDate.setDate(today.getDate() - (timeValue * 7))
    } else if (timeRange === 'months') {
      startDate.setMonth(today.getMonth() - timeValue)
    }
    
    setCustomStartDate(startDate.toISOString().split('T')[0])
    setCustomEndDate(today.toISOString().split('T')[0])
    onDateRangeChange('custom')
  }

  const getCurrentLabel = () => {
    if (dateRange === 'custom') {
      if (customStartDate && customEndDate) {
        const start = new Date(customStartDate).toLocaleDateString()
        const end = new Date(customEndDate).toLocaleDateString()
        return start === end ? start : `${start} - ${end}`
      }
      return 'Custom range'
    }
    return dateRangeOptions.find(option => option.value === dateRange)?.label || 'Select range'
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-[#0d2626] border border-teal-900/30 rounded-lg text-white hover:border-teal-500 transition-colors"
      >
        <Calendar className="w-4 h-4 text-teal-400" />
        <span className="text-sm">{getCurrentLabel()}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 mt-2 w-80 bg-[#0d2626] border border-teal-900/30 rounded-lg shadow-xl z-50"
        >
          <div className="p-4">
            <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
              <CalendarRange className="w-4 h-4 text-teal-400" />
              Customize Date Range
            </h4>
            
            {/* Quick Range Options */}
            <div className="mb-4">
              <h5 className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                <CalendarDays className="w-3 h-3" />
                Quick Presets
              </h5>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'today', label: 'Today' },
                  { key: 'yesterday', label: 'Yesterday' },
                  { key: 'thisWeek', label: 'This Week' },
                  { key: 'lastWeek', label: 'Last Week' },
                  { key: 'thisMonth', label: 'This Month' },
                  { key: 'lastMonth', label: 'Last Month' },
                  { key: 'thisQuarter', label: 'This Quarter' },
                  { key: 'lastQuarter', label: 'Last Quarter' },
                  { key: 'thisYear', label: 'This Year' },
                  { key: 'lastYear', label: 'Last Year' }
                ].map((preset) => (
                  <button
                    key={preset.key}
                    onClick={() => handlePresetRange(preset.key)}
                    className={`px-3 py-2 rounded-lg text-xs transition-all ${
                      presetRange === preset.key
                        ? 'bg-teal-600/30 text-teal-300'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Range Selector */}
            <div className="mb-4">
              <h5 className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Relative Time Range
              </h5>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={timeValue}
                  onChange={(e) => setTimeValue(parseInt(e.target.value) || 1)}
                  min="1"
                  max="365"
                  className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-teal-500 focus:outline-none"
                />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-teal-500 focus:outline-none"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
                <button
                  onClick={handleTimeRangeChange}
                  className="px-3 py-1 bg-teal-600/20 text-teal-300 rounded text-xs hover:bg-teal-600/30 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Custom Date Inputs */}
            <div className="border-t border-gray-700 pt-4">
              <h5 className="text-xs text-gray-400 mb-2">Exact Date Range</h5>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">End Date</label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-teal-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => {
                    onDateRangeChange('custom')
                    setIsOpen(false)
                  }}
                  className="w-full px-3 py-2 bg-teal-600/20 text-teal-300 rounded-lg text-sm hover:bg-teal-600/30 transition-colors"
                >
                  Apply Custom Range
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default DateRangeSelector
