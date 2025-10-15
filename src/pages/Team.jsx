import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Plus, Phone, DollarSign, TrendingUp } from 'lucide-react'
import { fetchSalesReps, fetchCalls } from '../lib/mockData'
import AddEmployeeModal from '../components/dashboard/AddEmployeeModal'
import { format } from 'date-fns'

const Team = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [localReps, setLocalReps] = useState([])

  const { data: fetchedReps = [], isLoading: repsLoading } = useQuery({
    queryKey: ['salesReps'],
    queryFn: fetchSalesReps,
  })

  const { data: calls = [], isLoading: callsLoading } = useQuery({
    queryKey: ['calls'],
    queryFn: fetchCalls,
  })

  const salesReps = [...fetchedReps, ...localReps]

  const statusColors = {
    Active: 'bg-green-500/20 text-green-400',
    Onboarding: 'bg-blue-500/20 text-blue-400',
    Inactive: 'bg-gray-500/20 text-gray-400',
  }

  const handleAddRep = (newRep) => {
    setLocalReps([...localReps, newRep])
  }

  const getRepStats = (repId) => {
    const repCalls = calls.filter(c => c.sales_rep_id === repId)
    const totalCalls = repCalls.length
    const closedDeals = repCalls.filter(c => c.status === 'Closed_Won').length
    const revenue = repCalls
      .filter(c => c.status === 'Closed_Won')
      .reduce((sum, call) => sum + call.deal_value, 0)

    return { totalCalls, closedDeals, revenue }
  }

  if (repsLoading || callsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Sales Team</h1>
          <p className="text-gray-400 text-lg">Manage your sales representatives</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Rep</span>
        </button>
      </motion.div>

      {/* Sales Reps Grid */}
      {salesReps.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0d2626] border border-teal-900/30 rounded-2xl p-12 text-center"
        >
          <p className="text-gray-400 text-lg mb-4">No sales reps yet</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-lg transition-all"
          >
            Add Your First Rep
          </button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salesReps.map((rep, index) => {
            const stats = getRepStats(rep.id)
            const initials = rep.full_name
              .split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase()

            return (
              <motion.div
                key={rep.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0d2626] border border-teal-900/30 hover:border-teal-700/50 rounded-xl p-6 transition-all"
              >
                {/* Avatar and Info */}
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">{initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white mb-1 truncate">
                      {rep.full_name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">{rep.position}</p>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusColors[rep.status] || statusColors.Active
                        }`}
                      >
                        {rep.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hire Date */}
                <div className="mb-6 pb-6 border-b border-teal-900/30">
                  <p className="text-sm text-gray-500">Hire Date</p>
                  <p className="text-white font-medium">
                    {format(new Date(rep.hire_date), 'MMM dd, yyyy')}
                  </p>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">Total Calls</span>
                    </div>
                    <span className="text-white font-bold">{stats.totalCalls}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">Closed Deals</span>
                    </div>
                    <span className="text-teal-300 font-bold">{stats.closedDeals}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">Revenue Generated</span>
                    </div>
                    <span className="text-green-400 font-bold">
                      ${stats.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 pt-6 border-t border-teal-900/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Revenue Target</span>
                    <span className="text-sm text-white font-medium">
                      {Math.round((stats.revenue / rep.target_revenue) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-teal-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-500"
                      style={{
                        width: `${Math.min((stats.revenue / rep.target_revenue) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    ${stats.revenue.toLocaleString()} / ${rep.target_revenue.toLocaleString()}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddRep}
      />
    </div>
  )
}

export default Team

