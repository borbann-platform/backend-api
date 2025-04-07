"use client"

import { useTheme } from "next-themes"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "@/components/ui/chart"

interface Feature {
  name: string
  importance: number
  value: string
  impact: "positive" | "negative" | "neutral"
}

interface FeatureImportanceChartProps {
  features: Feature[]
}

export function FeatureImportanceChart({ features }: FeatureImportanceChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Sort features by importance
  const sortedFeatures = [...features].sort((a, b) => b.importance - a.importance)

  const getBarColor = (impact: string) => {
    if (impact === "positive") return "#10b981"
    if (impact === "negative") return "#ef4444"
    return "#f59e0b"
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={sortedFeatures} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 5 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={true}
          vertical={false}
          stroke={isDark ? "#374151" : "#e5e7eb"}
        />
        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
          stroke={isDark ? "#9ca3af" : "#6b7280"}
        />
        <YAxis dataKey="name" type="category" width={90} stroke={isDark ? "#9ca3af" : "#6b7280"} />
        <Tooltip
          formatter={(value: number) => [`${value}%`, "Importance"]}
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
  )
}

