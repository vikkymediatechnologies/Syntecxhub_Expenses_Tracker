import { useExpenseForm } from "../hooks/useExpenseForm";

export default function ExpenseForm({ onAdd }) {
  const {
    form,
    errors,
    submitting,
    titleRef,
    amountRef,
    handleChange,
    handleSubmit,
    resetForm,
    CATEGORIES,
  } = useExpenseForm(onAdd);

  const inputBase =
    "w-full bg-slate-800/60 border rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none focus:ring-2 transition-all";
  const inputOk = "border-slate-700 focus:border-emerald-500/60 focus:ring-emerald-500/20";
  const inputErr = "border-red-500/60 focus:ring-red-500/20";

  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 mb-8 backdrop-blur-sm">
      <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-5 flex items-center gap-2">
        <span className="text-emerald-400">+</span> Add Expense
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Title */}
          <div className="lg:col-span-1">
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Title *</label>
            <input
              ref={titleRef}
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. AWS Invoice"
              className={`${inputBase} ${errors.title ? inputErr : inputOk}`}
            />
            {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Amount (USD) *</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
              <input
                ref={amountRef}
                name="amount"
                type="number"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
                className={`${inputBase} ${errors.amount ? inputErr : inputOk} pl-7`}
              />
            </div>
            {errors.amount && <p className="text-xs text-red-400 mt-1">{errors.amount}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`${inputBase} ${inputOk} cursor-pointer`}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-800">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Date *</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className={`${inputBase} ${errors.date ? inputErr : inputOk} [color-scheme:dark]`}
            />
            {errors.date && <p className="text-xs text-red-400 mt-1">{errors.date}</p>}
          </div>

          {/* Note */}
          <div className="sm:col-span-2 lg:col-span-2">
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Note (optional)</label>
            <input
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Brief description…"
              className={`${inputBase} ${inputOk}`}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-5">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                Saving…
              </>
            ) : (
              "Add Expense"
            )}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="text-sm text-slate-400 hover:text-slate-200 px-4 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 transition-all"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
