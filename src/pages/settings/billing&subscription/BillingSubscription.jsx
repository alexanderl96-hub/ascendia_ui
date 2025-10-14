import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import "./billings-subscription_ui.css";

export default function BillingSubscription() {
  // ---- Mock data (swap for your API) ----
  const [plan, setPlan] = useState({
    name: "Premium",
    price: 49.99,
    interval: "month",
    features: ["Unlimited trading", "Advanced analytics", "Priority support"],
  });

  const [payment, setPayment] = useState({
    brand: "VISA",
    last4: "1234",
    exp: "04/27",
  });

  const history = useMemo(
    () => [
      { id: "VO012282", date: "Apr 1, 2024", amount: 49.99, status: "Paid" },
      { id: "01179631", date: "Mar 1, 2024", amount: 49.99, status: "Paid" },
      { id: "00081234", date: "Feb 1, 2024", amount: 49.99, status: "Paid" },
    ],
    []
  );

  // ---- Actions (wire to backend) ----
  const handleUpgrade = async () => {
    // e.g. open pricing modal or redirect to checkout
    alert("Upgrade flow goes here.");
  };

  const handlePaymentUpdate = async () => {
    // e.g. open card update modal or Stripe billing portal
    alert("Open payment method update.");
  };

  const downloadInvoice = async (invId) => {
    // Replace with a real download link
    // window.location.href = `/api/billing/invoices/${invId}/pdf`;
    alert(`Download invoice ${invId}`);
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
              <NavLink to="/settings/billing" className="st-link is-active">
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

    <div className="bill-shell">
      <header className="bill-head">
        <h1>Billing &amp; Subscription</h1>
      </header>

      <div className="bill-grid">
        {/* Current plan */}
        <section className="card plan">
          <div className="card__title">Current Plan</div>
          <div className="plan__row">
            <div className="plan__main">
              <div className="plan__name">{plan.name}</div>
              <div className="plan__price">
                ${plan.price.toFixed(2)} <span>/ {plan.interval}</span>
              </div>
            </div>
            <button className="btn btn--primary" onClick={handleUpgrade}>
              Upgrade
            </button>
          </div>

          <ul className="plan__features">
            {plan.features.map((f, i) => (
              <li key={i}>
                <span className="dot dot--accent" aria-hidden /> {f}
              </li>
            ))}
          </ul>
        </section>

        {/* Payment method */}
        <section className="card pay">
          <div className="card__title">Payment Method</div>
          <div className="pay__row">
            <div className="pill">
              <span className="pill__brand">{payment.brand}</span>
              <span>****** {payment.last4}</span>
            </div>
            <button className="btn btn--ghost" onClick={handlePaymentUpdate}>
              Update
            </button>
          </div>
          <div className="pay__meta">Expires {payment.exp}</div>
        </section>

        {/* Billing history */}
        <section className="card history">
          <div className="card__title">Billing History</div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Invoice</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {history.map((r) => (
                  <tr key={r.id}>
                    <td>{r.date}</td>
                    <td className="mono">{r.id}</td>
                    <td>${r.amount.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${r.status === "Paid" ? "ok" : ""}`}>
                        {r.status}
                      </span>
                    </td>
                    <td>
                      <button className="link" onClick={() => downloadInvoice(r.id)}>
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
}
