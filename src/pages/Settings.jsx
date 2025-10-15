import { motion } from 'framer-motion'
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react'

const Settings = () => {
  const settingsSections = [
    {
      icon: User,
      title: 'Profile Settings',
      description: 'Manage your account and personal information',
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure notification preferences',
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Manage password and security settings',
    },
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Customize theme and display preferences',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400 text-lg">Manage your application preferences</p>
      </motion.div>

      {/* Settings Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {settingsSections.map((section, index) => {
          const Icon = section.icon
          return (
            <motion.div
              key={section.title}
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
                  <h3 className="text-xl font-bold text-white mb-2">{section.title}</h3>
                  <p className="text-gray-400">{section.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Additional Settings Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-[#0d2626] border border-teal-900/30 rounded-xl p-12 text-center"
      >
        <SettingsIcon className="w-16 h-16 text-teal-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Settings Panel Coming Soon</h2>
        <p className="text-gray-400">
          Advanced configuration options will be available in the next update
        </p>
      </motion.div>
    </div>
  )
}

export default Settings

