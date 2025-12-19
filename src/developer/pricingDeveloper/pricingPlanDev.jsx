// PricingPlans.jsx
import React from "react";
import "./pricing-plans.css";
import { useLocation, useNavigate , Link} from "react-router-dom";

const Check = () => (
  <svg className="pp-check" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M16.5 5.75L8.25 14l-3.75-3.75"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Icon = ({ variant = "purple", glyph = "bolt" }) => {
  const glyphs = {
    bolt: (
      <path
        d="M11 1.5 3.8 10.1c-.4.5-.1 1.2.6 1.2H9l-1 7.2 7.2-8.6c.4-.5.1-1.2-.6-1.2H11l0-7.2Z"
        fill="currentColor"
      />
    ),
    calc: (
      <>
        <path
          d="M6.4 4.8h7.2M6.4 8.3h7.2M6.4 11.8h2.9M10.7 11.8h2.9M6.4 15.3h2.9M10.7 15.3h2.9"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        <rect
          x="4"
          y="3.2"
          width="12"
          height="13.6"
          rx="2.4"
          stroke="currentColor"
          strokeWidth="1.9"
        />
      </>
    ),
    rocket: (
      <>
        <path
          d="M12.9 3.2c2.2 1.2 3 3.7 1.8 5.9l-2.9 5.2c-.2.4-.7.6-1.1.4l-2.7-1.5c-.4-.2-.6-.7-.4-1.1l2.9-5.2c1.2-2.2 3.7-3 5.9-1.8Z"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
        <path
          d="M9.1 8.9 6.6 7.5c-.6-.3-1.3-.1-1.6.5L3.7 10.4c-.2.4-.1.9.3 1.1l2.3 1.3M10.9 9.9l1.5-2.7"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.1 15.9c.7-1.1.5-2.6-.6-3.2-1.1-.6-2.6-.2-3.2.9-.6 1.1-.4 2.6.6 3.2 1.1.6 2.6.2 3.2-.9Z"
          fill="currentColor"
          opacity=".12"
        />
        <path
          d="M6.6 12.7c-1 0-1.9.5-2.4 1.3-.6 1-.5 2.4.3 3.2"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      </>
    ),
  };

  return (
    <div className={`pp-icon pp-icon--${variant}`} aria-hidden="true">
      <svg viewBox="0 0 20 20">{glyphs[glyph]}</svg>
    </div>
  );
};

const PLANS = [
  {
    id: "TRIAL",
    title: "Trial",
    desc: "Get started with a 14-day free trial",
    priceMain: "Free",
    priceSub: "14 days",
    cta: "Start Free Trial",
    iconVariant: "purple",
    iconGlyph: "bolt",
    features: [
      "Basic automated trading (1 strategy)",
      "Up to $1,000 trading capital",
      "5 trades per day max",
      "Pre-built conservative strategies",
      "Email trade notifications",
      "Basic portfolio tracking",
      "Mobile app access",
      "No credit card required"
    ],
  },
  {
    id: "Basic",
    title: "Basic",
    desc: "Perfect for new traders getting started",
    priceMain: "$9.99",
    priceSub: "/month",
    cta: "Get Started",
    iconVariant: "blue",
    iconGlyph: "calc",
    features: [
      "Automated trading (3 strategies)",
      "Up to $10,000 trading capital",
      "20 trades per day",
      "Technical indicator strategies",
      "Stop-loss protection",
      "SMS & email alerts",
      "Portfolio anaytics",
      "Trade execution reports"
    ],
  },
  {
    id: "Pro",
    title: "Pro",
    desc: "For serious traders who want full automation",
    priceMain: "$19.99",
    priceSub: "/month",
    cta: "Get Started",
    iconVariant: "green",
    iconGlyph: "rocket",
    popular: true,
    features: [
      "AI-powered auto trading (10 strategies)",
      "Up to $50,000 trading capital",
      "Unlimited daily trades",
      "Custom strategy builder",
      "Advanced risk management",
      "Options & futures trading",
      "Real-time performance tracking",
      "Priority execution",
      "24/7 support"
    ],
  },
  {
    id: "Premium",
    title: "Premium",
    desc: "Professional-grade institutional automation",
    priceMain: "$49.99",
    priceSub: "/month",
    cta: "Get Started",
    iconVariant: "teal",
    iconGlyph: "calc",
    features: [
      "Everything in Pro",
      "Unlimited trading capital",
      "Institutional-grade algorithms",
      "Multi-asset automation trading",
      "Advanced backtesting & optimization",
      "Direct market access",
      "Dedicated account manager",
      "Custom strategy development",
      "Tax loss harvesting",
      "API access for intrigation"
    ],
  },
];

