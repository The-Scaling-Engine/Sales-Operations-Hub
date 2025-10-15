# Getting Started Guide - For Beginners

Welcome to your Sales Operations Hub Dashboard! This guide will help you get up and running.

## Step-by-Step Instructions

### Step 1: Open Your Terminal
You're already here! The terminal should be showing that the development server is running.

### Step 2: View Your Application
1. Open your web browser (Chrome, Firefox, Edge, etc.)
2. Go to this address: **http://localhost:5173**
3. You should see your Sales Operations Hub Dashboard!

### Step 3: Explore the Dashboard

#### Navigation
At the top of the screen, you'll see four navigation links:
- **Dashboard**: Your main view with all the metrics and charts
- **Reports**: Report generation page (placeholder for now)
- **Team**: Manage your sales team members
- **Settings**: Application settings (placeholder for now)

#### Dashboard Features

1. **Period Selector** (Top Right)
   - Click the dropdown to change the time period
   - Options: Q4 2025, Q3 2025, Q2 2025, Q1 2025

2. **View Toggle** (Center)
   - **Team Metrics**: View overall team performance
   - **Individual Metrics**: View individual sales rep performance

3. **Metrics Bar** (Top Section - 5 Cards)
   - Total Calls Due
   - Total Unique Leads
   - Total Revenue Generated
   - Overall Close Rate %
   - Overall Set Rate %

4. **Executive Metrics** (3 Large Cards)
   - Shows percentages for Booked, Showed, and Closed calls
   - Watch the numbers animate when you load the page!

5. **Call Outcome Division** (5 Cards at Bottom)
   - Successful Demos (Green)
   - Follow-up Scheduled (Yellow)
   - No Answer (Orange)
   - Not Interested (Red)
   - Closed Lost (Red)

#### Team Page

1. Click **"Team"** in the navigation
2. You'll see all your sales representatives
3. Click **"Add New Rep"** to add a new team member
4. Fill out the form:
   - Full Name (e.g., "John Smith")
   - Position (Closer, Setter, etc.)
   - Hire Date
   - Status (Active, Onboarding, Inactive)
   - Target Revenue (e.g., 500000)
   - Current Revenue (defaults to 0)
5. Click **"Add Rep"** to save

Each team member card shows:
- Their name and position
- Status badge
- Hire date
- Total Calls
- Closed Deals
- Revenue Generated
- Progress bar showing % of target reached

### Step 4: Making Changes

If you want to modify the code:

1. Open any file in the `src` folder
2. Make your changes
3. Save the file
4. The browser will automatically refresh and show your changes!

### Step 5: Stopping the Server

When you're done working:

1. Go back to your terminal
2. Press `Ctrl + C`
3. Type `Y` if asked to confirm

### Step 6: Restarting Later

To start the application again:

1. Open terminal
2. Navigate to the project folder:
   ```bash
   cd C:\Users\USER PC\sales-operations-hub
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Open browser to `http://localhost:5173`

## Understanding the Files

### Important Folders:

- **src/pages/**: Contains the main page views (Dashboard, Team, Reports, Settings)
- **src/components/**: Contains reusable UI components
- **src/lib/**: Contains mock data (sample sales data)

### Key Files:

- **package.json**: Lists all the libraries/packages used
- **src/App.jsx**: Main application file with routing
- **src/main.jsx**: Entry point of the application
- **tailwind.config.js**: Styling configuration
- **vite.config.js**: Build tool configuration

## Common Issues & Solutions

### Issue: Port already in use
**Solution**: The server might already be running. Check for other terminal windows or restart your computer.

### Issue: Changes not showing
**Solution**: 
1. Save the file
2. Refresh your browser (F5 or Ctrl+R)
3. Clear cache (Ctrl+Shift+R)

### Issue: npm install fails
**Solution**:
1. Make sure you have Node.js installed
2. Check your internet connection
3. Delete `node_modules` folder and try again

## Need Help?

- Check the main **README.md** for more technical details
- Review the code comments in the files
- Search for specific React, Tailwind CSS, or Vite documentation online

## Advanced: Connecting to Real Data (GHL Webhooks)

Your dashboard currently uses **mock data** (fake test data). To connect it to real data from GoHighLevel:

### Quick Overview
1. Set up MongoDB database (free cloud database)
2. Start the backend server (receives webhooks)
3. Configure GoHighLevel to send webhooks
4. Data flows automatically into your dashboard!

### Detailed Instructions
See the **WEBHOOK_SETUP_GUIDE.md** file for complete step-by-step instructions.

This includes:
- Setting up MongoDB (free)
- Starting the backend server
- Configuring GHL webhooks
- Testing the connection
- Troubleshooting tips

**Note:** The webhook setup is optional. Your dashboard works great with mock data for development and testing!

## Congratulations! 🎉

You now have a fully functional Sales Operations Dashboard! Explore the features and customize it to your needs.

Happy coding!

