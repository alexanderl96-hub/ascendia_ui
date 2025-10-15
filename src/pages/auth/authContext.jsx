// import React, { createContext, useContext, useMemo, useState } from "react";

// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//     // State variables
//     const [authToken, setAuthToken] = useState(null); 
//     const [refreshToken, setRefreshToken] = useState(null); 
//     const [accountNumber, setAccountNumber] = useState(null); 
//     const [userId, setUserId] = useState(null);
//     const [username, setUsername] = useState(null);
//     const [buyingPower, setBuyingPower] = useState(null);
//     const [equity, setEquity] = useState(null);
//     const [portfolioValue, setPortfolio] = useState(null);

//     // Initial load from Local Storage (optional, but good practice)
//     useMemo(() => {
//         const stored = localStorage.getItem("ascendia.auth");
//         if (stored) {
//             try {
//                 const { userId, token, username, accountNumber, refreshToken, 
//                     buyingPower, equity, portfolioValue } = JSON.parse(stored);
//                 setUserId(userId);
//                 setUsername(username);
//                 setAuthToken(token);
//                 setAccountNumber(accountNumber);
//                 setRefreshToken(refreshToken);
//                 setBuyingPower(buyingPower);
//                 setEquity(equity);
//                 setPortfolio(portfolioValue)
//             } catch (e) {
//                 console.error("Error loading auth data from storage:", e);
//                 localStorage.removeItem("ascendia.auth");
//             }
//         }
//     }, []);

//     // ----------------------------------------------------
//     // 1. Define the refresh logic here
//     // ----------------------------------------------------
//     const attemptTokenRefresh = async () => {
//         const tokenToUse = refreshToken || JSON.parse(localStorage.getItem("ascendia.auth") || "{}").refreshToken;
//         if (!tokenToUse) return false;

//         try {
//             const res = await fetch('http://localhost:8080/api/v1/auth/refresh', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ refreshToken: tokenToUse }),
//             });

//             if (res.ok) {
//                 const data = await res.json();
                
//                 // Update state and local storage
//                 setAuthToken(data.accessToken); 
//                 setRefreshToken(data.refreshToken); 
                
//                 const stored = JSON.parse(localStorage.getItem("ascendia.auth"));
//                 localStorage.setItem("ascendia.auth", JSON.stringify({ 
//                     ...stored, 
//                     token: data.accessToken,
//                     refreshToken: data.refreshToken
//                 }));
                
//                 return true; // Refresh successful
//             }
//         } catch (error) {
//             console.error("Token refresh failed:", error);
//         }
//         return false; // Refresh failed
//     };

//     // ----------------------------------------------------
//     // 2. Define the wrapper function to handle 403s
//     // ----------------------------------------------------
//     const safeFetch = async (url, options = {}) => {
//         // Helper to retrieve current token from state/storage
//         const getCurrentAuthToken = () => authToken || JSON.parse(localStorage.getItem("ascendia.auth") || "{}").token;
        
//         let currentToken = getCurrentAuthToken();
        
//         // Ensure Authorization header exists in the initial request options
//         const initialOptions = {
//             ...options,
//             headers: {
//                 ...options.headers,
//                 // Only overwrite if the user didn't explicitly pass one
//                 'Authorization': options.headers?.Authorization || (currentToken ? `Bearer ${currentToken}` : undefined)
//             }
//         };

//         let response = await fetch(url, initialOptions);

//         // Check for 401/403 (Unauthorized/Forbidden) AND ensure we are not trying to refresh the refresh token
//         if ((response.status === 401 || response.status === 403) && url !== 'http://localhost:8080/api/v1/auth/refresh') {
            
//             const success = await attemptTokenRefresh();
            
//             if (success) {
//                 // CRITICAL: Retrieve the newly stored token from local storage or updated state
//                 const newAuthToken = getCurrentAuthToken();
                
//                 // Update the Authorization header for the retry
//                 const retryOptions = {
//                     ...options,
//                     headers: {
//                         ...options.headers,
//                         'Authorization': `Bearer ${newAuthToken}`
//                     }
//                 };
                
//                 // Retry the original request
//                 response = await fetch(url, retryOptions);
//             } else {
//                 // Refresh failed, force a complete logout (or redirect via routing logic)
//                 // You should handle navigation/redirection outside of the context, 
//                 // but clearing the tokens here is essential.
//                 logout(); 
//                 // Consider adding a custom error code to prompt redirect in the component
//                 return new Response(null, { status: 403, statusText: "Session Expired" });
//             }
//         }
        
//         return response;
//     };

//     // ----------------------------------------------------
//     // Login and Logout
//     // ----------------------------------------------------
//     const login = ({ userId, token, username, accountNumber, refreshToken = null, 
//                      buyingPower, equity, portfolioValue }) => {
//         // 1. Update State
//         setUserId(userId);
//         setUsername(username);
//         setAuthToken(token ?? null);
//         setAccountNumber(accountNumber ?? null);
//         setRefreshToken(refreshToken ?? null); 
//         setBuyingPower(buyingPower ?? null);
//         setEquity(equity ?? null);
//         setPortfolio(portfolioValue ?? null)


