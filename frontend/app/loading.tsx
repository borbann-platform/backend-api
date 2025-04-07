/* === src/app/loading.tsx === */
import { Skeleton } from "@/components/ui/skeleton";

// A more detailed full-page loading skeleton mimicking the layout
export default function Loading() {
  return (
    <div className="flex-1 flex flex-col p-6 space-y-6">
      {/* Page Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>

      {/* Content Area Skeleton - Adjust based on typical page content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column / Filters Skeleton (Example) */}
        <div className="md:col-span-1 space-y-4">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>

        {/* Right Column / Main Content Skeleton (Example) */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-9 w-24" />
          </div>
          <Skeleton className="h-96 w-full rounded-lg" />
          <div className="flex justify-center">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
