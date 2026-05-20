import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <div className="text-6xl font-extrabold text-bude-gradient">404</div>
      <h1 className="text-xl font-semibold">Presentation not found</h1>
      <p className="text-sm text-muted-foreground">
        The deck you&apos;re looking for has either been renamed or hasn&apos;t been
        published yet.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-bude-gradient px-4 py-2 text-sm font-medium text-white shadow-sm transition-transform hover:scale-105"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all presentations
      </Link>
    </div>
  );
}
