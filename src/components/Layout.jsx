import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Bell } from 'lucide-react'
import { motion } from 'framer-motion'

const Layout = () => {
  const location = useLocation()
  const currentPath = location.pathname.replace('/', '') || 'dashboard'

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Reports', path: '/reports' },
    { name: 'Team', path: '/team' },
    { name: 'Settings', path: '/settings' },
  ]

  const isActive = (path) => {
    const cleanPath = path.replace('/', '')
    return currentPath === cleanPath
  }

  // Mock user data
  const user = {
    full_name: 'Admin User',
    initials: 'AU',
  }

  return (
    <div className="min-h-screen bg-[#0a1f1f]">
      {/* Navigation Bar */}
      <nav className="bg-[#0d2626] border-b border-teal-900/30 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Sales Operations Hub</span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-teal-600/20 text-teal-300'
                      : 'text-gray-400 hover:text-white hover:bg-teal-900/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{user.initials}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-8 py-12">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

