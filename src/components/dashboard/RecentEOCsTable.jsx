import { motion } from 'framer-motion';
import { Phone, Calendar, User, Mail, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';

const RecentEOCsTable = ({ eocs = [] }) => {
  // Helper function to get outcome badge styling
  const getOutcomeBadge = (outcome) => {
    const outcomeStyles = {
      'No Show': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
      'Booked': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
      'Closed': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
      'Follow Up': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
      'Not Interested': { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/30' },
    };
    
    return outcomeStyles[outcome] || { bg: 'bg-teal-500/20', text: 'text-teal-400', border: 'border-teal-500/30' };
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (eocs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 rounded-xl p-12 text-center"
      >
        <Phone className="w-16 h-16 text-teal-400/30 mx-auto mb-4" />
        <p className="text-gray-400 text-lg">No EOCs recorded yet</p>
        <p className="text-gray-500 text-sm mt-2">EOCs will appear here once they are submitted via webhook</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-teal-900/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-600/20 rounded-lg">
              <Phone className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Recent EOCs</h3>
              <p className="text-sm text-gray-400">Latest end-of-call summaries</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Showing {eocs.length} recent {eocs.length === 1 ? 'entry' : 'entries'}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#0a1f1f]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Closer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Calendar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Outcome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Objections
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-teal-900/20">
            {eocs.map((eoc, index) => {
              const badge = getOutcomeBadge(eoc.callOutcome);
              return (
                <motion.tr
                  key={eoc._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-teal-900/10 transition-colors"
                >
                  {/* Date */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal-400" />
                      <span className="text-sm text-gray-300">{formatDate(eoc.dateOfCall)}</span>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-teal-400" />
                        <span className="text-sm font-medium text-white">{eoc.fullName || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-400">{eoc.emailAddress || 'N/A'}</span>
                      </div>
                      {eoc.phoneNumber && (
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-400">{eoc.phoneNumber}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Closer */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-300">{eoc.closer || 'N/A'}</span>
                  </td>

                  {/* Calendar */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-300">{eoc.calendar || 'N/A'}</span>
                  </td>

                  {/* Outcome */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
                      {eoc.callOutcome || 'N/A'}
                    </span>
                  </td>

                  {/* Objections */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">
                      {eoc.objections || 'None'}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {eocs.length > 0 && (
        <div className="px-6 py-4 border-t border-teal-900/30 bg-[#0a1f1f]/50">
          <p className="text-xs text-gray-500 text-center">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default RecentEOCsTable;

