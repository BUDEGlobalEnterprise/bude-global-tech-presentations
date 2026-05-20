import { SearchX } from "lucide-react";

interface EmptyStateProps {
  query: string;
  onClear: () => void;
}

export function EmptyState({ query, onClear }: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
      <SearchX className="h-8 w-8 text-muted-foreground" />
      <h3 className="text-base font-semibold">No matches</h3>
      <p className="text-sm text-muted-foreground">
        Nothing came back for <span className="font-medium">&quot;{query}&quot;</span>.
        Try a broader term or clear the search.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-bude-gradient px-4 py-1.5 text-xs font-medium text-white shadow-sm transition-transform hover:scale-105"
      >
        Clear search
      </button>
    </div>
  );
}
