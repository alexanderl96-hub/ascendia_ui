import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./notifications_ui.css";

/* ---------- tiny UI bits ---------- */
function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      className={`nt-toggle ${checked ? "is-on" : ""}`}
      aria-pressed={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
    >
      <span className="dot" />
    </button>
  );
}

function Check({ checked, onChange, label }) {
  return (
    <button
      type="button"
      className={`nt-check ${checked ? "is-on" : ""}`}
      aria-pressed={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
    >
      <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
        <polyline
          points="4,10 8,14 16,6"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* ---------- page ---------- */
export default function Notifications() {
  // Methods
  const [methodEmail, setMethodEmail] = useState(true);
  const [methodSms, setMethodSms] = useState(true);
  const [methodPush, setMethodPush] = useState(true);

  // Preference matrix
  const [prefs, setPrefs] = useState({
    market: { email: true, sms: true, push: true },
    account: { email: true, sms: true, push: true },
    news: { email: true, sms: true, push: true },
    weekly: { email: true, sms: true, push: false },
  });

  const setPref = (row, col, v) =>
    setPrefs((p) => ({ ...p, [row]: { ...p[row], [col]: v } }));

  // Right column controls
  const [quietFrom, setQuietFrom] = useState("22:00");
  const [quietTo, setQuietTo] = useState("08:00");
  const [digest, setDigest] = useState("daily"); // none | daily | weekly
  const [webhook, setWebhook] = useState("");

  const payload = {
    methods: { email: methodEmail, sms: methodSms, push: methodPush },
    preferences: prefs,
    quietHours: { from: quietFrom, to: quietTo },
    digest, // "none" | "daily" | "weekly"
    webhook,
  };

  const saveLeft = () => {
    console.log("Save notification prefs:", payload);
    // TODO: POST to /api/v1/notifications/preferences
    // await fetch(..., { method:'PUT', body: JSON.stringify(payload) })
    alert("Preferences saved (mock)");
  };

  const saveRight = () => {
    console.log("Save delivery config:", payload);
    // TODO: POST to /api/v1/notifications/config
    alert("Delivery settings saved (mock)");
  };

  return (
    <div className="nt-shell">
      {/* Sidebar (compact, consistent with other pages) */}
      <aside className="nt-sidebar">
        <div className="sb-brand">
          <div className="logo">A</div>
          <div className="name">ASCENDIA</div>
        </div>
        <nav className="sb-nav">
          <Link to="/markets">Markets</Link>
          <Link to="/watchlists">Watchlist</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/research">Research</Link>
          <Link to="/news">News</Link>
          <Link to="/strategies">Strategies</Link>
          <Link to="/settings" className="is-active">Settings</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="nt-main">
        <h1 className="nt-title">Notifications</h1>

        <div className="nt-grid">
          {/* Left pane */}
          <section className="card nt-left">
            <h3 className="sec">Notification Methods</h3>
            <div className="row mrow">
              <Toggle checked={methodEmail} onChange={setMethodEmail} label="Email" />
              <span>Email</span>
            </div>
            <div className="row mrow">
              <Toggle checked={methodSms} onChange={setMethodSms} label="SMS" />
              <span>SMS</span>
            </div>
            <div className="row mrow">
              <Toggle checked={methodPush} onChange={setMethodPush} label="Push" />
              <span>Push</span>
            </div>

            <div className="divider" />

            <h3 className="sec">Notification Preferences</h3>

            <div className="matrix-head">
              <span />
              <span>Email</span>
              <span>SMS</span>
              <span>Push</span>
            </div>

            {[
              ["market", "Market Updates"],
              ["account", "Account Activity"],
              ["news", "News & Announcements"],
              ["weekly", "Weekly Reports"],
            ].map(([key, label]) => (
              <div className="matrix-row" key={key}>
                <span className="lab">{label}</span>
                <Check
                  checked={prefs[key].email}
                  onChange={(v) => setPref(key, "email", v)}
                  label={`${label} email`}
                />
                <Check
                  checked={prefs[key].sms}
                  onChange={(v) => setPref(key, "sms", v)}
                  label={`${label} sms`}
                />
                <Check
                  checked={prefs[key].push}
                  onChange={(v) => setPref(key, "push", v)}
                  label={`${label} push`}
                />
              </div>
            ))}

            <div className="actions">
              <button className="btn btn--primary" onClick={saveLeft}>
                Save Changes
              </button>
            </div>
          </section>

          {/* Right pane */}
          <section className="card nt-right">
            <div className="group">
              <h3 className="sec">Quiet Hours</h3>
              <div className="qh">
                <label className="field">
                  <span>From</span>
                  <input
                    type="time"
                    value={quietFrom}
                    onChange={(e) => setQuietFrom(e.target.value)}
                  />
                </label>
                <label className="field">
                  <span>To</span>
                  <input
                    type="time"
                    value={quietTo}
                    onChange={(e) => setQuietTo(e.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className="group">
              <h3 className="sec">Digest Emails</h3>
              <label className="field">
                <select
                  value={digest}
                  onChange={(e) => setDigest(e.target.value)}
                  aria-label="Digest frequency"
                >
                  <option value="daily">Send daily</option>
                  <option value="weekly">Send weekly</option>
                  <option value="none">Off</option>
                </select>
              </label>
            </div>

            <div className="group">
              <h3 className="sec">Webhook Notifications</h3>
              <label className="field">
                <input
                  placeholder="URL"
                  value={webhook}
                  onChange={(e) => setWebhook(e.target.value)}
                />
              </label>
            </div>

            <div className="actions">
              <button className="btn btn--primary" onClick={saveRight}>
                Save Changes
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
