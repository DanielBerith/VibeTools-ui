# VibeTools UI

A modern, responsive React frontend for the VibeTools AI-Tool Directory. Browse, search, submit and review AI tools with star ratings and comments. Built with TypeScript, React Router, React Query, Tailwind CSS, react-hook-form, yup, axios and react-hot-toast.

---

## 📋 Table of Contents

- [Features](#-features)  
- [Folder Structure](#-folder-structure)  
- [Getting Started](#-getting-started)  
- [Environment Configuration](#-environment-configuration)  
- [Available Scripts](#-available-scripts)  
- [Dependencies](#-dependencies)  
- [Contributing](#-contributing)  
- [License](#-license)  

---

## ✨ Features

- **Tool Discovery**: Home page lists tools with search and category filters.  
- **All-Tools Directory**: View every tool (including hidden) with stats.  
- **Tool Details**: Dedicated page showing full tool info and reviews.  
- **Submit Tool**: Add new tools via a validated form with live character count and progress bar.  
- **Review System**: Star-rating and comment form on the details page.  
- **Sorting**: Tools sorted by descending average rating.  
- **Dark Theme**: Tailwind-powered dark UI with blue-gray palette.  
- **Notifications**: react-hot-toast for success/error feedback.  
- **Loading & Error States**: Consistent spinners and messages throughout.

---

## 📂 Folder Structure

```text
vibetools-ui/
├── node_modules/
├── public/              # Static assets (index.html, icons)
└── src/
    ├── components/
    │   ├── common/      # ErrorMessage.tsx, LoadingSpinner.tsx, StarRating.tsx
    │   ├── layout/      # Header.tsx, Footer.tsx, Layout.tsx
    │   ├── reviews/     # ReviewForm.tsx, ReviewItem.tsx, ReviewList.tsx
    │   └── tools/       # SearchBar.tsx, ToolCard.tsx, ToolDetails.tsx, ToolForm.tsx, ToolList.tsx
    │
    ├── hooks/           # useTools.ts, useToolDetails.ts, useReviews.ts
    │
    ├── pages/           # HomePage.tsx, AllToolsPage.tsx, ToolDetailsPage.tsx, SubmitToolPage.tsx
    │
    ├── services/
    │   ├── api.ts       # axios client & endpoints
    │   └── types.ts     # TypeScript DTOs
    │
    ├── utils/           # any utility functions
    ├── App.tsx          # Router, React Query provider, Toaster
    ├── App.css          # global styles
    ├── index.tsx        # ReactDOM entry
    ├── index.css        # Tailwind imports
    ├── logo.svg         # logo asset
    ├── reportWebVitals.ts
    └── setupTests.ts
🛠️ Getting Started
Prerequisites
Node.js v14+

npm or yarn

1. Clone & Install
bash
Copy
Edit
git clone https://github.com/your-org/vibetools-ui.git
cd vibetools-ui
npm install    # or yarn install
2. Configure the API Base URL
The frontend reads your backend URL from the REACT_APP_API_URL environment variable and falls back to http://localhost:5051/api.

Create a file named .env.local in the project root.

Add this line, pointing to your API host:

env
Copy
Edit
REACT_APP_API_URL=https://your-backend-host.com/api
Restart the dev server if it’s already running.

3. Run in Development
bash
Copy
Edit
npm start    # or yarn start
Open http://localhost:3000 to view in your browser.

📦 Available Scripts
npm start / yarn start
Runs the app in development mode with hot-reload.

npm run build / yarn build
Builds the app for production into the build/ folder.

npm test / yarn test
Launches the test runner (Jest + React Testing Library).

npm run lint / yarn lint
Runs ESLint to enforce code quality.

🔗 Environment Configuration
ts
Copy
Edit
// src/services/api.ts

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  'http://localhost:5051/api';


🧩 Dependencies
React & TypeScript

React Router

React Query

axios

Tailwind CSS

react-hook-form + yup

react-hot-toast

Jest + React Testing Library

🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/XYZ)

Commit your changes (git commit -m "feat: ...")

Push (git push origin feature/XYZ)

Open a Pull Request

Please run npm run lint and add tests for new functionality.

📜 License
This project is licensed under the MIT License. See LICENSE for details
