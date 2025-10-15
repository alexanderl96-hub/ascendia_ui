// import React, { useEffect, useMemo, useRef, useState } from "react";

// import "./dash-board.css";
// import Icon from "../../icons/icon";
// import { Link } from "react-router-dom";
// import OrderTicket from "../../components/OrderTicket";

// export default function Dashboard() {
//     // ---- data (replace with your API) ----
//   const [tops, setTops] = useState(() => [
//     "AAPL","MSFT","NVDA","GOOGL","AMZN","META","TSLA","AVGO","BRK.B","JPM",
//     "UNH","V","LLY","XOM","PG","HD","MA","COST","JNJ","ORCL",
//   ]);
//   const [selected, setSelected] = useState("AAPL");
//   const [tf, setTf] = useState("1Y");

//   // rotation timer state
//   const [pausedUntil, setPausedUntil] = useState(0);
//   const index = useMemo(() => Math.max(0, tops.indexOf(selected)), [tops, selected]);

//   // ---- Auto-rotate featured symbol every 4s unless paused ----
//   useEffect(() => {
//     const tick = () => {
//       const now = Date.now();
//       if (now < pausedUntil || tops.length === 0) return;
//       const next = (index + 1) % tops.length;
//       setSelected(tops[next]);
//     };
//     const id = setInterval(tick, 4000);
//     return () => clearInterval(id);
//   }, [index, tops, pausedUntil]);

//   // helper: pause rotation after manual interaction
//   const pause = (ms = 20000) => setPausedUntil(Date.now() + ms);

//   // click handlers
//   const handlePickSymbol = (sym) => {
//     setSelected(sym);
//     pause();
//     // optionally scroll into view of order panel
//     orderRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
//   };

//   const orderRef = useRef(null);

//   // ---- mock quote (decorate the chart) ----
//   const lastQuote = useMemo(() => {
//     const price = (100 + Math.random() * 900).toFixed(2);
//     const pct = (Math.random() * 3 * (Math.random() > 0.4 ? 1 : -1)).toFixed(2);
//     return { price, pct };
//   }, [selected, tf]);

//   return (
//     <div className="dash-shell">
//       {/* Topbar */}
//       <header className="topbar">
//         <div className="brand">
//           <div className="brand__logo">A</div>
//           <div className="brand__name">Ascendia</div>
//         </div>

//         <nav className="topnav" aria-label="Primary">
//           <a className="topnav__link is-active" href="#">Dashboard</a>
//           <Link className="topnav__link" to="/markets"  aria-label="Markets" >Markets</Link>
//           <Link className="topnav__link" to="/portfolio"  aria-label="portfolio" >Portfolio</Link>
//           <Link className="topnav__link" to="/watchlist"  aria-label="watchlist" >Watchlist</Link>
//           <Link className="topnav__link" to="/orders"  aria-label="orders" >Orders</Link>
//           <Link className="topnav__link" to="/research"  aria-label="research" >Research</Link>
//           <Link className="topnav__link" to="/strategies"  aria-label="strategies" >Strategies</Link>
//           <Link className="topnav__link" to="/news"  aria-label="news" >News</Link>
//           <Link className="topnav__link" to="/settings"  aria-label="settings" >Settings</Link>
//         </nav>

//         <button className="btn btn--upgrade">Upgrade</button>
//       </header>

//       {/* Body with sidebar + content */}
//       <div className="body">
//         {/* Sidebar */}
//         <aside className="sidebar" aria-label="Secondary">
//             {[
//                 "home","chart","bag","bell","mail","compass",
//                 "search","layers","calendar","doc","tag","settings"
//             ].map((k) => (
//                 <button key={k} className="sidebtn" title={k}>
//                 <Icon name={k} />
//                 </button>
//             ))}
//             </aside>