export default function PricingPlanDev({setOpenSetting, setOpenDash, onSelectPlan = () => {} }) {
     const nav = useNavigate();
  return (
    <section className="pp-wrap" aria-labelledby="pp-title">
      <div className="pp-inner">
        <div className="pp-head">
          <div className="pp-pill">Trading Plans</div>
          <h2 id="pp-title" className="pp-title">
            Choose Your <span>Perfect Plan</span>
          </h2>
          <p className="pp-subtitle">
            Automated trading that executes for you based on AI-powered strategies.
            Choose your tier and let Ascendia handle the trading.
          </p>
        </div>

        <div className="pp-grid">
          {PLANS.map((p) => (
            <article
              key={p.id}
              className={`pp-card ${p.popular ? "pp-card--popular" : ""}`}
            >
              {p.popular && <div className="pp-popular">Most Popular</div>}

              <div className="pp-top">
                <Icon variant={p.iconVariant} glyph={p.iconGlyph} />
                <h3 className="pp-plan">{p.title}</h3>
                <p className="pp-desc">{p.desc}</p>

                <div className="pp-price">
                  <span className="pp-priceMain">{p.priceMain}</span>
                  <span className="pp-priceSub">{p.priceSub}</span>
                </div>

                <button
                  className={`pp-btn ${p.popular ? "pp-btn--solid" : ""} ${onSelectPlan === p.id  ? "pp-btn--selected" : ""}`}
                  type="button"
                  onClick={() => onSelectPlan(p.id)}
                >
                  {onSelectPlan === p.id ? "Your current Plan" : p.cta} 
                  <span className="pp-arrow" aria-hidden="true">
                    {onSelectPlan === p.id ? "" : "→"} 
                    {/* → */}
                  </span>
                </button>
              </div>

              <ul className="pp-list">
                {p.features.map((f) => (
                  <li key={f} className="pp-item">
                    <Check />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="pp-extras">
            <div className="pp-extraCard">
                <h4 className="pp-extraTitle">Market Data Packages</h4>
                <ul className="pp-extraList">
                <li className="pp-extraItem"><Check /> <span>US Equities: <b>$50</b>/month</span></li>
                <li className="pp-extraItem"><Check /> <span>International Markets: <b>$100</b>/month</span></li>
                <li className="pp-extraItem"><Check /> <span>Cryptocurrency: <b>$25</b>/month</span></li>
                <li className="pp-extraItem"><Check /> <span>Options &amp; Derivatives: <b>$150</b>/month</span></li>
                </ul>
            </div>

            <div className="pp-extraCard">
                <h4 className="pp-extraTitle">Premium Features</h4>
                <ul className="pp-extraList">
                <li className="pp-extraItem"><Check /> <span>Level II Order Book: <b>$75</b>/month</span></li>
                <li className="pp-extraItem"><Check /> <span>Custom Alerts: <b>$25</b>/month</span></li>
                <li className="pp-extraItem"><Check /> <span>Priority Support: <b>$200</b>/month</span></li>
                <li className="pp-extraItem"><Check /> <span>Dedicated Infrastructure: <b>$500</b>/month</span></li>
                </ul>
            </div>
        </div>

        <div className="pp-devCta">
            <p className="pp-devText">
                Looking to build trading applications? Check out our developer APIs with enterprise-grade market data.
            </p>

            <button
                type="button"
                className="pp-devBtn"
                onClick={() => nav("/developer_home#integrations")} // or replace with navigate("/developer_home#integrations")
            >
                Explore Integrations <span className="pp-devArrow" aria-hidden="true">→</span>
            </button>
            </div>

      </div>
    </section>
  );
}
