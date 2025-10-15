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
import Portfolio from "./pages/portfolio/Portfolio.jsx";
import Watchlists from "./pages/watchlists/Watchlists.jsx";
import Orders from "./pages/orders/Orders.jsx";
import Research from "./pages/research/Research.jsx";
import Strategies from "./pages/strategies/Strategies.jsx";
import News from "./pages/news/News.jsx";
import Settings from "./pages/settings/Settings.jsx";
import Security from "./pages/settings/security/Security.jsx";
import Notifications from "./pages/settings/notifications/Notifications.jsx";
import DataPrivacy from "./pages/settings/data&privacy/DataPrivacy.jsx";
import DangerZone from "./pages/settings/danger_zone/Danger_Zone.jsx";
import ConnectedAccounts from "./pages/settings/connected_accounts/ConnectedAccounts.jsx";
import BillingSubscription from "./pages/settings/billing&subscription/BillingSubscription.jsx";
import ApiKeys from "./pages/settings/apikeys/ApiKeys.jsx";

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
      <Route path="/markets" element={<Markets />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/watchlists" element={<Watchlists />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/research" element={<Research />} />
      <Route path="/strategies" element={<Strategies />} />
      <Route path="/news" element={<News />} />
      <Route path="/settings/profile" element={<Settings />} />
      <Route path="/settings/security" element={<Security />} /> 
      <Route path="/settings/notifications" element={<Notifications />} />
      <Route path="/settings/data-privacy" element={<DataPrivacy />} /> 
      <Route path="/settings/danger-zone" element={<DangerZone />} />
      <Route path="/settings/connected-accounts" element={<ConnectedAccounts />} />
      <Route path="/settings/billing" element={<BillingSubscription />} />
      <Route path="/settings/api-keys" element={<ApiKeys />} />
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

  // ------------------ LOGIN ------------------
  const handleLogin = async ({ username, password }) => {
    try {
      setError(""); setLoading(true);

      // 1) Login
      const res = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errTxt = await safeText(res);
        throw new Error(errTxt || `Login failed (${res.status})`);
      }

      const data = await safeJson(res);
      // Prefer explicit fields from backend
      let token         = data?.accessToken ?? data?.token ?? null;
      let userId        = data?.userId ?? data?.user?.id ?? data?.id ?? null;
      let apiUsername   = data?.username ?? data?.user?.username ?? username;
      let accountNumber = data?.accountNumber ?? null;
      let buyingPower    = data?.alpaca?.buyingPower ?? null;
      let equity         = data?.alpaca?.equity ?? null;
      let portfolioValue = data?.alpaca?.portfolioValue ?? null;
      let publicK = data?.alpacaApiKey ?? null;
      let secretK = data?.alpacaApiSecret ?? null;


      console.log("data key : ", data)

      // If token but no userId, decode JWT (sub)
      if (!userId && token) {
        try {
          const [, payloadB64] = token.split(".");
          const payload = JSON.parse(atob(payloadB64));
          userId = payload?.sub || payload?.user_id || null;
        } catch {}
      }

      // If still no userId, try /me
      if (!userId) {
        const meRes = await fetch("http://localhost:8080/api/v1/auth/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Accept": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (meRes.ok) {
          const me = await meRes.json();
          userId = me?.id ?? me?.userId ?? me?.user?.id ?? null;
          apiUsername = me?.username ?? apiUsername;
          token = token || me?.accessToken || me?.token || null;
        }
      }

      if (!userId) throw new Error("User id missing in response.");

      // Fetch accountNumber if missing
      // if (!accountNumber) {
      //   accountNumber = await fetchPrimaryAccountNumber(token);
      // }

      accountNumber = await fetchPrimaryAccountNumber(token);
      // 2) Persist in auth context
login({ userId, token, username: apiUsername, accountNumber, 
  buyingPower, equity, portfolioValue, publicK, secretK });

      // 3) Navigate
      nav("/dashboard");
    } catch (e) {
      setError(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ------------------ SIGNUP ------------------
  const handleSignup = async ({ username, fullName, email, phone, password }) => {
    try {
      setError(""); setLoading(true);

      // 1) Create account
      const res = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, fullName, email, phone, password }),
      });

      if (!res.ok) {
        const errTxt = await safeText(res);
        throw new Error(errTxt || `Signup failed (${res.status})`);
      }

      const data = await safeJson(res);
      let token         = data?.accessToken ?? data?.token ?? null;
      let userId        = data?.userId ?? data?.user?.id ?? data?.id ?? null;
      let apiUsername   = data?.username ?? data?.user?.username ?? username;
      let accountNumber = data?.accountNumber ?? null;
      let publicK = data?.alpacaApiKey ?? null;
      let secretK = data?.alpacaApiSecret ?? null;

      console.log(data)

      // If token but no userId, decode JWT (sub)
      if (!userId && token) {
        try {
          const [, payloadB64] = token.split(".");
          const payload = JSON.parse(atob(payloadB64));
          userId = payload?.sub || payload?.user_id || null;
        } catch {}
      }

      // If still no userId, try /me
      if (!userId) {
        const meRes = await fetch("http://localhost:8080/api/v1/auth/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Accept": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (meRes.ok) {
          const me = await meRes.json();
          userId = me?.id ?? me?.userId ?? me?.user?.id ?? null;
          apiUsername = me?.username ?? apiUsername;
          token = token || me?.accessToken || me?.token || null;
        }
      }

      if (!userId) throw new Error("User id missing in response.");

      // Fetch accountNumber if missing
      if (!accountNumber) {
        accountNumber = await fetchPrimaryAccountNumber(token);
      }

      // 2) Persist
      login({ userId, token, username: apiUsername, accountNumber , publicK, secretK});

      // 3) Navigate
      nav("/dashboard");
    } catch (e) {
      setError(e.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

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

async function safeText(res) { try { return await res.text(); } catch { return ""; } }
async function safeJson(res) { try { return await res.json(); } catch { return {}; } }

// Try to fetch a primary accountNumber if API didn't include it in auth response
async function fetchPrimaryAccountNumber(token) {
  try {
    const res = await fetch("http://localhost:8080/api/v1/accounts", {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) return null;
    const accounts = await res.json(); // expect [{ accountNumber: "...", ... }]
    console.log(accounts)
    if (Array.isArray(accounts) && accounts.length > 0) {
      return accounts[0]?.accountNumber ?? null;
    }
  } catch {}
  return null;
}