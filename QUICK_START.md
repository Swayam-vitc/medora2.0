# 🚀 Quick Setup Guide

This is the **easiest way** to set up Medora 2.0 on any device!

## One-Command Setup

### For Mac/Linux:

```bash
git clone <repository-url>
cd medora2.0
npm run setup
```

### For Windows (PowerShell):

```powershell
git clone <repository-url>
cd medora2.0
.\setup.ps1
```

That's it! The setup script will:
- ✅ Install all dependencies
- ✅ Create the `backend/.env` file with MongoDB credentials
- ✅ Create the `.env` file for frontend configuration
- ✅ Show you the next steps

## After Setup

Run the application with **two terminal windows**:

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Then open: **http://localhost:8080**

---

## Manual Setup (Alternative)

If you prefer to set up manually, see [SETUP_FOR_COLLABORATORS.md](SETUP_FOR_COLLABORATORS.md)

## Troubleshooting

### Mac/Linux: "Permission denied"
```bash
chmod +x setup.sh
./setup.sh
```

### Windows: "Execution policy" error
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\setup.ps1
```

### Script not working?
Follow the manual setup in [SETUP_FOR_COLLABORATORS.md](SETUP_FOR_COLLABORATORS.md)
