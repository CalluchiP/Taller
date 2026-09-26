interface Props {
  variant: 'warning' | 'info' | 'error' | 'success';
  children: React.ReactNode;
  className?: string;
}

const styles: Record<Props['variant'], { wrapper: string; bar: string; icon: string }> = {
  warning: { wrapper: 'bg-amber-50 border-amber-200 text-amber-800',   bar: 'bg-amber-400', icon: '⚠️' },
  info:    { wrapper: 'bg-blue-50  border-blue-200  text-blue-800',    bar: 'bg-blue-500',  icon: 'ℹ️' },
  error:   { wrapper: 'bg-red-50   border-red-200   text-red-800',     bar: 'bg-red-500',   icon: '⛔' },
  success: { wrapper: 'bg-emerald-50 border-emerald-200 text-emerald-800', bar: 'bg-emerald-500', icon: '✅' },
};

export default function WarningBanner({ variant, children, className = '' }: Props) {
  const s = styles[variant];
  return (
    <div className={`relative flex gap-3 items-start px-4 py-3.5 rounded-2xl border overflow-hidden text-sm ${s.wrapper} ${className}`}>
      {/* Barra izquierda */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${s.bar}`} />
      <span className="mt-0.5 shrink-0 pl-1">{s.icon}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}
