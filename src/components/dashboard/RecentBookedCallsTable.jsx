import { motion } from 'framer-motion';
import { Calendar, User, Mail, Phone as PhoneIcon, Clock, MapPin, Video, CheckCircle2 } from 'lucide-react';

const RecentBookedCallsTable = ({ bookedCalls = [] }) => {
  // Helper function to get status badge styling
  const getStatusBadge = (status) => {
    const statusStyles = {
      'booked': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', icon: '✓' },
      'confirmed': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', icon: '✓' },
      'cancelled': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', icon: '✗' },
      'rescheduled': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: '↻' },
      'pending': { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/30', icon: '○' },
    };
    
    return statusStyles[status?.toLowerCase()] || { bg: 'bg-teal-500/20', text: 'text-teal-400', border: 'border-teal-500/30', icon: '●' };
  };

  // Format date and time
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (bookedCalls.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#0d2626]/60 backdrop-blur-md border border-teal-900/30 rounded-xl p-12 text-center"
      >
        <Calendar className="w-16 h-16 text-teal-400/30 mx-auto mb-4" />
        <p className="text-gray-400 text-lg">No booked calls yet</p>
        <p className="text-gray-500 text-sm mt-2">Booked calls will appear here once appointments are scheduled</p>
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
              <Calendar className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Recent Booked Calls</h3>
              <p className="text-sm text-gray-400">Latest appointments scheduled</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Showing {bookedCalls.length} recent {bookedCalls.length === 1 ? 'appointment' : 'appointments'}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#0a1f1f]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Appointment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Scheduled For
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Assigned To
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-teal-900/20">
            {bookedCalls.map((call, index) => {
              const statusBadge = getStatusBadge(call.calendar?.calendarAppointmentStatus);
              const startTime = call.calendar?.calendarStartTime;
              const endTime = call.calendar?.calendarEndTime;
              
              // Calculate duration
              let duration = 'N/A';
              if (startTime && endTime) {
                const start = new Date(startTime);
                const end = new Date(endTime);
                const mins = Math.round((end - start) / (1000 * 60));
                duration = `${mins} min`;
              }

              return (
                <motion.tr
                  key={call._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-teal-900/10 transition-colors"
                >
                  {/* Appointment Info */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-teal-400" />
                        <span className="text-sm font-medium text-white">
                          {call.calendar?.calendarCalendarName || call.calendar?.calendarTitle || 'N/A'}
                        </span>
                      </div>
                      {call.calendar?.calendarAddress && (
                        <div className="flex items-center gap-2 mt-1">
                          <Video className="w-3 h-3 text-gray-500" />
                          <a 
                            href={call.calendar.calendarAddress} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-teal-400 hover:text-teal-300 truncate max-w-[200px]"
                          >
                            Join meeting
                          </a>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-teal-400" />
                        <span className="text-sm font-medium text-white">{call.fullName || 'N/A'}</span>
                      </div>
                      {call.email && (
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-400">{call.email}</span>
                        </div>
                      )}
                      {call.phone && (
                        <div className="flex items-center gap-2 mt-1">
                          <PhoneIcon className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-400">{call.phone}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Scheduled For */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-teal-400" />
                        <span className="text-sm text-gray-300">{formatDateTime(startTime)}</span>
                      </div>
                      {call.calendar?.calendarSelectedTimezone && (
                        <span className="text-xs text-gray-500 mt-1">
                          {call.calendar.calendarSelectedTimezone}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Duration */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-300">{duration}</span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                      <span>{statusBadge.icon}</span>
                      {call.calendar?.calendarAppointmentStatus || 'N/A'}
                    </span>
                  </td>

                  {/* Assigned To */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      {call.user?.userFirstName || call.user?.userLastName ? (
                        <>
                          <span className="text-sm text-gray-300">
                            {call.user.userFirstName} {call.user.userLastName}
                          </span>
                          {call.user.userEmail && (
                            <span className="text-xs text-gray-500">{call.user.userEmail}</span>
                          )}
                        </>
                      ) : (
                        <span className="text-sm text-gray-400">Unassigned</span>
                      )}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {bookedCalls.length > 0 && (
        <div className="px-6 py-4 border-t border-teal-900/30 bg-[#0a1f1f]/50">
          <p className="text-xs text-gray-500 text-center">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default RecentBookedCallsTable;

