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
//============================

// import React, { useEffect, useMemo, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import "./news_ui.css";

// const HEADLINE_TAGS = ["Stocks", "Crypto", "Macro"];
// const TIMEFRAMES = ["24h", "7d"];
// const FINNHUB_KEY = "cqtj8a1r01qv9ctn3bfgcqtj8a1r01qv9ctn3bg0";

// // Env key (Vite vs CRA)
// // const FINNHUB_KEY =
// //   (import.meta && import.meta.env && import.meta.env.VITE_FINNHUB_KEY) ||
// //   process.env.REACT_APP_FINNHUB_KEY;

// export default function News() {
//   const [q, setQ] = useState("");
//   const [tags, setTags] = useState(["Stocks"]);
//   const [srcs, setSrcs] = useState([]); // will fill after fetch from real data
//   const [tf, setTf] = useState("24h");

//   // data state
//   const [items, setItems] = useState([]); // normalized cards
//   const [allSources, setAllSources] = useState([]); // unique list of sources
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // fetch market news on mount
//   useEffect(() => {
//     if (!FINNHUB_KEY) {
//       setError("Missing Finnhub API key. Set VITE_FINNHUB_KEY or REACT_APP_FINNHUB_KEY.");
//       return;
//     }
//     let cancelled = false;
//     (async () => {
//       try {
//         setLoading(true);
//         setError("");

//         // Finnhub: general market news. Options: general | forex | crypto | merger
//         const res = await fetch(
//           `https://finnhub.io/api/v1/news?category=general&token=${encodeURIComponent(FINNHUB_KEY)}`
//         );
//         const response = await fetch("http://localhost:8080/api/news?page=0&size=20")
//         console.log("response : " , response)
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const data = await res.json();

//         // Map to your card shape
//         const mapped = (Array.isArray(data) ? data : []).map((n, idx) => ({
//           id: n.id || idx,
//           title: n.headline || n.title || "Untitled",
//           source: n.source || "Unknown",
//           ago: formatAgo(n.datetime), // Finnhub uses epoch seconds
//           sentiment: null, // not provided by this endpoint
//           img: n.image || "/image/news/placeholder.jpg",
//           url: n.url || "#",
//           datetime: n.datetime, // keep raw
//         }));

//         if (!cancelled) {
//           setItems(mapped);

//           // Populate sources filter from data (top 6 unique)
//           const uniq = Array.from(new Set(mapped.map((x) => x.source))).slice(0, 6);
//           setAllSources(uniq);
//           // If no selection yet, default to first two (like your mock)
//           setSrcs((prev) => (prev.length ? prev : uniq.slice(0, 2)));
//         }
//       } catch (e) {
//         if (!cancelled) setError(e.message || "Failed to load news");
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   // filter by search + sources + timeframe
//   const filtered = useMemo(() => {
//     const nowSec = Math.floor(Date.now() / 1000);
//     const maxAgeSec = tf === "7d" ? 7 * 86400 : 86400;

//     return items.filter((n) => {
//       const hitQ = !q.trim() || n.title.toLowerCase().includes(q.toLowerCase());
//       const hitSrc = srcs.length === 0 || srcs.includes(n.source);
//       const fresh = typeof n.datetime === "number" ? nowSec - n.datetime <= maxAgeSec : true;
//       return hitQ && hitSrc && fresh;
//     });
//   }, [items, q, srcs, tf]);

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
//           {loading ? "Loading headlines…" : error ? `Error: ${error}` : "Latest market headlines"}
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
//                 title="(demo tag only)"
//               >
//                 {t}
//               </button>
//             ))}

//             {/* dynamic sources from live data */}
//             {allSources.map((s) => (
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
//           {loading && <div>Loading…</div>}
//           {!loading && !error && filtered.length === 0 && <div>No news found.</div>}
//           {filtered.map((n) => (
//             <article key={n.id} className="news-card">
//               <div className="thumb">
//                 <img src={n.img} alt="" loading="lazy" />
//                 {n.sentiment && (
//                   <span className={`badge ${n.sentiment.toLowerCase()}`}>{n.sentiment}</span>
//                 )}
//               </div>
//               <Link to={n.url || "#"} target="_blank" rel="noreferrer" className="title">
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

