import React, { useMemo, useState } from "react";
import "./strategies_ui.css";
import { NavLink, Link } from "react-router-dom";

const MOCK = [
  { id:"mom-alpha",    name:"Momentum Alpha",   author:"Alice Johnson",  ret:34.2,  dd:-12.0, sharpe:1.45, fav:true },
  { id:"growth-cat",   name:"Growth Catalyst",  author:"David Brown",    ret:28.9,  dd:-8.7,  sharpe:1.62 },
  { id:"value-foc",    name:"Value Focused",    author:"Risse Hart",     ret:-18.1, dd:1.9,   sharpe:2.34 },
  { id:"risky-focus",  name:"Risky FocusAlpha", author:"Tom Hame",       ret:34.2,  dd:-19.0, sharpe:1.45 },
  { id:"stock-chas",   name:"Stock Chastic",    author:"George Bart",    ret:28.9,  dd:-8.7,  sharpe:1.02 },
  { id:"stroty-ml",    name:"Stroty Mlaiuriu",  author:"Robie Hauser",   ret:16.4,  dd:1.5,   sharpe:5.36 },
];

export default function Strategies() {
  const [tab, setTab] = useState("marketplace"); // "mine" | "marketplace"
  const [q, setQ] = useState("");
  const [perf, setPerf] = useState(50);
  const [stocks, setStocks] = useState(true);
  const [etfs, setEtfs] = useState(false);
  const [selected, setSelected] = useState(MOCK[0].id);

  const list = useMemo(() => {
    let rows = [...MOCK];
    if (q.trim()) {
      const s = q.toLowerCase();
      rows = rows.filter(r => r.name.toLowerCase().includes(s) || r.author.toLowerCase().includes(s));
    }
    // pretend filters do something:
    if (!stocks) rows = rows.filter(r => r.name.toLowerCase().includes("etf"));
    if (!etfs)   rows = rows.filter(r => !r.name.toLowerCase().includes("etf"));
    // crude “performance” gate: require abs(ret) >= perf * 0.2 / 100
    const minAbs = (perf * 0.2) / 100;
    rows = rows.filter(r => Math.abs(r.ret) >= minAbs);
    return rows;
  }, [q, perf, stocks, etfs]);

  const active = useMemo(() => list.find(x => x.id === selected) || list[0] || MOCK[0], [list, selected]);

  return (
   <div className="mk-app">
      {/* ===== Sidebar ===== */}
       <aside className="mk-side" aria-label="Primary navigation">
         <Link  className="brand" to="/dashboard">
                   <div className="brand__logo">A</div>
                   <div className="brand__name">Ascendia</div>
         </Link>
 
         <nav className="mk-nav">
           {/* <NavItem to="/dashboard" label="Home" icon="home" /> */}
           <NavItem to="/markets" label="Markets" icon="chart" activeExact />
           <NavItem to="/portfolio" label="Portfolio" icon="bag" />
           <NavItem to="/watchlists" label="Watchlists" icon="layers" />
           <NavItem to="/orders" label="Orders" icon="doc" />
           <NavItem to="/research" label="Research" icon="search" />
           <NavItem to="/strategies" label="Strategies" icon="tag" />
           <NavItem to="/news" label="News" icon="mail" />
           <NavItem to="/settings/profile" label="Settings" icon="settings" />
         </nav>

        <div className="sb-legal">
              <a href="#!">Privacy Policy</a>
              <a href="#!">Terms of Service</a>
         </div>
       </aside>

    <div className="stra-shell">
      {/* Topbar */}
      <header className="stra-top">
        <h1>Strategies</h1>
        <nav className="stra-tabs" role="tablist" aria-label="Mode">
          <button
            role="tab"
            aria-selected={tab==="mine"}
            className={`stra-tab ${tab==="mine"?"is-active":""}`}
            onClick={()=>setTab("mine")}
          >
            Mine
          </button>
          <button
            role="tab"
            aria-selected={tab==="marketplace"}
            className={`stra-tab ${tab==="marketplace"?"is-active":""}`}
            onClick={()=>setTab("marketplace")}
          >
            Marketplace
          </button>
        </nav>
        <div className="stra-search">
          <span className="ico search" aria-hidden />
          <input
            placeholder="Search"
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            aria-label="Search strategies"
          />
        </div>
        <div className="stra-actions">
          <button className="icon-btn" title="Help"><span className="ico dot" /></button>
          <button className="icon-btn" title="Account"><span className="ico avatar" /></button>
        </div>
      </header>

      <div className="stra-layout">
        {/* LEFT: Filters */}
        <aside className="stra-filters">
          <div className="group">
            <div className="group__title">Performance</div>
            <input type="range" min="0" max="100" value={perf} onChange={e=>setPerf(+e.target.value)} />
            <div className="hint">{perf}%</div>
          </div>

          <div className="group">
            <div className="group__title">Asset Class</div>
            <label className="chk">
              <input type="checkbox" checked={stocks} onChange={e=>setStocks(e.target.checked)} />
              <span>Stocks</span>
            </label>
            <label className="chk">
              <input type="checkbox" checked={etfs} onChange={e=>setEtfs(e.target.checked)} />
              <span>ETFs</span>
            </label>
          </div>

          <div className="group">
            <div className="group__title">Filters</div>
            <button className="pill">Advanced</button>
          </div>
        </aside>

        {/* CENTER: Cards */}
        <section className="stra-list">
          <div className="list-head">
            <h2>Favorites</h2>
            <div className="list-tools">
              <button className="pill">Sort • Popularity</button>
              <button className="icon-btn" title="Options"><span className="ico equal" /></button>
            </div>
          </div>

          <div className="card-grid">
            {list.map(row => (
              <article
                key={row.id}
                className={`s-card ${row.id===active.id?"is-active":""}`}
                onClick={()=>setSelected(row.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e)=> e.key==="Enter" && setSelected(row.id)}
                aria-label={`Open ${row.name}`}
              >
                <header className="s-card__head">
                  <div className="s-title">{row.name}</div>
                  <span className="s-author">• {row.author}</span>
                </header>

                <div className="s-mini">
                  <Sparkline />
                  <span className="arrow" />
                </div>

                <dl className="s-metrics">
                  <div><dt>Return</dt><dd className={row.ret>=0?"up":"down"}>{fmtPct(row.ret)}</dd></div>
                  <div><dt>Max Drawdown</dt><dd className={row.dd>=0?"up":"down"}>{fmtPct(row.dd)}</dd></div>
                  <div><dt>Sharpe Ratio</dt><dd>{row.sharpe.toFixed(2)}</dd></div>
                </dl>

                <button className="btn btn--ghost">Add to Watchlist</button>
              </article>
            ))}
          </div>
        </section>

        {/* RIGHT: Details */}
        <aside className="stra-details" aria-labelledby="stra-d-title">
          <h3 id="stra-d-title">{active.name}</h3>
          <div className="d-author">
            <span className="ico badge" aria-hidden />
            <span>{active.author}</span>
          </div>

          <dl className="d-kpis">
            <div><dt>Return</dt><dd className={active.ret>=0?"up":"down"}>{fmtPct(active.ret)}</dd></div>
            <div><dt>Max Drawdown</dt><dd className={active.dd>=0?"up":"down"}>{fmtPct(active.dd)}</dd></div>
            <div><dt>Sharpe Ratio</dt><dd>{active.sharpe.toFixed(2)}</dd></div>
          </dl>

          <div className="d-block">
            <div className="block__title">Backtest Statistics</div>
            <dl className="d-stats">
              <div><dt>From</dt><dd>Jan 2020</dd></div>
              <div><dt>Return</dt><dd>102,3%</dd></div>
              <div><dt>Max Drawdown</dt><dd>-15,4%</dd></div>
              <div><dt>Trades</dt><dd>184</dd></div>
            </dl>
          </div>

          <button className="btn btn--ghost">Add to Watchlist</button>
          <button className="btn btn--primary">Buy Strategy</button>
        </aside>
      </div>
     </div>

    </div>
  );
}

/* small decorative sparkline */
function Sparkline({ points=28 }) {
  const bars = Array.from({length: points}).map((_,i)=>{
    const h = 28 + (Math.sin(i/2.7)+1)*22 + (Math.random()*6);
    return Math.min(96,h);
  });
  return (
    <div className="spark">
      {bars.map((h,i)=><span key={i} style={{height:`${h}%`}} />)}
    </div>
  );
}

function fmtPct(n) {
  const s = (Math.abs(n)).toFixed(1) + "%";
  return (n>=0 ? s : "−" + s); // using minus glyph for style
}



/* Reusable Nav item */
function NavItem({ to, label, icon, activeExact }) {
  return (
    <NavLink
      to={to}
      end={!!activeExact}
      className={({ isActive }) =>
        "mk-nav__item" + (isActive ? " is-active" : "")
      }
    >
      {/* If you have Icon.jsx, use <Icon name={icon} />. Otherwise dots show via CSS */}
      {/* <Icon name={icon} /> */}
      <span className="mk-nav__dot" aria-hidden="true" />
      <span className="mk-nav__label">{label}</span>
    </NavLink>
  );
}
