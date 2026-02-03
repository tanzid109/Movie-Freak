# 🎬 Movie Portal

## 📌 Overview
**Movie Portal** is a modern web application for movie enthusiasts to discover, manage, and organize their favorite movies. Built with cutting-edge technologies, it provides a seamless user experience with authentication, movie management, and personalized features.

---

## 🚀 Technology Stack
- **Frontend:** React.js  
- **Backend & Services:** Firebase (Authentication, Database, Hosting)  

---

## ✨ Key Features
- 🔐 **User Authentication** – Secure login/signup with Firebase Authentication  
- ➕ **Add Movies** – Intuitive interface to add new movies with details  
- ❌ **Delete Movies** – Remove movies from your collection  
- ⭐ **Favorite Movies** – Star and organize your preferred movies  
- 🔍 **Smart Search** – Find movies quickly with advanced filtering  
- 📱 **Responsive Design** – Seamless experience across all devices  

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| animate.css | ^4.1.1 | CSS animations library |
| firebase | ^11.0.2 | Backend services (Auth, Database) |
| localforage | ^1.10.0 | Offline data storage |
| match-sorter | ^8.0.0 | Intelligent search filtering |
| react | ^18.3.1 | UI library |
| react-dom | ^18.3.1 | React DOM rendering |
| react-hook-form | ^7.54.0 | Form handling and validation |
| react-icons | ^5.4.0 | Icon library |
| react-router-dom | ^7.0.2 | Client-side routing |

---

## 🖥️ Run Locally

### ✅ Prerequisites
- Node.js (v16 or higher)  
- npm or yarn  
- Git  

---

### 📥 Installation Steps

#### 1️⃣ Clone the repository
```bash
git clone https://github.com/tanzid109/Movie-Portal.git
```
### Move to Folder
```
cd Movie-Portal
```
#### 2️⃣ Install dependencies
```
npm install
```
### 3️⃣ Set up environment variables

Create a .env file in the root directory and add your Firebase config:
```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```
#### 4️⃣ Start the development server
```
npm run dev
```

### Movie-Portal/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable components
│   ├── pages/       # Page components
│   ├── hooks/       # Custom React hooks
│   ├── utils/       # Utility functions
│   ├── services/    # Firebase services
│   └── styles/      # CSS styles
├── package.json
└── README.md

```
npm run build
```
### 👨‍💻 Author
### Created by Tanzid

