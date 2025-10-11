import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./news_ui.css";

const HEADLINE_TAGS = ["Stocks", "Crypto", "Macro"];
const SOURCES = ["Bloomberg", "MRxW", "Reuters"];
const TIMEFRAMES = ["24h", "7d"];

const MOCK_NEWS = [
  {
    id: 1,
    title: "Stock market rallies as tech shares lead charge",
    source: "Bloomberg",
    ago: "2 hours ago",
    sentiment: null,
    img: "/image/news/red-chart.jpg",
  },
  {
    id: 2,
    title: "Oil prices fall as demand concerns resurface",
    source: "MarketWatch",
    ago: "3 hours ago",
    sentiment: "Neutral",
    img: "/image/news/oil.jpg",
  },
  {
    id: 3,
    title: "US dollar strengthens amid economic recovery",
    source: "Reuters",
    ago: "4 hours ago",
    sentiment: "Positive",
    img: "/image/news/dollar.jpg",
  },
  {
    id: 4,
    title: "Retail sector faces challenges despite optimistic forecast",
    source: "Bloomberg",
    ago: "1 hour ago",
    sentiment: "Negative",
    img: "/image/news/retail.jpg",
  },
  {
    id: 5,
    title: "Tech innovation drives growth in software industry",
    source: "Sources",
    ago: "3 hours ago",
    sentiment: "Positive",
    img: "/image/news/desk.jpg",
  },
  {
    id: 6,
    title: "Global markets react to central bank policy shifts",
    source: "Sources",
    ago: "5 hours ago",
    sentiment: "Neutral",
    img: "/image/news/calc.jpg",
  },
];

export default function News() {
  const [q, setQ] = useState("");
  const [tags, setTags] = useState(["Stocks"]);
  const [srcs, setSrcs] = useState(["Bloomberg", "MRxW"]);
  const [tf, setTf] = useState("24h");

  const filtered = useMemo(() => {
    return MOCK_NEWS.filter((n) => {
      const hitQ = !q.trim() || n.title.toLowerCase().includes(q.toLowerCase());
      const hitSrc = srcs.length === 0 || srcs.includes(n.source);
      return hitQ && hitSrc;
    });
  }, [q, srcs]);

  const toggle = (list, setList, value) =>
    setList((xs) => (xs.includes(value) ? xs.filter((t) => t !== value) : [...xs, value]));

  return (
    <div className="news-shell">
      {/* Sidebar */}
      <aside className="news-side">
        <Brand />
        <nav className="side-nav">
          <SideLink to="/markets" icon="trending">Markets</SideLink>
          <SideLink to="/watchlists" icon="star">Watchlist</SideLink>
          <SideLink to="/portfolio" icon="pie">Portfolio</SideLink>
          <SideLink to="/news" icon="feed" active>News</SideLink>
          <SideLink to="/research" icon="labs">Research</SideLink>
        </nav>
        <div className="side-foot">
          <SideLink to="/settings" icon="gear">Settings</SideLink>
        </div>
      </aside>

      {/* Main content */}
      <main className="news-main">
        {/* Search */}
        <div className="news-search">
          <span className="ico search" aria-hidden />
          <input
            placeholder="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search news"
          />
        </div>

        {/* Breaking bar */}
        <div className="breaking" role="status" aria-live="polite">
          Breaking news: Federal Reserve announces interest rate decision
        </div>

        {/* Headline chips row */}
        <header className="headline-row">
          <h2>Top headlines</h2>
          <div className="chip-row">
            {HEADLINE_TAGS.map((t) => (
              <button
                key={t}
                className={`chip ${tags.includes(t) ? "chip--active" : ""}`}
                onClick={() => toggle(tags, setTags, t)}
              >
                {t}
              </button>
            ))}
            {SOURCES.map((s) => (
              <button
                key={s}
                className={`chip ${srcs.includes(s) ? "chip--active" : ""}`}
                onClick={() => toggle(srcs, setSrcs, s)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="tf">
            {TIMEFRAMES.map((t) => (
              <button
                key={t}
                className={`chip ${tf === t ? "chip--active" : ""}`}
                onClick={() => setTf(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </header>

        <section className="section-title">
          <h3>Market-moving</h3>
        </section>

        {/* Cards grid */}
        <section className="news-grid">
          {filtered.map((n) => (
            <article key={n.id} className="news-card">
              <div className="thumb">
                {/* Use your real images in public/image/news/* */}
                <img src={n.img} alt="" loading="lazy" />
                {n.sentiment && (
                  <span className={`badge ${n.sentiment.toLowerCase()}`}>{n.sentiment}</span>
                )}
              </div>
              <Link to="#" className="title">
                {n.title}
              </Link>
              <div className="meta">
                <span className="src">{n.source}</span>
                <span className="dot">•</span>
                <time>{n.ago}</time>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

/* ---------- tiny bits ---------- */
function Brand() {
  return (
    <div className="brand">
      <div className="logo">A</div>
      <div className="name">Ascendia</div>
    </div>
  );
}

function SideLink({ to, icon, children, active }) {
  const cls = `side-link ${active ? "is-active" : ""}`;
  return (
    <NavLink to={to} className={({ isActive }) => (active || isActive ? `${cls} is-active` : cls)}>
      <span className={`ico ${icon}`} aria-hidden />
      <span>{children}</span>
    </NavLink>
  );
}
