import React, {useEffect, useMemo, useState} from "react";
import { useNavigate } from "react-router-dom";
import { getStocks } from "../lib/api"; 
import "./stock-picker.css";
import Googl from "../assets_image/Googl.svg.png"

// const MOCK_STOCKS = [
//   { symbol: "AAPL", name: "Apple", price: 172.51, changePct: 2.42 },
//   { symbol: "AMZN", name: "Amazon", price: 153.29, changePct: 3.18 },
//   { symbol: "TSLA", name: "Tesla", price: 194.48, changePct: 1.95 },
//   { symbol: "MSFT", name: "Microsoft", price: 420.14, changePct: 1.07 },
//   { symbol: "NVDA", name: "NVIDIA", price: 814.35, changePct: 2.85 },
//   { symbol: "AMD", name: "AMD", price: 161.4, changePct: 2.22 },
//   { symbol: "GOOGL", name: "Google", price: 169.44, changePct: 0.89 },
//   { symbol: "META", name: "Meta", price: 597.92, changePct: 1.52 },
//   { symbol: "NFLX", name: "Netflix", price: 607.32, changePct: 2.37 },
//   { symbol: "PLTR", name: "Palantir", price: 24.18, changePct: 3.74 },
//   { symbol: "SHOP", name: "Shopify", price: 67.03, changePct: 1.89 },
//   { symbol: "COIN", name: "Coinbase", price: 235.76, changePct: 4.53 },
//   { symbol: "V", name: "Visa", price: 274.29, changePct: 0.57 },
//   { symbol: "DIS", name: "Disney", price: 103.12, changePct: 2.05 },
//   { symbol: "BA", name: "Boeing", price: 181.46, changePct: 5.83 },
// ];

const stocks = await getStocks();
const PAGE_SIZE = 15; 


export default function StockPicker({ minPick = 3, onContinue }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(() => new Set());
  const [page, setPage] = useState(0);
  const nav = useNavigate();

  console.log("Stocks: ", stocks)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return stocks;
    return stocks.filter(
      (s) =>
        s.symbol.toLowerCase().includes(q) ||
        s.companyName.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    setPage(0);
  }, [query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // clamp page if filtered length changes
  useEffect(() => {
    setPage((p) => Math.min(p, pageCount - 1));
  }, [pageCount]);

  const pageItems = useMemo(() => {
    const start = page * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);


  const toggle = (symbol) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(symbol)) next.delete(symbol);
      else next.add(symbol);
      return next;
    });
  };

  const selectedCount = selected.size;
  const canContinue = selectedCount >= minPick;

  const handleContinue = () => {
    if (!canContinue) return;
    const picks = Array.from(selected);
    onContinue?.(picks);
    // example: navigate("/portfolio/setup", { state: { picks } })
    nav("/dashboard");
  };

  return (

     <div className="sp__page">
      <div className="sp__wrap">
        <header className="sp__header">
          <h1 className="sp__title">Start Building Your Portfolio</h1>
          <p className="sp__subtitle">
            Pick your favorite stocks to get started. Create your first portfolio
            and invest in the market!
          </p>

          <div className="sp__search">
            <span className="sp__searchIcon">⌕</span>
            <input
              className="sp__searchInput"
              placeholder="Search stocks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search stocks"
            />
          </div>
        </header>

        <section className="sp__section">
          <div className="sp__sectionHead">
            <h2 className="sp__sectionTitle">Popular Stocks</h2>

            {filtered.length > PAGE_SIZE && (
              <div className="sp__pager">
                <button
                  type="button"
                  className="sp__pagerBtn"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  Prev
                </button>

                <div className="sp__pagerInfo">
                  Page {page + 1} / {pageCount}
                </div>

                <button
                  type="button"
                  className="sp__pagerBtn"
                  onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                  disabled={page === pageCount - 1}
                >
                  Next
                </button>
              </div>
            )}
          </div>

          <div className="sp__grid">
            {pageItems.map((s) => {
              const isSelected = selected.has(s.symbol);
              const up = s.changePct >= 0;

              return (
                <button
                  key={s.symbol}
                  type="button"
                  className={`sp__card ${isSelected ? "is-selected" : ""}`}
                  onClick={() => toggle(s.symbol)}
                  aria-pressed={isSelected}
                >
                  <div className="sp__cardTop">
                    <div className="sp__identity">
                      <div className="sp__symbol">
                        <img className="sp__symIcon" src={s.symbol == "GOOGL" ? Googl : ""} alt="" aria-hidden="true" />
                        {s.symbol}</div>
                      <div className="sp__name">{s.companyName}</div>
                    </div>

                    <div className={`sp__check ${isSelected ? "on" : ""}`}>
                      ✓
                    </div>
                  </div>

                  <div className="sp__priceRow">
                    <div className="sp__price">${s.lastStrategyPrice.toFixed(2)}</div>
                    <div className={`sp__chg ${up ? "up" : "down"}`}>
                      {up ? "▲" : "▼"} {Math.abs(s.changePct).toFixed(2)}%
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <footer className="sp__footer">
          <div className={`sp__hint ${canContinue ? "ok" : ""}`}>
            Select at least {minPick} stocks
          </div>

          <button
            type="button"
            className="sp__continue"
            disabled={!canContinue}
            onClick={handleContinue}
          >
            Continue ({selectedCount})
          </button>
        </footer>
      </div>
    </div>
  );
}
