import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Category, Transaction } from '../types';
import { StatsGrid } from '../components/StatsGrid';
import { ChartCard } from '../components/ChartCard';
import { TransactionsTable } from '../components/TransactionsTable';
import { Card } from '../components/Card';

type MonthlyReportItem = { month: string; total: number };
type CategoryReportItem = { category: string; total: number };

export const DashboardPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [monthly, setMonthly] = useState<MonthlyReportItem[]>([]);
  const [byCategory, setByCategory] = useState<CategoryReportItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [txRes, catRes, monthlyRes, catRepRes] = await Promise.all([
          api.get('/transactions', { params: { page: 0, size: 5, sort: 'transactionDate,desc' } }),
          api.get('/categories'),
          api.get('/reports/monthly', { params: { months: 6 } }),
          api.get('/reports/category')
        ]);
        setTransactions(txRes.data.content || txRes.data || []);
        setCategories(catRes.data || []);
        setMonthly(monthlyRes.data || []);
        setByCategory(catRepRes.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const income = transactions.filter(t => t.type === 'INCOME').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'EXPENSE').reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;

  return (
    <div className="space-y-6">
      <StatsGrid
        stats={[
          { label: 'Income (this page)', value: `$${income.toFixed(2)}`, accent: 'from-emerald-400 to-emerald-600' },
          { label: 'Expense (this page)', value: `$${expense.toFixed(2)}`, accent: 'from-rose-400 to-rose-600' },
          { label: 'Balance', value: `$${balance.toFixed(2)}`, accent: 'from-indigo-400 to-indigo-600' },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard
          title="Spending by category"
          type="pie"
          data={byCategory.map(c => ({ name: c.category, value: c.total }))}
        />
        <ChartCard
          title="Expenses last months"
          type="line"
          data={monthly.map(m => ({ name: m.month, value: m.total }))}
        />
        <Card title="Top categories">
          <ul className="space-y-3">
            {byCategory.map((c) => (
              <li key={c.category} className="flex items-center justify-between text-sm">
                <span className="text-slate-200">{c.category}</span>
                <span className="font-semibold">${c.total.toFixed(2)}</span>
              </li>
            ))}
            {byCategory.length === 0 && <div className="text-slate-500 text-sm">No data yet</div>}
          </ul>
        </Card>
      </div>

      <Card title="Recent transactions">
        <TransactionsTable data={transactions.slice(0, 5)} />
      </Card>
    </div>
  );
};
