import React, { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { Chart } from "react-google-charts";
import './new.css'

export function PortfolioChartNew({
  allocations = [
    { label: "Tech", value: 42, color: "#7c3aed" },
    { label: "Consumer", value: 18, color: "#ec4899" },
    { label: "Energy", value: 12, color: "#22d3ee" },
    { label: "Healthcare", value: 15, color: "#34d399" },
    { label: "Cash", value: 13, color: "#f59e0b" },
  ],
  height = 220,
}) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const [selectedRow, setSelectedRow] = useState(null); // persist selection across redraws
  const total = useMemo(() => allocations.reduce((a, b) => a + b.value, 0), [allocations]);

  const chartData = useMemo(
    () => [["Label", "Value"], ...allocations.map((a) => [a.label, a.value])],
    [allocations]
  );

  const slices = useMemo(() => {
    const m = {};
    allocations.forEach((a, i) => (m[i] = { color: a.color }));
    return m;
  }, [allocations]);

  const options = useMemo(
    () => ({
      pieHole: 0.72,
      legend: "none",
      pieSliceText: "none",
      slices,
      backgroundColor: "transparent",
      chartArea: { left: 10, top: 10, width: "90%", height: "90%", backgroundColor: "transparent" },
      pieSliceBorderColor: "transparent",
      tooltip: { isHtml: true, text: "percentage", trigger: "focus" },
      enableInteractivity: true,
    }),
    [slices]
  );

  const [center, setCenter] = useState({ label: "Total", value: total });
  useEffect(() => setCenter({ label: "Total", value: total }), [total]);

  // Re-apply selection after chart is ready or after redraws
  const applySelection = () => {
    const cw = chartRef.current?.chartWrapper;
    const chart = cw?.getChart?.();
    if (!chart) return;
    if (selectedRow == null) {
      chart.setSelection([]);
      setCenter({ label: "Total", value: total });
    } else {
      chart.setSelection([{ row: selectedRow, column: null }]);
      const sel = allocations[selectedRow];
      if (sel) setCenter({ label: sel.label, value: sel.value });
    }
  };

  // Hook up selection event
  const onReady = () => {
    const cw = chartRef.current?.chartWrapper;
    const chart = cw?.getChart?.();
    if (!chart) return;

    // Avoid duplicate listeners across redraws
    window.google.visualization.events.removeAllListeners(chart);
    window.google.visualization.events.addListener(chart, "select", () => {
      const sel = chart.getSelection?.()[0];
      if (sel && sel.row != null) {
        setSelectedRow(sel.row);
        const { label, value } = allocations[sel.row];
        setCenter({ label, value });
      } else {
        setSelectedRow(null);
        setCenter({ label: "Total", value: total });
      }
    });

    applySelection();
  };

  // ------------- Robust resize handling -------------
  // Force redraw on container resize (react-google-charts sometimes misses nested resizes).
  const [, setResizeTick] = useState(0);
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    let raf = 0;

    const ro = new ResizeObserver(() => {
      // Throttle with rAF to avoid spamming redraws
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Trigger a redraw by bumping a state “tick”
        setResizeTick((x) => x + 1);
        // Also try manual redraw if chart is already there
        const cw = chartRef.current?.chartWrapper;
        if (cw?.draw) cw.draw();
      });
    });

    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  // Re-apply selection after each redraw tick
  useEffect(() => {
    // slight delay lets Google finish its internal layout
    const t = setTimeout(applySelection, 0);
    return () => clearTimeout(t);
  });

  return (
    <div ref={containerRef} className="donut-card dark" style={{ position: "relative", width: "100%", height }}>
      <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        width="100%"
        height={`${height}px`}
        getChartWrapper={(cw) => (chartRef.current = { chartWrapper: cw })}
        chartEvents={[{ eventName: "ready", callback: onReady }]}
        loader={<div>Loading…</div>}
      />
      <div className="donut-center" aria-hidden>
        <div className="donut-center__inner">
          <div className="donut-center__label">{center.label}</div>
          <div className="donut-center__value">{center.value}</div>
        </div>
      </div>
    </div>
  );
}