//         {/* Main content grid */}
//         <main className="main">
//           {/* KPI Cards */}
//           <section className="grid kpis">
//             <div className="card kpi">
//               <div className="kpi__label">Total Equity</div>
//               <div className="kpi__value">$125,430.23</div>
//             </div>
//             <div className="card kpi kpi--green">
//               <div className="kpi__label">Today's P&amp;L</div>
//               <div className="kpi__value">+$931.12</div>
//             </div>
//             <div className="card kpi">
//               <div className="kpi__label">Buying Power</div>
//               <div className="kpi__value">$32,145.78</div>
//             </div>
//             <div className="card order">
//               <div className="order__tabs">
//                 <button className="chip chip--active">Buy</button>
//                 <button className="chip">Sell</button>
//               </div>
//               <label className="field">
//                 <span>Quantity</span>
//                 <input type="number" min="0" placeholder="0" />
//               </label>
//               <label className="field">
//                 <span>Limit price</span>
//                 <input type="number" step="0.01" placeholder="$0.00" />
//               </label>
//               <button className="btn btn--primary btn--block">Place Order</button>
//             </div>
//           </section>

//           {/* Chart + Right rail */}
//           <section className="grid mainrow">
//             <div className="card chartcard">
//               <div className="chartcard__head">
//                 <h3>AAPL</h3>
//                 <div className="tf">
//                   {["1D","1W","1M","3M","1Y"].map(t => (
//                     <button key={t} className={`chip ${t==="1Y"?"chip--active":""}`}>{t}</button>
//                   ))}
//                 </div>
//               </div>

//               {/* Fake candlestick area (decorative) */}
//               <div className="candles" role="img" aria-label="price chart">
//                 {Array.from({ length: 60 }).map((_, i) => {
//                   const h = 30 + (Math.sin(i/3)+1)*25 + (Math.random()*8);
//                   const bull = i % 5 !== 0;
//                   return (
//                     <span
//                       key={i}
//                       className={`candle ${bull ? "is-bull" : "is-bear"}`}
//                       style={{ height: `${h}%` }}
//                     />
//                   );
//                 })}
//               </div>

//               {/* Volume bars */}
//               <div className="volume">
//                 {Array.from({ length: 60 }).map((_, i) => (
//                   <span key={i} style={{ height: `${10 + (i%7)*6}%` }} />
//                 ))}
//               </div>
//             </div>

//             {/* Right rail */}
//             <div className="rail">
//               <div className="card watchlist">
//                 <div className="card__title">Watchlist <a href="#">More &rsaquo;</a></div>
//                 <ul className="list">
//                   {[
//                     {t:"MSFT", d:"+0.32%", p:"+33112"},
//                     {t:"GOOGL", d:"+0.03%", p:"153.64"},
//                     {t:"TSLA", d:"-0.11%", p:"32145"},
//                     {t:"AMZN", d:"+0.11%", p:"248.91"},
//                   ].map((r,i)=>(
//                     <li key={i} className="row">
//                       <span className="t">{r.t}</span>
//                       <span className={`d ${r.d.startsWith("-")?"down":"up"}`}>{r.d}</span>
//                       <span className="p">{r.p}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="card blurb">
//                 <div className="card__title">Lorem ipsum</div>
//                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
//               </div>
//             </div>
//           </section>

//           {/* Bottom row */}
//           <section className="grid bottomrow">
//             <div className="card">
//               <div className="card__title">Recent Orders</div>
//               <table className="table">
//                 <thead>
//                   <tr><th>Order</th><th>Status</th><th>Qty</th><th>Filled</th></tr>
//                 </thead>
//                 <tbody>
//                   {[1,2,3,4].map(i=>(
//                     <tr key={i}>
//                       <td>Buy AAPL</td><td>Filled</td><td>10</td><td>10</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="card">
//               <div className="card__title">Market News</div>
//               <div className="news">
//                 <article>
//                   <h4>Lorem ipsum ex ma urt músec</h4>
//                   <p>Lorem ipsum</p>
//                 </article>
//                 <article>
//                   <h4>Extem peur sada lesusae ditam</h4>
//                   <p>Lorem ipsum</p>
//                 </article>
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useMemo, useRef, useState } from "react";
import "./dash-board.css";
import Icon from "../../icons/icon";
import { Link } from "react-router-dom";
import OrderTicket from "../../components/OrderTickets.jsx";
import { useAuth } from "../auth/authContext.jsx";


