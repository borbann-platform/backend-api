"use client"

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "@/components/ui/chart"
import { useTheme } from "next-themes"

interface AreaChartProps {
  data: number[]
  color: string
}

export function AreaChart({ data, color }: AreaChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Generate labels (months)
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]

  // Format the data for the chart
  const chartData = data.map((value, index) => ({
    name: labels[index],
    value: value,
  }))

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
    <div className="h-[80px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="name" hide />
          <YAxis hide domain={[(dataMin: number) => dataMin * 0.95, (dataMax: number) => dataMax * 1.05]} />
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
          <Line
            type="monotone"
            dataKey="value"
            stroke={color.replace("rgba", "rgb").replace(/,[^,]*\)/, ")")}
            strokeWidth={2}
            dot={{ r: 3, strokeWidth: 1 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
            fill={color}
            fillOpacity={0.5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

