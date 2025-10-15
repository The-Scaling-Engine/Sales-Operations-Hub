# ⚡ Quick Start - Backend Server

For complete beginners - just follow these steps!

## 1️⃣ Install Dependencies

Open terminal in the `server` folder and run:

```bash
npm install
```

Wait for it to finish (might take a few minutes).

## 2️⃣ Set Up MongoDB

### Easiest Way: MongoDB Atlas (Free Cloud Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and create an account
3. Create a free cluster (choose the free tier)
4. Create a database user:
   - Username: `sales-admin`
   - Password: (click autogenerate and **save it somewhere safe!**)
5. Add your IP address (click "Allow Access from Anywhere" for now)
6. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://sales-admin:PASSWORD@cluster0.xxxxx.mongodb.net/...`

## 3️⃣ Create Environment File

**You must manually create a `.env` file:**

1. In the `server` folder, create a new file called `.env`
2. Add these lines (replace with your actual MongoDB connection string):

```
MONGODB_URI=mongodb+srv://sales-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sales-operations?retryWrites=true&w=majority
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**Important:** Replace `YOUR_PASSWORD` with your actual MongoDB password!

## 4️⃣ Start the Server

```bash
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Sales Operations Hub Server
📡 Server running on port 5000
```

**Success!** Your backend is running! 🎉

## 5️⃣ Test It

Open a new terminal and run:

```bash
node test-webhook.js
```

You should see:
```
✅ Webhook test successful!
```

## 6️⃣ View the Data

1. Start your frontend (in the main project folder):
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173 in your browser

3. Your dashboard should now show the test data!

## ❓ Problems?

### "Can't connect to MongoDB"
- Check your connection string in `.env`
- Make sure you replaced `<password>` with your actual password
- Verify your IP is whitelisted in MongoDB Atlas

### "Port 5000 already in use"
- Something else is using port 5000
- Change `PORT=5000` to `PORT=5001` in `.env`
- Update frontend `.env` to use the new port

### "Module not found"
- Run `npm install` again in the server folder

## 🎯 Next Steps

1. ✅ Server running
2. ✅ Test webhook works
3. 📖 Read `WEBHOOK_SETUP_GUIDE.md` for GHL integration
4. 🚀 Deploy to production (see server README.md)

## 🔄 Daily Workflow

Every time you want to work:

1. Start backend:
   ```bash
   cd server
   npm run dev
   ```

2. Start frontend (new terminal):
   ```bash
   cd ..
   npm run dev
   ```

3. Open http://localhost:5173

That's it! 🎉



