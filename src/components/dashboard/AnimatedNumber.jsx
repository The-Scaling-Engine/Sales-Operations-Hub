import { useEffect, useState } from 'react'

const AnimatedNumber = ({ value, className = '', prefix = '', suffix = '', decimals = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]/g, '')) : value
    
    if (isNaN(numValue)) {
      setDisplayValue(value)
      return
    }
    
    let start = 0
    const end = numValue
    const duration = 1500
    const increment = end / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setDisplayValue(end)
        clearInterval(timer)
      } else {
        setDisplayValue(start)
      }
    }, 16)
    
    return () => clearInterval(timer)
  }, [value])
  
  const formatValue = (val) => {
    if (typeof val === 'string') return val
    const formatted = decimals > 0 ? val.toFixed(decimals) : Math.floor(val)
    return typeof formatted === 'number' ? formatted.toLocaleString() : formatted
  }
  
  return <span className={className}>{prefix}{formatValue(displayValue)}{suffix}</span>
}

export default AnimatedNumber
