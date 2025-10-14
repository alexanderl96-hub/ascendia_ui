import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./settings_ui.css";
import { useAuth } from "../auth/authContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faNewspaper } from '@fortawesome/free-solid-svg-icons';


function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      aria-label={label}
      className={`tg ${checked ? "on" : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span className="knob" />
    </button>
  );
}

export default function Settings() {
  const { userId , username, accountNumber, safeFetch, buyingPower, equity, portfolioValue } = useAuth() 
      

  // Mock state
  const [profile, setProfile] = useState({
    handle: username,
    name: `${username?.split(".")[0] +  " " + username?.split(".")[1] }`,
    email: "johndoe@email.com",
  });
  const [twoFA, setTwoFA] = useState(false);
  const [deviceAuth, setDeviceAuth] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [newsUpdates, setNewsUpdates] = useState(true);
  const [promos, setPromos] = useState(true);
  const [apiKey] = useState("pk_******** (cker)");

  const update = (k) => (e) =>
    setProfile((p) => ({ ...p, [k]: e.target.value }));

  const save = (e) => {
    e.preventDefault();
    // TODO: call backend
    console.log("SAVE", { profile, twoFA, deviceAuth, priceAlerts, newsUpdates, promos });
    alert("Settings saved");
  };

  return (
    <div className="dp-shell"> {/*st-shell */}
      {/* Sidebar st-side*/}
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
          <NavLink to="/settings/danger-zone" className="st-link danger">
            <span className="ico danger" /> Danger Zone
          </NavLink>
        </nav>


          <div className="sb-legal">
          <a href="#!">Privacy Policy</a>
          <a href="#!">Terms of Service</a>
        </div>
      </aside>

      {/* Main */}
      <main className="st-main">
        <header className="st-header">
          <button className="back" aria-label="Back">
             <NavLink to="/dashboard" className="st-link danger">
               <span className="ico danger" />  ←
            </NavLink>
          </button>
          <h2>Settings</h2>
        </header>

        <form className="st-grid" onSubmit={save}>
          {/* Left column */}
          <section className="card profile">
            <div className="avatar">
              <div className="face"  aria-hidden >
                  <FontAwesomeIcon className="fontIcon" icon={faUser} />
              </div>
            </div>

            <div className="row">
              <label className="field">
                <span>Profile</span>
                <input
                  value={profile.handle}
                  onChange={update("handle")}
                  placeholder="handle"
                />
              </label>
            </div>

            <div className="row">
              <label className="field">
                <span>Username</span>
                <input
                  value={profile.name}
                  onChange={update("name")}
                  placeholder="John Doe"
                />
              </label>
            </div>

            <div className="row">
              <label className="field">
                <span>Email address</span>
                <input
                  type="email"
                  value={profile.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                />
              </label>
            </div>

            {/* Collapsed security block (left) */}
            <div className="subcard">
              <h3>Security</h3>
              <button className="rowlink" type="button">Change password <span>›</span></button>
              <div className="row between">
                <span>Two-factor authentication</span>
                <Toggle checked={twoFA} onChange={setTwoFA} label="Two factor" />
              </div>
              <div className="row between">
                <span>Devices</span>
                <Toggle checked={deviceAuth} onChange={setDeviceAuth} label="Devices" />
              </div>
            </div>

            {/* Billing mini */}
            <div className="subcard">
              <div className="mini-head">
                <h3>Billing & Subscription</h3>
                <button type="button" className="pill">Upgrade</button>
              </div>
              <div className="row between">
                <span>Current plan</span>
                <span className="muted">Visa •••• 1234</span>
              </div>
            </div>
          </section>

          {/* Right column */}
          <section className="col-right">
            <div className="card">
              <h3>Security</h3>
              <button className="rowlink" type="button">Change password <span>›</span></button>
              <div className="row between">
                <span>Two-factor authentication</span>
                <Toggle checked={twoFA} onChange={setTwoFA} label="Two factor" />
              </div>
              <div className="row between">
                <span>Devices</span>
                <Toggle checked={deviceAuth} onChange={setDeviceAuth} label="Devices" />
              </div>
            </div>

            <div className="card">
              <h3>Notifications</h3>
              <div className="row between">
                <span>Price alerts</span>
                <Toggle checked={priceAlerts} onChange={setPriceAlerts} label="Price alerts" />
              </div>
              <div className="row between">
                <span>News and updates</span>
                <Toggle checked={newsUpdates} onChange={setNewsUpdates} label="News updates" />
              </div>
              <div className="row between">
                <span>Promotions</span>
                <Toggle checked={promos} onChange={setPromos} label="Promotions" />
              </div>
            </div>

            <div className="row2">
              <div className="card">
                <h3>API Keys</h3>
                <input className="mono" value={apiKey} readOnly />
              </div>
              <div className="card">
                <h3>Connected accounts</h3>
                <div className="chiprow">
                  <button type="button" className="chip">Stripe</button>
                  <button type="button" className="chip">Broker</button>
                </div>
              </div>
            </div>

            <div className="row2">
              <button type="button" className="danger-pill">Danger Zone</button>
              <div className="spacer" />
              <button className="save">Save changes</button>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}
