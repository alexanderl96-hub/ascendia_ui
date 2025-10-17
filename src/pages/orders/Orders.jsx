import React, { useEffect, useMemo, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./orders_ui.css";
import { useAuth } from "../auth/authContext";

/**
 * Orders page
 * - pulls orders from GET http://localhost:8080/api/v1/orders
 *   Optional query params supported here: status, from, to
 * - "Open Orders" filters to statuses commonly considered open
 * - "Cancel All" calls DELETE http://localhost:8080/api/v1/orders (adjust if different)
 */
export default function Orders() {
  const { token, accountNumber } = useAuth();

  // ---------- filters ----------
  const [status, setStatus] = useState("ALL");
  const [range, setRange]   = useState("30D"); // 1D, 7D, 30D, 90D, ALL
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [rows, setRows] = useState([]);

  // compute from/to based on range
  const { fromISO, toISO } = useMemo(() => {
    const to = new Date();
    if (range === "ALL") return { fromISO: null, toISO: to.toISOString() };
    const from = new Date();
    const map = { "1D":1, "7D":7, "30D":30, "90D":90 };
    from.setDate(from.getDate() - (map[range] || 30));
    return { fromISO: from.toISOString(), toISO: to.toISOString() };
  }, [range]);

  // ---------- fetch ----------
  useEffect(() => {
    let abort = false;
    (async () => {
      try {
        setLoading(true); setErr("");
        const params = new URLSearchParams();
        if (status && status !== "ALL") params.set("status", status);
        if (fromISO) params.set("from", fromISO);
        if (toISO)   params.set("to", toISO);
        // include accountNumber if your backend expects it
        if (accountNumber) params.set("accountNumber", accountNumber);

        const res = await fetch(`http://localhost:8080/api/v1/orders?${params.toString()}`, {
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const txt = await res.text();
        const json = txt ? JSON.parse(txt) : [];
        if (!res.ok) throw new Error(json?.error || txt || `HTTP ${res.status}`);
        if (!abort) setRows(Array.isArray(json) ? json : json?.content || []);
      } catch (e) {
        if (!abort) setErr(e.message || "Failed to load orders.");
      } finally {
        if (!abort) setLoading(false);
      }
    })();
    return () => { abort = true; };
  }, [status, fromISO, toISO, token, accountNumber]);

  // ---------- actions ----------
  const filterOpen = () => setStatus("OPEN"); // virtual status in UI
  const cancelAll = async () => {
    if (!window.confirm("Cancel ALL open orders?")) return;
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/v1/orders", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ scope: "OPEN", accountNumber }),
      });
      const txt = await res.text();
      if (!res.ok) throw new Error(txt || `HTTP ${res.status}`);
      // refresh table
      setStatus("OPEN");
    } catch (e) {
      setErr(e.message || "Failed to cancel orders.");
    } finally {
      setLoading(false);
    }
  };

  // map “OPEN” shortcut to multiple backend statuses
  const normalizedRows = useMemo(() => {
    if (status !== "OPEN") return rows;
    const openSet = new Set(["NEW", "OPEN", "PARTIALLY_FILLED", "WORKING", "PENDING"]);
    return rows.filter((r) => openSet.has((r.status || "").toUpperCase()));
  }, [rows, status]);

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
             
      <div className="ord-shell">
        <header className="ord-head">
          <h1>Orders</h1>

          <div className="ord-actions">
            <button className="btn btn--ghost" onClick={filterOpen}>Open Orders</button>
            <button className="btn btn--danger" onClick={cancelAll}>Cancel All</button>
          </div>
        </header>

        {/* Filters */}
        <div className="ord-filters">
          <div className="fieldOrd">
            <label>Status</label>
            <select value={status} onChange={(e)=>setStatus(e.target.value)}>
              <option value="ALL">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="NEW">New</option>
              <option value="PARTIALLY_FILLED">Partially filled</option>
              <option value="FILLED">Filled</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <div className="fieldOrd">
            <label>Date range</label>
            <select value={range} onChange={(e)=>setRange(e.target.value)}>
              <option value="1D">Last 1 day</option>
              <option value="7D">Last 7 days</option>
              <option value="30D">Last 30 days</option>
              <option value="90D">Last 90 days</option>
              <option value="ALL">All</option>
            </select>
          </div>
        </div>

        {err ? <div className="ord-error" role="alert">{err}</div> : null}

        <div className="ord-table-wrap">
          <table className="ord-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Filled</th>
                <th>Fee</th>
                <th>TIF</th>
                <th>#</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" className="muted">Loading…</td></tr>
              ) : normalizedRows.length === 0 ? (
                <tr><td colSpan="8" className="muted">No orders found.</td></tr>
              ) : (
                normalizedRows.map((o) => (
                  <tr key={o.id || `${o.symbol}-${o.createdAt}`}>
                    <td>
                      <span className="pill pill--ticker">{(o.symbol || "").toUpperCase()}</span>
                      <span className="sym-name">{o.name || o.symbol}</span>
                    </td>
                    <td>
                      <span className={`pill ${o.side === "BUY" ? "pill--buy":"pill--sell"}`}>
                        {o.side || "—"}
                      </span>
                    </td>
                    <td>{o.quantity}</td>
                    <td>{o.filledQuantity ?? 0}</td>
                    <td>{o.fee != null ? `$${Number(o.fee).toFixed(2)}` : "—"}</td>
                    <td>{o.tif || "GTC"}</td>
                    <td>{o.clientOrderId || `#${o.id ?? "—"}`}</td>
                    <td>
                      <span className={`badge badge--${statusTone(o.status)}`}>
                        {formatStatus(o.status)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */
function statusTone(s) {
  const v = String(s || "").toUpperCase();
  if (v === "FILLED") return "ok";
  if (v === "PARTIALLY_FILLED" || v === "OPEN" || v === "NEW" || v === "WORKING") return "warn";
  if (v === "CANCELLED") return "neutral";
  return "err";
}

function formatStatus(s) {
  return String(s || "—").replace(/_/g, " ").toLowerCase()
    .replace(/\b\w/g, (m)=>m.toUpperCase());
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

