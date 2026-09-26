interface Props {
  icon?: string;
  title: string;
  description: string;
}

export default function EmptyState({ icon = '🔍', title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <span className="text-4xl mb-3">{icon}</span>
      <h3 className="text-base font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-xs">{description}</p>
    </div>
  );
}
