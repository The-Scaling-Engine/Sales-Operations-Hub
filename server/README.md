# Sales Operations Hub - Backend Server

This is the backend server for the Sales Operations Hub. It receives webhooks from GoHighLevel (GHL), stores call data in MongoDB, and provides APIs for the React dashboard.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Set Up MongoDB

You have two options:

#### Option A: MongoDB Atlas (Cloud - Recommended for beginners)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

#### Option B: Local MongoDB
1. Install MongoDB locally
2. Use connection string: `mongodb://localhost:27017/sales-operations`

### 3. Configure Environment Variables

Create a `.env` file in the `server` folder:

```env
MONGODB_URI=your_mongodb_connection_string_here
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**Important:** Replace `your_mongodb_connection_string_here` with your actual MongoDB connection string.

### 4. Start the Server

For development (auto-restarts on changes):
```bash
npm run dev
```

For production:
```bash
npm start
```

You should see:
```
🚀 Sales Operations Hub Server
📡 Server running on port 5000
✅ Connected to MongoDB
```

## 📡 API Endpoints

### Webhooks
- **POST** `/api/webhooks/ghl-call` - Receives webhook data from GHL
- **GET** `/api/webhooks/calls` - Fetches all calls (with optional filters)
- **GET** `/api/webhooks/stats` - Get dashboard statistics
- **DELETE** `/api/webhooks/calls/:id` - Delete a call (for testing)

### Health Check
- **GET** `/health` - Check server status
- **GET** `/` - API information

## 🔗 Setting Up GHL Webhook

### Step 1: Make Your Server Publicly Accessible

For **local testing**, use ngrok:
```bash
# Install ngrok (if not already installed)
# Visit: https://ngrok.com/download

# Run ngrok
ngrok http 5000
```

This will give you a public URL like: `https://abc123.ngrok.io`

For **production**, deploy to:
- [Render.com](https://render.com) (Free tier available)
- [Railway.app](https://railway.app)
- [Heroku](https://heroku.com)

### Step 2: Configure in GHL

1. Log in to your GHL account
2. Go to **Settings** → **Integrations** → **Webhooks**
3. Click **Add Webhook**
4. Enter the webhook URL: `https://your-domain.com/api/webhooks/ghl-call`
5. Select triggers:
   - Call Completed
   - Call Created
   - Opportunity Updated (if tracking deals)
6. Save the webhook

### Step 3: Test the Webhook

Send a test from GHL or use this curl command:

```bash
curl -X POST http://localhost:5000/api/webhooks/ghl-call \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test_call_123",
    "user_name": "Test Rep",
    "contact_name": "Test Customer",
    "call_status": "completed",
    "deal_value": 5000,
    "call_date": "2025-10-15T10:30:00Z",
    "duration": 300
  }'
```

## 📊 MongoDB Data Structure

Calls are stored with this structure:

```javascript
{
  callId: "unique_call_id",
  salesRep: "Rep Name",
  salesRepId: "rep_id",
  customerName: "Customer Name",
  customerPhone: "+1234567890",
  outcome: "completed",
  revenue: 5000,
  callDate: ISODate("2025-10-15"),
  duration: 300,
  notes: "Call notes",
  tags: ["qualified", "follow-up"],
  createdAt: ISODate("2025-10-15"),
  updatedAt: ISODate("2025-10-15")
}
```

## 🔧 Customizing Webhook Data Mapping

The webhook endpoint maps GHL data to your schema in `routes/webhooks.js`. You may need to adjust field names based on what GHL actually sends:

```javascript
const callData = {
  callId: req.body.id,           // Adjust these field names
  salesRep: req.body.user_name,  // based on GHL webhook
  // ... etc
};
```

To see what GHL sends, check the console logs when a webhook arrives.

## 🐛 Troubleshooting

### "MongoDB connection error"
- Check your connection string in `.env`
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify network connectivity

### "Webhook not receiving data"
- Check that the URL is publicly accessible
- Verify the webhook is configured correctly in GHL
- Check server logs for incoming requests
- Test with curl command first

### "Port already in use"
- Change the PORT in `.env` file
- Or stop the process using port 5000

## 📝 Next Steps

1. ✅ Start the server
2. ✅ Configure MongoDB
3. ✅ Set up ngrok for testing
4. ✅ Configure GHL webhook
5. ✅ Send test webhook
6. ✅ Check data in MongoDB
7. ✅ View data in React dashboard

## 🔒 Security Notes

- Never commit `.env` file to git
- Use environment variables for sensitive data
- Enable authentication for production
- Use HTTPS in production
- Validate webhook signatures (if GHL provides them)

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [ngrok Documentation](https://ngrok.com/docs)



