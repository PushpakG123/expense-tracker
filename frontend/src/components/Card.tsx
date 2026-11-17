import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type Props = PropsWithChildren<{
  title?: string;
  actions?: React.ReactNode;
  className?: string;
}>;

export const Card = ({ title, actions, className, children }: Props) => (
  <section className={clsx('card', className)}>
    {(title || actions) && (
      <div className="mb-4 flex items-center justify-between">
        {title && <h3 className="text-sm font-semibold text-slate-200">{title}</h3>}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    )}
    {children}
  </section>
);
