# 💸 Expense Tracker

A responsive expense tracker built with React, Vite, and Tailwind CSS as part of the SyntecxHub React Internship.

## 🚀 Live Demo
[Add your link here after deploying]

## 📸 Screenshot
<img width="420" height="773" alt="Screenshot 2026-03-04 055126" src="https://github.com/user-attachments/assets/c21e9085-b4e0-46a8-9329-f9953444d88b" />
<img width="642" height="756" alt="Screenshot 2026-03-04 055018" src="https://github.com/user-attachments/assets/64643fd8-1063-40cb-a8a2-08b60e37fe68" />


## 🛠️ Tech Stack
- React 18
- Vite
- Tailwind CSS
- Mock API (Promise + setTimeout)

## ⚙️ How to Run Locally
```bash
npm install
npm run dev
```

Open http://localhost:5173

## 🪝 React Hooks Used

| Hook | Where | Purpose |
|---|---|---|
| `useState` | useExpenses, useExpenseForm | Stores expenses list, form inputs, loading state, filter and sort values |
| `useEffect` | useExpenses | Fetches mock API data once when the app first loads |
| `useRef` | useExpenseForm | Auto-focuses the first invalid field when form validation fails |
| `useMemo` | useExpenses, CategoryBreakdown | Filters and sorts the expense list, calculates summary stats |
| `useCallback` | useExpenses, useExpenseForm | Keeps add, delete, and submit handlers stable across renders |

## 📁 Folder Structure
```
src/
├── components/
│   ├── StatCards.jsx
│   ├── ExpenseForm.jsx
│   ├── ExpenseList.jsx
│   └── CategoryBreakdown.jsx
├── hooks/
│   ├── useExpenses.js
│   └── useExpenseForm.js
├── utils/
│   └── formatters.js
├── data/
│   └── mockApi.js
└── App.jsx
```

## ✨ Features
- Add, view, filter, sort and delete expenses
- Live summary stats (total, average, top category)
- Spending breakdown by category
- Form validation with auto-focus on error
- Simulated API loading with skeleton UI
- Fully responsive — mobile and desktop
