import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Card } from '../components/Card';

// Basit tipler – sadece bu dosyada geçerli
type TransactionType = 'EXPENSE' | 'INCOME';
type RecurrenceFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY';

type Category = {
  id: number;
  name: string;
  type: TransactionType;
};

type RecurringPayment = {
  id: number;
  type: TransactionType;
  category: Category;
  amount: number;
  note: string;
  frequency: RecurrenceFrequency;
  nextRun: string;
  active: boolean;
};

const frequencyOptions: { value: RecurrenceFrequency; label: string }[] = [
  { value: 'DAILY', label: 'Daily' },
  { value: 'WEEKLY', label: 'Weekly' },
  { value: 'MONTHLY', label: 'Monthly' }
];

export const RecurringPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [payments, setPayments] = useState<RecurringPayment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(() => ({
    type: 'EXPENSE' as TransactionType,
    categoryId: 0,
    amount: '',
    frequency: 'MONTHLY' as RecurrenceFrequency,
    nextRun: new Date().toISOString().slice(0, 10),
    note: '',
  }));

  // Kategorileri çek
  const loadCategories = async () => {
    const res = await api.get<Category[]>('/categories');
    const data = res.data ?? [];
    setCategories(data);
    if (data.length && form.categoryId === 0) {
      setForm((f) => ({ ...f, categoryId: data[0].id }));
    }
  };

  // Recurring ödemeleri çek
  const loadRecurring = async () => {
    const res = await api.get('/recurring');

    let list: RecurringPayment[] = [];
    if (Array.isArray(res.data)) {
      list = res.data;
    } else if (res.data && Array.isArray(res.data.content)) {
      // Eğer backend Page döndürüyorsa
      list = res.data.content;
    } else if (res.data) {
      // Tek obje dönerse bile listeye çevir
      list = [res.data as RecurringPayment];
    }

    setPayments(list);
  };

  useEffect(() => {
    loadCategories();
    loadRecurring();
  }, []);

  const normalizeDate = (value: string) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const match = value.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);
    if (match) {
      const [, d, m, y] = match;
      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
    return value;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const normalizedAmountStr = form.amount.replace(',', '.');
    const amountNum = Number(normalizedAmountStr);
    if (!form.amount || Number.isNaN(amountNum) || amountNum <= 0) {
      setError('Amount must be greater than 0');
      return;
    }
    const nextRunIso = normalizeDate(form.nextRun);
    if (!form.nextRun) {
      setError('Next run date is required');
      return;
    }
    if (Number.isNaN(Date.parse(nextRunIso))) {
      setError('Next run date format should be YYYY-MM-DD');
      return;
    }
    if (!form.categoryId) {
      setError('Please select a category');
      return;
    }

    setSaving(true);
    try {
      await api.post('/recurring', {
        type: form.type,
        categoryId: Number(form.categoryId),
        amount: amountNum,
        frequency: form.frequency,
        nextRun: nextRunIso,
        note: form.note,
      });

      setForm((f) => ({
        ...f,
        amount: '',
        note: '',
        nextRun: new Date().toISOString().slice(0, 10),
      }));

      await loadRecurring();
    } catch (err: any) {
      const resp = err?.response;
      const msg =
        resp?.data?.message ||
        resp?.data?.error ||
        (Array.isArray(resp?.data?.errors) && resp.data.errors.join(', ')) ||
        (typeof resp?.data === 'object' && JSON.stringify(resp.data)) ||
        (typeof resp?.data === 'string' && resp.data) ||
        resp?.statusText ||
        'Failed to save recurring payment';
      setError(msg);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      <Card title="Add Recurring Payment">
        <form className="grid gap-3 md:grid-cols-5" onSubmit={submit}>
          <select
            className="input"
            value={form.type}
            onChange={(e) =>
              setForm((f) => ({ ...f, type: e.target.value as TransactionType }))
            }
          >
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>

          <select
            className="input"
            value={form.categoryId}
            onChange={(e) =>
              setForm((f) => ({ ...f, categoryId: Number(e.target.value) }))
            }
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            className="input"
            type="number"
            min="0.01"
            step="0.01"
            required
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
          />

          <select
            className="input"
            value={form.frequency}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                frequency: e.target.value as RecurrenceFrequency,
              }))
            }
          >
            {frequencyOptions.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>

          <input
            className="input"
            type="text"
            inputMode="numeric"
            required
            placeholder="YYYY-MM-DD"
            value={form.nextRun}
            onChange={(e) => setForm((f) => ({ ...f, nextRun: e.target.value }))}
          />

          <input
            className="input md:col-span-4"
            placeholder="Note"
            value={form.note}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
          />

          <div className="md:col-span-1 flex justify-end items-center">
            <button className="btn-primary" type="submit" disabled={saving || categories.length === 0}>
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>

          {error && (
            <div className="md:col-span-5 text-sm text-rose-400">
              {error}
            </div>
          )}
        </form>
      </Card>

      <Card title="Recurring Payments">
        {payments.length === 0 ? (
          <p className="text-slate-400 text-sm">No recurring payments yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-slate-400">
              <tr>
                <th className="py-2">Type</th>
                <th className="py-2">Category</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Frequency</th>
                <th className="py-2">Next run</th>
                <th className="py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-t border-slate-800">
                  <td className="py-2">{p.type}</td>
                  <td className="py-2">{p.category?.name}</td>
                  <td className="py-2">${p.amount.toFixed(2)}</td>
                  <td className="py-2">{p.frequency}</td>
                  <td className="py-2">{p.nextRun}</td>
                  <td className="py-2">{p.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};
