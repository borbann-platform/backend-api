/*
========================================
File: frontend/features/model-explanation/components/feature-importance-chart.tsx
========================================
*/
"use client";

import { useTheme } from "next-themes";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "@/components/ui/chart"; // Using shared ui chart components
import type { FeatureImportance } from "../types"; // Feature specific type

interface FeatureImportanceChartProps {
  features: FeatureImportance[];
}

export function FeatureImportanceChart({ features }: FeatureImportanceChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Sort features by importance for consistent display
  const sortedFeatures = [...features].sort((a, b) => b.importance - a.importance);

  // Define colors based on impact
  const getBarColor = (impact: "positive" | "negative" | "neutral") => {
    if (impact === "positive") return "#10b981"; // Green
    if (impact === "negative") return "#ef4444"; // Red
    return "#f59e0b"; // Amber/Yellow for neutral
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={sortedFeatures} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={true}
          vertical={false} // Typically vertical grid lines are less useful for horizontal bar charts
          stroke={isDark ? "#374151" : "#e5e7eb"}
        />
        <XAxis
          type="number"
          domain={[0, 100]} // Assuming importance is a percentage
          tickFormatter={(value) => `${value}%`}
          stroke={isDark ? "#9ca3af" : "#6b7280"}
        />
        <YAxis
          dataKey="name"
          type="category"
          width={80} // Adjust width based on longest label
          stroke={isDark ? "#9ca3af" : "#6b7280"}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(value: number) => [`${value.toFixed(1)}%`, "Importance"]}
          labelFormatter={(label: string) => `Feature: ${label}`} // Show feature name in tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "white",
            borderRadius: "0.375rem",
            border: isDark ? "1px solid #374151" : "1px solid #e2e8f0",
            fontSize: "0.75rem",
            color: isDark ? "#e5e7eb" : "#1f2937",
          }}
        />
        <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
          {sortedFeatures.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.impact)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
