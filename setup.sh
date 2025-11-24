#!/bin/bash

# Medora 2.0 - Automated Setup Script
# This script sets up the environment files needed to run the application

echo "🚀 Medora 2.0 - Automated Setup"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed!${NC}"
    echo "Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js is installed${NC}"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Create backend/.env file
echo "🔧 Creating backend/.env file..."
cat > backend/.env << 'EOF'
# MongoDB Atlas Connection String
MONGO_URI=mongodb+srv://ujwalanarvekar297_db_user:9YOD3R4FuskGgDMt@cluster0.oheuetf.mongodb.net/medora-reach?retryWrites=true&w=majority&appName=Cluster0

# Server Configuration
PORT=5001

# JWT Secret
JWT_SECRET=medora-jwt-secret-key-2024-production-change-this
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ backend/.env created successfully${NC}"
else
    echo -e "${RED}❌ Failed to create backend/.env${NC}"
    exit 1
fi
echo ""

# Create root .env file
echo "🔧 Creating .env file..."
cat > .env << 'EOF'
# Frontend Environment Variables

# Backend API URL
VITE_API_URL=http://localhost:5001

# OpenAI API Key for Chatbot Feature (Optional)
# Get your API key from: https://platform.openai.com/api-keys
VITE_OPENAI_API_KEY=your-openai-api-key-here
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ .env created successfully${NC}"
else
    echo -e "${RED}❌ Failed to create .env${NC}"
    exit 1
fi
echo ""

# Success message
echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
echo ""
echo "================================"
echo "📋 Next Steps:"
echo "================================"
echo ""
echo "To run the application, you need TWO terminal windows:"
echo ""
echo -e "${YELLOW}Terminal 1 - Backend:${NC}"
echo "  npm run server"
echo ""
echo -e "${YELLOW}Terminal 2 - Frontend:${NC}"
echo "  npm run dev"
echo ""
echo "Then open your browser to:"
echo -e "${GREEN}  http://localhost:8080${NC}"
echo ""
echo "================================"
echo ""
