import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  MapPin,
  BarChart2,
  ChevronDown,
  Check,
  Building,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTopNavigationStore } from "@/store/top-navgation-store";
import { useShallow } from "zustand/react/shallow";
import { Input } from "../ui/input";

export function TopNavigation() {
  const { selectedModel, setSelectedModel, models } = useTopNavigationStore(
    useShallow(
    (state) => ({
      selectedModel: state.selectedModel,
      setSelectedModel: state.setSelectedModel,
      models: state.models,
    })),
  );

  return (
    <div className="absolute top-0 left-0 right-0 bg-background/95 backdrop-blur-sm p-4 flex items-center justify-between z-10 border-b">
      <Link href="/" className="flex items-center gap-2">
        <Home className="h-5 w-5" />
        <span className="font-semibold">BorBann</span>
      </Link>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:inline">{selectedModel}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[240px]">
            {models.map((model) => (
              <DropdownMenuItem
                key={model}
                onClick={() => setSelectedModel(model)}
                className="flex items-center gap-2"
              >
                {model === selectedModel && (
                  <Check className="h-4 w-4 text-primary" />
                )}
                <span className={model === selectedModel ? "font-medium" : ""}>
                  {model}
                </span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem>
              <Link href="/models" className="flex items-center w-full">
                <span className="text-primary">Manage Models...</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href="/properties">
          <Button variant="outline" size="sm" className="gap-1">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Properties</span>
          </Button>
        </Link>
        <Link href="/price-prediction">
          <Button variant="outline" size="sm" className="gap-1">
            <BarChart2 className="h-4 w-4" />
            <span className="hidden sm:inline">Price Prediction</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
