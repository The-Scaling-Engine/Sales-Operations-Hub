# Sales Operations Hub Dashboard

A modern, dark-themed sales operations dashboard built with React, featuring real-time metrics, team management, and beautiful UI/UX.

## Features

- **Executive Dashboard**: View key metrics including booked calls, showed calls, and closed calls
- **Metrics Bar**: Track total calls, leads, revenue, and conversion rates
- **Call Outcome Division**: Visualize call outcomes with interactive charts
- **Team Management**: Manage sales representatives and track their performance
- **GHL Webhook Integration**: Receive real-time data from GoHighLevel via webhooks
- **MongoDB Storage**: Store and query call data with MongoDB
- **Responsive Design**: Fully responsive layout optimized for desktop and mobile
- **Smooth Animations**: Powered by Framer Motion for polished user experience
- **Dark Theme**: Modern, classy dark aesthetic with teal accents

## Tech Stack

### Frontend
- **React 18**: Modern React with hooks
- **Vite**: Fast development and build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **React Router**: Client-side routing
- **TanStack Query**: Data fetching and caching
- **Lucide React**: Beautiful icon library
- **date-fns**: Date formatting utilities

### Backend
- **Express.js**: Web server for handling webhooks
- **MongoDB**: Database for storing call data
- **Mongoose**: MongoDB object modeling
- **CORS**: Cross-origin resource sharing

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- MongoDB account (free tier available at MongoDB Atlas)

### Frontend Installation

1. Navigate to the project directory:
   ```bash
   cd sales-operations-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Backend Setup (Optional - for GHL Webhooks)

To receive real data from GoHighLevel:

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Set up MongoDB and create `.env` file (see `server/QUICK_START.md` for details)

4. Start the backend server:
   ```bash
   npm run dev
   ```

📖 **Complete Setup Guide**: See `WEBHOOK_SETUP_GUIDE.md` for detailed step-by-step instructions

### Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
sales-operations-hub/
├── server/                            # Backend server
│   ├── models/
│   │   └── Call.js                    # MongoDB schema for calls
│   ├── routes/
│   │   └── webhooks.js                # Webhook endpoints
│   ├── server.js                      # Express server
│   ├── test-webhook.js                # Test script
│   ├── package.json                   # Backend dependencies
│   ├── QUICK_START.md                 # Quick backend setup
│   └── README.md                      # Backend documentation
├── src/
│   ├── components/
│   │   ├── Layout.jsx                 # Main layout with navigation
│   │   └── dashboard/
│   │       ├── AddEmployeeModal.jsx   # Modal for adding new sales reps
│   │       ├── CallOutcomeCard.jsx    # Card showing call outcomes
│   │       ├── ExecutiveMetricsCard.jsx # Executive metrics display
│   │       ├── MetricsBar.jsx         # Top metrics bar
│   │       └── PeriodSelector.jsx     # Period selection dropdown
│   ├── pages/
│   │   ├── Dashboard.jsx              # Main dashboard page
│   │   ├── Team.jsx                   # Team management page
│   │   ├── Reports.jsx                # Reports page (placeholder)
│   │   └── Settings.jsx               # Settings page (placeholder)
│   ├── lib/
│   │   ├── mockData.js                # Mock data (auto-fallback)
│   │   └── api.js                     # API integration functions
│   ├── App.jsx                        # Main app component
│   ├── main.jsx                       # Entry point
│   └── index.css                      # Global styles
├── WEBHOOK_SETUP_GUIDE.md             # Complete webhook setup guide
├── GETTING_STARTED.md                 # Beginner's guide
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Features Breakdown

### Dashboard Page
- **Period Selector**: Choose between different quarters (Q1-Q4 2025)
- **View Toggle**: Switch between Team Metrics and Individual Metrics
- **Metrics Bar**: Displays 5 key metrics:
  - Total Calls Due (Closer)
  - Total Unique Leads (Setter)
  - Total Revenue Generated
  - Overall Close Rate %
  - Overall Set Rate %
- **Executive Metrics**: Three large cards showing:
  - Booked Calls percentage
  - Showed Calls percentage
  - Closed Calls percentage
- **Call Outcome Division**: Five cards showing:
  - Successful Demos
  - Follow-up Scheduled
  - No Answer
  - Not Interested
  - Closed Lost

### Team Page
- View all sales representatives
- Add new sales reps via modal
- See individual rep performance:
  - Total Calls
  - Closed Deals
  - Revenue Generated
  - Progress toward target
- Status badges (Active, Onboarding, Inactive)

## Customization

### Colors
The main color scheme uses teal accents on a dark background. To customize:

- Background: `#0a1f1f` (main) and `#0d2626` (cards)
- Accent: `#14b8a6` (teal-400 to teal-600)
- Text: White, gray-100, gray-400

You can modify these in the Tailwind classes throughout the components.

### Data Source

The app intelligently switches between mock data and real API data:

- **Development Mode**: Uses mock data if backend is unavailable
- **Production Mode**: Fetches real data from your Express backend
- **Automatic Fallback**: If the API is down, it automatically uses mock data

To connect to GoHighLevel:
1. Follow the setup guide in `WEBHOOK_SETUP_GUIDE.md`
2. Configure webhooks in your GHL account
3. Data flows automatically into your dashboard!

### Webhook Integration

The backend receives data from GoHighLevel and stores it in MongoDB:

```
GHL → Webhook → Express Server → MongoDB → React Dashboard
```

**Endpoint**: `POST /api/webhooks/ghl-call`

See `server/README.md` for API documentation.

## License

This project is created for demonstration purposes.

## Support

For questions or issues, please contact your development team.