//         // 2. Persist to Local Storage
//         const next = { 
//             userId, 
//             token: token ?? null, 
//             username: username ?? null, 
//             accountNumber: accountNumber ?? null,
//             refreshToken: refreshToken ?? null,
//             buyingPower: buyingPower ?? null,
//             equity: equity ?? null,
//             portfolio: portfolioValue ?? null 
//         };
//         localStorage.setItem("ascendia.auth", JSON.stringify(next));
//     };

//     const logout = () => {
//         // Clear all state variables
//         setUserId(null);
//         setUsername(null);
//         setAuthToken(null);
//         setRefreshToken(null);
//         setAccountNumber(null);
//         setBuyingPower(null);
//         setEquity(null);
//         setPortfolio(null)
        
//         localStorage.removeItem("ascendia.auth");
//     };

//     const value = {
//         // State
//         token: authToken,
//         refreshToken: refreshToken,
//         userId: userId,
//         username: username,
//         accountNumber: accountNumber,
//         buyingPower: buyingPower,
//         equity: equity,
//         portfolio: portfolioValue,
        
//         // Functions
//         login: login,
//         logout: logout,
//         safeFetch: safeFetch, // <-- Expose the wrapper
//     };

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };



import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // State variables
  const [authToken, setAuthToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [accountNumber, setAccountNumber] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [buyingPower, setBuyingPower] = useState(null);
  const [equity, setEquity] = useState(null);
  const [portfolioValue, setPortfolioValue] = useState(null);
  const [publicK, setPublicK] = useState(null);
  const [secretK, setSecretK] = useState(null)

  // Initial load from Local Storage
  useEffect(() => {
    const stored = localStorage.getItem("ascendia.auth");
    if (!stored) return;
    try {
      const {
        userId,
        token,
        username,
        accountNumber,
        refreshToken,
        buyingPower,
        equity,
        portfolioValue, // <-- consistent name
        publicK,
        secretK
      } = JSON.parse(stored) || {};

      setUserId(userId ?? null);
      setUsername(username ?? null);
      setAuthToken(token ?? null);
      setAccountNumber(accountNumber ?? null);
      setRefreshToken(refreshToken ?? null);
      setBuyingPower(buyingPower ?? null);
      setEquity(equity ?? null);
      setPortfolioValue(portfolioValue ?? null);
      setPublicK(publicK ?? null);
      setSecretK(secretK ?? null);
    } catch (e) {
      console.error("Error loading auth data from storage:", e);
      localStorage.removeItem("ascendia.auth");
    }
  }, []);

  const attemptTokenRefresh = async () => {
    const tokenFromStorage = JSON.parse(localStorage.getItem("ascendia.auth") || "{}").refreshToken;
    const tokenToUse = refreshToken || tokenFromStorage;
    if (!tokenToUse) return false;

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: tokenToUse }),
      });

      if (res.ok) {
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
      }
    } catch (err) {
      console.error("Token refresh failed:", err);
    }
    return false;
  };

  const safeFetch = async (url, options = {}) => {
    const getCurrentAuthToken = () =>
      authToken || JSON.parse(localStorage.getItem("ascendia.auth") || "{}").token;

    let currentToken = getCurrentAuthToken();
    const initialOptions = {
      ...options,
      headers: {
        ...options.headers,
        Authorization:
          options.headers?.Authorization || (currentToken ? `Bearer ${currentToken}` : undefined),
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

  const login = ({
    userId,
    token,
    username,
    accountNumber,
    refreshToken = null,
    buyingPower,
    equity,
    portfolioValue, // <-- keep consistent
    publicK,
    secretK
  }) => {
    // 1) Update state
    setUserId(userId ?? null);
    setUsername(username ?? null);
    setAuthToken(token ?? null);
    setAccountNumber(accountNumber ?? null);
    setRefreshToken(refreshToken ?? null);
    setBuyingPower(buyingPower ?? null);
    setEquity(equity ?? null);
    setPortfolioValue(portfolioValue ?? null);
    setPublicK(publicK ?? null);
    setSecretK(secretK ?? null);

    // 2) Persist (names consistent with load)
    const next = {
      userId: userId ?? null,
      token: token ?? null,
      username: username ?? null,
      accountNumber: accountNumber ?? null,
      refreshToken: refreshToken ?? null,
      buyingPower: buyingPower ?? null,
      equity: equity ?? null,
      portfolioValue: portfolioValue ?? null, // <-- fix
      publicK: publicK ?? null,
      secretK: secretK ?? null
    };
    localStorage.setItem("ascendia.auth", JSON.stringify(next));
  };

  const logout = () => {
    setUserId(null);
    setUsername(null);
    setAuthToken(null);
    setRefreshToken(null);
    setAccountNumber(null);
    setBuyingPower(null);
    setEquity(null);
    setPortfolioValue(null);
    setPublicK(null);
    setSecretK(null);
    localStorage.removeItem("ascendia.auth");
  };

  const value = {
    token: authToken,
    refreshToken,
    userId,
    username,
    accountNumber,
    buyingPower,
    equity,
    portfolioValue, // <-- expose with the same name
    publicK,
    secretK,
    login,
    logout,
    safeFetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



