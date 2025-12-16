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
import LoginModal from "./pages/modals/login_user/loginModal.jsx";
import StockPicker from "./stocks_data/stock_picker.jsx";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();


  // Show splash only once per session
  const hasSeenSplash = sessionStorage.getItem("splashSeen") === "1";
  const [ready, setReady] = useState(hasSeenSplash);
  const [roles, setRoles] = useState("")

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
      <Route path="/" element={<LandingHero setRoles={setRoles} />} />
      <Route path="/auth" element={<AuthRoute roles={roles} />} />
      <Route path="/stocks_picker" element={<StockPicker />} />
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


// function AuthRoute() {
// const { login } = useAuth();
//   const nav = useNavigate();
//   const loc = useLocation();

//   // read ?next=/login or ?next=/register to choose tab
//   const params = new URLSearchParams(loc.search);
//   const next = params.get("next") || "/login";
//   const initialTab = useMemo(() => (next.includes("register") ? "signup" : "login"), [next]);

//   const [tab, setTab] = useState(initialTab);
//   const [open, setOpen] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleClose = () => {
//     setOpen(false);
//     nav("/"); // or back to landing
//   };

//   console.log("tab", tab)

//   // ------------------ LOGIN ------------------
//   const handleLogin = async ({ username, password }) => {
//     try {
//       setError(""); setLoading(true);

//       // 1) Login
//       const res = await fetch("http://localhost:8080/api/v1/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ username, password }),
//       });

//       if (!res.ok) {
//         const errTxt = await safeText(res);
//         throw new Error(errTxt || `Login failed (${res.status})`);
//       }

//       const data = await safeJson(res);
//       // Prefer explicit fields from backend
//       let token         = data?.accessToken ?? data?.token ?? null;
//       let userId        = data?.userId ?? data?.user?.id ?? data?.id ?? null;
//       let apiUsername   = data?.username ?? data?.user?.username ?? username;
//       let accountNumber = data?.accountNumber ?? null;
//       let buyingPower    = data?.alpaca?.buyingPower ?? null;
//       let equity         = data?.alpaca?.equity ?? null;
//       let portfolioValue = data?.alpaca?.portfolioValue ?? null;
//       let publicK = data?.alpacaApiKey ?? null;
//       let secretK = data?.alpacaApiSecret ?? null;


//       console.log("data key : ", data)

//       // If token but no userId, decode JWT (sub)
//       if (!userId && token) {
//         try {
//           const [, payloadB64] = token.split(".");
//           const payload = JSON.parse(atob(payloadB64));
//           userId = payload?.sub || payload?.user_id || null;
//         } catch {}
//       }

//       // If still no userId, try /me
//       if (!userId) {
//         const meRes = await fetch("http://localhost:8080/api/v1/auth/me", {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Accept": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });
//         if (meRes.ok) {
//           const me = await meRes.json();
//           userId = me?.id ?? me?.userId ?? me?.user?.id ?? null;
//           apiUsername = me?.username ?? apiUsername;
//           token = token || me?.accessToken || me?.token || null;
//         }
//       }

//       if (!userId) throw new Error("User id missing in response.");

//       // Fetch accountNumber if missing
//       // if (!accountNumber) {
//       //   accountNumber = await fetchPrimaryAccountNumber(token);
//       // }

//       accountNumber = await fetchPrimaryAccountNumber(token);
//       // 2) Persist in auth context
// login({ userId, token, username: apiUsername, accountNumber, 
//   buyingPower, equity, portfolioValue, publicK, secretK });

//       // 3) Navigate
//       nav("/dashboard");
//     } catch (e) {
//       setError(e.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ------------------ SIGNUP ------------------
//   const handleSignup = async ({ username, fullName, email, phone, password }) => {
//     try {
//       setError(""); setLoading(true);

//       // 1) Create account
//       const res = await fetch("http://localhost:8080/api/v1/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ username, fullName, email, phone, password }),
//       });

//       if (!res.ok) {
//         const errTxt = await safeText(res);
//         throw new Error(errTxt || `Signup failed (${res.status})`);
//       }

//       const data = await safeJson(res);
//       let token         = data?.accessToken ?? data?.token ?? null;
//       let userId        = data?.userId ?? data?.user?.id ?? data?.id ?? null;
//       let apiUsername   = data?.username ?? data?.user?.username ?? username;
//       let accountNumber = data?.accountNumber ?? null;
//       let publicK = data?.alpacaApiKey ?? null;
//       let secretK = data?.alpacaApiSecret ?? null;

//       console.log(data)

//       // If token but no userId, decode JWT (sub)
//       if (!userId && token) {
//         try {
//           const [, payloadB64] = token.split(".");
//           const payload = JSON.parse(atob(payloadB64));
//           userId = payload?.sub || payload?.user_id || null;
//         } catch {}
//       }

//       // If still no userId, try /me
//       if (!userId) {
//         const meRes = await fetch("http://localhost:8080/api/v1/auth/me", {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Accept": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });
//         if (meRes.ok) {
//           const me = await meRes.json();
//           userId = me?.id ?? me?.userId ?? me?.user?.id ?? null;
//           apiUsername = me?.username ?? apiUsername;
//           token = token || me?.accessToken || me?.token || null;
//         }
//       }

//       if (!userId) throw new Error("User id missing in response.");

//       // Fetch accountNumber if missing
//       if (!accountNumber) {
//         accountNumber = await fetchPrimaryAccountNumber(token);
//       }

//       // 2) Persist
//       login({ userId, token, username: apiUsername, accountNumber , publicK, secretK});

