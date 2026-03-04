import { useCallback } from "react";
import { formatCurrency, formatDate, getCategoryMeta } from "../utils/formatters";

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl animate-pulse">
      <div className="w-9 h-9 rounded-lg bg-slate-700/60" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-slate-700/60 rounded w-40" />
        <div className="h-2.5 bg-slate-700/40 rounded w-24" />
      </div>
      <div className="h-3 bg-slate-700/60 rounded w-20" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-4">🧾</div>
      <p className="text-slate-400 font-medium">No expenses found</p>
      <p className="text-slate-600 text-sm mt-1">Add your first expense above or adjust filters</p>
    </div>
  );
}

function ExpenseRow({ expense, onDelete }) {
  const meta = getCategoryMeta(expense.category);

  const handleDelete = useCallback(() => onDelete(expense.id), [onDelete, expense.id]);

  return (
    <div className="group flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-slate-800/60 transition-all">
      {/* Category badge */}
      <div className={`w-9 h-9 flex items-center justify-center rounded-lg border text-base flex-shrink-0 ${meta.color}`}>
        {meta.emoji}
      </div>

      {/* Title + meta */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-200 truncate">{expense.title}</p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded-full border ${meta.color}`}>
            {expense.category}
          </span>
          <span className="text-xs text-slate-500">{formatDate(expense.date)}</span>
          {expense.note && (
            <span className="text-xs text-slate-600 truncate max-w-[160px]" title={expense.note}>
              {expense.note}
            </span>
          )}
        </div>
      </div>

      {/* Amount */}
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-bold font-mono text-slate-100">
          {formatCurrency(expense.amount)}
        </p>
      </div>

      {/* Delete */}
      <button
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 ml-1 text-slate-600 hover:text-red-400 transition-all text-lg leading-none flex-shrink-0"
        aria-label="Delete expense"
        title="Delete"
      >
        ×
      </button>
    </div>
  );
}

export default function ExpenseList({ expenses, loading, onDelete, filterCategory, setFilterCategory, sortBy, setSortBy, categories }) {
  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-700/50">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-widest">
          Transactions
          {!loading && (
            <span className="ml-2 text-xs font-mono text-slate-500 normal-case tracking-normal">
              ({expenses.length})
            </span>
          )}
        </h2>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Category filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-xs bg-slate-700/60 border border-slate-600/50 text-slate-300 rounded-lg px-3 py-1.5 outline-none focus:border-emerald-500/50 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs bg-slate-700/60 border border-slate-600/50 text-slate-300 rounded-lg px-3 py-1.5 outline-none focus:border-emerald-500/50 cursor-pointer"
          >
            <option value="date" className="bg-slate-800">Newest first</option>
            <option value="amount" className="bg-slate-800">Highest amount</option>
            <option value="title" className="bg-slate-800">A → Z</option>
          </select>
        </div>
      </div>

      {/* List body */}
      <div className="divide-y divide-slate-700/30 px-1">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
        ) : expenses.length === 0 ? (
          <EmptyState />
        ) : (
          expenses.map((exp) => (
            <ExpenseRow key={exp.id} expense={exp} onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  );
}
