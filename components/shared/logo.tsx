export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold text-white shadow-lg">
        D
      </div>

      <div>
        <h1 className="text-lg font-bold tracking-tight">
          DeadlineOS
        </h1>

        <p className="text-xs text-muted-foreground">
          Never Miss What Matters
        </p>
      </div>
    </div>
  );
}