//       // 3) Navigate
//       nav("/dashboard");
//     } catch (e) {
//       setError(e.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthModal
//       open={open}
//       onClose={handleClose}
//       onLogin={handleLogin}
//       onSignup={handleSignup}
//       tab={tab}
//       onTabChange={setTab}
//       loading={loading}
//       error={error}
//     />
//   );
// }

function AuthRoute({roles}) {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  // normalize next: "login" | "register" (accepts "/login" "/register" too)
  const params = new URLSearchParams(loc.search);
  const nextRaw = params.get("next") || "login";
  const next = nextRaw.replace("/", "");

  const derivedTab = useMemo(
    () => (next === "register" ? "signup" : "login"),
    [next]
  );

  const [tab, setTab] = useState(derivedTab);
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rolesType, setRolesType] = useState(roles)


  // ✅ IMPORTANT: update tab whenever URL query changes
  useEffect(() => {
    setTab(derivedTab);
  }, [derivedTab]);

  const handleClose = () => {
    setOpen(false);
    nav("/");
  };

  // ✅ single source of truth: switch tab + update URL
  const switchTab = (newTab) => {
    setTab(newTab);
    const q = newTab === "signup" ? "register" : "login";
    nav(`/auth?next=${q}`, { replace: true });
  };

  // ------------------ LOGIN ------------------
  // NOTE: your LoginModal collects "email", so map email -> username for backend
  // const handleLogin = async ({ email, password, remember }) => {
  //   try {
  //     setError("");
  //     setLoading(true);

  //     const res = await fetch("http://localhost:8080/api/v1/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //       body: JSON.stringify({ username: email, password }), // ✅ map
  //     });

  //     if (!res.ok) {
  //       const errTxt = await safeText(res);
  //       throw new Error(errTxt || `Login failed (${res.status})`);
  //     }

  //     const data = await safeJson(res);

  //     let token = data?.accessToken ?? data?.token ?? null;
  //     let userId = data?.userId ?? data?.user?.id ?? data?.id ?? null;
  //     let apiUsername = data?.username ?? data?.user?.username ?? email;

  //     if (!userId && token) {
  //       try {
  //         const [, payloadB64] = token.split(".");
  //         const payload = JSON.parse(atob(payloadB64));
  //         userId = payload?.sub || payload?.user_id || null;
  //       } catch {}
  //     }

  //     if (!userId) throw new Error("User id missing in response.");

  //     const accountNumber = await fetchPrimaryAccountNumber(token);


  //     login({ userId, token, username: apiUsername, accountNumber });

  //     nav("/dashboard");
  //   } catch (e) {
  //     setError(e.message || "Login failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogin = async ({ username, email, password, remember}) => {
    try {
      setError("");
      setLoading(true);

      const u = (username ?? email ?? "").toString().trim(); // ✅ handles both payload styles

      console.log("LOGIN payload =>", { username: u, passwordLen: password?.length });

      const res = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: u, password }),
      });

      if (!res.ok) {
        const errTxt = await safeText(res);
        throw new Error(errTxt || `Login failed (${res.status})`);
      }

      const data = await safeJson(res);

      console.log("check data ", data)

      let token = data?.accessToken ?? data?.token ?? null;
      let userId = data?.userId ?? data?.user?.id ?? data?.id ?? null;
      let apiUsername = data?.username ?? data?.user?.username ?? u;

      if (!userId && token) {
        try {
          const [, payloadB64] = token.split(".");
          const payload = JSON.parse(atob(payloadB64));
          userId = payload?.sub || payload?.user_id || null;
        } catch {}
      }

      if (!userId) throw new Error("User id missing in response.");

      const accountNumber = await fetchPrimaryAccountNumber(token);

      login({ userId, token, username: apiUsername, accountNumber });
      if(data.roles === "DEVELOPER"){
        nav("/dashboard");
      }else{
        nav("/stocks_picker");
      }
      // nav("/dashboard");
    } catch (e) {
      // setError(e.message || "Login failed");
      const msg = e?.message || "Login failed";
      setError(msg);

      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };


  // ------------------ SIGNUP ------------------
  // Your SignupModal currently submits: fullName, email, password, confirmPassword, agree
  // So handle only what you actually collect (until you add username/phone fields)
  const handleSignup = async ({ fullName, email, phone, password, roles }) => {
    try {
      setError("");
      setLoading(true);

      const res = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fullName,
          email,
          phone,
          username: email, // ✅ temporary mapping; replace when you add a username field
          password,
          roles: rolesType
        }),
      });

      if (!res.ok) {
        const errTxt = await safeText(res);
        throw new Error(errTxt || `Signup failed (${res.status})`);
      }

      const data = await safeJson(res);

      console.log("check data")

      let token = data?.accessToken ?? data?.token ?? null;
      let userId = data?.userId ?? data?.user?.id ?? data?.id ?? null;
      let apiUsername = data?.username ?? data?.user?.username ?? email;

      if (!userId && token) {
        try {
          const [, payloadB64] = token.split(".");
          const payload = JSON.parse(atob(payloadB64));
          userId = payload?.sub || payload?.user_id || null;
        } catch {}
      }

      if (!userId) throw new Error("User id missing in response.");

      const accountNumber = await fetchPrimaryAccountNumber(token);
      login({ userId, token, username: apiUsername, accountNumber });
      

      nav("/dashboard");
    } catch (e) {
      // setError(e.message || "Signup failed");
      const msg = e?.message || "Login failed";
      setError(msg);

      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthModal
      open={open}
      onClose={handleClose}
      tab={tab}
      onTabChange={switchTab}   // ✅ pass switching function
      onLogin={handleLogin}
      onSignup={handleSignup}
      loading={loading}
      rolesType={rolesType}
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