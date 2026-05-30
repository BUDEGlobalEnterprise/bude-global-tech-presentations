"use client";

import { useEffect, useState } from "react";
import { SafeHTML } from "@/lib/safe-html";
import type { Slide } from "@/types/presentation";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  slide: Slide;
}

interface ChartSlideData extends Slide {
  chartType?: "bar" | "line" | "pie" | string;
  labels?: string[];
  data?: number[];
  note?: {
    text?: string;
  };
}

export function ChartSlide({ slide }: Props) {
  const s = slide as ChartSlideData;
  const chartType = s.chartType ?? "bar";
  const labels = s.labels ?? [];
  const dataValues = s.data ?? [];
  const noteText = s.note?.text;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Format data for Recharts
  const chartData = labels.map((label, index) => ({
    name: label,
    value: typeof dataValues[index] === "number" ? dataValues[index] : Number(dataValues[index] ?? 0),
  }));

  // Sleek dark-mode and glassmorphic harmonious colors
  // Bude Primary: #0060a0, Purple: #6f42c1, Pink/Magenta: #cb6ce6, Teal: #0d9488
  const colors = ["#0060a0", "#6f42c1", "#cb6ce6", "#0d9488", "#f59e0b", "#ef4444"];

  const renderChart = () => {
    if (!mounted) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-bude-primary border-t-transparent" />
        </div>
      );
    }

    if (chartData.length === 0) {
      return (
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          No chart data available
        </div>
      );
    }

    const CustomTooltip = ({
      active,
      payload,
    }: {
      active?: boolean;
      payload?: Array<{ name: string; value: number }>;
    }) => {
      if (active && payload && payload.length) {
        return (
          <div className="rounded-xl border border-border bg-popover/90 p-3 shadow-xl backdrop-blur-md">
            <p className="text-xs font-semibold text-foreground">{payload[0].name}</p>
            <p className="mt-1 text-sm font-bold text-bude-primary">{payload[0].value}</p>
          </div>
        );
      }
      return null;
    };

    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="name"
                stroke="currentColor"
                className="text-[10px] text-muted-foreground md:text-xs"
                tickLine={false}
              />
              <YAxis
                stroke="currentColor"
                className="text-[10px] text-muted-foreground md:text-xs"
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0060a0"
                strokeWidth={3}
                activeDot={{ r: 8, stroke: "#cb6ce6", strokeWidth: 2 }}
                dot={{ r: 5, stroke: "#6f42c1", strokeWidth: 2, fill: "#18181b" }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                className="text-[10px] md:text-xs fill-foreground font-medium"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      case "bar":
      default:
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="name"
                stroke="currentColor"
                className="text-[10px] text-muted-foreground md:text-xs"
                tickLine={false}
              />
              <YAxis
                stroke="currentColor"
                className="text-[10px] text-muted-foreground md:text-xs"
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#barGradient-${index % colors.length})`}
                  />
                ))}
              </Bar>
              <defs>
                {colors.map((color, index) => (
                  <linearGradient key={index} id={`barGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.3} />
                  </linearGradient>
                ))}
              </defs>
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 py-8 md:px-12 md:py-12">
      {slide.title && (
        <header className="mb-5 flex items-start gap-4">
          {slide.emoji && (
            <span className="shrink-0 text-4xl md:text-5xl leading-none">
              {slide.emoji}
            </span>
          )}
          <div>
            <h2 className="text-balance text-2xl font-bold leading-tight tracking-tight md:text-4xl">
              {slide.title}
            </h2>
            {slide.subtitle && (
              <p className="mt-1 text-sm text-muted-foreground md:text-base">
                {slide.subtitle}
              </p>
            )}
          </div>
        </header>
      )}

      <div className="relative min-h-0 flex-1 rounded-2xl border border-border/40 bg-card/10 p-4 md:p-6 shadow-inner backdrop-blur-sm">
        <div className="h-full w-full min-h-[220px] md:min-h-[300px]">
          {renderChart()}
        </div>
      </div>

      {noteText && (
        <div className="mt-5 shrink-0 rounded-xl border border-border/60 bg-card/50 px-4 py-3 text-center text-sm italic text-muted-foreground md:text-base">
          <SafeHTML html={noteText} />
        </div>
      )}
    </div>
  );
}
