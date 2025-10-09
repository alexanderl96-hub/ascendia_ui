import React from "react";
import "./landing-hero.css";
import { Link } from "react-router-dom";

export default function LandingHero({setOpen, setPath}) {
  return (
    <main className="hero">
      <section className="hero__copy" aria-labelledby="hero-title">
        <h1 id="hero-title" className="hero__title">
          A better way
          <br /> to trade
        </h1>

        <p className="hero__subtitle">
          Seamlessly buy and sell stocks with our intuitive trading platform.
        </p>

        <div className="hero__cta">
           <Link className="btn btn--primary" to="/auth?next=/login"  aria-label="Get Started" 
                // onClick={()=> setOpen(true)}
                >
                Get Started
            </Link>
        </div>
      </section>
    </main>
  );
}
