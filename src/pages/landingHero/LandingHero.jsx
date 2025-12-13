// import React from "react";
// import "./landing-hero.css";
// import { Link } from "react-router-dom";

// export default function LandingHero({setOpen, setPath}) {
//   return (
//     <main className="hero">
//       <section className="hero__copy" aria-labelledby="hero-title">
//         <h1 id="hero-title" className="hero__title">
//           A better way
//           <br /> to trade
//         </h1>

//         <p className="hero__subtitle">
//           Seamlessly buy and sell stocks with our intuitive trading platform.
//         </p>

//         <div className="hero__cta">
//            <Link className="btn btn--primary" to="/auth?next=/login"  
//                    aria-label="Get Started" 
//                 // onClick={()=> setOpen(true)}
//                 >
//                 Get Started
//             </Link>
//         </div>
//       </section>
//     </main>
//   );
// }


import React from "react";
import "./landing-hero.css";
import { Link } from "react-router-dom";

export default function LandingHero({ setOpen, setPath }) {
  const handleGetStarted = () => {
    if (setPath) setPath("/auth?next=/login");
    if (setOpen) setOpen(true);
  };

  return (
    <main className="hero" aria-labelledby="hero-title">
      <div className="hero__gradient" />

      {/* Top Nav */}
      <header className="hero__nav">
        <div className="hero__nav-inner">
          <div className="hero__logo">
            <div className="hero__logo-mark">A</div>
            <span className="hero__logo-text">Ascendia</span>
          </div>

          <nav className="hero__nav-links">
            <Link className="hero__nav-link" to="/auth?next=/login">
              Sign In
            </Link>

            <Link
              className="btn-nav btn--primary-nav hero__nav-cta"
              to="/auth?next=/login"
              onClick={handleGetStarted}
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Content */}
      <section className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-icon">⚡</span>
          <span className="hero__badge-text">AI-Powered Trading Automation</span>
        </div>

        <h1 id="hero-title" className="hero__title">
          Trade Smarter, Not Harder
        </h1>

        <p className="hero__title-highlight">While You Sleep</p>

        <p className="hero__subtitle">
          Ascendia&apos;s AI algorithms monitor markets 24/7, executing trades
          automatically based on your strategy. Stop watching charts and start
          living your life.
        </p>

        <div className="hero__cta">
          <Link
            className="btn-nav btn--primary-nav hero__cta-main"
            to="/auth?next=/login"
            aria-label="Start Free Trial"
            onClick={handleGetStarted}
          >
            Start Free Trial
            <span className="hero__cta-arrow">→</span>
          </Link>

          <button
            type="button"
            className="btn-nav btn--ghost hero__cta-secondary"
          >
            Watch Demo
          </button>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <div className="hero__stat-value">10K+</div>
            <div className="hero__stat-label">Active Traders</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-value">$2.5M+</div>
            <div className="hero__stat-label">Daily Volume</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-value">99.9%</div>
            <div className="hero__stat-label">Uptime</div>
          </div>
        </div>

        {/* Features cards (screenshot #1) */}
        <div className="hero__features">
          <article className="hero__feature-card">
            <div className="hero__feature-icon hero__feature-icon--pink">
              <span>📈</span>
            </div>
            <h3 className="hero__feature-title">AI-Powered Strategies</h3>
            <p className="hero__feature-text">
              Advanced machine learning algorithms analyze thousands of data
              points to execute optimal trades at the perfect moment.
            </p>
          </article>

          <article className="hero__feature-card">
            <div className="hero__feature-icon hero__feature-icon--magenta">
              <span>🛡</span>
            </div>
            <h3 className="hero__feature-title">Risk Management</h3>
            <p className="hero__feature-text">
              Automated stop-losses, position sizing, and portfolio
              rebalancing protect your capital while maximizing returns.
            </p>
          </article>

          <article className="hero__feature-card">
            <div className="hero__feature-icon hero__feature-icon--teal">
              <span>⚡</span>
            </div>
            <h3 className="hero__feature-title">Lightning Fast</h3>
            <p className="hero__feature-text">
              Trades execute in milliseconds with direct market access.
              Never miss an opportunity while competitors lag behind.
            </p>
          </article>
        </div>

        {/* CTA banner (screenshot #2) */}
        <section className="hero__cta-banner">
          <div className="hero__cta-banner-inner">
            <h2 className="hero__cta-banner-title">
              Ready to Automate Your Trading?
            </h2>
            <p className="hero__cta-banner-text">
              Join thousands of traders who&apos;ve discovered the power of
              AI-driven automation. Start your 14-day free trial today.
            </p>

            <div className="hero__cta-banner-actions">
              <Link
                className="btn-nav btn--primary-nav hero__cta-banner-btn"
                to="/auth?next=/login"
                onClick={handleGetStarted}
              >
                Get Started Free
                <span className="hero__cta-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="hero__footer">
        <div className="hero__footer-inner">
          <div className="hero__footer-left">
            <div className="hero__logo hero__footer-logo">
              <div className="hero__logo-mark">A</div>
            </div>
            <span className="hero__footer-text">
              © {new Date().getFullYear()} Ascendia. All rights reserved.
            </span>
          </div>

          <nav className="hero__footer-links">
            <Link to="/privacy" className="hero__footer-link">
              Privacy
            </Link>
            <Link to="/terms" className="hero__footer-link">
              Terms
            </Link>
            <Link to="/contact" className="hero__footer-link">
              Contact
            </Link>
          </nav>
        </div>
      </footer>

      


    </main>
  );
}
