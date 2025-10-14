// import React, { useMemo, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import "./news_ui.css";

// const HEADLINE_TAGS = ["Stocks", "Crypto", "Macro"];
// const SOURCES = ["Bloomberg", "MRxW", "Reuters"];
// const TIMEFRAMES = ["24h", "7d"];

// const MOCK_NEWS = [
//   {
//     id: 1,
//     title: "Stock market rallies as tech shares lead charge",
//     source: "Bloomberg",
//     ago: "2 hours ago",
//     sentiment: null,
//     img: "/image/news/red-chart.jpg",
//   },
//   {
//     id: 2,
//     title: "Oil prices fall as demand concerns resurface",
//     source: "MarketWatch",
//     ago: "3 hours ago",
//     sentiment: "Neutral",
//     img: "/image/news/oil.jpg",
//   },
//   {
//     id: 3,
//     title: "US dollar strengthens amid economic recovery",
//     source: "Reuters",
//     ago: "4 hours ago",
//     sentiment: "Positive",
//     img: "/image/news/dollar.jpg",
//   },
//   {
//     id: 4,
//     title: "Retail sector faces challenges despite optimistic forecast",
//     source: "Bloomberg",
//     ago: "1 hour ago",
//     sentiment: "Negative",
//     img: "/image/news/retail.jpg",
//   },
//   {
//     id: 5,
//     title: "Tech innovation drives growth in software industry",
//     source: "Sources",
//     ago: "3 hours ago",
//     sentiment: "Positive",
//     img: "/image/news/desk.jpg",
//   },
//   {
//     id: 6,
//     title: "Global markets react to central bank policy shifts",
//     source: "Sources",
//     ago: "5 hours ago",
//     sentiment: "Neutral",
//     img: "/image/news/calc.jpg",
//   },
// ];

// export default function News() {
//   const [q, setQ] = useState("");
//   const [tags, setTags] = useState(["Stocks"]);
//   const [srcs, setSrcs] = useState(["Bloomberg", "MRxW"]);
//   const [tf, setTf] = useState("24h");

//   const filtered = useMemo(() => {
//     return MOCK_NEWS.filter((n) => {
//       const hitQ = !q.trim() || n.title.toLowerCase().includes(q.toLowerCase());
//       const hitSrc = srcs.length === 0 || srcs.includes(n.source);
//       return hitQ && hitSrc;
//     });
//   }, [q, srcs]);

//   const toggle = (list, setList, value) =>
//     setList((xs) => (xs.includes(value) ? xs.filter((t) => t !== value) : [...xs, value]));

//   return (
//     <div className="news-shell">
//       {/* Sidebar */}
//       <aside className="news-side">
//         <Brand />
//         <nav className="side-nav">
//           <SideLink to="/markets" icon="trending">Markets</SideLink>
//           <SideLink to="/watchlists" icon="star">Watchlist</SideLink>
//           <SideLink to="/portfolio" icon="pie">Portfolio</SideLink>
//           <SideLink to="/news" icon="feed" active>News</SideLink>
//           <SideLink to="/research" icon="labs">Research</SideLink>
//         </nav>
//         <div className="side-foot">
//           <SideLink to="/settings" icon="gear">Settings</SideLink>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="news-main">
//         {/* Search */}
//         <div className="news-search">
//           <span className="ico search" aria-hidden />
//           <input
//             placeholder="Search"
//             value={q}
//             onChange={(e) => setQ(e.target.value)}
//             aria-label="Search news"
//           />
//         </div>

//         {/* Breaking bar */}
//         <div className="breaking" role="status" aria-live="polite">
//           Breaking news: Federal Reserve announces interest rate decision
//         </div>

//         {/* Headline chips row */}
//         <header className="headline-row">
//           <h2>Top headlines</h2>
//           <div className="chip-row">
//             {HEADLINE_TAGS.map((t) => (
//               <button
//                 key={t}
//                 className={`chip ${tags.includes(t) ? "chip--active" : ""}`}
//                 onClick={() => toggle(tags, setTags, t)}
//               >
//                 {t}
//               </button>
//             ))}
//             {SOURCES.map((s) => (
//               <button
//                 key={s}
//                 className={`chip ${srcs.includes(s) ? "chip--active" : ""}`}
//                 onClick={() => toggle(srcs, setSrcs, s)}
//               >
//                 {s}
//               </button>
//             ))}
//           </div>
//           <div className="tf">
//             {TIMEFRAMES.map((t) => (
//               <button
//                 key={t}
//                 className={`chip ${tf === t ? "chip--active" : ""}`}
//                 onClick={() => setTf(t)}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>
//         </header>

//         <section className="section-title">
//           <h3>Market-moving</h3>
//         </section>

