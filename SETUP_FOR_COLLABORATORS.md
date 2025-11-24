# 🚀 Setup Guide for Collaborators

Welcome! This guide will help you run Medora 2.0 on your computer in just a few minutes.

## ✅ What You Need (One-Time Setup)

### 1. **Node.js** (Required)
- Download from: https://nodejs.org/
- Install it (just click "Next, Next, Finish")
- **That's the ONLY system requirement!**

### 2. **Git** (Usually already installed)
- Check if you have it: Open terminal and type `git --version`
- If not installed: https://git-scm.com/downloads

---

## 🚀 Quick Setup (Recommended - Takes 2 Minutes!)

### On Mac/Linux:

```bash
# 1. Clone the repository
git clone <repository-url>
cd medora2.0

# 2. Run the automated setup script
npm run setup

# That's it! The script does everything automatically ✨
```

### On Windows (PowerShell):

```powershell
# 1. Clone the repository
git clone <repository-url>
cd medora2.0

# 2. Run the automated setup script
.\setup.ps1

# That's it! The script does everything automatically ✨
```

---

## ⚡ What the Setup Script Does Automatically:

1. ✅ Checks if Node.js is installed
2. ✅ Installs all npm packages (483 packages)
3. ✅ Creates `backend/.env` with MongoDB credentials
4. ✅ Creates `.env` with frontend configuration
5. ✅ Shows you the next steps with colorful messages

**Total time: ~1-2 minutes** (depending on internet speed)

---

## 🎮 Running the Application

After setup, you need **two terminal windows**:

### Terminal 1 - Start the Backend:
```bash
npm run server
```

You should see:
```
Server running on port 5001
MongoDB Connected: ac-kst0iov-shard-00-00.oheuetf.mongodb.net
```

### Terminal 2 - Start the Frontend:
```bash
npm run dev
```

You should see:
```
VITE ready in 1779 ms
➜  Local:   http://localhost:8080/
```

### 🌐 Open Your Browser:
Go to: **http://localhost:8080**

---

## ❌ No Changes Needed On Your System!

You do **NOT** need to:
- ❌ Install MongoDB (we use cloud database!)
- ❌ Configure environment variables manually
- ❌ Edit any files
- ❌ Change any system settings
- ❌ Install Python, Java, or any other tools

**Just Node.js and you're good to go!** 🎉

---

## 🔧 Troubleshooting

### Issue 1: "npm: command not found"
**Problem:** Node.js is not installed  
**Solution:** Install Node.js from https://nodejs.org/

### Issue 2: Windows PowerShell Execution Policy Error
**Error:** "Scripts are disabled on this system"  
**Solution:** Run this command once:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
Then run `.\setup.ps1` again

### Issue 3: "Port 5001 already in use"
**Problem:** Another application is using port 5001  
**Solution:** 
- Close the other application, OR
- Edit `backend/.env` and change `PORT=5001` to `PORT=5002`
- Then edit `.env` and change `VITE_API_URL=http://localhost:5001` to `http://localhost:5002`

### Issue 4: "Cannot find package 'express'"
**Problem:** Dependencies not installed  
**Solution:** Run `npm install` in the project root

### Issue 5: Frontend can't connect to backend
**Problem:** Backend server is not running  
**Solution:** 
- Make sure you have TWO terminal windows open
- Terminal 1 should be running `npm run server`
- Terminal 2 should be running `npm run dev`

### Issue 6: "MongoDB connection error"
**Problem:** Environment file not created properly  
**Solution:** 
- Check if `backend/.env` file exists
- If not, run the setup script again: `npm run setup` or `.\setup.ps1`

---

## 📊 Expected Setup Time:

| Step | Time |
|------|------|
| Install Node.js (if needed) | 5 minutes |
| Clone repository | 30 seconds |
| Run setup script | 1-2 minutes |
| Start servers | 10 seconds |
| **Total** | **2-8 minutes** |

---

## 🎯 What Makes This Easy:

1. **Automated Setup Script** - Does all the hard work for you
2. **Cloud Database** - No local MongoDB installation needed
3. **Clear Error Messages** - Script tells you exactly what's wrong
4. **Cross-Platform** - Works on Mac, Linux, AND Windows
5. **Complete Documentation** - Multiple guides to help you

---

## 🔒 Important Notes:

- ⚠️ **Never commit `.env` files to Git** - they contain sensitive credentials
- ✅ All collaborators use the **same MongoDB connection string** to share data
- 🌐 The database is in the cloud, so everyone sees the same data
- 🔄 Changes you make to the database are visible to all collaborators

---

## 📚 Additional Resources:

- **QUICK_START.md** - One-page quick reference
- **SETUP.md** - Detailed MongoDB Atlas setup guide (if you want to create your own database)
- **README.md** - Project overview and general information

---

## 🆘 Still Having Issues?

If you're stuck:
1. Check the error message carefully
2. Look in the Troubleshooting section above
3. Make sure Node.js is installed: `node --version`
4. Make sure you ran the setup script: `npm run setup` or `.\setup.ps1`
5. Contact the project maintainer

---

## ✨ That's It!

You should now have Medora 2.0 running on your computer! 🎉

**Happy coding!** 🚀
