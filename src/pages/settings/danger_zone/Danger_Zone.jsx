import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./danger-zone_ui.css";

function ConfirmDialog({ open, title, body, dangerLabel="Delete", onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="dz-overlay" role="dialog" aria-modal="true" aria-labelledby="dz-title">
      <div className="dz-modal">
        <div className="dz-modal__icon" aria-hidden>!</div>
        <h3 id="dz-title">{title}</h3>
        {body ? <p className="dz-modal__body">{body}</p> : null}
        <div className="dz-modal__actions">
          <button className="btn btn--ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn--danger" onClick={onConfirm}>{dangerLabel}</button>
        </div>
      </div>
    </div>
  );
}

export default function DangerZone() {
  const [confirm, setConfirm] = useState({ open:false, key:null });

  const openConfirm = (key) => setConfirm({ open:true, key });
  const closeConfirm = () => setConfirm({ open:false, key:null });

  const doAction = async () => {
    const { key } = confirm;
    closeConfirm();

    try {
      // TODO: replace endpoints with your real ones:
      const map = {
        delete:   { url: "/api/v1/account",        method: "DELETE" },
        closepos: { url: "/api/v1/positions/close", method: "POST"   },
        revoke:   { url: "/api/v1/apikeys/revoke",  method: "POST"   },
        reset:    { url: "/api/v1/app/reset",       method: "POST"   },
      };
      const req = map[key];
      if (!req) return;

      const res = await fetch(req.url, {
        method: req.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) throw new Error(await res.text());
      alert(`${key} OK`);
    } catch (e) {
      alert(`Action failed: ${e.message || e}`);
    }
  };

  const modalMeta = {
    delete: {
      title: "Are you sure you want to delete your account?",
      body: "This permanently deletes your account and all associated data.",
      dangerLabel: "Delete",
    },
    closepos: {
      title: "Force close all open positions?",
      body: "This will submit market orders to liquidate current positions.",
      dangerLabel: "Close Positions",
    },
    revoke: {
      title: "Revoke all API keys?",
      body: "Existing programmatic access will stop immediately.",
      dangerLabel: "Revoke API Keys",
    },
    reset: {
      title: "Reset application data?",
      body: "Local settings and cached data will be reset to initial state.",
      dangerLabel: "Reset App Data",
    },
  }[confirm.key] || {};

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

    <div className="dz-shell">
      <h1 className="dz-title">Danger Zone</h1>

      <section className="dz-card">
        <div className="dz-card__icon" aria-hidden>🗑️</div>
        <div className="dz-card__text">
          <div className="k">Delete Account</div>
          <div className="s">Permanently delete your account and all associated data.</div>
        </div>
        <button className="btn btn--danger" onClick={() => openConfirm("delete")}>Delete Account</button>
      </section>

      <section className="dz-card">
        <div className="dz-card__icon" aria-hidden>⚠️</div>
        <div className="dz-card__text">
          <div className="k">Close Positions</div>
          <div className="s">Force liquidation of all currently open positions.</div>
        </div>
        <button className="btn btn--ghost" onClick={() => openConfirm("closepos")}>Close Positions</button>
      </section>

      <section className="dz-card">
        <div className="dz-card__icon" aria-hidden>🔑</div>
        <div className="dz-card__text">
          <div className="k">Revoke API Keys</div>
          <div className="s">Permanently revoke all active API keys.</div>
        </div>
        <button className="btn btn--danger" onClick={() => openConfirm("revoke")}>Revoke API Keys</button>
      </section>

      <section className="dz-card">
        <div className="dz-card__icon" aria-hidden>↩️</div>
        <div className="dz-card__text">
          <div className="k">Reset App Data</div>
          <div className="s">Reset all application data and settings to initial state.</div>
        </div>
        <button className="btn btn--ghost" onClick={() => openConfirm("reset")}>Reset App Data</button>
      </section>

      <ConfirmDialog
        open={confirm.open}
        title={modalMeta.title}
        body={modalMeta.body}
        dangerLabel={modalMeta.dangerLabel}
        onCancel={closeConfirm}
        onConfirm={doAction}
      />
    </div>
    </div>
  );
}