/* ---------- helpers ---------- */
// function formatAgo(epochSeconds) {
//   if (!epochSeconds) return "";
//   const ms = (Number(epochSeconds) || 0) * 1000;
//   const diff = Date.now() - ms;
//   if (diff < 0) return "just now";

//   const sec = Math.floor(diff / 1000);
//   if (sec < 60) return `${sec}s ago`;
//   const min = Math.floor(sec / 60);
//   if (min < 60) return `${min}m ago`;
//   const hr = Math.floor(min / 60);
//   if (hr < 24) return `${hr}h ago`;
//   const day = Math.floor(hr / 24);
//   return `${day}d ago`;
// }


import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./news_ui.css";

const HEADLINE_TAGS = ["Stocks", "Crypto", "Macro"];
const TIMEFRAMES = ["24h", "7d"];
const API_BASE =
  (import.meta?.env?.VITE_API_BASE) ||
  process.env.REACT_APP_API_BASE ||
  "http://localhost:8080";

export default function News() {
  // const [q, setQ] = useState("");
  // const [ticker, setTicker] = useState(""); // optional: filter by ticker (e.g., AAPL)
  // const [tags, setTags] = useState(["Stocks"]); // cosmetic chips (not sent to API)
  // const [tf, setTf] = useState("24h");
  // const [page, setPage] = useState(0);
  // const [size, setSize] = useState(20);

  // // data state
  // const [items, setItems] = useState([]); // normalized cards
  // const [allSources, setAllSources] = useState([]); // unique list of sources (from payload if available)
  // const [srcs, setSrcs] = useState([]); // UI-only filter (client-side)
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  // // debounce for search
  // const [qDebounced, setQDebounced] = useState(q);
  // useEffect(() => {
  //   const id = setTimeout(() => setQDebounced(q.trim()), 400);
  //   return () => clearTimeout(id);
  // }, [q]);

  // // build URL per your backend contract
  // const sinceDays = tf === "7d" ? 7 : 1;
  // const buildUrl = () => {
  //   const u = new URL("/api/news", API_BASE);

  //   if (ticker.trim()) {
  //     u.searchParams.set("ticker", ticker.trim().toUpperCase());
  //     u.searchParams.set("sinceDays", String(sinceDays));
  //     return u.toString();
  //   }

  //   if (qDebounced) {
  //     u.searchParams.set("q", qDebounced);
  //     u.searchParams.set("sinceDays", String(sinceDays));
  //     return u.toString();
  //   }

  //   // default: paginated list
  //   u.searchParams.set("page", String(page));
  //   u.searchParams.set("size", String(size));
  //   return u.toString();
  // };

  // // fetch on mount and whenever filters change
  // useEffect(() => {
  //   let cancelled = false;
  //   const ctrl = new AbortController();

  //   (async () => {
  //     try {
  //       setLoading(true);
  //       setError("");
  //       const url = buildUrl();
  //       const res = await fetch(url, { signal: ctrl.signal });
  //       if (!res.ok) throw new Error(`HTTP ${res.status}`);

  //       const payload = await res.json();

  //       // Support both paged and non-paged responses
  //       const list = Array.isArray(payload) ? payload : payload.content || [];
  //       const mapped = list.map((n, idx) => ({
  //         id: n.id ?? idx,
  //         title: n.title || n.headline || "Untitled",
  //         source: n.source || "Unknown",
  //         ago: formatAgo(n.publishedAt || n.datetime || n.timestamp),
  //         img: n.imageUrl || n.image || "/image/news/placeholder.jpg",
  //         url: n.url || "#",
  //         rawDate: n.publishedAt || n.datetime || n.timestamp,
  //       }));

  //       if (!cancelled) {
  //         setItems(mapped);

  //         // Sources list from payload (if available)
  //         const uniq = Array.from(new Set(mapped.map((x) => x.source))).slice(0, 6);
  //         setAllSources(uniq);
  //         setSrcs((prev) => (prev.length ? prev : uniq.slice(0, 2)));
  //       }
  //     } catch (e) {
  //       if (!cancelled && e.name !== "AbortError") {
  //         setError(e.message || "Failed to load news");
  //         setItems([]);
  //       }
  //     } finally {
  //       if (!cancelled) setLoading(false);
  //     }
  //   })();

  //   return () => {
  //     cancelled = true;
  //     ctrl.abort();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [qDebounced, ticker, tf, page, size]);

  // // client-side filter by selected sources (chips)
  // const filtered = useMemo(() => {
  //   if (!srcs.length) return items;
  //   return items.filter((n) => srcs.includes(n.source));
  // }, [items, srcs]);

  // const toggle = (list, setList, value) =>
  //   setList((xs) => (xs.includes(value) ? xs.filter((t) => t !== value) : [...xs, value]));

  // // reset paging when query/ticker/timeframe changes
  // useEffect(() => {
  //   setPage(0);
  // }, [qDebounced, ticker, tf]);


    const [q, setQ] = useState("");
  const [ticker, setTicker] = useState(""); 
  const [tags, setTags] = useState(["Stocks"]); // cosmetic chips (not sent to API)
  const [tf, setTf] = useState("24h");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);

  // data state
  const [items, setItems] = useState([]); 
  const [allSources, setAllSources] = useState([]); 
  const [srcs, setSrcs] = useState([]); // UI-only filter (client-side)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // debounce for search
  const [qDebounced, setQDebounced] = useState(q);
  useEffect(() => {
    const id = setTimeout(() => setQDebounced(q.trim()), 400);
    return () => clearTimeout(id);
  }, [q]);

  // build URL per your backend contract
  const sinceDays = tf === "7d" ? 7 : 1;
  const buildUrl = () => {
    // Using a try-catch for URL constructor robustness, though API_BASE is constant
    try {
      const u = new URL("/api/news", API_BASE);
      const hasTicker = ticker.trim();
      const hasQuery = qDebounced.trim();

      if (hasTicker || hasQuery) {
        // Apply timeframe filter for any specific search
        u.searchParams.set("sinceDays", String(sinceDays));

        // Apply ticker filter if present
        if (hasTicker) {
          u.searchParams.set("ticker", hasTicker.toUpperCase());
        }

        // Apply query filter if present
        if (hasQuery) {
          u.searchParams.set("q", hasQuery);
        }

      } else {
        // Default: paginated list (only when no ticker or query is active)
        u.searchParams.set("page", String(page));
        u.searchParams.set("size", String(size));
      }
      
      return u.toString();
    } catch (e) {
      console.error("Error building URL:", e);
      return ""; // Return empty string on error to prevent fetch
    }
  };

  // fetch on mount and whenever filters change
  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();
    const url = buildUrl();

    if (!url) return; // Prevent fetch if URL failed to build

    (async () => {
      try {
        setLoading(true);
        setError("");
        
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const payload = await res.json();

        // Support both paged and non-paged responses
        const list = Array.isArray(payload) ? payload : payload.content || [];
        const mapped = list.map((n, idx) => ({
          id: n.id ?? idx,
          title: n.title || n.headline || "Untitled",
          source: n.source || "Unknown",
          ago: formatAgo(n.publishedAt || n.datetime || n.timestamp),
          img: n.imageUrl || n.image || "https://placehold.co/600x400/1f2937/d1d5db?text=No+Image",
          url: n.url || "#",
          rawDate: n.publishedAt || n.datetime || n.timestamp,
        }));

        if (!cancelled) {
          setItems(mapped);

          // Sources list from payload (if available)
          const uniq = Array.from(new Set(mapped.map((x) => x.source))).slice(0, 6);
          setAllSources(uniq);
          // Only set initial srcs if current srcs is empty (to maintain user filter state)
          setSrcs((prev) => (prev.length ? prev : uniq.slice(0, 2))); 
        }
      } catch (e) {
        if (!cancelled && e.name !== "AbortError") {
          setError(e.message || "Failed to load news");
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      ctrl.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qDebounced, ticker, tf, page, size]);

  // client-side filter by selected sources (chips)
  const filtered = useMemo(() => {
    if (!srcs.length) return items;
    return items.filter((n) => srcs.includes(n.source));
  }, [items, srcs]);

  const toggle = (list, setList, value) =>
    setList((xs) => (xs.includes(value) ? xs.filter((t) => t !== value) : [...xs, value]));

  // reset paging when query/ticker/timeframe changes
  useEffect(() => {
    setPage(0);
  }, [qDebounced, ticker, tf]);


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

      {/* Main content */}
      <main className="news-main">
        {/* Search / Ticker */}
        <div className="news-search">
          <span className="ico search" aria-hidden />
          <input
            placeholder="Search headlines (e.g., earnings)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search news"
          />
          <input
            placeholder="Ticker (e.g., AAPL)"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            aria-label="Ticker"
            className="ticker-input"
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

        {/* Controls for pagination (only used when no q/ticker) */}
        {!qDebounced && !ticker && (
          <section className="section-controls">
            <label>
              Page:
              <input
                type="number"
                min={0}
                value={page}
                onChange={(e) => setPage(Math.max(0, Number(e.target.value) || 0))}
                style={{ width: 70, marginLeft: 8 }}
              />
            </label>
            <label style={{ marginLeft: 12 }}>
              Size:
              <input
                type="number"
                min={1}
                max={100}
                value={size}
                onChange={(e) => setSize(Math.min(100, Math.max(1, Number(e.target.value) || 20)))}
                style={{ width: 70, marginLeft: 8 }}
              />
            </label>
          </section>
        )}

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

// /* ---------- tiny bits ---------- */
function Brand() {
  return (
        <Link  className="brand" to="/dashboard">
                  <div className="brand__logo">A</div>
                  <div className="brand__name">Ascendia</div>
        </Link>
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

// /* ---------- helpers ---------- */
function formatAgo(dateish) {
  if (!dateish) return "";
  // supports ISO string or epoch seconds
  let ms;
  if (typeof dateish === "number") {
    // assume epoch seconds if small, ms if large
    ms = dateish < 2e12 ? dateish * 1000 : dateish;
  } else {
    const d = new Date(dateish);
    if (isNaN(d)) return "";
    ms = d.getTime();
  }
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



// import React, { useEffect, useMemo, useState } from "react";
// import { Link, NavLink } from "react-router-dom";

// // Note: Removed 'import "./news_ui.css";' and replaced with Tailwind classes.

// const HEADLINE_TAGS = ["Stocks", "Crypto", "Macro"];
// const TIMEFRAMES = ["24h", "7d"];

// // Simplified environment variable access for single-file compilation context
// const API_BASE = "http://localhost:8080"; 

// export default function News() {
  // const [q, setQ] = useState("");
  // const [ticker, setTicker] = useState(""); 
  // const [tags, setTags] = useState(["Stocks"]); // cosmetic chips (not sent to API)
  // const [tf, setTf] = useState("24h");
  // const [page, setPage] = useState(0);
  // const [size, setSize] = useState(20);

  // // data state
  // const [items, setItems] = useState([]); 
  // const [allSources, setAllSources] = useState([]); 
  // const [srcs, setSrcs] = useState([]); // UI-only filter (client-side)
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  // // debounce for search
  // const [qDebounced, setQDebounced] = useState(q);
  // useEffect(() => {
  //   const id = setTimeout(() => setQDebounced(q.trim()), 400);
  //   return () => clearTimeout(id);
  // }, [q]);

  // // build URL per your backend contract
  // const sinceDays = tf === "7d" ? 7 : 1;
  // const buildUrl = () => {
  //   // Using a try-catch for URL constructor robustness, though API_BASE is constant
  //   try {
  //     const u = new URL("/api/news", API_BASE);
  //     const hasTicker = ticker.trim();
  //     const hasQuery = qDebounced.trim();

  //     if (hasTicker || hasQuery) {
  //       // Apply timeframe filter for any specific search
  //       u.searchParams.set("sinceDays", String(sinceDays));

  //       // Apply ticker filter if present
  //       if (hasTicker) {
  //         u.searchParams.set("ticker", hasTicker.toUpperCase());
  //       }

  //       // Apply query filter if present
  //       if (hasQuery) {
  //         u.searchParams.set("q", hasQuery);
  //       }

  //     } else {
  //       // Default: paginated list (only when no ticker or query is active)
  //       u.searchParams.set("page", String(page));
  //       u.searchParams.set("size", String(size));
  //     }
      
  //     return u.toString();
  //   } catch (e) {
  //     console.error("Error building URL:", e);
  //     return ""; // Return empty string on error to prevent fetch
  //   }
  // };

  // // fetch on mount and whenever filters change
  // useEffect(() => {
  //   let cancelled = false;
  //   const ctrl = new AbortController();
  //   const url = buildUrl();

  //   if (!url) return; // Prevent fetch if URL failed to build

  //   (async () => {
  //     try {
  //       setLoading(true);
  //       setError("");
        
  //       const res = await fetch(url, { signal: ctrl.signal });
  //       if (!res.ok) throw new Error(`HTTP ${res.status}`);

  //       const payload = await res.json();

  //       // Support both paged and non-paged responses
  //       const list = Array.isArray(payload) ? payload : payload.content || [];
  //       const mapped = list.map((n, idx) => ({
  //         id: n.id ?? idx,
  //         title: n.title || n.headline || "Untitled",
  //         source: n.source || "Unknown",
  //         ago: formatAgo(n.publishedAt || n.datetime || n.timestamp),
  //         img: n.imageUrl || n.image || "https://placehold.co/600x400/1f2937/d1d5db?text=No+Image",
  //         url: n.url || "#",
  //         rawDate: n.publishedAt || n.datetime || n.timestamp,
  //       }));

  //       if (!cancelled) {
  //         setItems(mapped);

  //         // Sources list from payload (if available)
  //         const uniq = Array.from(new Set(mapped.map((x) => x.source))).slice(0, 6);
  //         setAllSources(uniq);
  //         // Only set initial srcs if current srcs is empty (to maintain user filter state)
  //         setSrcs((prev) => (prev.length ? prev : uniq.slice(0, 2))); 
  //       }
  //     } catch (e) {
  //       if (!cancelled && e.name !== "AbortError") {
  //         setError(e.message || "Failed to load news");
  //         setItems([]);
  //       }
  //     } finally {
  //       if (!cancelled) setLoading(false);
  //     }
  //   })();

  //   return () => {
  //     cancelled = true;
  //     ctrl.abort();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [qDebounced, ticker, tf, page, size]);

  // // client-side filter by selected sources (chips)
  // const filtered = useMemo(() => {
  //   if (!srcs.length) return items;
  //   return items.filter((n) => srcs.includes(n.source));
  // }, [items, srcs]);

  // const toggle = (list, setList, value) =>
  //   setList((xs) => (xs.includes(value) ? xs.filter((t) => t !== value) : [...xs, value]));

  // // reset paging when query/ticker/timeframe changes
  // useEffect(() => {
  //   setPage(0);
  // }, [qDebounced, ticker, tf]);

//    return (
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
//         {/* Search / Ticker */}
//         <div className="news-search">
//           <span className="ico search" aria-hidden />
//           <input
//             placeholder="Search headlines (e.g., earnings)"
//             value={q}
//             onChange={(e) => setQ(e.target.value)}
//             aria-label="Search news"
//           />
//           <input
//             placeholder="Ticker (e.g., AAPL)"
//             value={ticker}
//             onChange={(e) => setTicker(e.target.value)}
//             aria-label="Ticker"
//             className="ticker-input"
//           />
//         </div>

//         {/* Breaking bar */}
//         <div className="breaking" role="status" aria-live="polite">
//           {loading ? "Loading headlines…" : error ? `Error: ${error}` : "Latest market headlines"}
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
//                 title="(demo tag only)"
//               >
//                 {t}
//               </button>
//             ))}

//             {/* dynamic sources from live data */}
//             {allSources.map((s) => (
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

//         {/* Controls for pagination (only used when no q/ticker) */}
//         {!qDebounced && !ticker && (
//           <section className="section-controls">
//             <label>
//               Page:
//               <input
//                 type="number"
//                 min={0}
//                 value={page}
//                 onChange={(e) => setPage(Math.max(0, Number(e.target.value) || 0))}
//                 style={{ width: 70, marginLeft: 8 }}
//               />
//             </label>
//             <label style={{ marginLeft: 12 }}>
//               Size:
//               <input
//                 type="number"
//                 min={1}
//                 max={100}
//                 value={size}
//                 onChange={(e) => setSize(Math.min(100, Math.max(1, Number(e.target.value) || 20)))}
//                 style={{ width: 70, marginLeft: 8 }}
//               />
//             </label>
//           </section>
//         )}

//         <section className="section-title">
//           <h3>Market-moving</h3>
//         </section>

//         {/* Cards grid */}
//         <section className="news-grid">
//           {loading && <div>Loading…</div>}
//           {!loading && !error && filtered.length === 0 && <div>No news found.</div>}
//           {filtered.map((n) => (
//             <article key={n.id} className="news-card">
//               <div className="thumb">
//                 <img src={n.img} alt="" loading="lazy" />
//               </div>
//               <Link to={n.url || "#"} target="_blank" rel="noreferrer" className="title">
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


/* ---------- tiny bits ---------- */
// function Brand() {
//   return (
//     <div className="flex items-center space-x-2 mb-8 p-1">
//       <div className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white text-xl font-extrabold rounded-md shadow-lg">A</div>
//       <div className="text-xl font-bold text-white">Ascendia</div>
//     </div>
//   );
// }

// function SideLink({ to, icon, children, active }) {
//   const baseClasses = "flex items-center space-x-4 p-3 rounded-xl transition duration-150 text-gray-400";
  
//   return (
//     <NavLink 
//       to={to} 
//       className={({ isActive }) => 
//         (active || isActive) 
//           ? `${baseClasses} bg-indigo-600 text-white shadow-md hover:bg-indigo-700` 
//           : `${baseClasses} hover:bg-gray-800 hover:text-white`
//       }
//     >
//       <span className="text-xl w-5 h-5 flex items-center justify-center" aria-hidden>{icon}</span>
//       <span className="font-medium">{children}</span>
//     </NavLink>
//   );
// }

/* ---------- helpers ---------- */
// function formatAgo(dateish) {
//   if (!dateish) return "";
//   // supports ISO string or epoch seconds
//   let ms;
//   if (typeof dateish === "number") {
//     // assume epoch seconds if small, ms if large
//     ms = dateish < 2e12 ? dateish * 1000 : dateish;
//   } else {
//     const d = new Date(dateish);
//     if (isNaN(d.getTime())) return "";
//     ms = d.getTime();
//   }
//   const diff = Date.now() - ms;
//   if (diff < 0) return "just now";
//   const sec = Math.floor(diff / 1000);
//   if (sec < 60) return `${sec}s ago`;
//   const min = Math.floor(sec / 60);
//   if (min < 60) return `${min}m ago`;
//   const hr = Math.floor(min / 60);
//   if (hr < 24) return `${hr}h ago`;
//   const day = Math.floor(hr / 24);
//   return `${day}d ago`;
// }
