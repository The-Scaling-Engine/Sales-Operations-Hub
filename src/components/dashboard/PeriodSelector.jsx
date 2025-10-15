import { ChevronDown } from 'lucide-react'

const PeriodSelector = ({ selectedPeriod, onPeriodChange }) => {
  const periods = [
    { value: 'q4-2025', label: 'Q4 2025' },
    { value: 'q3-2025', label: 'Q3 2025' },
    { value: 'q2-2025', label: 'Q2 2025' },
    { value: 'q1-2025', label: 'Q1 2025' },
  ]

  return (
    <div className="relative">
      <select
        value={selectedPeriod}
        onChange={(e) => onPeriodChange(e.target.value)}
        className="w-40 appearance-none bg-[#0d2626] border border-teal-900/30 hover:border-teal-700/50 text-white rounded-lg px-4 py-2.5 pr-10 text-sm font-medium transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500/50"
      >
        {periods.map((period) => (
          <option key={period.value} value={period.value}>
            {period.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  )
}

export default PeriodSelector

