import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchExpenses, addExpenseApi, deleteExpenseApi } from "../data/mockApi";

export function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date"); // date | amount | title

  // useEffect: fetch mock API on mount
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchExpenses()
      .then((data) => {
        if (!cancelled) {
          setExpenses(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Failed to load expenses");
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  // useCallback: stable add handler
  const addExpense = useCallback(async (expenseData) => {
    const saved = await addExpenseApi(expenseData);
    setExpenses((prev) => [saved, ...prev]);
    return saved;
  }, []);

  // useCallback: stable delete handler
  const deleteExpense = useCallback(async (id) => {
    await deleteExpenseApi(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  // useMemo: derive filtered + sorted list
  const filteredExpenses = useMemo(() => {
    let list = filterCategory === "All"
      ? expenses
      : expenses.filter((e) => e.category === filterCategory);

    return [...list].sort((a, b) => {
      if (sortBy === "amount") return b.amount - a.amount;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return new Date(b.date) - new Date(a.date);
    });
  }, [expenses, filterCategory, sortBy]);

  // useMemo: derive summary stats
  const stats = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const byCategory = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});
    const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
    const avgExpense = expenses.length ? total / expenses.length : 0;

    return { total, byCategory, topCategory, avgExpense, count: expenses.length };
  }, [expenses]);

  // useMemo: unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(expenses.map((e) => e.category))];
    return ["All", ...cats.sort()];
  }, [expenses]);

  return {
    expenses: filteredExpenses,
    loading,
    error,
    stats,
    categories,
    filterCategory,
    setFilterCategory,
    sortBy,
    setSortBy,
    addExpense,
    deleteExpense,
  };
}
