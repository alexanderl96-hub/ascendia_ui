import React, { useMemo, useState } from "react";
import "./research_ui.css";
import { Link } from "react-router-dom";

export default function Research() {
  const [q, setQ] = useState("");
  const [sector, setSector] = useState(60);
  const [mcap, setMcap] = useState(40);
  const [yieldPct, setYieldPct] = useState(22);

  const filteredNews = useMemo(() => {
    if (!q.trim()) return newsData;
    const s = q.trim().toLowerCase();
    return newsData.filter(n => n.title.toLowerCase().includes(s));
  }, [q]);

  return (
    <div className="rs-shell">
      {/* Sidebar */}
      <aside className="rs-side">
        <div className="rs-logo">A</div>
        <nav className="rs-nav" aria-label="Primary">
          <Link className="rs-item is-active" to="/research">
            <span className="ico grid" aria-hidden />
            Research
          </Link>
          <Link className="rs-item" to="/markets">
            <span className="ico bars" aria-hidden />
            Markets
          </Link>
          <Link className="rs-item" to="/watchlists">
            <span className="ico bookmark" aria-hidden />
            Watchlist
          </Link>
          <Link className="rs-item" to="/portfolio">
            <span className="ico brief" aria-hidden />
            Portfolio
          </Link>
          <Link className="rs-item" to="/settings">
            <span className="ico cog" aria-hidden />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="rs-main">
        <header className="rs-head">
          <h1>Research</h1>
          <div className="rs-search">
            <span className="ico search" aria-hidden />
            <input
              placeholder="Search symbol"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search symbol"
            />
          </div>
        </header>

        {/* Grid */}
        <section className="rs-grid">
          {/* Analyst Ratings */}
          <div className="card ratings">
            <div className="card__title">Analyst Ratings</div>
            <ul className="rate-list">
              <li className="rate strong">
                <span>Strong Buy</span>
                <b>16</b>
              </li>
              <li className="rate buy">
                <span>Buy</span>
                <b>6</b>
              </li>
              <li className="rate hold">
                <span>Hold</span>
                <b>3</b>
              </li>
              <li className="rate sell">
                <span>Sell</span>
                <b>1</b>
              </li>
            </ul>
          </div>

          {/* News */}
          <div className="card news">
            <div className="card__title">Latest Research News</div>
            <ul className="news-list">
              {filteredNews.map((n, i) => (
                <li key={i} className="news-row">
                  <div className="title" title={n.title}>{n.title}</div>
                  <div className="ago">{n.ago}</div>
                </li>
              ))}
              {filteredNews.length === 0 && (
                <li className="news-empty">No results for “{q}”.</li>
              )}
            </ul>
          </div>

          {/* Earnings Calendar */}
          <div className="card earnings">
            <div className="card__title">Earnings Calendar</div>
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th><th>Company</th><th>EPS Estimate</th>
                </tr>
              </thead>
              <tbody>
                {earnings.map((r, i) => (
                  <tr key={i}>
                    <td>{r.date}</td>
                    <td>{r.co}</td>
                    <td>{r.eps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Screener */}
          <div className="card screener">
            <div className="card__title">Screener</div>
            <div className="field">
              <label>Sector</label>
              <input type="range" min="0" max="100" value={sector} onChange={e=>setSector(+e.target.value)} />
            </div>
            <div className="field">
              <label>Market cap</label>
              <input type="range" min="0" max="100" value={mcap} onChange={e=>setMcap(+e.target.value)} />
            </div>
            <div className="field">
              <label>Dividend yield</label>
              <input type="range" min="0" max="100" value={yieldPct} onChange={e=>setYieldPct(+e.target.value)} />
            </div>
            <div className="scr-pill">
              Sector {sector}% • Mcap {mcap}% • Yield {yieldPct/10}%
            </div>
          </div>

          {/* Compare (sparkline) */}
          <div className="card compare">
            <div className="card__title">Compare</div>
            <Sparkline variant="dual" />
          </div>

          {/* Heatmap */}
          <div className="card heatmap">
            <div className="card__title">Heatmap</div>
            <div className="heat-grid">
              {Array.from({length:12}).map((_,i)=>(
                <span key={i} style={{opacity: 0.35 + (i%6)/10}} />
              ))}
            </div>
          </div>

          {/* Footer strip */}
          <div className="card strip">
            <div className="strip__bar" />
            <div className="strip__bar sm" />
            <div className="strip__dots">
              <span /><span />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* tiny sparkline */
function Sparkline({ variant="single", points=48 }) {
  const arr = Array.from({length: points}).map((_,i)=>{
    const y = 30 + (Math.sin(i/3)+1)*25 + Math.random()*6;
    return Math.min(98, y);
  });
  const arr2 = Array.from({length: points}).map((_,i)=>{
    const y = 26 + (Math.cos(i/3)+1)*23 + Math.random()*6;
    return Math.min(98, y);
  });

  return (
    <div className={`spark ${variant}`}>
      {arr.map((h,i)=><span key={i} style={{height:`${h}%`}} />)}
      {variant==="dual" && (
        <div className="overlay">
          {arr2.map((h,i)=><span key={i} style={{height:`${h}%`}} />)}
        </div>
      )}
    </div>
  );
}

/* ----- mock data ----- */
const newsData = [
  { title:"Market conditions continue to improve as risk appetite broadens", ago:"2 h ago" },
  { title:"Stock trading app sees 44% surge in weekly active users", ago:"3 h ago" },
  { title:"When to expect a company’s Q2 guide to stabilize", ago:"4 h ago" },
];

const earnings = [
  { date:"Apr 21", co:"XYZ", eps:"$1.25" },
  { date:"Apr 22", co:"ACME", eps:"$0.91" },
  { date:"Apr 23", co:"ORCL", eps:"$1.12" },
];
