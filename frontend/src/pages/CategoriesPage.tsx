import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Category, TransactionType } from '../types';
import { Card } from '../components/Card';

export const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [type, setType] = useState<TransactionType>('EXPENSE');
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    const res = await api.get('/categories');
    setCategories(res.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post('/categories', { name, type });
      setName('');
      await load();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error creating category');
    }
  };

  const remove = async (id: number) => {
    await api.delete(`/categories/${id}`);
    await load();
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card title="Add Category">
        <form className="space-y-3" onSubmit={addCategory}>
          <div>
            <label className="text-xs text-slate-400">Name</label>
            <input className="input mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs text-slate-400">Type</label>
            <select className="input mt-1" value={type} onChange={(e) => setType(e.target.value as TransactionType)}>
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
          </div>
          {error && <div className="text-sm text-rose-400">{error}</div>}
          <button className="btn-primary" type="submit">Create</button>
        </form>
      </Card>

      <Card title="Your Categories">
        <div className="space-y-2">
          {categories.map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <div className="font-semibold text-slate-200">{c.name}</div>
                <div className="text-xs text-slate-500">{c.type}</div>
              </div>
              <button className="text-rose-400 text-sm" onClick={() => remove(c.id)}>Delete</button>
            </div>
          ))}
          {categories.length === 0 && <div className="text-sm text-slate-500">No categories yet.</div>}
        </div>
      </Card>
    </div>
  );
};
