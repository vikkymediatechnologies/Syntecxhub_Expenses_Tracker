import { formatCurrency } from "../utils/formatters";

export default function StatCards({ stats, loading }) {
  const cards = [
    {
      label: "Total Spent",
      value: loading ? "—" : formatCurrency(stats.total),
      sub: `${stats.count} transactions`,
      icon: "💰",
      accent: "from-emerald-500/20 to-teal-500/10 border-emerald-500/20",
      valueClass: "text-emerald-300",
    },
    {
      label: "Avg. Expense",
      value: loading ? "—" : formatCurrency(stats.avgExpense),
      sub: "per transaction",
      icon: "📊",
      accent: "from-violet-500/20 to-purple-500/10 border-violet-500/20",
      valueClass: "text-violet-300",
    },
    {
      label: "Top Category",
      value: loading ? "—" : stats.topCategory?.[0] || "N/A",
      sub: loading ? "" : stats.topCategory ? formatCurrency(stats.topCategory[1]) : "",
      icon: "🏆",
      accent: "from-amber-500/20 to-orange-500/10 border-amber-500/20",
      valueClass: "text-amber-300",
    },
    {
      label: "Categories",
      value: loading ? "—" : Object.keys(stats.byCategory).length,
      sub: "expense types tracked",
      icon: "🗂️",
      accent: "from-sky-500/20 to-blue-500/10 border-sky-500/20",
      valueClass: "text-sky-300",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${card.accent} p-5 transition-transform hover:-translate-y-0.5`}
        >
          <div className="text-2xl mb-3">{card.icon}</div>
          <div className={`text-xl font-bold font-mono tracking-tight ${card.valueClass} ${loading ? "animate-pulse" : ""}`}>
            {card.value}
          </div>
          <div className="text-xs text-slate-400 mt-1">{card.label}</div>
          {card.sub && <div className="text-xs text-slate-500 mt-0.5">{card.sub}</div>}
        </div>
      ))}
    </div>
  );
}
