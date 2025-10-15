# 🎯 Complete Setup Guide: GHL Webhooks → MongoDB → Dashboard

This guide will walk you through setting up your Sales Operations Hub to receive real data from GoHighLevel (GHL).

## 📋 What You'll Need

- [ ] Node.js installed (v16 or higher)
- [ ] A MongoDB account (free tier is fine)
- [ ] GoHighLevel account with webhook access
- [ ] Basic command line knowledge

## 🏗️ Architecture Overview

```
GHL → Webhook → Express Server → MongoDB → React Dashboard
```

1. **GHL** sends data when calls happen
2. **Express Server** receives and processes it
3. **MongoDB** stores the data
4. **React Dashboard** displays it in real-time

---

## Part 1: Backend Setup (30 minutes)

### Step 1: Install Backend Dependencies

Open your terminal in the project folder:

```bash
cd server
npm install
```

This will install:
- Express (web server)
- Mongoose (MongoDB connector)
- CORS (allows frontend to connect)
- dotenv (manages environment variables)

### Step 2: Set Up MongoDB Database

#### Using MongoDB Atlas (Recommended for Beginners)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Click "Try Free"
   - Sign up with email or Google

2. **Create a Cluster**
   - Choose "Free" tier (M0)
   - Select a region close to you
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Set Up Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `sales-admin`
   - Password: Click "Autogenerate Secure Password" and **COPY IT**
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Set Up Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://sales-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with the password you copied earlier

### Step 3: Configure Environment Variables

**You need to manually create a `.env` file in the `server` folder:**

1. Open your `server` folder
2. Create a new file called `.env` (exactly, no `.txt` extension)
3. Add this content:

```env
MONGODB_URI=mongodb+srv://sales-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sales-operations?retryWrites=true&w=majority
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**Replace** `YOUR_PASSWORD` and the cluster URL with your actual MongoDB connection string!

### Step 4: Start Your Backend Server

In the `server` folder:

```bash
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Sales Operations Hub Server
📡 Server running on port 5000
```

**If you see this, your backend is working!** ✅

Keep this terminal window open. The server needs to stay running.

---

## Part 2: Frontend Setup (5 minutes)

### Step 1: Install Frontend Environment

In a **new terminal window**, go back to the main project folder:

```bash
cd ..  # Go back to main folder (not in server folder)
```

Create a `.env` file in the **root folder** (not in server):

```env
VITE_API_URL=http://localhost:5000
```

### Step 2: Start Frontend

```bash
npm run dev
```

Your dashboard should open at `http://localhost:5173`

**Note:** The dashboard will show mock data until you set up the webhook and send real data.

---

## Part 3: Make Your Server Publicly Accessible (15 minutes)

GHL needs a public URL to send webhooks. During development, use **ngrok**.

### Option A: Using ngrok (For Testing)

1. **Install ngrok**
   - Go to https://ngrok.com/download
   - Download and install for your operating system
   - Create a free account
   - Follow their setup instructions

2. **Run ngrok**
   ```bash
   ngrok http 5000
   ```

3. **Copy the URL**
   You'll see something like:
   ```
   Forwarding: https://abc123.ngrok.io -> http://localhost:5000
   ```
   
   **Copy this URL:** `https://abc123.ngrok.io`

### Option B: Deploy to Production (For Real Use)

If you want a permanent URL, deploy to:
- **Render.com** (Easiest, has free tier)
- **Railway.app** (Good for beginners)
- **Heroku** (Classic option)

See the deployment section at the end for details.

---

## Part 4: Configure GHL Webhook (10 minutes)

### Step 1: Set Up Webhook in GHL

1. Log in to your **GoHighLevel** account
2. Go to **Settings** → **Integrations** → **Webhooks**
3. Click **"Add Webhook"** or **"Create Webhook"**
4. Fill in the form:
   - **Name:** Sales Operations Hub
   - **URL:** `https://your-ngrok-url.ngrok.io/api/webhooks/ghl-call`
     (Replace with your actual ngrok URL)
   - **Events/Triggers:** Select these:
     - ✅ Call Completed
     - ✅ Call Created
     - ✅ Opportunity Updated (if you track deals)
5. Click **Save**

### Step 2: Test the Webhook

