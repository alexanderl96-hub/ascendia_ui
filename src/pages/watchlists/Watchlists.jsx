import React, { useMemo, useState } from "react";
import "./watchlists_ui.css";

const seedRows = [
  { sym: "AAPL", name: "Apple Inc.",        price: 220.31,   change: +1.24,  volume: "52.6M" },
  { sym: "TSLA", name: "Tesla, Inc.",       price: 179.42,   change: -0.83,  volume: "69.3M" },
  { sym: "MSFT", name: "Microsoft Corp.",   price: 411.05,   change: +0.34,  volume: "21.4M" },
  { sym: "GOOGL",name: "Alphabet Class A",  price: 155.12,   change: +0.11,  volume: "18.1M" },
  { sym: "NVDA", name: "NVIDIA Corp.",      price: 953.77,   change: -2.18,  volume: "38.9M" },
];

export default function Watchlists() {
  // multiple lists (local only for demo)
  const [lists, setLists] = useState([
    { id: "default", name: "My Watchlist", rows: seedRows },
    { id: "growth",  name: "Growth",       rows: seedRows.slice(0,3) },
  ]);
  const [activeId, setActiveId] = useState("default");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("symbol"); // symbol | price | change | volume

  const active = useMemo(
    () => lists.find(l => l.id === activeId) ?? lists[0],
    [lists, activeId]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let r = !q
      ? active.rows
      : active.rows.filter(x =>
          x.sym.toLowerCase().includes(q) || x.name.toLowerCase().includes(q)
        );

    r = [...r].sort((a,b) => {
      switch (sort) {
        case "price":  return b.price - a.price;
        case "change": return b.change - a.change;
        case "volume": {
          const n = (s) => Number(String(s).replace(/[^\d.]/g,""));
          return n(b.volume) - n(a.volume);
        }
        default:       return a.sym.localeCompare(b.sym);
      }
    });
    return r;
  }, [active, query, sort]);

  // demo: add a symbol locally
  const [addSym, setAddSym] = useState("");
  const handleAdd = () => {
    const s = addSym.trim().toUpperCase();
    if (!s) return;
    const exists = active.rows.some(r => r.sym === s);
    if (exists) return;
    const newRow = {
      sym: s,
      name: s,
      price: (100 + Math.random()*900).toFixed(2) * 1,
      change: (Math.random()*4 - 2),
      volume: `${(10+Math.random()*90).toFixed(1)}M`,
    };
    setLists(ls =>
      ls.map(l => l.id === active.id ? { ...l, rows: [newRow, ...l.rows] } : l)
    );
    setAddSym("");
  };

  const handleRemove = (sym) => {
    setLists(ls =>
      ls.map(l => l.id === active.id ? { ...l, rows: l.rows.filter(r => r.sym !== sym) } : l)
    );
  };

  const makeList = () => {
    const name = prompt("New list name?");
    if (!name) return;
    const id = name.toLowerCase().replace(/\s+/g,"-").slice(0,24) || `list-${Date.now()}`;
    setLists(ls => [...ls, { id, name, rows: [] }]);
    setActiveId(id);
  };

  return (
    <div className="wl-shell">
      <header className="wl-head card">
        <h1 className="wl-title">Watchlists</h1>

        <div className="wl-actions">
          <div className="wl-field">
            <label>List</label>
            <div className="wl-select">
              <select value={activeId} onChange={(e)=>setActiveId(e.target.value)}>
                {lists.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
            </div>
          </div>

          <div className="wl-field">
            <label>Sort</label>
            <div className="wl-select">
              <select value={sort} onChange={(e)=>setSort(e.target.value)}>
                <option value="symbol">Symbol</option>
                <option value="price">Price</option>
                <option value="change">Change</option>
                <option value="volume">Volume</option>
              </select>
            </div>
          </div>

          <div className="wl-search">
            <input
              placeholder="Search symbols or names"
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />
          </div>

          <div className="wl-add">
            <input
              placeholder="Add symbol (e.g. AAPL)"
              value={addSym}
              onChange={(e)=>setAddSym(e.target.value)}
              onKeyDown={(e)=> e.key === "Enter" && handleAdd()}
            />
            <button className="btn btn--primary" onClick={handleAdd}>Add</button>
          </div>

          <button className="btn btn--ghost" onClick={makeList}>Create List</button>
        </div>
      </header>

      <section className="card wl-table-wrap">
        <table className="wl-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th className="right">Price</th>
              <th className="right">Change</th>
              <th className="right">Volume</th>
              <th className="right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const up = r.change >= 0;
              return (
                <tr key={r.sym}>
                  <td>
                    <span className={`pill ${up ? "pill--up":"pill--down"}`}>
                      {r.sym.length > 5 ? r.sym.slice(0,5) + "…" : r.sym}
                    </span>
                  </td>
                  <td className="name">{r.name}</td>
                  <td className="right">${r.price.toFixed(2)}</td>
                  <td className={`right ${up ? "up":"down"}`}>
                    {up ? "+" : ""}{r.change.toFixed(2)}%
                  </td>
                  <td className="right">{r.volume}</td>
                  <td className="right">
                    <button className="chip">Buy</button>
                    <button className="chip chip--danger" onClick={()=>handleRemove(r.sym)}>Remove</button>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="empty">No results</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
