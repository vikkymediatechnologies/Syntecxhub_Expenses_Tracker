import { useExpenses } from "./hooks/useExpenses";
import StatCards from "./components/StatCards";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import CategoryBreakdown from "./components/CategoryBreakdown";

export default function App() {
  const {
    expenses,
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
  } = useExpenses();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" style={{ fontFamily: "'DM Mono', 'Fira Code', monospace" }}>
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-base">
                  💸
                </div>
                <span className="text-xs text-emerald-400 font-semibold tracking-[0.2em] uppercase">
                  ExpenseTracker
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">
                Financial Overview
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Track, analyze, and control your team spending
              </p>
            </div>

            {/* Live indicator */}
            <div className="flex items-center gap-2 text-xs text-slate-500 border border-slate-700/50 rounded-full px-3 py-1.5">
              <span className={`w-2 h-2 rounded-full ${loading ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
              {loading ? "Loading data…" : "Synced"}
            </div>
          </div>
        </header>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400">
            ⚠️ {error}
          </div>
        )}

        {/* Stats */}
        <StatCards stats={stats} loading={loading} />

        {/* Add form */}
        <ExpenseForm onAdd={addExpense} />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ExpenseList
              expenses={expenses}
              loading={loading}
              onDelete={deleteExpense}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
              categories={categories}
            />
          </div>
          <div>
            <CategoryBreakdown stats={stats} loading={loading} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-slate-700">
          Built with React + Vite + Tailwind CSS · SyntecxHub Internship Assignment
        </footer>
      </div>
    </div>
  );
}
