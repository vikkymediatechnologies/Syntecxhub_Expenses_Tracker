// Mock API — simulates real network latency using Promise + setTimeout
const MOCK_EXPENSES = [
  { id: 1, title: "AWS Infrastructure", amount: 320.5, category: "Tech", date: "2025-02-01", note: "Monthly cloud hosting" },
  { id: 2, title: "Figma Pro", amount: 45.0, category: "Design", date: "2025-02-03", note: "Team design subscription" },
  { id: 3, title: "Team Lunch", amount: 127.8, category: "Food", date: "2025-02-07", note: "Sprint retrospective" },
  { id: 4, title: "Office Supplies", amount: 68.4, category: "Office", date: "2025-02-10", note: "Stationery & cables" },
  { id: 5, title: "GitHub Teams", amount: 84.0, category: "Tech", date: "2025-02-12", note: "Version control plan" },
  { id: 6, title: "Client Travel", amount: 410.0, category: "Travel", date: "2025-02-15", note: "Train to HQ meeting" },
  { id: 7, title: "Zoom Subscription", amount: 29.99, category: "Tech", date: "2025-02-18", note: "Video conferencing" },
  { id: 8, title: "Coffee & Snacks", amount: 54.3, category: "Food", date: "2025-02-20", note: "Weekly office supply" },
];

export const fetchExpenses = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve([...MOCK_EXPENSES]), 1200);
  });

export const addExpenseApi = (expense) =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ ...expense, id: Date.now() }), 600);
  });

export const deleteExpenseApi = (id) =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, id }), 400);
  });
