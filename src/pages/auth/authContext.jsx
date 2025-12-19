

// import React, { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext(null);
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   // Core auth
//   const [authToken, setAuthToken] = useState(null);
//   const [refreshToken, setRefreshToken] = useState(null);

//   // User identity
//   const [userId, setUserId] = useState(null);
//   const [username, setUsername] = useState(null);
//   const [fullName, setFullName] = useState(null);
//   const [userEmail, setEmail] = useState(null);

//   // API response extras (based on your backend payload)
//   const [roles, setRoles] = useState(null);
//   const [tokenType, setTokenType] = useState(null);
//   const [userSubscriptionStatus, setUserSubscriptionStatus] = useState(null);

//   // Account / portfolio fields
//   const [accountNumber, setAccountNumber] = useState(null);
//   const [cashBalance, setCashBalance] = useState(null);
//   const [totalEquity, setTotalEquity] = useState(null);
//   const [buyingPower, setBuyingPower] = useState(null);
//   const [equity, setEquity] = useState(null);
//   const [portfolioValue, setPortfolioValue] = useState(null);

//   // Alpaca keys (usually you DON'T want these client-side, but included since you had them)
//   const [alpacaApiKey, setAlpacaApiKey] = useState(null);
//   const [alpacaApiSecret, setAlpacaApiSecret] = useState(null);

//   // (keep yours if you still need them)
//   const [publicK, setPublicK] = useState(null);
//   const [secretK, setSecretK] = useState(null);

//   const [typeRegister, setTypeRegister] = useState(null);
//   const [modeTheme, setModeTheme] = useState(null);

//   // -------------------- LOAD FROM STORAGE --------------------
//   useEffect(() => {
//     const stored = localStorage.getItem("ascendia.auth");
//     if (!stored) return;

//     try {
//       const parsed = JSON.parse(stored) || {};

//       setUserId(parsed.userId ?? null);
//       setUsername(parsed.username ?? null);
//       setFullName(parsed.fullName ?? null);
//       setEmail(parsed.userEmail ?? null);

//       setAuthToken(parsed.token ?? null);
//       setRefreshToken(parsed.refreshToken ?? null);

//       setRoles(parsed.roles ?? null);
//       setTokenType(parsed.tokenType ?? null);
//       setUserSubscriptionStatus(parsed.userSubscriptionStatus ?? null);

//       setAccountNumber(parsed.accountNumber ?? null);
//       setCashBalance(parsed.cashBalance ?? null);
//       setTotalEquity(parsed.totalEquity ?? null);
//       setBuyingPower(parsed.buyingPower ?? null);
//       setEquity(parsed.equity ?? null);
//       setPortfolioValue(parsed.portfolioValue ?? null);

//       setAlpacaApiKey(parsed.alpacaApiKey ?? null);
//       setAlpacaApiSecret(parsed.alpacaApiSecret ?? null);

//       setPublicK(parsed.publicK ?? null);
//       setSecretK(parsed.secretK ?? null);

//       setTypeRegister(parsed.typeRegister ?? null);
//       setModeTheme(parsed.modeTheme ?? null);
//     } catch (e) {
//       console.error("Error loading auth data from storage:", e);
//       localStorage.removeItem("ascendia.auth");
//     }
//   }, []);

//   // -------------------- TOKEN REFRESH --------------------
//   const attemptTokenRefresh = async () => {
//     const tokenFromStorage = JSON.parse(
//       localStorage.getItem("ascendia.auth") || "{}"
//     ).refreshToken;

//     const tokenToUse = refreshToken || tokenFromStorage;
//     if (!tokenToUse) return false;

//     try {
//       const res = await fetch("http://localhost:8080/api/v1/auth/refresh", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ refreshToken: tokenToUse }),
//       });

//       if (!res.ok) return false;

//       const data = await res.json();

//       setAuthToken(data.accessToken ?? null);
//       setRefreshToken(data.refreshToken ?? null);

