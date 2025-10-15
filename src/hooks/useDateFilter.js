import { useState, useMemo } from 'react'

export const useDateFilter = (data, initialRange = '7d') => {
  const [dateRange, setDateRange] = useState(initialRange)
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')

  const getDateRange = () => {
    const now = new Date()
    const start = new Date()
    
    switch (dateRange) {
      case '7d':
        start.setDate(now.getDate() - 7)
        break
      case '30d':
        start.setDate(now.getDate() - 30)
        break
      case '90d':
        start.setDate(now.getDate() - 90)
        break
      case 'custom':
        if (customStartDate && customEndDate) {
          return {
            start: new Date(customStartDate),
            end: new Date(customEndDate)
          }
        }
        // Fallback to last 7 days if custom dates not set
        start.setDate(now.getDate() - 7)
        break
      default:
        start.setDate(now.getDate() - 7)
    }
    
    return { start, end: now }
  }

  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return []
    
    const { start, end } = getDateRange()
    
    return data.filter(item => {
      const itemDate = new Date(item.date || item.created_at || item.timestamp)
      return itemDate >= start && itemDate <= end
    })
  }, [data, dateRange, customStartDate, customEndDate])

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' }
  ]

  const setDateRangeWithCallback = (range, callback) => {
    setDateRange(range)
    if (callback) {
      setTimeout(() => callback(range), 100)
    }
  }

  return {
    dateRange,
    setDateRange: setDateRangeWithCallback,
    customStartDate,
    setCustomStartDate,
    customEndDate,
    setCustomEndDate,
    filteredData,
    dateRangeOptions,
    getDateRange
  }
}
