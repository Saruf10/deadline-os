interface Props {
  badge?: string;
  title: string;
  subtitle?: string;
}

export default function SectionTitle({
  badge,
  title,
  subtitle,
}: Props) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {badge && (
        <span className="rounded-full border px-4 py-2 text-sm font-medium">
          {badge}
        </span>
      )}

      <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-6 text-lg text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}