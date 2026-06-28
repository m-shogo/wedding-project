interface HeaderProps {
  title: string;
  description?: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-bold text-navy-900 font-serif">{title}</h1>
      {description && (
        <p className="mt-1 text-sm text-navy-500">{description}</p>
      )}
    </header>
  );
}
