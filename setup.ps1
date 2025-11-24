# Medora 2.0 - Automated Setup Script (Windows PowerShell)
# This script sets up the environment files needed to run the application

Write-Host "🚀 Medora 2.0 - Automated Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed ($nodeVersion)" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Create backend/.env file
Write-Host "🔧 Creating backend/.env file..." -ForegroundColor Yellow
$backendEnvContent = @"
# MongoDB Atlas Connection String
MONGO_URI=mongodb+srv://ujwalanarvekar297_db_user:9YOD3R4FuskGgDMt@cluster0.oheuetf.mongodb.net/medora-reach?retryWrites=true&w=majority&appName=Cluster0

# Server Configuration
PORT=5001

# JWT Secret
JWT_SECRET=medora-jwt-secret-key-2024-production-change-this
"@

try {
    $backendEnvContent | Out-File -FilePath "backend\.env" -Encoding utf8 -NoNewline
    Write-Host "✅ backend/.env created successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to create backend/.env" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Create root .env file
Write-Host "🔧 Creating .env file..." -ForegroundColor Yellow
$rootEnvContent = @"
# Frontend Environment Variables

# Backend API URL
VITE_API_URL=http://localhost:5001

# OpenAI API Key for Chatbot Feature (Optional)
# Get your API key from: https://platform.openai.com/api-keys
VITE_OPENAI_API_KEY=your-openai-api-key-here
"@

try {
    $rootEnvContent | Out-File -FilePath ".env" -Encoding utf8 -NoNewline
    Write-Host "✅ .env created successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to create .env" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Success message
Write-Host "🎉 Setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To run the application, you need TWO terminal windows:" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 1 - Backend:" -ForegroundColor Yellow
Write-Host "  npm run server" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 - Frontend:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open your browser to:" -ForegroundColor White
Write-Host "  http://localhost:8080" -ForegroundColor Green
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
