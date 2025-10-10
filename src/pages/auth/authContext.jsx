import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // State variables
    const [authToken, setAuthToken] = useState(null); 
    const [refreshToken, setRefreshToken] = useState(null); 
    const [accountNumber, setAccountNumber] = useState(null); 
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);

    // Initial load from Local Storage (optional, but good practice)
    useMemo(() => {
        const stored = localStorage.getItem("ascendia.auth");
        if (stored) {
            try {
                const { userId, token, username, accountNumber, refreshToken } = JSON.parse(stored);
                setUserId(userId);
                setUsername(username);
                setAuthToken(token);
                setAccountNumber(accountNumber);
                setRefreshToken(refreshToken);
            } catch (e) {
                console.error("Error loading auth data from storage:", e);
                localStorage.removeItem("ascendia.auth");
            }
        }
    }, []);

    // ----------------------------------------------------
    // 1. Define the refresh logic here
    // ----------------------------------------------------
    const attemptTokenRefresh = async () => {
        const tokenToUse = refreshToken || JSON.parse(localStorage.getItem("ascendia.auth") || "{}").refreshToken;
        if (!tokenToUse) return false;

        try {
            const res = await fetch('http://localhost:8080/api/v1/auth/refresh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: tokenToUse }),
            });

            if (res.ok) {
                const data = await res.json();
                
                // Update state and local storage
                setAuthToken(data.accessToken); 
                setRefreshToken(data.refreshToken); 
                
                const stored = JSON.parse(localStorage.getItem("ascendia.auth"));
                localStorage.setItem("ascendia.auth", JSON.stringify({ 
                    ...stored, 
                    token: data.accessToken,
                    refreshToken: data.refreshToken
                }));
                
                return true; // Refresh successful
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
        }
        return false; // Refresh failed
    };

    // ----------------------------------------------------
    // 2. Define the wrapper function to handle 403s
    // ----------------------------------------------------
    const safeFetch = async (url, options = {}) => {
        // Helper to retrieve current token from state/storage
        const getCurrentAuthToken = () => authToken || JSON.parse(localStorage.getItem("ascendia.auth") || "{}").token;
        
        let currentToken = getCurrentAuthToken();
        
        // Ensure Authorization header exists in the initial request options
        const initialOptions = {
            ...options,
            headers: {
                ...options.headers,
                // Only overwrite if the user didn't explicitly pass one
                'Authorization': options.headers?.Authorization || (currentToken ? `Bearer ${currentToken}` : undefined)
            }
        };

        let response = await fetch(url, initialOptions);

        // Check for 401/403 (Unauthorized/Forbidden) AND ensure we are not trying to refresh the refresh token
        if ((response.status === 401 || response.status === 403) && url !== 'http://localhost:8080/api/v1/auth/refresh') {
            
            const success = await attemptTokenRefresh();
            
            if (success) {
                // CRITICAL: Retrieve the newly stored token from local storage or updated state
                const newAuthToken = getCurrentAuthToken();
                
                // Update the Authorization header for the retry
                const retryOptions = {
                    ...options,
                    headers: {
                        ...options.headers,
                        'Authorization': `Bearer ${newAuthToken}`
                    }
                };
                
                // Retry the original request
                response = await fetch(url, retryOptions);
            } else {
                // Refresh failed, force a complete logout (or redirect via routing logic)
                // You should handle navigation/redirection outside of the context, 
                // but clearing the tokens here is essential.
                logout(); 
                // Consider adding a custom error code to prompt redirect in the component
                return new Response(null, { status: 403, statusText: "Session Expired" });
            }
        }
        
        return response;
    };

    // ----------------------------------------------------
    // Login and Logout
    // ----------------------------------------------------
    const login = ({ userId, token, username, accountNumber, refreshToken = null }) => {
        // 1. Update State
        setUserId(userId);
        setUsername(username);
        setAuthToken(token ?? null);
        setAccountNumber(accountNumber ?? null);
        setRefreshToken(refreshToken ?? null); 

        // 2. Persist to Local Storage
        const next = { 
            userId, 
            token: token ?? null, 
            username: username ?? null, 
            accountNumber: accountNumber ?? null,
            refreshToken: refreshToken ?? null 
        };
        localStorage.setItem("ascendia.auth", JSON.stringify(next));
    };

    const logout = () => {
        // Clear all state variables
        setUserId(null);
        setUsername(null);
        setAuthToken(null);
        setRefreshToken(null);
        setAccountNumber(null);
        
        localStorage.removeItem("ascendia.auth");
    };

    const value = {
        // State
        token: authToken,
        refreshToken: refreshToken,
        userId: userId,
        username: username,
        accountNumber: accountNumber,
        
        // Functions
        login: login,
        logout: logout,
        safeFetch: safeFetch, // <-- Expose the wrapper
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// import React, { createContext, useContext, useMemo, useState } from "react";
// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//     // Assume you now store both tokens
//     const [authToken, setAuthToken] = useState(null); 
//     const [refreshToken, setRefreshToken] = useState(null); 
//     const [accountNumber, setAccountNumber] = useState(null); 
//     const [userId, setUserId] = useState(null);
//     const [username, setUsername] = useState(null);
//     // ... other state (accountNumber, etc.)

//     // 1. Define the refresh logic here
//     const attemptTokenRefresh = async () => {
//         // CALL YOUR BACKEND'S REFRESH ENDPOINT with the refreshToken
//         try {
//             // This endpoint must not require an access token, only the refresh token
//             const res = await fetch('http://localhost:8080/api/v1/auth/refresh', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ refreshToken }),
//             });

//             if (res.ok) {
//                 const data = await res.json();
//                 // Update tokens in state
//                 setAuthToken(data.accessToken); 
//                 setRefreshToken(data.refreshToken); // If the backend rotates the refresh token
//                 return true; // Refresh successful
//             }
//         } catch (error) {
//             console.error("Token refresh failed:", error);
//         }
//         return false; // Refresh failed
//     };

//     // 2. Define the wrapper function to handle 403s
//     const safeFetch = async (url, options = {}) => {
//         let response = await fetch(url, options);

//         if (response.status === 403 && url !== '/api/v1/auth/refresh') {
            
//             const success = await attemptTokenRefresh();
            
//             if (success) {
//                 // Get the new token from the updated state
//                 const newAuthToken = authToken; // Note: State updates might not be instant in this closure scope, so use a local variable if necessary or ensure the token state is immediately available. For simplicity, we'll assume it's available or retrieved from storage.
                
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
//                 // Refresh failed, force a complete logout
//                 // setAuthToken(null);
//                 // setRefreshToken(null);
//                 // navigate('/login'); // Redirect to login
//             }
//         }
        
//         // This returns either the successful response or the final 403/failed response
//         return response;
//     };

//     const login = ({ userId, token, username, accountNumber, refreshToken = null }) => {
//     // 1. Update State
//     setUserId(userId);
//     setUsername(username);
//     setAuthToken(token ?? null);
//     setAccountNumber(accountNumber ?? null);
    
//     // 💡 Assuming your backend provides a refreshToken field on successful login
//     setRefreshToken(refreshToken ?? null); 

//     // 2. Persist to Local Storage
//     const next = { 
//         userId, 
//         token: token ?? null, 
//         username: username ?? null, 
//         accountNumber: accountNumber ?? null,
//         refreshToken: refreshToken ?? null // Persist this too!
//     };
//     localStorage.setItem("ascendia.auth", JSON.stringify(next));
// };


//  const logout = () => {
//     // Clear all state variables
//     setUserId(null);
//     setUsername(null);
//     setAuthToken(null);
//     setRefreshToken(null);
//     setAccountNumber(null);
    
//     localStorage.removeItem("ascendia.auth");
// };

//    const value = {
//     // State
//     token: authToken,
//     refreshToken: refreshToken,
//     userId: userId,
//     username: username,
//     accountNumber: accountNumber,
    
//     // Setters (if needed by components like OrderTicket)
//     setAccountNumber: setAccountNumber,

//     // Functions
//     login: login,           // <--- Expose it
//     logout: logout,         // <--- Expose it
//     safeFetch: safeFetch,   // <--- The token refresh wrapper
// };

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };