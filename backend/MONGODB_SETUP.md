# MongoDB Atlas Setup Guide

## Steps to Connect to MongoDB Atlas

### 1. Create MongoDB Atlas Account
- Go to https://www.mongodb.com/cloud/atlas
- Sign up for a free account (if you don't have one)

### 2. Create a Cluster
- Click "Create" or "Build a Database"
- Choose the FREE tier (M0)
- Select a cloud provider and region
- Click "Create Cluster"

### 3. Create Database User
- Go to "Database Access" in the left sidebar
- Click "Add New Database User"
- Choose "Password" authentication
- Enter a username and password (save these!)
- Set user privileges to "Read and write to any database"
- Click "Add User"

### 4. Whitelist Your IP Address
- Go to "Network Access" in the left sidebar
- Click "Add IP Address"
- Click "Allow Access from Anywhere" (for development) or add your specific IP
- Click "Confirm"

### 5. Get Your Connection String
- Go to "Database" in the left sidebar
- Click "Connect" on your cluster
- Choose "Connect your application"
- Copy the connection string
- Replace `<password>` with your database user password
- Replace `<dbname>` with your database name (e.g., "communityforum")

### 6. Update .env File
- Open `backend/.env` file
- Replace `your_mongodb_atlas_connection_string_here` with your actual connection string
- Example format: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/communityforum?retryWrites=true&w=majority`

### 7. Restart Your Server
- Stop the current server (Ctrl+C)
- Run `npm run dev` again in the backend folder

## Connection String Format
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database_name>?retryWrites=true&w=majority
```

## Troubleshooting
- Make sure your IP is whitelisted in Network Access
- Verify your username and password are correct
- Check that your cluster is running (not paused)
- Ensure the database name in the connection string matches your database

