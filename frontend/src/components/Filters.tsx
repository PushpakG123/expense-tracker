import { Category, TransactionType } from '../types';

type Props = {
  type?: TransactionType;
  categoryId?: number;
  month?: string;
  categories: Category[];
  onChange: (filters: { type?: TransactionType; categoryId?: number; month?: string }) => void;
};

export const Filters = ({ type, categoryId, month, categories, onChange }: Props) => {
  return (
    <div className="card grid gap-3 md:grid-cols-4">
      <div>
        <label className="text-xs text-slate-400">Type</label>
        <select
          value={type || ''}
          onChange={(e) => onChange({ type: e.target.value as TransactionType || undefined, categoryId, month })}
          className="input mt-1"
        >
          <option value="">All</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
      </div>
      <div>
        <label className="text-xs text-slate-400">Category</label>
        <select
          value={categoryId?.toString() || ''}
          onChange={(e) => onChange({ type, categoryId: e.target.value ? Number(e.target.value) : undefined, month })}
          className="input mt-1"
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs text-slate-400">Month (YYYY-MM)</label>
        <input
          value={month || ''}
          onChange={(e) => onChange({ type, categoryId, month: e.target.value || undefined })}
          className="input mt-1"
          placeholder="2025-12"
        />
      </div>
      <div className="flex items-end justify-end">
        <button className="btn-secondary" onClick={() => onChange({ type: undefined, categoryId: undefined, month: undefined })}>
          Clear
        </button>
      </div>
    </div>
  );
};
