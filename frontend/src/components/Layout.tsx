import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/transactions', label: 'Transactions' },
  { to: '/categories', label: 'Categories' },
  { to: '/reports', label: 'Reports' },
  { to: '/recurring', label: 'Recurring' },
];

export const Layout = () => {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-base text-white flex">
      <aside className="hidden md:flex w-60 flex-col gap-4 p-5 bg-card/70 border-r border-white/5">
        <div className="flex items-center gap-2 text-lg font-bold">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent to-accent2" />
          <span>Expense Tracker</span>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  'rounded-lg px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-accent/15 text-accent'
                    : 'hover:bg-white/5 text-slate-200'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} className="btn-secondary">Logout</button>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-card/60 backdrop-blur">
          <div className="md:hidden flex items-center gap-2">
            <Link to="/dashboard" className="font-semibold">Expense Tracker</Link>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <span className="hidden sm:block">
              {navItems.find(n => location.pathname.startsWith(n.to))?.label || 'Welcome'}
            </span>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
