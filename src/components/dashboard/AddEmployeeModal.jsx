import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const AddEmployeeModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    position: 'Closer',
    hire_date: new Date().toISOString().split('T')[0],
    status: 'Active',
    target_revenue: '',
    current_revenue: '0',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({
      ...formData,
      id: Date.now().toString(),
      target_revenue: parseFloat(formData.target_revenue) || 0,
      current_revenue: parseFloat(formData.current_revenue) || 0,
    })
    setFormData({
      full_name: '',
      position: 'Closer',
      hire_date: new Date().toISOString().split('T')[0],
      status: 'Active',
      target_revenue: '',
      current_revenue: '0',
    })
    onClose()
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#0d2626] border border-teal-900/30 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Add New Sales Rep</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a1f1f] border border-teal-900/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Position
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full bg-[#0a1f1f] border border-teal-900/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  >
                    <option value="Closer">Closer</option>
                    <option value="Setter">Setter</option>
                    <option value="Senior Closer">Senior Closer</option>
                    <option value="Lead Setter">Lead Setter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Hire Date
                  </label>
                  <input
                    type="date"
                    name="hire_date"
                    value={formData.hire_date}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a1f1f] border border-teal-900/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-[#0a1f1f] border border-teal-900/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  >
                    <option value="Active">Active</option>
                    <option value="Onboarding">Onboarding</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Target Revenue
                  </label>
                  <input
                    type="number"
                    name="target_revenue"
                    value={formData.target_revenue}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a1f1f] border border-teal-900/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Current Revenue
                  </label>
                  <input
                    type="number"
                    name="current_revenue"
                    value={formData.current_revenue}
                    onChange={handleChange}
                    className="w-full bg-[#0a1f1f] border border-teal-900/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 border border-teal-900/30 text-gray-400 rounded-lg hover:text-white hover:border-teal-700/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-lg transition-all"
                  >
                    Add Rep
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AddEmployeeModal

