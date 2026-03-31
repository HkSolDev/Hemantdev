"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2];

const LIGHT_COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const DARK_COLORS  = ["#161b22",  "#0e4429", "#006d32", "#26a641", "#39d353"];
const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS   = ["", "Mon", "", "Wed", "", "Fri", ""];
const GAP = 2;       // gap between cells (px)
const DAY_W = 26;    // day-label column width (px)

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: Contribution[];
}

/** Group flat list of days into columns of 7 (Sun–Sat), padding the first week. */
function getWeeks(contributions: Contribution[]): Contribution[][] {
  const weeks: Contribution[][] = [];
  let week: Contribution[] = [];

  contributions.forEach((day, i) => {
    const dow = new Date(day.date + "T00:00:00").getDay();
    if (i === 0 && dow !== 0) {
      for (let p = 0; p < dow; p++) week.push({ date: "", count: 0, level: 0 });
    }
    week.push(day);
    if (week.length === 7) { weeks.push(week); week = []; }
  });
  if (week.length > 0) {
    while (week.length < 7) week.push({ date: "", count: 0, level: 0 });
    weeks.push(week);
  }
  return weeks;
}

/** Returns Map<weekIndex → monthLabel> for weeks where a new month begins. */
function getMonthStarts(weeks: Contribution[][]): Map<number, string> {
  const map = new Map<number, string>();
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const first = week.find((d) => d.date !== "");
    if (!first) return;
    const m = new Date(first.date + "T00:00:00").getMonth();
    if (m !== lastMonth) { map.set(wi, MONTH_LABELS[m]); lastMonth = m; }
  });
  return map;
}

function useContributions(year: number) {
  const [data, setData]       = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true); setError(false);
    try {
      const res = await fetch(`/api/github-contributions?year=${year}`);
      if (!res.ok) throw new Error("bad");
      setData(await res.json());
    } catch { setError(true); }
    finally { setLoading(false); }
  }, [year]);

  useEffect(() => { fetchData(); }, [fetchData]);
  return { data, loading, error };
}

export default function GitHubSection() {
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const [fading, setFading]             = useState(false);
  const [isDark, setIsDark]             = useState(false);
  const [cell, setCell]                 = useState(11);   // dynamic cell size
  const graphRef                        = useRef<HTMLDivElement>(null);
  const { data, loading, error }        = useContributions(selectedYear);

  /* ── Responsive cell size ── */
  useEffect(() => {
    const el = graphRef.current;
    if (!el) return;
    const compute = (w: number) => {
      // available = container width − day-label column − right buffer
      const avail = w - DAY_W - 8;
      // 53 weeks, 52 gaps between them
      const size  = Math.floor((avail - 52 * GAP) / 53);
      setCell(Math.max(8, Math.min(13, size)));
    };
    compute(el.offsetWidth);
    const ro = new ResizeObserver(([e]) => compute(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ── Dark mode ── */
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const mo = new MutationObserver(check);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  const switchYear = (y: number) => {
    if (y === selectedYear) return;
    setFading(true);
    setTimeout(() => { setSelectedYear(y); setFading(false); }, 160);
  };

  const colors      = isDark ? DARK_COLORS : LIGHT_COLORS;
  const total       = data?.total?.[selectedYear] ?? null;
  const weeks       = data ? getWeeks(data.contributions) : [];
  const monthStarts = weeks.length ? getMonthStarts(weeks) : new Map<number, string>();
  const graphH      = 7 * cell + 6 * GAP; // exact pixel height of the grid

  return (
    <div className="rounded-xl border border-border bg-background p-4 sm:p-5">
      {/* ── Header ── */}
      <div className="flex items-start justify-between flex-wrap gap-2 mb-4">
        <div>
          <h2 className="text-sm font-semibold">
            See me winning in{" "}
            <span className="text-blue-500">{selectedYear}</span>
          </h2>
          {total !== null && !loading && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {total.toLocaleString()} contributions
            </p>
          )}
        </div>

        {/* Year tabs */}
        <div className="flex items-center gap-0.5 rounded-lg border border-border p-0.5 bg-muted/40">
          {YEARS.map((y) => (
            <button
              key={y}
              onClick={() => switchYear(y)}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer",
                selectedYear === y
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* ── Graph area (ref here for ResizeObserver) ── */}
      <div ref={graphRef} className="w-full">

        {/* Skeleton while loading */}
        {(loading || fading) && (
          <div className="animate-pulse" style={{ height: graphH + 18 }}>
            <div style={{ height: 14, marginBottom: 4 }} />
            {Array.from({ length: 7 }).map((_, r) => (
              <div key={r} style={{ display: "flex", gap: GAP, marginBottom: r < 6 ? GAP : 0 }}>
                <div style={{ width: DAY_W, flexShrink: 0 }} />
                {Array.from({ length: 53 }).map((_, c) => (
                  <div
                    key={c}
                    className="bg-muted rounded-sm flex-1"
                    style={{ height: cell }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && !fading && error && (
          <div
            className="flex items-center justify-center text-sm text-muted-foreground"
            style={{ height: graphH + 18 }}
          >
            Could not load contributions graph.
          </div>
        )}

        {/* Contribution grid */}
        {!loading && !fading && !error && data && weeks.length > 0 && (
          <div className={cn("transition-opacity duration-150", fading ? "opacity-0" : "opacity-100")}>

            {/* Month labels row — in-flow, one slot per week */}
            <div
              style={{
                display: "flex",
                gap: GAP,
                paddingLeft: DAY_W + 4,
                marginBottom: 4,
                height: 14,
              }}
            >
              {weeks.map((_, wi) => (
                <div
                  key={wi}
                  className="text-muted-foreground"
                  style={{
                    width: cell,
                    flexShrink: 0,
                    fontSize: 9,
                    overflow: "visible",
                    whiteSpace: "nowrap",
                    lineHeight: "14px",
                  }}
                >
                  {monthStarts.get(wi) ?? ""}
                </div>
              ))}
            </div>

            {/* Day labels + cell columns */}
            <div style={{ display: "flex", gap: 4 }}>
              {/* Day labels */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: GAP,
                  width: DAY_W,
                  flexShrink: 0,
                }}
              >
                {DAY_LABELS.map((label, i) => (
                  <div
                    key={i}
                    className="text-muted-foreground"
                    style={{
                      height: cell,
                      fontSize: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      paddingRight: 4,
                      lineHeight: 1,
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* Week columns */}
              <div style={{ display: "flex", gap: GAP, flex: 1 }}>
                {weeks.map((week, wi) => (
                  <div
                    key={wi}
                    style={{ display: "flex", flexDirection: "column", gap: GAP, flex: "0 0 auto" }}
                  >
                    {week.map((day, di) => (
                      <div
                        key={di}
                        title={day.date ? `${day.date}: ${day.count} contributions` : ""}
                        style={{
                          width: cell,
                          height: cell,
                          borderRadius: Math.max(2, Math.round(cell * 0.18)),
                          backgroundColor: day.date ? colors[day.level] : "transparent",
                          flexShrink: 0,
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <span>{selectedYear} contributions</span>
              <div className="flex items-center gap-1">
                <span>Less</span>
                {colors.map((c) => (
                  <span
                    key={c}
                    className="inline-block rounded-sm flex-shrink-0"
                    style={{ width: cell, height: cell, background: c }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
