# Medora 2.0 - Setup Guide

This guide will help you set up and run Medora 2.0 on any device with internet access.

## Prerequisites

- Node.js (v14 or higher) - [Download here](https://nodejs.org/)
- A MongoDB Atlas account (free) - We'll set this up below

## Step 1: MongoDB Atlas Setup (Cloud Database)

Since the application uses a cloud database, you only need to set this up once, and it will work on any device.

### 1.1 Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account (no credit card required)
3. Verify your email address

### 1.2 Create a Free Cluster

1. After logging in, click **"Build a Database"**
2. Select **"M0 FREE"** tier (this is completely free forever)
3. Choose a cloud provider (AWS, Google Cloud, or Azure)
4. Select a region closest to your location
5. Click **"Create Cluster"** (this takes 3-5 minutes)

### 1.3 Create Database User

1. In the left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter a username (e.g., `medora-admin`)
5. Click **"Autogenerate Secure Password"** and **SAVE THIS PASSWORD**
6. Under "Database User Privileges", select **"Read and write to any database"**
7. Click **"Add User"**

### 1.4 Allow Network Access

1. In the left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (this adds `0.0.0.0/0`)
   - For production, you'd restrict this to specific IPs
   - For development/learning, this is fine
4. Click **"Confirm"**

### 1.5 Get Your Connection String

1. In the left sidebar, click **"Database"**
2. Click **"Connect"** button on your cluster
3. Select **"Connect your application"**
4. Copy the connection string (it looks like this):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Important**: Replace `<password>` with the actual password you saved earlier
6. **Important**: Add the database name before the `?` in the URL:
   ```
   mongodb+srv://username:yourpassword@cluster0.xxxxx.mongodb.net/medora-reach?retryWrites=true&w=majority
   ```

## Step 2: Clone and Setup the Project

```bash
# Clone the repository (if you haven't already)
git clone <your-repo-url>
cd medora2.0

# Install dependencies
npm install
```

## Step 3: Configure Environment Variables

### 3.1 Backend Environment (.env)

Create a file named `.env` in the `backend` folder:

```bash
# From the project root
touch backend/.env
```

Add the following content (replace with your actual values):

```env
# MongoDB Atlas Connection String (from Step 1.5)
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/medora-reach?retryWrites=true&w=majority

# Server Port
PORT=5001

# JWT Secret (change this to a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-to-something-random
```

### 3.2 Frontend Environment (.env)

Create a file named `.env` in the project root:

```bash
# From the project root
touch .env
```

Add the following content:

```env
# Backend API URL
VITE_API_URL=http://localhost:5001

# OpenAI API Key (optional - only needed for chatbot feature)
VITE_OPENAI_API_KEY=your-openai-api-key-here
```

## Step 4: Run the Application

You need to run both the frontend and backend servers.

### Option 1: Using Two Terminal Windows

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Option 2: Using Background Process (Mac/Linux)

```bash
# Start backend in background
npm run server &

# Start frontend
npm run dev
```

## Step 5: Access the Application

Once both servers are running, you'll see:

- **Frontend**: http://localhost:8080
- **Backend**: http://localhost:5001

Open your browser and go to **http://localhost:8080**

## Running on Another Device

To run this project on a different device:

1. Clone the repository
2. Run `npm install`
3. Create the `.env` files with the **SAME MongoDB connection string**
4. Run `npm run server` and `npm run dev`

That's it! The cloud database means all devices share the same data.

## Troubleshooting

### "Cannot find package 'express'"
- Run `npm install` in the project root

### "MongoDB connection error"
- Check your `MONGO_URI` in `backend/.env`
- Ensure you replaced `<password>` with your actual password
- Verify Network Access is set to "Allow Access from Anywhere"
- Check if your cluster is still provisioning (wait 5 minutes)

### "Port already in use"
- Change the `PORT` in `backend/.env` to a different number (e.g., 5002)
- Update `VITE_API_URL` in the root `.env` to match

### Frontend can't connect to backend
- Ensure both servers are running
- Check that `VITE_API_URL` in root `.env` matches your backend port
- Try restarting both servers

## Security Notes

- **Never commit `.env` files to Git** (they're already in `.gitignore`)
- For production deployment, use environment variables from your hosting platform
- Change the `JWT_SECRET` to a strong random string
- Consider restricting MongoDB Network Access to specific IPs in production

## Need Help?

If you encounter issues:
1. Check the terminal output for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB Atlas cluster is active
4. Check that both servers are running
