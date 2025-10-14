import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import "./connected-accounts_ui.css";

/** Mock provider catalog (icon as emoji for now—swap for SVGs as needed) */
const CATALOG = {
  stripe: { name: "Stripe",  icon: "🟪", color: "#635BFF", defaultScopes: ["Read payments"] },
  google: { name: "Google",  icon: "🟨", color: "#4285F4", defaultScopes: ["Read profile"] },
  github: { name: "GitHub",  icon: "⚫️", color: "#24292e", defaultScopes: ["Read & write"] },
  alpaca: { name: "Broker (Alpaca)", icon: "🟨", color: "#ffc107", defaultScopes: ["Trading", "Positions"] },
};

export default function ConnectedAccounts() {
  // Example state — replace with data from your API
  const [items, setItems] = useState([
    {
      id: "stripe",
      status: "connected",
      connectedAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
      scopes: CATALOG.stripe.defaultScopes,
      warning: null,
    },
    {
      id: "google",
      status: "connected",
      connectedAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      scopes: ["Read profile", "Email"],
      warning: "Access to your account may expire soon",
    },
    {
      id: "github",
      status: "disconnected",
      connectedAt: null,
      scopes: ["Read & write"],
      warning: null,
    },
  ]);

  const availableToAdd = useMemo(
    () => Object.keys(CATALOG).filter((k) => !items.some((i) => i.id === k)),
    [items]
  );

  const fmtAgo = (ts) => {
    if (!ts) return null;
    const days = Math.max(1, Math.round((Date.now() - ts) / 86_400_000));
    return `${days} day${days > 1 ? "s" : ""} ago`;
    // For production, use a real “time ago” util.
  };

  // ---- Actions (replace with your API calls) ----
  const handleConnect = async (id) => {
    try {
      // await fetch(`/api/v1/integrations/${id}/connect`, { method: "POST" });
      setItems((prev) => {
        const exists = prev.some((i) => i.id === id);
        return exists
          ? prev.map((i) =>
              i.id === id ? { ...i, status: "connected", connectedAt: Date.now() } : i
            )
          : [
              ...prev,
              {
                id,
                status: "connected",
                connectedAt: Date.now(),
                scopes: CATALOG[id].defaultScopes,
                warning: null,
              },
            ];
      });
    } catch (e) {
      alert(`Connect failed: ${e.message || e}`);
    }
  };

  const handleDisconnect = async (id) => {
    try {
      // await fetch(`/api/v1/integrations/${id}/disconnect`, { method: "POST" });
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "disconnected" } : i)));
    } catch (e) {
      alert(`Disconnect failed: ${e.message || e}`);
    }
  };

  const toggleGithub = () => {
    const gh = items.find((i) => i.id === "github");
    if (!gh || gh.status !== "connected") return handleConnect("github");
    return handleDisconnect("github");
  };

  // ------------------------------------------------

  return (
    <div className="dp-shell"> 

     <aside className="dp-sidebar">
            <div className="st-brand">
              <div className="logo">A</div>
              {/* <div className="name">Ascendia</div> */}
              <div className="name">Settings</div>
            </div>
    
            <nav className="st-nav">
              <NavLink to="/settings/profile" className="st-link is-active">
                <span className="ico user" /> Profile
              </NavLink>
              <NavLink to="/settings/security" className="st-link">
                <span className="ico shield" /> Security
              </NavLink>
              <NavLink to="/settings/notifications" className="st-link">
                <span className="ico bell" /> Notifications
              </NavLink>
              <NavLink to="/settings/billing" className="st-link">
                <span className="ico bill" /> Billing & Subscription
              </NavLink>
              <NavLink to="/settings/api-keys" className="st-link">
                <span className="ico key" /> API Keys
              </NavLink>
               <NavLink to="/settings/connected-accounts" className="st-link">
                <span className="ico shield" /> Connected Accounts
              </NavLink>
              <NavLink to="/settings/data-privacy" className="st-link">
                <span className="ico lock" /> Data & Privacy
              </NavLink>
              {/* <NavLink to="/settings/danger-zone" className="st-link danger">
                <span className="ico danger" /> Danger Zone
              </NavLink> */}
            </nav>
    
    
              <div className="sb-legal">
              <a href="#!">Privacy Policy</a>
              <a href="#!">Terms of Service</a>
            </div>
          </aside>

    <div className="ca-shell">
      <header className="ca-head">
        <h1>Connected Accounts</h1>
        <p>
          Manage your external account integrations. Only connect accounts from services you
          trust.
        </p>
      </header>

      <div className="ca-list">
        {items.map((it) => {
          const meta = CATALOG[it.id];
          const connected = it.status === "connected";
          return (
            <section key={it.id} className="ca-card">
              <div className="ca-card__left">
                <div
                  className="ca-logo"
                  style={{ background: meta.color }}
                  aria-hidden
                  title={meta.name}
                >
                  {meta.icon}
                </div>
                <div className="ca-meta">
                  <div className="ca-title">{meta.name}</div>
                  <div className="ca-sub">
                    <span className={`dot ${connected ? "green" : "gray"}`} />
                    {connected ? "Connected" : "Disconnected"}
                    {connected && it.connectedAt ? ` · ${fmtAgo(it.connectedAt)}` : null}
                  </div>
                </div>
              </div>

              <div className="ca-card__right">
                <div className={`ca-status ${connected ? "ok" : "muted"}`}>
                  {connected ? "Connected" : "Not connected"}
                </div>
                {it.id === "github" ? (
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={connected}
                      onChange={toggleGithub}
                      aria-label="Toggle GitHub connection"
                    />
                    <span className="slider" />
                  </label>
                ) : connected ? (
                  <button className="btn btn--ghost" onClick={() => handleDisconnect(it.id)}>
                    Disconnect
                  </button>
                ) : (
                  <button className="btn btn--primary" onClick={() => handleConnect(it.id)}>
                    Connect
                  </button>
                )}
              </div>

              {/* Scopes row */}
              <div className="ca-row">
                <div className="ca-row__k">Scope</div>
                <div className="ca-row__v">
                  {it.scopes?.length
                    ? it.scopes.join(" · ")
                    : CATALOG[it.id].defaultScopes.join(" · ")}
                </div>
              </div>

              {/* Optional warning row */}
              {it.warning ? (
                <div className="ca-row warn" role="note">
                  <div className="ca-row__k">!</div>
                  <div className="ca-row__v">{it.warning}</div>
                </div>
              ) : null}
            </section>
          );
        })}

        {/* Add-new block */}
        {availableToAdd.length > 0 && (
          <section className="ca-card ca-card--add">
            {availableToAdd.map((id) => {
              const meta = CATALOG[id];
              return (
                <div key={id} className="ca-add">
                  <div className="ca-add__left">
                    <div className="ca-logo" style={{ background: meta.color }} aria-hidden>
                      {meta.icon}
                    </div>
                    <div>
                      <div className="ca-title">{meta.name}</div>
                      <div className="ca-sub">Scope {meta.defaultScopes.join(" · ")}</div>
                    </div>
                  </div>
                  <button className="btn btn--primary" onClick={() => handleConnect(id)}>
                    Add Account
                  </button>
                </div>
              );
            })}
          </section>
        )}
      </div>
    </div>
     </div>
  );
}
