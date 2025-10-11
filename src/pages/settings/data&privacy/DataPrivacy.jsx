import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./data-privacy_ui.css";

/* tiny ui atoms */
function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      className={`dp-toggle ${checked ? "is-on" : ""}`}
      aria-pressed={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
    >
      <span className="dot" />
    </button>
  )
}

export default function DataPrivacy() {
  const [enableTracking, setEnableTracking] = useState(true);
  const [consentProcessing, setConsentProcessing] = useState(true);
  const [cookiePrefs, setCookiePrefs] = useState(true);
  const [retention, setRetention] = useState("12"); // months: 3 | 6 | 12 | 24

  const payload = {
    enableTracking,
    consentProcessing,
    cookiePrefs,
    retentionMonths: Number(retention),
  };

  const downloadData = () => {
    // Hook to your export endpoint
    // window.location.href = "/api/v1/privacy/export";
    alert("Downloading (mock). Plug in your /export endpoint.");
  };

  const savePrivacy = () => {
    console.log("Save privacy controls:", payload);
    // await fetch("/api/v1/privacy", { method:"PUT", body: JSON.stringify(payload) })
    alert("Saved (mock).");
  };

  const requestErasure = () => {
    // POST /api/v1/privacy/gdpr-erasure
    alert("GDPR/CCPA data deletion request submitted (mock).");
  };

  const openAuditLog = () => {
    // Navigate to audit log page or open modal
    alert("Open audit log (mock).");
  };

  return (
    <div className="dp-shell">
      {/* Sidebar */}
      <aside className="dp-sidebar">
        <div className="sb-title">Settings</div>
        <nav className="sb-list">
          <Link to="/settings/profile">Account</Link>
          <Link to="/settings/security">Security</Link>
          <Link to="/settings/notifications">Notifications</Link>
          <Link to="/settings/billing">Billing & Subscription</Link>
          <Link to="/settings/api-keys">API Keys</Link>
          <Link to="/settings/connected-accounts">Connected Accounts</Link>
          <Link to="/settings/data-privacy" className="is-active">Data & Privacy</Link>
        </nav>

        <div className="sb-legal">
          <a href="#!">Privacy Policy</a>
          <a href="#!">Terms of Service</a>
        </div>
      </aside>

      {/* Main */}
      <main className="dp-main">
        <h1 className="dp-title">Data &amp; Privacy</h1>

        {/* Data Export */}
        <section className="card export">
          <div className="export__text">
            <div className="h">Download your data</div>
            <p>Export your personal data in a machine-readable format.</p>
          </div>
          <button className="btn btn--ghost" onClick={downloadData}>Download</button>
        </section>

        {/* Privacy controls */}
        <section className="card controls">
          <h3 className="sec">Privacy controls</h3>

          <div className="ctrl-row">
            <div className="ctrl-text">
              <div className="k">Enable tracking</div>
              <div className="s">Helps us improve by collecting usage analytics.</div>
            </div>
            <Toggle checked={enableTracking} onChange={setEnableTracking} label="Enable tracking" />
          </div>

          <div className="ctrl-row">
            <div className="ctrl-text">
              <div className="k">Consent to data processing</div>
              <div className="s">Confirm processing of data required for your account.</div>
            </div>
            <Toggle checked={consentProcessing} onChange={setConsentProcessing} label="Consent to processing" />
          </div>

          <div className="ctrl-row">
            <div className="ctrl-text">
              <div className="k">Cookie preferences</div>
              <div className="s">Preference cookies to keep you signed in and remember choices.</div>
            </div>
            <Toggle checked={cookiePrefs} onChange={setCookiePrefs} label="Cookie preferences" />
          </div>

          <div className="ctrl-row">
            <div className="ctrl-text">
              <div className="k">Data retention</div>
              <div className="s">Choose how long we keep logs and activity history.</div>
            </div>
            <div className="retention">
              <select value={retention} onChange={(e)=>setRetention(e.target.value)}>
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="24">24 months</option>
              </select>
            </div>
          </div>

          <div className="ctrl-actions">
            <button className="btn btn--primary" onClick={savePrivacy}>Save changes</button>
          </div>

          <div className="gdpr">
            <div className="gdpr__text">
              <div className="k">GDPR / CCPA</div>
              <div className="s">Request data deletion and account erasure.</div>
            </div>
            <button className="btn btn--danger" onClick={requestErasure}>Request deletion</button>
          </div>
        </section>

        {/* Access history */}
        <section className="card audit">
          <div className="audit__text">
            <div className="h">Access history</div>
            <p>Review anonymized audit log entries with data access.</p>
          </div>
          <button className="btn btn--ghost" onClick={openAuditLog}>View audit log</button>
        </section>
      </main>
    </div>
  );
}