export default function Dashboard() {
    // DESTRUCTURING CHANGE: Get safeFetch along with the user details
    const { userId , accountNumber, safeFetch, buyingPower, equity, portfolioValue } = useAuth() 
    
  // ---- Top 20 symbols (replace with your API) ----
  const [tops, setTops] = useState(() => [
    "AAPL","MSFT","NVDA","GOOGL","AMZN",
    // "META","TSLA",
    // "AVGO","BRK.B","JPM",
    // "UNH","V","LLY","XOM","PG","HD","MA","COST","JNJ","ORCL",
  ]);

  const [companies, setCompanies] = useState({
    "AAPL": "Apple Inc.",
    "MSFT": "Microsoft Corporation",
    "NVDA": "NVIDIA Corporation",
    "GOOGL":  "Alphabet Inc. (Class A)",
    "AMZN": "Amazon.com, Inc."
});

  const [selected, setSelected] = useState("AAPL");
  const [tf, setTf] = useState("1Y");
  const [chooseSymbol, setChooseSymbol] = useState("")

  // rotation timer state
  const [pausedUntil, setPausedUntil] = useState(0);
  const index = useMemo(() => Math.max(0, tops.indexOf(selected)), [tops, selected]);

  // Auto-rotate featured symbol every 4s unless paused
  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      if (now < pausedUntil || tops.length === 0) return;
      const next = (index + 1) % tops.length;
      setSelected(tops[next]);
    }, 4000);
    return () => clearInterval(id);
  }, [index, tops, pausedUntil]);

  // Pause rotation after manual interaction
  const pause = (ms = 20000) => setPausedUntil(Date.now() + ms);

  // Clicking a row or the chart selects the symbol + pauses rotation
  const handlePickSymbol = (sym) => {
    setSelected(sym);
    setChooseSymbol(sym)
    pause();
    orderRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const orderRef = useRef(null);

  // Mock quote for the header pill (decorate)
  const lastQuote = useMemo(() => {
    const price = (100 + Math.random() * 900).toFixed(2);
    const pct = (Math.random() * 3 * (Math.random() > 0.4 ? 1 : -1)).toFixed(2);
    return { price, pct };
  }, [selected, tf]);

  function formatNumber(num) {
  if (num == null || !isFinite(num)) return "";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}


  return (
    <div className="dash-shell">
      {/* Topbar */}
      <header className="topbar">
        <div className="brand">
          <div className="brand__logo">A</div>
          <div className="brand__name">Ascendia</div>
        </div>

        <nav className="topnav" aria-label="Primary">
          <a className="topnav__link is-active" href="#!">Dashboard</a>
          <Link className="topnav__link" to="/markets">Markets</Link>
          <Link className="topnav__link" to="/portfolio">Portfolio</Link>
          <Link className="topnav__link" to="/watchlists">Watchlist</Link>
          <Link className="topnav__link" to="/orders">Orders</Link>
          <Link className="topnav__link" to="/research">Research</Link>
          <Link className="topnav__link" to="/strategies">Strategies</Link>
          <Link className="topnav__link" to="/news">News</Link>
          <Link className="topnav__link" to="/settings/profile">Settings</Link>
        </nav>

        <button className="btn btn--upgrade">Upgrade</button>
      </header>

      {/* Body with sidebar + content */}
      <div className="body">
        {/* Sidebar */}
        <aside className="sidebar" aria-label="Secondary">
          {[
            "home","chart","bag","bell","mail","compass",
            "search","layers","calendar","doc","tag","settings"
          ].map((k) => (
            <button key={k} className="sidebtn" title={k}>
              <Icon name={k} />
            </button>
          ))}
        </aside>

        {/* Main content grid */}
        <main className="main">
          {/* KPI + Order */}
          <section className="grid kpis">
            <div className="card kpi">
              <div className="kpi__label">Total Equity</div>
              <div className="kpi__value">${formatNumber(equity)}</div>
            </div>
            <div className="card kpi kpi--green">
              <div className="kpi__label">Today's P&amp;L</div>
              <div className="kpi__value">+${formatNumber(931.12)}</div>
            </div>
            <div className="card kpi">
              <div className="kpi__label">Buying Power</div>
              <div className="kpi__value">${formatNumber(buyingPower)}</div>
            </div>

            {/* Replace static order form with real OrderTicket */}
                <OrderTicket
                    defaultSymbol={chooseSymbol}
                    submitUrl="http://localhost:8080/api/v1/orders"
                    userId={userId}
                    accountNumber={accountNumber}
                    fetchApi={safeFetch} // <-- PASS safeFetch HERE
                    onSuccess={(resp) => console.log("order ok", resp)}
                    onError={(msg) => console.error("order error", msg)}
                    />
          </section>

          {/* Chart + Right rail */}
          <section className="grid mainrow">
            {/* Featured chart card (clickable to select current symbol) */}
            <div
              className="card chartcard clickable"
              onClick={() => handlePickSymbol(selected)}
              title={`Open order ticket for ${selected}`}
            >
              <div className="chartcard__head">
                <h3>{companies[`${selected}`] + " " } ( {selected} )</h3>
                <div className="tf" role="tablist" aria-label="Timeframe">
                  {["1D","1W","1M","3M","1Y"].map(t => (
                    <button
                      key={t}
                      role="tab"
                      aria-selected={tf === t}
                      onClick={(e) => { e.stopPropagation(); setTf(t); pause(); }}
                      className={`chip ${tf===t?"chip--active":""}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fake candlestick area (decorative) */}
              <div className="candles" role="img" aria-label="price chart">
                {Array.from({ length: 60 }).map((_, i) => {
                  const h = 30 + (Math.sin(i/3)+1)*25 + (Math.random()*8);
                  const bull = i % 5 !== 0;
                  return (
                    <span
                      key={i}
                      className={`candle ${bull ? "is-bull" : "is-bear"}`}
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
              </div>

              {/* Volume bars */}
              <div className="volume">
                {Array.from({ length: 60 }).map((_, i) => (
                  <span key={i} style={{ height: `${10 + (i%7)*6}%` }} />
                ))}
              </div>

              {/* Current quote pill in corner */}
              {/* <div className="quote-pill">
                <span className="s">{selected}</span>
                <span className="p">${lastQuote.price}</span>
                <span className={`d ${Number(lastQuote.pct) >= 0 ? "up":"down"}`}>
                  {Number(lastQuote.pct) >= 0 ? "+" : ""}{lastQuote.pct}%
                </span>
              </div> */}
            </div>

            {/* Right rail <Link to="/watchlists">M &rsaquo;</Link> */}
            <div className="rail">
              <div className="card watchlist">
                <div className="card__title">Top 20 Live Market</div>
                <ul className="list">
                  {tops.map((sym) => {
                    const delta = (Math.random()*2*(Math.random()>0.5?1:-1)).toFixed(2) + "%";
                    const price = (100 + Math.random()*900).toFixed(2);
                    const isActive = sym === selected;
                    return (
                      <div
                        key={sym}
                        className={`rowdash row--clickable ${isActive ? "is-active":""}`}
                        onClick={() => handlePickSymbol(sym) }
                        title={`Select ${sym}`}
                      >
                        <div className="t">{sym}</div>
                        <div className={`d ${delta.startsWith("-") ? "down":"up"}`}>{delta}</div>
                        <div className="p">{price}</div>
                      </div>
                    );
                  })}
                </ul>
              </div>

              <div className="card blurb">
                <div className="card__title">Tip</div>
                <p>Click the chart or any symbol above to prefill the order panel. Rotation pauses for 20s after you interact.</p>
              </div>
            </div>
          </section>

          {/* Bottom row */}
          <section className="grid bottomrow">
            <div className="card">
              <div className="card__title">Recent Orders</div>
              <table className="table">
                <thead>
                  <tr><th>Order</th><th>Status</th><th>Qty</th><th>Filled</th></tr>
                </thead>
                <tbody>
                  {[1,2,3,4].map(i=>(
                    <tr key={i}>
                      <td>Buy {selected}</td><td>Filled</td><td>10</td><td>10</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card">
              <div className="card__title">Market News</div>
              <div className="news">
                <article>
                  <h4>Lorem ipsum ex ma urt músec</h4>
                  <p>Lorem ipsum</p>
                </article>
                <article>
                  <h4>Extem peur sada lesusae ditam</h4>
                  <p>Lorem ipsum</p>
                </article>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}