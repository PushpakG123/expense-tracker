import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Category, Paginated, Transaction, TransactionType } from '../types';
import { Filters } from '../components/Filters';
import { TransactionsTable } from '../components/TransactionsTable';
import { Card } from '../components/Card';

export const TransactionsPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [pageData, setPageData] = useState<Paginated<Transaction> | null>(null);
  const [filters, setFilters] = useState<{ type?: TransactionType; categoryId?: number; month?: string }>({});
  const [form, setForm] = useState({
    type: 'EXPENSE' as TransactionType,
    categoryId: 0,
    amount: '',
    note: '',
    transactionDate: ''
  });

  const loadCategories = async () => {
    const res = await api.get('/categories');
    setCategories(res.data || []);
    if (res.data?.length && form.categoryId === 0) {
      setForm((f) => ({ ...f, categoryId: res.data[0].id }));
    }
  };

  const load = async (page = 0) => {
    const res = await api.get('/transactions', {
      params: {
        page,
        size: 10,
        sort: 'transactionDate,desc',
        ...filters
      }
    });
    setPageData(res.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    load();
  }, [filters]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/transactions', {
      type: form.type,
      categoryId: Number(form.categoryId),
      amount: Number(form.amount),
      note: form.note,
      transactionDate: form.transactionDate
    });
    await load();
  };

  return (
    <div className="space-y-4">
      <Filters
        categories={categories}
        type={filters.type}
        categoryId={filters.categoryId}
        month={filters.month}
        onChange={setFilters}
      />

      <Card title="Add Transaction">
        <form className="grid gap-3 md:grid-cols-5" onSubmit={submit}>
          <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as TransactionType })}>
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
          <select
            className="input"
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            className="input"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <input
            className="input"
            placeholder="Date (YYYY-MM-DD)"
            value={form.transactionDate}
            onChange={(e) => setForm({ ...form, transactionDate: e.target.value })}
          />
          <input
            className="input md:col-span-5"
            placeholder="Note"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
          <div className="md:col-span-5 flex justify-end">
            <button className="btn-primary" type="submit">
              Save
            </button>
          </div>
        </form>
      </Card>

      <TransactionsTable data={pageData?.content || []} />
      <div className="flex items-center justify-end gap-2 text-sm text-slate-400">
        <button
          className="btn-secondary"
          disabled={!pageData || pageData.number === 0}
          onClick={() => load((pageData?.number || 0) - 1)}
        >
          Prev
        </button>
        <span>
          Page {(pageData?.number || 0) + 1} / {pageData?.totalPages || 1}
        </span>
        <button
          className="btn-secondary"
          disabled={!pageData || pageData.number + 1 >= (pageData?.totalPages || 1)}
          onClick={() => load((pageData?.number || 0) + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