#### Method 1: Test from GHL
- Click "Send Test" in GHL webhook settings
- Check your server terminal for incoming data

#### Method 2: Manual Test with curl
```bash
curl -X POST http://localhost:5000/api/webhooks/ghl-call \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test_123",
    "user_name": "John Doe",
    "contact_name": "Jane Smith",
    "call_status": "completed",
    "deal_value": 5000,
    "call_date": "2025-10-15T10:30:00Z",
    "duration": 300
  }'
```

### Step 3: Verify Data Flow

1. **Check Server Logs**
   In your server terminal, you should see:
   ```
   📞 Received webhook from GHL: {...}
   ✅ Call saved to database
   ```

2. **Check MongoDB**
   - Go to MongoDB Atlas
   - Click "Browse Collections"
   - You should see your data in the `calls` collection

3. **Check Dashboard**
   - Refresh your React dashboard
   - You should see the new call data!

---

## Part 5: Customizing Field Mapping (Optional)

GHL might send different field names than expected. To customize:

1. Open `server/routes/webhooks.js`
2. Find the `callData` object
3. Adjust field mappings based on what GHL sends:

```javascript
const callData = {
  callId: req.body.id,                    // ← Adjust these
  salesRep: req.body.user_name,          // ← based on actual
  customerName: req.body.contact_name,   // ← GHL webhook data
  // ... etc
};
```

To see what GHL actually sends, check the console log in your server terminal when a webhook arrives.

---

## 🎉 You're Done! Now What?

### ✅ Checklist
- [ ] Backend server running
- [ ] MongoDB connected
- [ ] ngrok providing public URL
- [ ] GHL webhook configured
- [ ] Test webhook sent successfully
- [ ] Data visible in dashboard

### 🔄 Daily Workflow

1. Start backend: `cd server && npm run dev`
2. Start frontend: `npm run dev` (in main folder)
3. Start ngrok: `ngrok http 5000` (if testing)
4. Make calls in GHL → Data flows automatically!

### 📊 Viewing Your Data

- **Dashboard:** http://localhost:5173
- **MongoDB:** MongoDB Atlas → Browse Collections
- **API directly:** http://localhost:5000/api/webhooks/calls

---

## 🐛 Troubleshooting

### Problem: "MongoDB connection error"
**Solution:**
- Verify connection string in `.env`
- Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for development)
- Ensure password doesn't have special characters that need encoding

### Problem: "Webhook not receiving data"
**Solution:**
- Verify ngrok is running
- Check the webhook URL in GHL is correct
- Look for errors in server terminal
- Try sending a test webhook from GHL

### Problem: "Dashboard shows mock data"
**Solution:**
- Backend must be running
- Check browser console for errors
- Verify `VITE_API_URL` in `.env`
- Restart frontend after changing `.env`

### Problem: "Port 5000 already in use"
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <process_id> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

---

## 🚀 Deploying to Production

### Deploy Backend to Render.com (Free)

1. Push code to GitHub
2. Go to https://render.com
3. Create account and click "New +"
4. Choose "Web Service"
5. Connect your GitHub repo
6. Configure:
   - **Name:** sales-operations-server
   - **Root Directory:** server
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
7. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `FRONTEND_URL`: Your frontend URL
   - `NODE_ENV`: production
8. Click "Create Web Service"
9. Copy the deployment URL (e.g., `https://sales-operations-server.onrender.com`)
10. Update GHL webhook URL to use this production URL

### Deploy Frontend to Vercel/Netlify

1. Update `.env` with production API URL
2. Push to GitHub
3. Connect GitHub repo to Vercel or Netlify
4. Deploy!

---

## 📚 Additional Help

- **MongoDB Issues:** https://docs.atlas.mongodb.com/
- **ngrok Setup:** https://ngrok.com/docs
- **Express Help:** https://expressjs.com/
- **GHL Webhooks:** Check GHL documentation

---

## 💡 Tips

1. **Keep ngrok running** during development - if it stops, the webhook URL changes
2. **Monitor server logs** to see incoming webhooks
3. **Use MongoDB Compass** for easier database viewing
4. **Start with test data** before connecting real GHL
5. **Backup your `.env` file** somewhere safe

Need help? Check the server console logs - they'll show you exactly what's happening!



