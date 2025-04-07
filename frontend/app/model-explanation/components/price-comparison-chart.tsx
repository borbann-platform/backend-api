"use client"

import { useTheme } from "next-themes"
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
} from "@/components/ui/chart"

interface PropertyData {
  name: string
  price: number
  size: number
  age: number
}

interface PriceComparisonChartProps {
  property: PropertyData
  comparisons: PropertyData[]
}

export function PriceComparisonChart({ property, comparisons }: PriceComparisonChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Combine property and comparisons
  const data = [property, ...comparisons]

  // Format the price for display
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="name" stroke={isDark ? "#9ca3af" : "#6b7280"} />
        <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} stroke={isDark ? "#9ca3af" : "#6b7280"} />
        <Tooltip
          formatter={(value: number) => [formatPrice(value), "Price"]}
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "white",
            borderRadius: "0.375rem",
            border: isDark ? "1px solid #374151" : "1px solid #e2e8f0",
            fontSize: "0.75rem",
            color: isDark ? "#e5e7eb" : "#1f2937",
          }}
        />
        <Legend />
        <Bar dataKey="price" name="Price" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === 0 ? "#3b82f6" : "#6b7280"}
              fillOpacity={index === 0 ? 1 : 0.7}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