//         {/* Cards grid */}
//         <section className="news-grid">
//           {filtered.map((n) => (
//             <article key={n.id} className="news-card">
//               <div className="thumb">
//                 {/* Use your real images in public/image/news/* */}
//                 <img src={n.img} alt="" loading="lazy" />
//                 {n.sentiment && (
//                   <span className={`badge ${n.sentiment.toLowerCase()}`}>{n.sentiment}</span>
//                 )}
//               </div>
//               <Link to="#" className="title">
//                 {n.title}
//               </Link>
//               <div className="meta">
//                 <span className="src">{n.source}</span>
//                 <span className="dot">•</span>
//                 <time>{n.ago}</time>
//               </div>
//             </article>
//           ))}
//         </section>
//       </main>
//     </div>
//   );
// }

// /* ---------- tiny bits ---------- */
// function Brand() {
//   return (
//     <div className="brand">
//       <div className="logo">A</div>
//       <div className="name">Ascendia</div>
//     </div>
//   );
// }

// function SideLink({ to, icon, children, active }) {
//   const cls = `side-link ${active ? "is-active" : ""}`;
//   return (
//     <NavLink to={to} className={({ isActive }) => (active || isActive ? `${cls} is-active` : cls)}>
//       <span className={`ico ${icon}`} aria-hidden />
//       <span>{children}</span>
//     </NavLink>
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./news_ui.css";

const HEADLINE_TAGS = ["Stocks", "Crypto", "Macro"];
const TIMEFRAMES = ["24h", "7d"];
const FINNHUB_KEY = "cqtj8a1r01qv9ctn3bfgcqtj8a1r01qv9ctn3bg0";

// Env key (Vite vs CRA)
// const FINNHUB_KEY =
//   (import.meta && import.meta.env && import.meta.env.VITE_FINNHUB_KEY) ||
//   process.env.REACT_APP_FINNHUB_KEY;

export default function News() {
  const [q, setQ] = useState("");
  const [tags, setTags] = useState(["Stocks"]);
  const [srcs, setSrcs] = useState([]); // will fill after fetch from real data
  const [tf, setTf] = useState("24h");

  // data state
  const [items, setItems] = useState([]); // normalized cards
  const [allSources, setAllSources] = useState([]); // unique list of sources
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch market news on mount
  useEffect(() => {
    if (!FINNHUB_KEY) {
      setError("Missing Finnhub API key. Set VITE_FINNHUB_KEY or REACT_APP_FINNHUB_KEY.");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError("");

        // Finnhub: general market news. Options: general | forex | crypto | merger
        const res = await fetch(
          `https://finnhub.io/api/v1/news?category=general&token=${encodeURIComponent(FINNHUB_KEY)}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Map to your card shape
        const mapped = (Array.isArray(data) ? data : []).map((n, idx) => ({
          id: n.id || idx,
          title: n.headline || n.title || "Untitled",
          source: n.source || "Unknown",
          ago: formatAgo(n.datetime), // Finnhub uses epoch seconds
          sentiment: null, // not provided by this endpoint
          img: n.image || "/image/news/placeholder.jpg",
          url: n.url || "#",
          datetime: n.datetime, // keep raw
        }));

        if (!cancelled) {
          setItems(mapped);

          // Populate sources filter from data (top 6 unique)
          const uniq = Array.from(new Set(mapped.map((x) => x.source))).slice(0, 6);
          setAllSources(uniq);
          // If no selection yet, default to first two (like your mock)
          setSrcs((prev) => (prev.length ? prev : uniq.slice(0, 2)));
        }
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load news");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // filter by search + sources + timeframe
  const filtered = useMemo(() => {
    const nowSec = Math.floor(Date.now() / 1000);
    const maxAgeSec = tf === "7d" ? 7 * 86400 : 86400;

    return items.filter((n) => {
      const hitQ = !q.trim() || n.title.toLowerCase().includes(q.toLowerCase());
      const hitSrc = srcs.length === 0 || srcs.includes(n.source);
      const fresh = typeof n.datetime === "number" ? nowSec - n.datetime <= maxAgeSec : true;
      return hitQ && hitSrc && fresh;
    });
  }, [items, q, srcs, tf]);

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
          {loading ? "Loading headlines…" : error ? `Error: ${error}` : "Latest market headlines"}
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
                title="(demo tag only)"
              >
                {t}
              </button>
            ))}

            {/* dynamic sources from live data */}
            {allSources.map((s) => (
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
          {loading && <div>Loading…</div>}
          {!loading && !error && filtered.length === 0 && <div>No news found.</div>}
          {filtered.map((n) => (
            <article key={n.id} className="news-card">
              <div className="thumb">
                <img src={n.img} alt="" loading="lazy" />
                {n.sentiment && (
                  <span className={`badge ${n.sentiment.toLowerCase()}`}>{n.sentiment}</span>
                )}
              </div>
              <Link to={n.url || "#"} target="_blank" rel="noreferrer" className="title">
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

/* ---------- helpers ---------- */
function formatAgo(epochSeconds) {
  if (!epochSeconds) return "";
  const ms = (Number(epochSeconds) || 0) * 1000;
  const diff = Date.now() - ms;
  if (diff < 0) return "just now";

  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}
