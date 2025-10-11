import React, { useMemo, useState } from "react";
import "./portfolio_ui.css";

const TF_OPTS = ["1D", "1W", "1M", "1Y", "ALL"];

export default function Portfolio() {
  // --- mock numbers (replace with API) ---
  const equity = 12450.25;
  const pnl = -2187.5; // negative shows red
  const pnlPct = -14.94;

  // allocation in %
  const allocation = [
    { label: "Stocks", value: 49, color: "#7c3aed" },
    { label: "ETFs",   value: 35, color: "#5b21b6" },
    { label: "Cash",   value: 16, color: "#22d3ee" },
  ];

  const [tab, setTab] = useState("Deposit");   // Deposit | Withdraw
  const [tf, setTf] = useState("1D");

  // tiny fake price series per timeframe
  const series = useMemo(() => {
    const len = tf === "1D" ? 24 : tf === "1W" ? 32 : tf === "1M" ? 40 : tf === "1Y" ? 56 : 64;
    const base = 16000;
    const arr = Array.from({ length: len }).map((_, i) => {
      const drift = (i / len) * (tf === "1D" ? -500 : tf === "1W" ? -1000 : tf === "1M" ? -1400 : -1800);
      const wobble = Math.sin(i / 3) * (tf === "ALL" ? 380 : 260);
      return base + drift + wobble + (Math.random() - 0.5) * 120;
    });
    return arr;
  }, [tf]);

  const holdings = [
    { symbol: "AAPL", qty: 10, price: 170.19, change: -0.88 },
    { symbol: "AABL", qty: 5,  price: 141.32, change: -1.20 },
    { symbol: "GOOGL",qty: 8,  price: 192.55, change: -2.01 },
    { symbol: "NVDA", qty: 6,  price: 271.70, change: -2.78 },
  ];

  return (
    <div className="pf-shell">
      <div className="pf-grid">
        {/* Left rail */}
        <aside className="pf-left">
          <section className="card kpi">
            <div className="kpi__label">Total Equity</div>
            <div className="kpi__value">${equity.toLocaleString()}</div>
            <div className={`kpi__delta ${pnl >= 0 ? "up" : "down"}`}>
              {pnl >= 0 ? "+" : ""}
              {pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              {" — "}
              {pnlPct >= 0 ? "+" : ""}
              {Math.abs(pnlPct).toFixed(2)}%
            </div>
          </section>

          <section className="card donut">
            <div className="card__title">Allocation</div>
            <AllocationDonut data={allocation} />
            <ul className="legend">
              {allocation.map(a => (
                <li key={a.label}><span style={{ background: a.color }} />{a.label} — {a.value}%</li>
              ))}
            </ul>
          </section>

          <section className="pf-filters">
            <button className="chip">Filter ▾</button>
            <button className="chip">Interval ▾</button>
          </section>

          <section className="card holdings-mini">
            <div className="card__title">Holdings</div>
            <ul>
              {holdings.map((h) => (
                <li key={h.symbol}>
                  <span>{h.symbol}</span>
                  <span className="muted">{h.symbol.slice(0,3)}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        {/* Main content */}
        <main className="pf-main">
          <section className="card head">
            <h1 className="pf-title">Portfolio</h1>

            <div className="pf-head-actions">
              <div className="tabs">
                {["Deposit", "Withdraw"].map(t => (
                  <button
                    key={t}
                    className={`chip ${tab === t ? "chip--active" : ""}`}
                    onClick={() => setTab(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="timeframe">
                {TF_OPTS.map(x => (
                  <button
                    key={x}
                    className={`chip ${tf === x ? "chip--active" : ""}`}
                    onClick={() => setTf(x)}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>

            <div className="pf-chartwrap">
              <LineArea data={series} />
              <div className="pf-xaxis">
                {["AFN","MAR","MAR","APR","APR"].map((t,i)=><span key={i}>{t}</span>)}
              </div>
            </div>
          </section>

          <section className="card tbl">
            <div className="card__title">Holdings</div>
            <div className="tbl-wrap">
              <table className="tbl-basic">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Value</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map(h => {
                    const value = h.qty * h.price;
                    const isUp = h.change >= 0;
                    return (
                      <tr key={h.symbol}>
                        <td>{h.symbol}</td>
                        <td>{h.qty}</td>
                        <td>{h.price.toFixed(2)}</td>
                        <td>${value.toFixed(2)}</td>
                        <td className={isUp ? "up" : "down"}>
                          {isUp ? "+" : ""}{h.change.toFixed(2)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ---------- tiny components ---------- */

function AllocationDonut({ data }) {
  // SVG donut using circumference math
  const size = 180;
  const stroke = 24;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;

  let offset = 0;
  return (
    <div className="donut-svg">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Allocation donut">
        <circle
          cx={size/2}
          cy={size/2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,.08)"
          strokeWidth={stroke}
        />
        {data.map((seg, i) => {
          const len = (seg.value / 100) * C;
          const dasharray = `${len} ${C - len}`;
          const circle = (
            <circle
              key={seg.label}
              cx={size/2}
              cy={size/2}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={dasharray}
              strokeDashoffset={-offset}
              strokeLinecap="round"
            />
          );
          offset += len;
          return circle;
        })}
      </svg>
    </div>
  );
}

function LineArea({ data }) {
  const w = 760;
  const h = 260;
  const pad = 12;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const scaleX = (i) => pad + (i * (w - pad*2)) / (data.length - 1 || 1);
  const scaleY = (v) => pad + (h - pad*2) * (1 - (v - min) / (max - min || 1));

  const path = data.map((v, i) => `${i ? "L" : "M"} ${scaleX(i)} ${scaleY(v)}`).join(" ");
  const area = `M ${pad} ${h-pad} ${data.map((v,i)=>`L ${scaleX(i)} ${scaleY(v)}`).join(" ")} L ${w-pad} ${h-pad} Z`;

  return (
    <svg className="linearea" width="100%" height="260" viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <defs>
        <linearGradient id="pfGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#9d6bff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#9d6bff" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#pfGrad)" />
      <path d={path} fill="none" stroke="#a78bfa" strokeWidth="2.5" />
    </svg>
  );
}