//       const stored = JSON.parse(localStorage.getItem("ascendia.auth") || "{}");
//       localStorage.setItem(
//         "ascendia.auth",
//         JSON.stringify({
//           ...stored,
//           token: data.accessToken ?? null,
//           refreshToken: data.refreshToken ?? null,
//         })
//       );
//       return true;
//     } catch (err) {
//       console.error("Token refresh failed:", err);
//       return false;
//     }
//   };

//   // -------------------- SAFE FETCH --------------------
//   const safeFetch = async (url, options = {}) => {
//     const getCurrentAuthToken = () =>
//       authToken || JSON.parse(localStorage.getItem("ascendia.auth") || "{}").token;

//     const currentToken = getCurrentAuthToken();

//     const initialOptions = {
//       ...options,
//       headers: {
//         ...options.headers,
//         Authorization:
//           options.headers?.Authorization ||
//           (currentToken ? `Bearer ${currentToken}` : undefined),
//       },
//     };

//     let response = await fetch(url, initialOptions);

//     if (
//       (response.status === 401 || response.status === 403) &&
//       url !== "http://localhost:8080/api/v1/auth/refresh"
//     ) {
//       const success = await attemptTokenRefresh();

//       if (success) {
//         const newAuthToken =
//           authToken || JSON.parse(localStorage.getItem("ascendia.auth") || "{}").token;

//         const retryOptions = {
//           ...options,
//           headers: {
//             ...options.headers,
//             Authorization: newAuthToken ? `Bearer ${newAuthToken}` : undefined,
//           },
//         };

//         response = await fetch(url, retryOptions);
//       } else {
//         logout();
//         return new Response(null, { status: 403, statusText: "Session Expired" });
//       }
//     }

//     return response;
//   };

//   // -------------------- LOGIN (WRITE STATE + STORAGE) --------------------
//   const login = ({
//      userId,
//   token,
//   refreshToken = null,
//   username,
//   fullName,
//   userEmail,
//   roles,
//   tokenType,
//   userSubscriptionStatus,
//   accountNumber,
//   cashBalance,
//   totalEquity,
//   buyingPower,
//   equity,
//   portfolioValue,
//   alpacaApiKey,
//   alpacaApiSecret,
//   publicK,
//   secretK,

//   typeRegister,
//   modeTheme
//   }) => {
//     // state
//     setUserId(userId ?? null);
//     setAuthToken(token ?? null);
//     setRefreshToken(refreshToken ?? null);

//     setUsername(username ?? null);
//     setFullName(fullName ?? null);
//     setEmail(userEmail ?? null);

//     setRoles(roles ?? null);
//     setTokenType(tokenType ?? null);
//     setUserSubscriptionStatus(userSubscriptionStatus ?? null);

//     setAccountNumber(accountNumber ?? null);
//     setCashBalance(cashBalance ?? null);
//     setTotalEquity(totalEquity ?? null);

//     setBuyingPower(buyingPower ?? null);
//     setEquity(equity ?? null);
//     setPortfolioValue(portfolioValue ?? null);

//     setAlpacaApiKey(alpacaApiKey ?? null);
//     setAlpacaApiSecret(alpacaApiSecret ?? null);

//     setPublicK(publicK ?? null);
//     setSecretK(secretK ?? null);

//     setTypeRegister(typeRegister ?? null);
//     setModeTheme(modeTheme ?? null);

//     // storage
//     const next = {
//       userId: userId ?? null,
//       token: token ?? null,
//       refreshToken: refreshToken ?? null,

//       username: username ?? null,
//       fullName: fullName ?? null,
//       userEmail: userEmail ?? null,

//       roles: roles ?? null,
//       tokenType: tokenType ?? null,
//       userSubscriptionStatus: userSubscriptionStatus ?? null,

//       accountNumber: accountNumber ?? null,
//       cashBalance: cashBalance ?? null,
//       totalEquity: totalEquity ?? null,

//       buyingPower: buyingPower ?? null,
//       equity: equity ?? null,
//       portfolioValue: portfolioValue ?? null,

//       alpacaApiKey: alpacaApiKey ?? null,
//       alpacaApiSecret: alpacaApiSecret ?? null,

