export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const CATEGORY_META = {
  Tech:          { emoji: "💻", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  Design:        { emoji: "🎨", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
  Food:          { emoji: "🍜", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  Travel:        { emoji: "✈️", color: "bg-sky-500/20 text-sky-300 border-sky-500/30" },
  Office:        { emoji: "🏢", color: "bg-slate-500/20 text-slate-300 border-slate-500/30" },
  Health:        { emoji: "🏥", color: "bg-green-500/20 text-green-300 border-green-500/30" },
  Entertainment: { emoji: "🎬", color: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
  Other:         { emoji: "📦", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
};

export const getCategoryMeta = (cat) =>
  CATEGORY_META[cat] || { emoji: "📦", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" };
