import { motion } from 'framer-motion'
import { FileText, TrendingUp, BarChart3, PieChart } from 'lucide-react'

const Reports = () => {
  const reportTypes = [
    {
      icon: TrendingUp,
      title: 'Sales Performance',
      description: 'Analyze sales trends and performance metrics',
    },
    {
      icon: BarChart3,
      title: 'Revenue Analytics',
      description: 'Track revenue growth and forecasting',
    },
    {
      icon: PieChart,
      title: 'Pipeline Analysis',
      description: 'View sales pipeline and conversion rates',
    },
    {
      icon: FileText,
      title: 'Custom Reports',
      description: 'Create and export custom reports',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">Reports</h1>
        <p className="text-gray-400 text-lg">Generate and view detailed sales reports</p>
      </motion.div>

      {/* Report Types Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {reportTypes.map((report, index) => {
          const Icon = report.icon
          return (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0d2626] border border-teal-900/30 hover:border-teal-700/50 rounded-xl p-8 cursor-pointer transition-all group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-teal-600/20 rounded-lg flex items-center justify-center group-hover:bg-teal-600/30 transition-all">
                  <Icon className="w-7 h-7 text-teal-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{report.title}</h3>
                  <p className="text-gray-400">{report.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Coming Soon Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-[#0d2626] border border-teal-900/30 rounded-xl p-12 text-center"
      >
        <FileText className="w-16 h-16 text-teal-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Advanced Reports Coming Soon</h2>
        <p className="text-gray-400">
          We're working on bringing you comprehensive reporting tools
        </p>
      </motion.div>
    </div>
  )
}

export default Reports

