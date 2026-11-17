import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { ChartCard } from '../components/ChartCard';
import { Card } from '../components/Card';

type MonthlyReportItem = { month: string; total: number };
type CategoryReportItem = { category: string; total: number };

export const ReportsPage = () => {
  const [monthly, setMonthly] = useState<MonthlyReportItem[]>([]);
  const [byCategory, setByCategory] = useState<CategoryReportItem[]>([]);

  const load = async () => {
    const [mRes, cRes] = await Promise.all([
      api.get('/reports/monthly', { params: { months: 6 } }),
      api.get('/reports/category')
    ]);
    setMonthly(mRes.data || []);
    setByCategory(cRes.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ChartCard title="Spending Trend" type="line" data={monthly.map(m => ({ name: m.month, value: m.total }))} />
      <ChartCard title="By Category" type="pie" data={byCategory.map(c => ({ name: c.category, value: c.total }))} />
      <Card title="Summary">
        <ul className="space-y-2 text-sm">
          {monthly.map((m) => (
            <li key={m.month} className="flex items-center justify-between">
              <span>{m.month}</span>
              <span className="font-semibold">${m.total.toFixed(2)}</span>
            </li>
          ))}
          {monthly.length === 0 && <div className="text-slate-500">No data yet.</div>}
        </ul>
      </Card>
    </div>
  );
};