//       publicK: publicK ?? null,
//       secretK: secretK ?? null,
//       typeRegister: typeRegister ?? null,
//       modeTheme : modeTheme ?? null
//     };

//    console.log("next", next)

//     localStorage.setItem("ascendia.auth", JSON.stringify(next));
//   };

//   // -------------------- LOGOUT --------------------
//   const logout = () => {
//     setUserId(null);
//     setUsername(null);
//     setFullName(null);
//     setEmail(null);

//     setAuthToken(null);
//     setRefreshToken(null);

//     setRoles(null);
//     setTokenType(null);
//     setUserSubscriptionStatus(null);

//     setAccountNumber(null);
//     setCashBalance(null);
//     setTotalEquity(null);

//     setBuyingPower(null);
//     setEquity(null);
//     setPortfolioValue(null);

//     setAlpacaApiKey(null);
//     setAlpacaApiSecret(null);

//     setPublicK(null);
//     setSecretK(null);

//     setTypeRegister(null);
//     setModeTheme(null)

//     localStorage.removeItem("ascendia.auth");
//   };

//   const value = {
//     // auth
//     token: authToken,
//     refreshToken,

//     // user
//     userId,
//     username,
//     fullName,
//     userEmail,

//     // extras
//     roles,
//     tokenType,
//     userSubscriptionStatus,

//     // account
//     accountNumber,
//     cashBalance,
//     totalEquity,
//     buyingPower,
//     equity,
//     portfolioValue,

//     // alpaca (optional)
//     alpacaApiKey,
//     alpacaApiSecret,

//     // keep yours
//     publicK,
//     secretK,

//     typeRegister,
//     modeTheme,

//     // actions
//     login,
//     logout,
//     safeFetch,
//   };


