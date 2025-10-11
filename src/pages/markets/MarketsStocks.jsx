import React from "react";
import { NavLink } from "react-router-dom";
import "./markets.css"
// If you added the earlier Icon.jsx, uncomment the next line:
// import Icon from "../../components/Icon";

export default function Markets() {
  return (
    <div className="mk-app">
      {/* ===== Sidebar ===== */}
      <aside className="mk-side" aria-label="Primary navigation">
        <div className="mk-brand">
          <div className="mk-logo">A</div>
          <span className="mk-brand__name">ASCENDIA</span>
        </div>

        <nav className="mk-nav">
          <NavItem to="/dashboard" label="Home" icon="home" />
          <NavItem to="/markets" label="Markets" icon="chart" activeExact />
          <NavItem to="/portfolio" label="Portfolio" icon="bag" />
          <NavItem to="/watchlists" label="Watchlists" icon="layers" />
          <NavItem to="/orders" label="Orders" icon="doc" />
          <NavItem to="/research" label="Research" icon="search" />
          <NavItem to="/strategies" label="Strategies" icon="tag" />
          <NavItem to="/news" label="News" icon="mail" />
          <NavItem to="/settings/profile" label="Settings" icon="settings" />
        </nav>
      </aside>

      {/* ===== Content ===== */}
      <div className="mk-content">
        {/* Header row */}
        <header className="mk-head">
          <div className="mk-search">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49 21.49 20 15.5 14Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"
              />
            </svg>
            <input placeholder="Search" aria-label="Search markets" />
          </div>

          <div className="mk-user">
            <button className="mk-icon" aria-label="Theme">
              <span className="mk-dot" />
            </button>
            <div className="mk-avatar">A</div>
          </div>
        </header>

        {/* Main grid */}
        <main className="mk-grid">
          {/* Market Overview */}
          <section className="card mk-overview">
            <div className="card__title">Market Overview</div>
            <ul className="mk-rows">
              {[
                { name: "S&P 500", value: "4,401.12", delta: "+0.69%" },
                { name: "Dow Jones", value: "34,155.88", delta: "+0.37%" },
                { name: "Nasdaq", value: "13,469.10", delta: "+1.42%" },
              ].map((r, i) => (
                <li key={i} className="mk-row">
                  <div className="mk-row__name">{r.name}</div>
                  <Sparkline variant="up" />
                  <div className="mk-row__val">{r.value}</div>
                  <div className="mk-row__delta up">{r.delta}</div>
                </li>
              ))}
            </ul>
          </section>

          {/* Top Movers */}
          <section className="card mk-box">
            <div className="card__title">
              <span>Top Movers</span> <span className="mk-pill">Gamers</span>
            </div>
            <ul className="mk-list">
              {[
                { t: "ABC Inc", d: "+18.8%" },
                { t: "XYZ Corp", d: "+8.2%" },
                { t: "DEF Ltd", d: "+5.4%" },
              ].map((x, i) => (
                <li key={i} className="mk-li">
                  <span className="t">{x.t}</span>
                  <span className="d up">{x.d}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Trending */}
          <section className="card mk-box">
            <div className="card__title">Trending</div>
            <div className="mk-mini">
              <Sparkline variant="gentle" points={50} />
              <div className="mk-mini__footer">
                <span>SAP</span>
                <span className="up">+22%</span>
                <span className="up">+1.42%</span>
              </div>
            </div>
          </section>

          {/* Watchlist table */}
          <section className="card mk-watch">
            <div className="card__title">Watchlist</div>
            <div className="mk-table-wrap">
              <table className="mk-table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Last</th>
                    <th>%</th>
                    <th>Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { s: "AAPL", p: "167.18", c: "+1.2%", v: "52.6M" },
                    { s: "MSFT", p: "238.61", c: "+0.3%", v: "13.4M" },
                    { s: "TSLA", p: "182.63", c: "-0.8%", v: "580.1M" },
                    { s: "NVDA", p: "960.20", c: "+0.1%", v: "2.37T" },
                  ].map((r, i) => (
                    <tr key={i}>
                      <td>{r.s}</td>
                      <td>{r.p}</td>
                      <td className={r.c.startsWith("-") ? "down" : "up"}>{r.c}</td>
                      <td>{r.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Sectors */}
          <section className="card mk-sectors">
            <div className="card__title">Sectors</div>
            <div className="mk-tags">
              <button className="tag tag--active">Technology</button>
              <button className="tag">Energy</button>
              <button className="tag">Financials</button>
              <button className="tile" />
              <button className="tile" />
            </div>
          </section>

          {/* Economic Calendar */}
          <section className="card mk-box">
            <div className="card__title">Economic Calendar</div>
            <div className="mk-eco">
              <div className="mk-eco__item">
                <div className="k">Upcoming report</div>
                <div className="v">PMI</div>
              </div>
              <div className="mk-eco__spark">
                <Sparkline points={24} variant="up" />
              </div>
            </div>
          </section>

          {/* Last */}
          <section className="card mk-last">
            <div className="card__title">Last</div>
            <table className="mk-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Last</th>
                  <th>%</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { s: "AAPL", p: "167.18", c: "+1.2%", v: "52.6M" },
                  { s: "MSFT", p: "288.61", c: "+0.6%", v: "18.4M" },
                  { s: "TSLA", p: "182.53", c: "+1.0%", v: "599.17" },
                  { s: "NVDA", p: "960.20", c: "+0.2%", v: "2.37T" },
                ].map((r, i) => (
                  <tr key={i}>
                    <td>{r.s}</td>
                    <td>{r.p}</td>
                    <td className={r.c.startsWith("-") ? "down" : "up"}>{r.c}</td>
                    <td>{r.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* News */}
          <section className="card mk-news">
            <div className="card__title">News</div>
            <div className="mk-news-list">
              <article>
                <h4>Global Markets Rally on Optimism Over Economic Recovery</h4>
                <p>Tech Stocks Lead Gains as Sector Rebounds</p>
                <span className="src">index.com</span>
              </article>
              <article>
                <h4>Energy names rise as crude stabilizes</h4>
                <p>OPEC comments lift sentiment</p>
                <span className="src">wire.net</span>
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ---------- tiny sparkline component (pure CSS bars) ---------- */
function Sparkline({ points = 36, variant = "up" }) {
  return (
    <div className={`spark ${variant}`}>
      {Array.from({ length: points }).map((_, i) => {
        const y =
          30 + (Math.sin(i / 3) + 1) * 22 + (variant === "gentle" ? 0 : Math.random() * 8);
        return <span key={i} style={{ height: `${Math.min(100, y)}%` }} />;
      })}
    </div>
  );
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
