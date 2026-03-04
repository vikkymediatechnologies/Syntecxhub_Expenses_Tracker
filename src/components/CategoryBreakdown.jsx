import { useMemo } from "react";
import { formatCurrency, getCategoryMeta } from "../utils/formatters";

export default function CategoryBreakdown({ stats, loading }) {
  const sorted = useMemo(
    () =>
      Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1]),
    [stats.byCategory]
  );

  if (loading) {
    return (
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 animate-pulse space-y-3">
        <div className="h-3 bg-slate-700/60 rounded w-32 mb-5" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-2.5 bg-slate-700/40 rounded w-24" />
            <div className="h-2 bg-slate-700/30 rounded-full" style={{ width: `${70 - i * 12}%` }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
      <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-5">
        By Category
      </h2>

      {sorted.length === 0 ? (
        <p className="text-slate-600 text-sm text-center py-6">No data yet</p>
      ) : (
        <div className="space-y-4">
          {sorted.map(([cat, amount]) => {
            const pct = stats.total > 0 ? (amount / stats.total) * 100 : 0;
            const meta = getCategoryMeta(cat);
            return (
              <div key={cat}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span>{meta.emoji}</span>
                    <span className="text-xs font-medium text-slate-300">{cat}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-300">{formatCurrency(amount)}</span>
                    <span className="text-xs text-slate-600 ml-1.5">{pct.toFixed(0)}%</span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
