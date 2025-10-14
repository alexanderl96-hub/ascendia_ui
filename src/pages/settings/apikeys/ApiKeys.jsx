import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import "./apikeys_ui.css";

const PERMISSIONS = [
  { id: "read", label: "Read data" },
  { id: "trade", label: "Place orders" },
  { id: "manage", label: "Manage account" },
  { id: "webhooks", label: "Webhooks" },
];

export default function ApiKeys() {
  // ---- mock data (swap with your API) ----
  const [keys, setKeys] = useState([
    {
      id: "k_1",
      name: "–MJR9",
      keyId: "*****639",
      createdAt: "3m ago",
      lastUsed: "1 sec ago",
      perms: ["read", "trade", "manage"],
      status: "Active",
    },
    {
      id: "k_2",
      name: "–MJR9",
      keyId: "*****639",
      createdAt: "3m ago",
      lastUsed: "1 aug ago",
      perms: ["read", "trade", "manage"],
      status: "Revoke",
    },
    {
      id: "k_3",
      name: "–MJR9",
      keyId: "*****639",
      createdAt: "3m ago",
      lastUsed: "2 aug ago",
      perms: ["read", "trade", "manage"],
      status: "Regenerate",
    },
  ]);

  // create form
  const [name, setName] = useState("");
  const [selPerms, setSelPerms] = useState(new Set(["read"]));
  const [creating, setCreating] = useState(false);

  // show-secret modal (after creation)
  const [showSecret, setShowSecret] = useState(false);
  const [newKey, setNewKey] = useState({ id: "", keyId: "", secret: "" });

  const canCreate = useMemo(() => name.trim().length >= 2, [name]);

  const togglePerm = (p) => {
    setSelPerms((prev) => {
      const n = new Set(prev);
      n.has(p) ? n.delete(p) : n.add(p);
      return n;
    });
  };

  const handleCreate = async () => {
    if (!canCreate || creating) return;
    try {
      setCreating(true);
      // --- Replace with your API call ---
      // const res = await fetch("/api/apikeys", { method:"POST", body:JSON.stringify({name, perms:[...selPerms]}) })
      // const { id, keyId, secret } = await res.json();
      // Mock result:
      const id = `k_${Date.now()}`;
      const secret = "sk_live_97c0e8f1c4f34dc3ba...";
      const keyId = "*****" + Math.floor(100 + Math.random() * 900);

      setKeys((k) => [
        {
          id,
          name,
          keyId,
          createdAt: "just now",
          lastUsed: "—",
          perms: [...selPerms],
          status: "Active",
        },
        ...k,
      ]);
      setNewKey({ id, keyId, secret });
      setShowSecret(true);
      setName("");
      setSelPerms(new Set(["read"]));
    } finally {
      setCreating(false);
    }
  };

  const revoke = async (id) => {
    // await fetch(`/api/apikeys/${id}`, { method:"DELETE" })
    setKeys((k) => k.map((x) => (x.id === id ? { ...x, status: "Revoked" } : x)));
  };

  const regenerate = async (id) => {
    // const res = await fetch(`/api/apikeys/${id}/regenerate`, { method:"POST" })
    // const { keyId, secret } = await res.json();
    const secret = "sk_live_new_2b1b7a...";
    const keyId = "*****" + Math.floor(100 + Math.random() * 900);
    setKeys((k) => k.map((x) => (x.id === id ? { ...x, keyId, status: "Active" } : x)));
    setNewKey({ id, keyId, secret });
    setShowSecret(true);
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard");
    } catch {
      alert("Copy failed");
    }
  };

  return (
     <div className="dp-shell">

 <aside className="dp-sidebar">
        <div className="st-brand">
          <div className="logo">A</div>
          {/* <div className="name">Ascendia</div> */}
          <div className="name">Settings</div>
        </div>

        <nav className="st-nav">
          <NavLink to="/settings/profile" className="st-link">
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
          <NavLink to="/settings/api-keys" className="st-link is-active">
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



    <div className="api-shell">
      <header className="api-head">
        <h1>API Keys</h1>
        <div className="avatar" aria-label="User" />
      </header>

      <div className="api-grid">
        {/* Create new key */}
        <section className="card make">
          <div className="card__title">Create new API key</div>

          <label className="field">
            <span>Name</span>
            <input
              placeholder="Trading bot, Zapier, etc."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <div className="perm-group">
            {PERMISSIONS.map((p) => (
              <label key={p.id} className="check">
                <input
                  type="checkbox"
                  checked={selPerms.has(p.id)}
                  onChange={() => togglePerm(p.id)}
                />
                <span>{p.label}</span>
              </label>
            ))}
          </div>

          <button
            className="btn btn--primary"
            disabled={!canCreate || creating}
            onClick={handleCreate}
          >
            {creating ? "Creating…" : "Create API key"}
          </button>

          <div className="note">
            <div className="note__icon">!</div>
            <div className="note__text">
              Never share your API <strong>secret</strong>. You’ll only see it once after creation.
              Rotate keys regularly.
            </div>
          </div>
        </section>

        {/* Permissions legend */}
        <section className="card legend">
          <div className="card__title">Key permissions</div>
          <div className="legend__grid">
            {PERMISSIONS.map((p) => (
              <div key={p.id} className="legend__cell">
                {p.label}
              </div>
            ))}
          </div>
        </section>

        {/* Active keys */}
        <section className="card tablecard">
          <div className="card__title">Active keys</div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Key ID</th>
                  <th>Created</th>
                  <th>Last used</th>
                  <th>Permissions</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {keys.map((k) => (
                  <tr key={k.id}>
                    <td className="mono">{k.name}</td>
                    <td className="mono">{k.keyId}</td>
                    <td>{k.createdAt}</td>
                    <td>{k.lastUsed}</td>
                    <td className="perms">
                      {k.perms.map((p) => (
                        <span key={p} className="tag">
                          {PERMISSIONS.find((x) => x.id === p)?.label || p}
                        </span>
                      ))}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          k.status === "Active" ? "ok" : k.status === "Revoked" ? "bad" : ""
                        }`}
                      >
                        {k.status}
                      </span>
                    </td>
                    <td className="actions">
                      <button className="link" onClick={() => regenerate(k.id)}>
                        Regenerate
                      </button>
                      <button className="link danger" onClick={() => revoke(k.id)}>
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))}
                {keys.length === 0 && (
                  <tr>
                    <td colSpan={7} className="muted">
                      No keys yet — create one on the left.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Reveal secret modal */}
      {showSecret && (
        <div className="modal" role="dialog" aria-modal="true" onClick={() => setShowSecret(false)}>
          <div className="modal__box" onClick={(e) => e.stopPropagation()}>
            <h3>New key created</h3>
            <p>
              Copy your <strong>secret</strong> now. You won’t be able to see it again.
            </p>
            <div className="secret">
              <input readOnly value={newKey.secret} />
              <button className="btn btn--ghost" onClick={() => copy(newKey.secret)}>
                Copy
              </button>
            </div>
            <div className="modal__actions">
              <button className="btn" onClick={() => setShowSecret(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
