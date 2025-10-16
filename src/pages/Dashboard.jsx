import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { fetchCalls, fetchSalesReps } from '../lib/mockData'
import { fetchEOCs, fetchBookedCalls } from '../lib/api'
import PeriodSelector from '../components/dashboard/PeriodSelector'
import ExecutiveMetricsCard from '../components/dashboard/ExecutiveMetricsCard'
import CallOutcomeCard from '../components/dashboard/CallOutcomeCard'
import AnimatedNumber from '../components/dashboard/AnimatedNumber'
import RecentEOCsTable from '../components/dashboard/RecentEOCsTable'
import RecentBookedCallsTable from '../components/dashboard/RecentBookedCallsTable'
import CustomizablePerformanceChart from '../components/charts/CustomizablePerformanceChart'
import ConversionFunnel from '../components/charts/ConversionFunnel'
import RevenueChart from '../components/charts/RevenueChart'
import CallOutcomeChart from '../components/charts/CallOutcomeChart'
import Sparkline from '../components/charts/Sparkline'
import DateRangeSelector from '../components/dashboard/DateRangeSelector'
import DateRangeDisplay from '../components/dashboard/DateRangeDisplay'
import { useDateFilter } from '../hooks/useDateFilter'
import { Phone, Users, DollarSign, TrendingUp, Target, Calendar, ChevronDown } from 'lucide-react'

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('q4-2025')
  const [viewMode, setViewMode] = useState('team') // 'team' or 'individual'
  const [selectedRep, setSelectedRep] = useState('all') // 'all' or specific rep ID

  // Fetch calls data
  const { data: calls = [], isLoading } = useQuery({
    queryKey: ['calls'],
    queryFn: fetchCalls,
  })

  // Fetch sales reps data
  const { data: salesReps = [] } = useQuery({
    queryKey: ['salesReps'],
    queryFn: fetchSalesReps,
  })

  // Fetch recent EOCs
  const { data: eocs = [], isLoading: eocsLoading } = useQuery({
    queryKey: ['eocs'],
    queryFn: () => fetchEOCs(10),
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  // Fetch recent booked calls
  const { data: bookedCalls = [], isLoading: bookedCallsLoading } = useQuery({
    queryKey: ['bookedCalls'],
    queryFn: () => fetchBookedCalls(10),
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  // Date filtering
  const {
    dateRange,
    setDateRange,
    customStartDate,
    setCustomStartDate,
    customEndDate,
    setCustomEndDate,
    filteredData: dateFilteredData,
    dateRangeOptions
  } = useDateFilter(calls, '7d')

  // Apply additional filtering based on view mode and selected rep
  const filteredData = dateFilteredData.filter(call => {
    if (viewMode === 'team') {
      return true // Show all data for team view
    } else if (viewMode === 'individual') {
      if (selectedRep === 'all') {
        return true // Show all data for individual view when "All Reps" is selected
      } else {
        return call.sales_rep_id === selectedRep // Filter by specific rep
      }
    }
    return true
  })

  if (isLoading) {
    return (
      <div className="space-y-12 animate-pulse">
        <div className="h-12 bg-[#0d2626] rounded-xl w-1/3"></div>
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-[#0d2626] rounded-xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-[#0d2626] rounded-xl"></div>
          ))}
        </div>
      </div>
    )
  }

  // Calculate metrics based on filtered data
  const totalCalls = filteredData.length
  const bookedCalls = filteredData.filter(c => c.status !== 'Set').length
  const showedCalls = filteredData.filter(c => c.status === 'Completed' || c.status === 'Closed_Won' || c.status === 'Closed_Lost').length
  const closedCalls = filteredData.filter(c => c.status === 'Closed_Won').length

  const bookedPercentage = totalCalls > 0 ? Math.round((bookedCalls / totalCalls) * 100) : 0
  const showedPercentage = bookedCalls > 0 ? Math.round((showedCalls / bookedCalls) * 100) : 0
  const closedPercentage = showedCalls > 0 ? Math.round((closedCalls / showedCalls) * 100) : 0

  // Calculate revenue based on filtered data
  const totalRevenue = filteredData
    .filter(c => c.status === 'Closed_Won')
    .reduce((sum, call) => sum + call.deal_value, 0)

  // Calculate rates
  const overallCloseRate = showedCalls > 0 ? Math.round((closedCalls / showedCalls) * 100) : 0
  const overallSetRate = totalCalls > 0 ? Math.round((bookedCalls / totalCalls) * 100) : 0

  // Call outcome data based on filtered data
  const successfulDemos = filteredData.filter(c => c.status === 'Closed_Won').length
  const followUpScheduled = filteredData.filter(c => c.status === 'Completed').length
  const noAnswer = filteredData.filter(c => c.status === 'Booked').length
  const notInterested = filteredData.filter(c => c.status === 'Set').length
  const closedLost = filteredData.filter(c => c.status === 'Closed_Lost').length

  // Chart data
  const chartData = {
    totalCalls,
    bookedCalls,
    showedCalls,
    closedCalls,
    totalRevenue,
    bookedPercentage,
    showedPercentage,
    closedPercentage,
    successfulDemos,
    followUpScheduled,
    noAnswer,
    notInterested,
    closedLost
  }

  const outcomeTotal = successfulDemos + followUpScheduled + noAnswer + notInterested + closedLost

  const callOutcomes = [
    {
      title: 'Successful Demos',
      count: successfulDemos,
      percentage: outcomeTotal > 0 ? Math.round((successfulDemos / outcomeTotal) * 100) : 0,
      color: 'green',
    },
    {
      title: 'Follow-up Scheduled',
      count: followUpScheduled,
      percentage: outcomeTotal > 0 ? Math.round((followUpScheduled / outcomeTotal) * 100) : 0,
      color: 'yellow',
    },
    {
      title: 'No Answer',
      count: noAnswer,
      percentage: outcomeTotal > 0 ? Math.round((noAnswer / outcomeTotal) * 100) : 0,
      color: 'orange',
    },
    {
      title: 'Not Interested',
      count: notInterested,
      percentage: outcomeTotal > 0 ? Math.round((notInterested / outcomeTotal) * 100) : 0,
      color: 'red',
    },
    {
      title: 'Closed Lost',
      count: closedLost,
      percentage: outcomeTotal > 0 ? Math.round((closedLost / outcomeTotal) * 100) : 0,
      color: 'red',
    },
  ]

  // Helper function to get current date range display
  const getCurrentDateRange = () => {
    if (dateRange === 'custom') {
      return `${customStartDate} - ${customEndDate}`
    }
    const option = dateRangeOptions.find(opt => opt.value === dateRange)
    return option ? option.label : 'Last 7 days'
  }

  return (
    <div className="space-y-16">
      {/* Single Row Header - All Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-5xl font-black text-transparent bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text">
          Operations Summary
        </h1>
        
        <div className="flex items-center gap-4">
          {/* Date Range Selector */}
          <DateRangeSelector
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            customStartDate={customStartDate}
            setCustomStartDate={setCustomStartDate}
            customEndDate={customEndDate}
            setCustomEndDate={setCustomEndDate}
            dateRangeOptions={dateRangeOptions}
          />
          
          {/* Team/Individual Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">View:</span>
            <div className="inline-flex bg-[#0d2626]/80 backdrop-blur-md rounded-xl p-1.5 border border-teal-900/30 shadow-lg shadow-teal-900/20">
          <button
            onClick={() => setViewMode('team')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'team'
                ? 'bg-teal-600/30 text-teal-300 shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
                👥 Team
          </button>
          <button
            onClick={() => setViewMode('individual')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'individual'
                ? 'bg-teal-600/30 text-teal-300 shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
                👤 Individual
          </button>
            </div>
          </div>

          {/* Individual Mode - Sales Rep Selector */}
          {viewMode === 'individual' && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Rep:</span>
              <select 
                value={selectedRep}
                onChange={(e) => setSelectedRep(e.target.value)}
                className="bg-[#0d2626] border border-teal-900/30 rounded-lg px-3 py-2 text-white text-sm focus:border-teal-500 focus:outline-none"
              >
                <option value="all">All Reps</option>
                {salesReps.map(rep => (
                  <option key={rep.id} value={rep.id}>{rep.full_name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Period Selector */}
          {/* <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} /> */}
        </div>
      </motion.div>

      {/* Compact Date Range Info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center gap-4 text-sm text-gray-400"
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-teal-400" />
          <span>{getCurrentDateRange()}</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-teal-400" />
          <span>{filteredData.length} records</span>
        </div>
        {viewMode === 'individual' && selectedRep !== 'all' && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-400" />
            <span>{salesReps.find(rep => rep.id === selectedRep)?.full_name}</span>
          </div>
        )}
      </motion.div>

      {/* Row 1: Core Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 hover:border-teal-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/20 hover:scale-105"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Dials</div>
            <div className="p-2 bg-teal-600/20 rounded-lg">
              <Phone className="w-4 h-4 text-teal-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mb-2">
            <AnimatedNumber value={totalCalls} />
          </div>
          <div className="text-xs text-gray-500 mb-2">from Q4 2025</div>
          <Sparkline 
            data={[
              { value: 20 }, { value: 25 }, { value: 18 }, { value: 30 }, 
              { value: 22 }, { value: 28 }, { value: 35 }, { value: 32 }
            ]} 
            color="#14b8a6" 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 hover:border-teal-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/20 hover:scale-105"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Sets</div>
            <div className="p-2 bg-teal-600/20 rounded-lg">
              <TrendingUp className="w-4 h-4 text-teal-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mb-2">
            <AnimatedNumber value={bookedCalls} />
          </div>
          <div className="text-xs text-gray-500 mb-2">from Q4 2025</div>
          <Sparkline 
            data={[
              { value: 15 }, { value: 18 }, { value: 12 }, { value: 22 }, 
              { value: 16 }, { value: 20 }, { value: 25 }, { value: 23 }
            ]} 
            color="#06b6d4" 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 hover:border-teal-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/20 hover:scale-105"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Showed</div>
            <div className="p-2 bg-teal-600/20 rounded-lg">
              <Users className="w-4 h-4 text-teal-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mb-2">
            <AnimatedNumber value={showedCalls} />
          </div>
          <div className="text-xs text-gray-500">from Q4 2025</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 hover:border-teal-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/20 hover:scale-105"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Closed</div>
            <div className="p-2 bg-teal-600/20 rounded-lg">
              <Target className="w-4 h-4 text-teal-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mb-2">
            <AnimatedNumber value={closedCalls} />
          </div>
          <div className="text-xs text-gray-500">from Q4 2025</div>
        </motion.div>
      </div>

      

      {/* Row 2: Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 hover:border-teal-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/20 hover:scale-105"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Set Rate</div>
            <div className="p-2 bg-teal-600/20 rounded-lg">
              <TrendingUp className="w-4 h-4 text-teal-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mb-2">
            {overallSetRate}%
          </div>
          <div className="text-xs text-gray-500">from Q4 2025</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 hover:border-teal-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/20 hover:scale-105"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Show Rate</div>
            <div className="p-2 bg-teal-600/20 rounded-lg">
              <Users className="w-4 h-4 text-teal-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mb-2">
            {showedPercentage}%
          </div>
          <div className="text-xs text-gray-500">from Q4 2025</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 hover:border-teal-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/20 hover:scale-105"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Close Rate</div>
            <div className="p-2 bg-teal-600/20 rounded-lg">
              <Target className="w-4 h-4 text-teal-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mb-2">
            {overallCloseRate}%
          </div>
          <div className="text-xs text-gray-500">from Q4 2025</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 hover:border-teal-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/20 hover:scale-105"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Avg Deal Value</div>
            <div className="p-2 bg-teal-600/20 rounded-lg">
              <DollarSign className="w-4 h-4 text-teal-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mb-2">
            ${closedCalls > 0 ? Math.round(totalRevenue / closedCalls).toLocaleString() : 0}
          </div>
          <div className="text-xs text-gray-500">from Q4 2025</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 hover:border-teal-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/20 hover:scale-105"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Revenue</div>
            <div className="p-2 bg-teal-600/20 rounded-lg">
              <DollarSign className="w-4 h-4 text-teal-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mb-2">
            $<AnimatedNumber value={totalRevenue} />
          </div>
          <div className="text-xs text-gray-500 mb-2">from Q4 2025</div>
          <Sparkline 
            data={[
              { value: 5000 }, { value: 7500 }, { value: 4200 }, { value: 9200 }, 
              { value: 6800 }, { value: 8500 }, { value: 12000 }, { value: 11000 }
            ]} 
            color="#10b981" 
          />
        </motion.div>
        
      </div>

      {/* Recent EOCs Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-4"
      >
        <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
        <h2 className="text-3xl font-black text-transparent bg-gradient-to-r from-white to-teal-200 bg-clip-text">
          Recent End-of-Call Reports
        </h2>
        <div className="h-1 flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent rounded-full"></div>
      </motion.div>
      <RecentEOCsTable eocs={eocs} />

      {/* Recent Booked Calls Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center gap-4 mb-4"
      >
        <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
        <h2 className="text-3xl font-black text-transparent bg-gradient-to-r from-white to-teal-200 bg-clip-text">
          Recent Booked Appointments
        </h2>
        <div className="h-1 flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent rounded-full"></div>
      </motion.div>
      <RecentBookedCallsTable bookedCalls={bookedCalls} />

      {/* Performance Trends Chart */}
      <CustomizablePerformanceChart 
        data={filteredData} 
        onDateRangeChange={setDateRange}
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConversionFunnel data={chartData} />
        <RevenueChart data={chartData} />
      </div>

      {/* Call Outcome Chart */}
      <CallOutcomeChart data={chartData} />

      {/* Row 3: Conversion Metrics */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 hover:border-teal-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/20 hover:scale-105"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Dial to Set</div>
            <div className="p-2 bg-teal-600/20 rounded-lg">
              <TrendingUp className="w-4 h-4 text-teal-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mb-2">
            {bookedPercentage}%
          </div>
          <div className="text-xs text-gray-500">from Q4 2025</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 hover:border-teal-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/20 hover:scale-105"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Set to Show</div>
            <div className="p-2 bg-teal-600/20 rounded-lg">
              <Users className="w-4 h-4 text-teal-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mb-2">
            {showedPercentage}%
          </div>
          <div className="text-xs text-gray-500">from Q4 2025</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 hover:border-teal-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/20 hover:scale-105"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Show to Close</div>
            <div className="p-2 bg-teal-600/20 rounded-lg">
              <Target className="w-4 h-4 text-teal-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mb-2">
            {closedPercentage}%
          </div>
          <div className="text-xs text-gray-500">from Q4 2025</div>
        </motion.div>

        
      </div> */}


      {/* Call Outcome Division */}
      {/* <div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
          <h2 className="text-3xl font-black text-transparent bg-gradient-to-r from-white to-teal-200 bg-clip-text">
            Call Outcome Division
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent rounded-full"></div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {callOutcomes.map((outcome, index) => (
            <CallOutcomeCard
              key={outcome.title}
              title={outcome.title}
              count={outcome.count}
              percentage={outcome.percentage}
              color={outcome.color}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div> */}
    </div>
  )
}

export default Dashboard

