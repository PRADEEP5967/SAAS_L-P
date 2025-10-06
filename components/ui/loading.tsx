import { Loader2 } from "lucide-react";

interface LoadingProps {
  text?: string;
  className?: string;
}

export function Loading({ text = "Loading...", className = "" }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className="h-6 w-6 animate-spin mr-2" />
      <span>{text}</span>
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading />
    </div>
  );
}

export function CardLoading() {
  return (
    <div className="p-6 flex items-center justify-center min-h-[200px] rounded-lg border bg-card">
      <Loading />
    </div>
  );
}