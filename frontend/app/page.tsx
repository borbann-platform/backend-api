/*
========================================
File: frontend/app/page.tsx
========================================
*/
import Image from "next/image";
import Link from "next/link"; // Import Link
import { Button } from "@/components/ui/button"; // Import common UI

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-8 sm:p-20 text-center">
      {/* Replace with your actual logo/branding */}
      <h1 className="text-4xl font-bold mb-4">Welcome to Borbann</h1>
      <p className="text-lg text-muted-foreground mb-8">Your data integration and analysis platform.</p>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Link href="/map">
          <Button size="lg">Go to Map</Button>
        </Link>
        <Link href="/documentation">
          {" "}
          {/* Example link */}
          <Button size="lg" variant="outline">
            Read Docs
          </Button>
        </Link>
      </div>

      {/* Optional: Add more introductory content or links */}
      <footer className="absolute bottom-8 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Borbann Project.
      </footer>
    </div>
  );
}
