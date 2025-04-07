/*
========================================
File: frontend/features/model-explanation/components/price-comparison-chart.tsx
========================================
*/
"use client";

import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "@/components/ui/chart"; // Using shared ui chart components
import type { ComparableProperty, PropertyBaseDetails } from "../types"; // Feature specific types

interface PriceComparisonChartProps {
  property: PropertyBaseDetails & { name: string }; // Add name for the primary property
  comparisons: ComparableProperty[];
}

export function PriceComparisonChart({ property, comparisons }: PriceComparisonChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Combine property and comparisons for chart data
  // Ensure the property being explained is included and identifiable
  const data = [
    { ...property }, // Keep all details for tooltip if needed
    ...comparisons.map((c) => ({ ...c, name: c.address })), // Use address as name for comparisons
  ];

  // Format the price for display
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      notation: "compact", // Use compact notation like 15M
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(value);
  };

  // Custom tooltip content
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload; // Get the data point for this bar
      return (
        <div className="p-2 bg-background border rounded shadow-lg text-xs">
          <p className="font-bold">{label}</p>
          <p>Price: {formatPrice(data.price)}</p>
          <p>Size: {data.size} sqm</p>
          <p>Age: {data.age} years</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 10, left: 40, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="name" stroke={isDark ? "#9ca3af" : "#6b7280"} fontSize={10} interval={0} />
        <YAxis
          tickFormatter={(value) => formatPrice(value)}
          stroke={isDark ? "#9ca3af" : "#6b7280"}
          fontSize={10}
          width={40}
        />
        <Tooltip
          cursor={{ fill: isDark ? "rgba(107, 114, 128, 0.2)" : "rgba(209, 213, 219, 0.4)" }} // Subtle hover effect
          content={<CustomTooltip />} // Use custom tooltip
          wrapperStyle={{ zIndex: 100 }} // Ensure tooltip is on top
        />
        {/* <Legend /> // Legend might be redundant if XAxis labels are clear */}
        <Bar dataKey="price" name="Price" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.name === property.name ? "#3b82f6" : "#6b7280"} // Highlight the main property
              fillOpacity={entry.name === property.name ? 1 : 0.7}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
