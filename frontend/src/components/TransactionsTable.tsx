import { Transaction } from '../types';
import clsx from 'clsx';

type Props = {
  data: Transaction[];
};

export const TransactionsTable = ({ data }: Props) => (
  <div className="overflow-hidden rounded-2xl border border-white/5 bg-card/70">
    <table className="min-w-full divide-y divide-white/5 text-sm">
      <thead className="bg-white/5 text-left">
        <tr>
          <th className="px-4 py-3 font-semibold text-slate-300">Date</th>
          <th className="px-4 py-3 font-semibold text-slate-300">Type</th>
          <th className="px-4 py-3 font-semibold text-slate-300">Category</th>
          <th className="px-4 py-3 font-semibold text-slate-300">Amount</th>
          <th className="px-4 py-3 font-semibold text-slate-300">Note</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {data.map((tx) => (
          <tr key={tx.id} className="hover:bg-white/5">
            <td className="px-4 py-3 text-slate-200">{tx.transactionDate}</td>
            <td className="px-4 py-3">
              <span
                className={clsx(
                  'badge',
                  tx.type === 'INCOME' ? 'badge-income' : 'badge-expense'
                )}
              >
                {tx.type}
              </span>
            </td>
            <td className="px-4 py-3 text-slate-200">{tx.categoryName}</td>
            <td className="px-4 py-3 font-semibold">
              {tx.type === 'EXPENSE' ? '-' : '+'}${tx.amount.toFixed(2)}
            </td>
            <td className="px-4 py-3 text-slate-300">{tx.note || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
