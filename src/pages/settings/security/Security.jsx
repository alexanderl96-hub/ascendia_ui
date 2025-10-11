import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./security_ui.css";

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      className={`sc-toggle ${checked ? "is-on" : ""}`}
      aria-pressed={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
    >
      <span className="dot" />
    </button>
  );
}

function Row({ title, desc, children, onClick, arrow }) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      className={`sc-row ${onClick ? "is-clickable" : ""}`}
      onClick={onClick}
      type={onClick ? "button" : undefined}
    >
      <div className="sc-row__text">
        <div className="t">{title}</div>
        {desc ? <div className="d">{desc}</div> : null}
      </div>
      <div className="sc-row__right">
        {children}
        {arrow ? <span className="arrow">›</span> : null}
      </div>
    </Tag>
  );
}

export default function Security() {
  const [twoFA, setTwoFA] = useState(true);

  const goChangePassword = () => {
    // TODO: route to change-password screen / modal
    alert("Navigate to Change Password");
  };
  const logoutOthers = () => {
    // TODO: call backend to revoke other sessions
    alert("Other sessions logged out");
  };
  const manageAlerts = () => {
    // TODO: open email alert prefs
    alert("Open Login Alerts preferences");
  };
  const manageKeys = () => {
    // TODO: route to API keys page
    alert("Open API Keys");
  };
  const deleteAccount = () => {
    // TODO: destructive action with confirmation
    // if (confirm("Delete your account? This cannot be undone.")) {
    //   alert("Account deleted (mock)");
    // }
  };

  return (
    <div className="sc-shell">
      {/* Top bar */}
      <header className="sc-top">
        <div className="brand">
          <div className="logo">A</div>
          <div className="name">Ascendia</div>
        </div>

        <nav className="tabs" role="tablist" aria-label="Settings sections">
          <Link to="/settings/profile" className="tab">Profile</Link>
          <Link to="/settings/security" className="tab is-active">Security</Link>
          <Link to="/settings/billing" className="tab">Billing</Link>
        </nav>
      </header>

      {/* Main card */}
      <main className="sc-main">
        <section className="sc-card">
          <h1 className="sc-title">Security</h1>

          <Row
            title="Two-Factor Authentication"
            desc="Add an extra layer of security to your account."
          >
            <Toggle checked={twoFA} onChange={setTwoFA} label="Two-factor authentication" />
          </Row>

          <Row
            title="Change Password"
            desc="It's a good idea to use a strong password"
            onClick={goChangePassword}
            arrow
          />

          <Row
            title="Active Sessions"
            desc="View and manage your active sessions"
          >
            <button className="ghost" type="button" onClick={logoutOthers}>
              Log out other sessions
            </button>
          </Row>

          <Row
            title="Login Alerts"
            desc="Receive an email notification when a login from a new device is detected"
            onClick={manageAlerts}
            arrow
          />

          <Row
            title="API Keys"
            desc="Generate and manage API keys for account access"
          >
            <div className="row-actions">
              <button className="ghost" type="button" onClick={manageKeys}>
                Manage Keys
              </button>
              <button className="danger" type="button" onClick={deleteAccount}>
                Delete Account
              </button>
            </div>
          </Row>
        </section>
      </main>
    </div>
  );
}
