import { Card } from './Card';
import { Pie, PieChart, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

const palette = ['#22d3ee', '#a855f7', '#f59e0b', '#22c55e', '#ef4444', '#3b82f6', '#ec4899'];

type ChartCardProps = {
  title: string;
  type: 'pie' | 'line' | 'bar';
  data: any[];
  dataKey?: string;
  nameKey?: string;
};

export const ChartCard = ({ title, type, data, dataKey = 'value', nameKey = 'name' }: ChartCardProps) => (
  <Card title={title} className="h-80">
    <div className="h-72">
      <ResponsiveContainer>
        {type === 'pie' && (
          <PieChart>
            <Pie data={data} dataKey={dataKey} nameKey={nameKey} fill="#22d3ee" label>
              {data.map((_, i) => (
                <Cell key={i} fill={palette[i % palette.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}
        {type === 'line' && (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey={nameKey} stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} stroke="#22d3ee" strokeWidth={2} />
          </LineChart>
        )}
        {type === 'bar' && (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey={nameKey} stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey={dataKey} fill="#22d3ee" radius={[6, 6, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  </Card>
);
