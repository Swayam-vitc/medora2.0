# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/60337890-ab55-4a40-9dd8-88550909f0d2

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/60337890-ab55-4a40-9dd8-88550909f0d2) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Set up your database and environment (IMPORTANT!)
# EASY WAY: Use the automated setup script
npm run setup

# OR follow the detailed manual setup in SETUP.md
# See SETUP.md for MongoDB Atlas cloud database setup

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Node.js/Express (Backend)
- MongoDB Atlas (Cloud Database)

## Quick Setup (Recommended)

**For the fastest setup experience:**

```sh
# Clone and navigate to the project
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Run the automated setup script
npm run setup

# Then run the application (two terminals)
# Terminal 1:
npm run server

# Terminal 2:
npm run dev
```

📖 **See [QUICK_START.md](QUICK_START.md) for detailed instructions**

## Database Setup

This application uses **MongoDB Atlas** (a free cloud database) so it can run on any device without installing MongoDB locally.

**📖 For detailed setup instructions, see [SETUP.md](SETUP.md)**

Quick summary:
1. Create a free MongoDB Atlas account
2. Create a cluster and get your connection string
3. Add the connection string to `backend/.env`
4. Run the application

## Running the Application

You need to run both the frontend and backend:

```sh
# Terminal 1 - Start the backend server
npm run server

# Terminal 2 - Start the frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5001

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/60337890-ab55-4a40-9dd8-88550909f0d2) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