//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Core auth
  const [authToken, setAuthToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // User identity
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [userEmail, setEmail] = useState(null);

  // API response extras
  const [roles, setRoles] = useState(null);
  const [tokenType, setTokenType] = useState(null);
  const [userSubscriptionStatus, setUserSubscriptionStatus] = useState(null);

  // Account / portfolio fields
  const [accountNumber, setAccountNumber] = useState(null);
  const [cashBalance, setCashBalance] = useState(null);
  const [totalEquity, setTotalEquity] = useState(null);
  const [buyingPower, setBuyingPower] = useState(null);
  const [equity, setEquity] = useState(null);
  const [portfolioValue, setPortfolioValue] = useState(null);

  // Alpaca keys
  const [alpacaApiKey, setAlpacaApiKey] = useState(null);
  const [alpacaApiSecret, setAlpacaApiSecret] = useState(null);

  // keep yours if you still need them
  const [publicK, setPublicK] = useState(null);
  const [secretK, setSecretK] = useState(null);

  const [typeRegister, setTypeRegister] = useState(null);

  // ✅ THEME (default to "light" instead of null)
  const [modeTheme, setModeTheme] = useState("light"); // "light" | "dark" | "system"

  // -------------------- LOAD FROM STORAGE --------------------
  useEffect(() => {
    const stored = localStorage.getItem("ascendia.auth");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) || {};

      setUserId(parsed.userId ?? null);
      setUsername(parsed.username ?? null);
      setFullName(parsed.fullName ?? null);
      setEmail(parsed.userEmail ?? null);

      setAuthToken(parsed.token ?? null);
      setRefreshToken(parsed.refreshToken ?? null);

      setRoles(parsed.roles ?? null);
      setTokenType(parsed.tokenType ?? null);
      setUserSubscriptionStatus(parsed.userSubscriptionStatus ?? null);

      setAccountNumber(parsed.accountNumber ?? null);
      setCashBalance(parsed.cashBalance ?? null);
      setTotalEquity(parsed.totalEquity ?? null);
      setBuyingPower(parsed.buyingPower ?? null);
      setEquity(parsed.equity ?? null);
      setPortfolioValue(parsed.portfolioValue ?? null);

      setAlpacaApiKey(parsed.alpacaApiKey ?? null);
      setAlpacaApiSecret(parsed.alpacaApiSecret ?? null);

      setPublicK(parsed.publicK ?? null);
      setSecretK(parsed.secretK ?? null);

      setTypeRegister(parsed.typeRegister ?? null);

      // ✅ load theme (fallback to light)
      setModeTheme(parsed.modeTheme ?? "light");
    } catch (e) {
      console.error("Error loading auth data from storage:", e);
      localStorage.removeItem("ascendia.auth");
    }
  }, []);

  // ✅ APPLY THEME GLOBALLY (works on every page)
  // useEffect(() => {
  //   const root = document.documentElement;

  //   // reset
  //   root.classList.remove("theme-dark");

  //   if (modeTheme === "dark") {
  //     root.classList.add("theme-dark");
  //   } else if (modeTheme === "system") {
  //     const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  //     if (prefersDark) root.classList.add("theme-dark");
  //   }
  // }, [modeTheme]);

  useEffect(() => {
    const root = document.documentElement;

    // ✅ ONLY react to explicit values
    if (modeTheme === "light") {
      root.classList.remove("theme-dark");
    } else if (modeTheme === "dark") {
      root.classList.add("theme-dark");
    } else {
      // modeTheme === "system" (or null/unknown) -> do nothing
    }
  }, [modeTheme]);

  useEffect(() => {
  if (modeTheme !== "light" && modeTheme !== "dark") return;

  const stored = JSON.parse(localStorage.getItem("ascendia.auth") || "{}");
  localStorage.setItem(
    "ascendia.auth",
    JSON.stringify({
      ...stored,
      modeTheme,
    })
  );
}, [modeTheme]);


  // ✅ Persist theme into ascendia.auth whenever it changes
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ascendia.auth") || "{}");
    localStorage.setItem(
      "ascendia.auth",
      JSON.stringify({
        ...stored,
        modeTheme: modeTheme ?? "light",
      })
    );
  }, [modeTheme]);

  // -------------------- TOKEN REFRESH --------------------
  const attemptTokenRefresh = async () => {
    const tokenFromStorage = JSON.parse(
      localStorage.getItem("ascendia.auth") || "{}"
    ).refreshToken;

    const tokenToUse = refreshToken || tokenFromStorage;
    if (!tokenToUse) return false;

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: tokenToUse }),
      });

      if (!res.ok) return false;

      const data = await res.json();

      setAuthToken(data.accessToken ?? null);
      setRefreshToken(data.refreshToken ?? null);

      const stored = JSON.parse(localStorage.getItem("ascendia.auth") || "{}");
      localStorage.setItem(
        "ascendia.auth",
        JSON.stringify({
          ...stored,
          token: data.accessToken ?? null,
          refreshToken: data.refreshToken ?? null,
        })
      );
      return true;
    } catch (err) {
      console.error("Token refresh failed:", err);
      return false;
    }
  };

  // -------------------- SAFE FETCH --------------------
  const safeFetch = async (url, options = {}) => {
    const getCurrentAuthToken = () =>
      authToken || JSON.parse(localStorage.getItem("ascendia.auth") || "{}").token;

    const currentToken = getCurrentAuthToken();

    const initialOptions = {
      ...options,
      headers: {
        ...options.headers,
        Authorization:
          options.headers?.Authorization ||
          (currentToken ? `Bearer ${currentToken}` : undefined),
      },
    };

    let response = await fetch(url, initialOptions);

    if (
      (response.status === 401 || response.status === 403) &&
      url !== "http://localhost:8080/api/v1/auth/refresh"
    ) {
      const success = await attemptTokenRefresh();

      if (success) {
        const newAuthToken =
          authToken || JSON.parse(localStorage.getItem("ascendia.auth") || "{}").token;

        const retryOptions = {
          ...options,
          headers: {
            ...options.headers,
            Authorization: newAuthToken ? `Bearer ${newAuthToken}` : undefined,
          },
        };

        response = await fetch(url, retryOptions);
      } else {
        logout();
        return new Response(null, { status: 403, statusText: "Session Expired" });
      }
    }

    return response;
  };

  // -------------------- LOGIN (WRITE STATE + STORAGE) --------------------
  const login = ({
    userId,
    token,
    refreshToken = null,
    username,
    fullName,
    userEmail,
    roles,
    tokenType,
    userSubscriptionStatus,
    accountNumber,
    cashBalance,
    totalEquity,
    buyingPower,
    equity,
    portfolioValue,
    alpacaApiKey,
    alpacaApiSecret,
    publicK,
    secretK,
    typeRegister,
    modeTheme,
  }) => {
    // state
    setUserId(userId ?? null);
    setAuthToken(token ?? null);
    setRefreshToken(refreshToken ?? null);

    setUsername(username ?? null);
    setFullName(fullName ?? null);
    setEmail(userEmail ?? null);

    setRoles(roles ?? null);
    setTokenType(tokenType ?? null);
    setUserSubscriptionStatus(userSubscriptionStatus ?? null);

    setAccountNumber(accountNumber ?? null);
    setCashBalance(cashBalance ?? null);
    setTotalEquity(totalEquity ?? null);

    setBuyingPower(buyingPower ?? null);
    setEquity(equity ?? null);
    setPortfolioValue(portfolioValue ?? null);

    setAlpacaApiKey(alpacaApiKey ?? null);
    setAlpacaApiSecret(alpacaApiSecret ?? null);

    setPublicK(publicK ?? null);
    setSecretK(secretK ?? null);

    setTypeRegister(typeRegister ?? null);

    // ✅ theme fallback
    const themeToUse = modeTheme ?? "light";
    setModeTheme(themeToUse);

    // storage
    const next = {
      userId: userId ?? null,
      token: token ?? null,
      refreshToken: refreshToken ?? null,

      username: username ?? null,
      fullName: fullName ?? null,
      userEmail: userEmail ?? null,

      roles: roles ?? null,
      tokenType: tokenType ?? null,
      userSubscriptionStatus: userSubscriptionStatus ?? null,

      accountNumber: accountNumber ?? null,
      cashBalance: cashBalance ?? null,
      totalEquity: totalEquity ?? null,

      buyingPower: buyingPower ?? null,
      equity: equity ?? null,
      portfolioValue: portfolioValue ?? null,

      alpacaApiKey: alpacaApiKey ?? null,
      alpacaApiSecret: alpacaApiSecret ?? null,

      publicK: publicK ?? null,
      secretK: secretK ?? null,

      typeRegister: typeRegister ?? null,

      // ✅ store theme in the same object
      modeTheme: themeToUse,
    };

    localStorage.setItem("ascendia.auth", JSON.stringify(next));
  };

  // -------------------- LOGOUT --------------------
  const logout = () => {
    setUserId(null);
    setUsername(null);
    setFullName(null);
    setEmail(null);

    setAuthToken(null);
    setRefreshToken(null);

    setRoles(null);
    setTokenType(null);
    setUserSubscriptionStatus(null);

    setAccountNumber(null);
    setCashBalance(null);
    setTotalEquity(null);

    setBuyingPower(null);
    setEquity(null);
    setPortfolioValue(null);

    setAlpacaApiKey(null);
    setAlpacaApiSecret(null);

    setPublicK(null);
    setSecretK(null);

    setTypeRegister(null);

    // ✅ reset theme to light
    setModeTheme("light");

    localStorage.removeItem("ascendia.auth");
  };

  const value = {
    // auth
    token: authToken,
    refreshToken,

    // user
    userId,
    username,
    fullName,
    userEmail,

    // extras
    roles,
    tokenType,
    userSubscriptionStatus,

    // account
    accountNumber,
    cashBalance,
    totalEquity,
    buyingPower,
    equity,
    portfolioValue,

    // alpaca
    alpacaApiKey,
    alpacaApiSecret,

    // keep yours
    publicK,
    secretK,

    typeRegister,

    // ✅ theme (and setter!)
    modeTheme,
    setModeTheme,

    // actions
    login,
    logout,
    safeFetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
