import React, { useMemo, useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import "./App.css";
// import { login, register } from "./lib/auth.jsx"
import { useAuth } from "./pages/auth/authContext.jsx";

import LandingLoader from "./component-landing/LandingLoader.jsx";
import LandingHero from "./pages/landingHero/LandingHero.jsx";
import AuthModal from "./pages/auth/AuthModal.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Markets from "./pages/markets/MarketsStocks.jsx";


export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Show splash only once per session
  const hasSeenSplash = sessionStorage.getItem("splashSeen") === "1";
  const [ready, setReady] = useState(hasSeenSplash);

  useEffect(() => {
    if (ready) return;
    // If user hard-refreshes on a non-root path, skip splash
    if (location.pathname !== "/") setReady(true);
  }, [location.pathname, ready]);

  const handleLoaderDone = () => {
    sessionStorage.setItem("splashSeen", "1");
    setReady(true);
    navigate("/"); // or navigate("/auth") to jump straight there
  };

  if (!ready) {
    return (
      <LandingLoader
        src="/image/loading-trade.png"
        duration={4500}
        stickyMs={500}
        onDone={handleLoaderDone}
        alt="Ascendia loading"
      />
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingHero />} />
      <Route path="/auth" element={<AuthRoute />} />
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/markets" element={<Markets/>} />
      <Route path="/portfolio" element={<div>Portfolio TODO</div>} />
      <Route path="/watchlists" element={<div>Watchlists TODO</div>} />
      <Route path="/orders" element={<div>Orders TODO</div>} />
      <Route path="/research" element={<div>Research TODO</div>} />
      <Route path="/strategies" element={<div>Strategies TODO</div>} />
      <Route path="/news" element={<div>News TODO</div>} />
      <Route path="/settings" element={<div>Settings TODO</div>} />
      {/* add more routes as needed */}
    </Routes>
  );
}


function AuthRoute() {
const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  // read ?next=/login or ?next=/register to choose tab
  const params = new URLSearchParams(loc.search);
  const next = params.get("next") || "/login";
  const initialTab = useMemo(() => (next.includes("register") ? "signup" : "login"), [next]);

  const [tab, setTab] = useState(initialTab);
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setOpen(false);
    nav("/"); // or back to landing
  };

  // Pattern A: API returns { token, user: { id, username } }
  const handleLogin = async ({ username, password }) => {
  try {
    setError(""); 
    setLoading(true);

    // 1) Login
    const res = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // important if server sets HttpOnly cookie
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errTxt = await safeText(res);
      throw new Error(errTxt || `Login failed (${res.status})`);
    }

    const data = await safeJson(res); // may be {} if server uses cookie-only auth
    // Try common shapes
    let userId =
      data?.user?.id ??
      data?.userId ??
      data?.id ??
      data?.accountId ??
      data?.principal?.id ??
      null;

      console.log("res : ", data)

    let token = data?.token ?? data?.accessToken ?? null;

    // 2) If we got a token but still no userId, try decoding JWT "sub"
    if (!userId && token) {
      try {
        const [, payloadB64] = token.split(".");
        const payload = JSON.parse(atob(payloadB64));
        userId = payload?.sub || payload?.user_id || null;
      } catch {}
    }

    // 3) If still no userId, call /me using cookie session
    if (!userId) {
      const meRes = await fetch("http://localhost:8080/api/v1/auth/me", {
        method: "GET",
        credentials: "include",
        headers: { "Accept": "application/json" },
      });
      if (meRes.ok) {
        const me = await meRes.json();
        userId = me?.id ?? me?.userId ?? me?.user?.id ?? null;
        // If your /me also returns a bearer token, pick it up:
        token = token || me?.token || me?.accessToken || null;
      }
    }

    if (!userId) {
      // Helpful debug for development:
      console.warn("Login response had no user id:", data);
      throw new Error("User id missing in response.");
    }

    // 4) Persist auth locally
    login({
      userId,
      token,
      username: data?.user?.username ?? username,
    });

    nav("/dashboard");
  } catch (e) {
    setError(e.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

// helpers
async function safeText(res) {
  try { return await res.text(); } catch { return ""; }
}
async function safeJson(res) {
  try { return await res.json(); } catch { return {}; }
}


 const handleSignup = async ({ username, fullName, email, phone, password }) => {
  try {
    setError("");
    setLoading(true);

    // 1) Create account
    const res = await fetch("http://localhost:8080/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // keep cookies if server sets HttpOnly session
      body: JSON.stringify({ username, fullName, email, phone, password }),
    });

    if (!res.ok) {
      const errTxt = await safeText(res);
      throw new Error(errTxt || `Signup failed (${res.status})`);
    }

    const data = await safeJson(res); // may be {} if cookie-only
    // Try common shapes
    let userId =
      data?.user?.id ??
      data?.userId ??
      data?.id ??
      data?.accountId ??
      data?.principal?.id ??
      null;

    let token = data?.token ?? data?.accessToken ?? null;

    // 2) If token but no userId, try decoding JWT (sub / user_id)
    if (!userId && token) {
      try {
        const [, payloadB64] = token.split(".");
        const payload = JSON.parse(atob(payloadB64));
        userId = payload?.sub || payload?.user_id || null;
      } catch {}
    }

    // 3) If still no userId, fetch /me using the cookie session
    if (!userId) {
      const meRes = await fetch("http://localhost:8080/api/v1/auth/me", {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
      });
      if (meRes.ok) {
        const me = await meRes.json();
        userId = me?.id ?? me?.userId ?? me?.user?.id ?? null;
        token = token || me?.token || me?.accessToken || null;
      }
    }

    if (!userId) {
      console.warn("Signup response had no user id:", data);
      throw new Error("User id missing in response.");
    }

    // 4) Persist in your auth context/store
    login({
      userId,
      token,
      username: data?.user?.username ?? username,
    });

    nav("/dashboard");
  } catch (e) {
    setError(e.message || "Signup failed");
  } finally {
    setLoading(false);
  }
};

// Helpers (add once in this file if not already present)
async function safeText(res) {
  try { return await res.text(); } catch { return ""; }
}
async function safeJson(res) {
  try { return await res.json(); } catch { return {}; }
}


  return (
    <AuthModal
      open={open}
      onClose={handleClose}
      onLogin={handleLogin}
      onSignup={handleSignup}
      tab={tab}
      onTabChange={setTab}
      loading={loading}
      error={error}
    />
  );
}