import React, { useState } from "react";
import "../pages/dashboard/dash-board.css";
// Assuming you have components for dropdowns/inputs
// import { Input, Select, Button } from './ui-components'; 

/**
 * OrderTicket component handles order submission.
 * It uses the safeFetch prop to ensure the access token is valid (and refreshed if needed).
 */
export default function OrderTicket({ 
    defaultSymbol = "", 
    submitUrl, 
    userId, 
    accountNumber, 
    fetchApi, // <-- This is the safeFetch function from AuthContext
    onSuccess, 
    onError 
}) {
    const [symbol, setSymbol] = useState(defaultSymbol);
    const [side, setSide] = useState("BUY");
    const [quantity, setQuantity] = useState(1);
    const [type, setType] = useState("MARKET");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setSuccessMessage(false);

        if (!userId || !accountNumber) {
            onError("Authentication or Account details missing.");
            setLoading(false);
            return;
        }

        const payload = {
            symbol: symbol.toUpperCase(),
            side: side,
            type: type,
            quantity: quantity,
            // limitPrice: type === 'LIMIT' ? limitPrice : null, // Add limitPrice if needed
            // The backend uses the principal ID (userId) and accountNumber, 
            // but we explicitly send the accountNumber for clarity/data integrity
            accountNumber: accountNumber 
        };

        try {
            // CRITICAL: Use the passed fetchApi (safeFetch) here
            const response = await fetchApi(submitUrl, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    // NOTE: The Authorization: Bearer <token> is handled inside safeFetch
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                // If the error is a session expiry handled by safeFetch, 
                // it might return a specific status/text, but usually, we just 
                // throw the error to be handled by the component.
                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                throw new Error(errorData.message || `Order failed with status: ${response.status}`);
            }

            const data = await response.json();
            onSuccess(data);
            setSuccessMessage(true);
            // setMessage(`Order for ${payload.symbol} placed successfully!`);
             setTimeout(() => {
                setSuccessMessage(false); // Revert button back to "Place Order"
                setSymbol("")
                setQuantity(1)
                // You might also clear the form fields here if desired
            }, 3000); 
            
        } catch (e) {
            onError(e.message);
            setMessage(`Error: ${e.message}`);
             setTimeout(() => {
                setMessage(""); // Revert button back to "Place Order"
                setSymbol("")
                setQuantity(1)
                // You might also clear the form fields here if desired
            }, 3000); 
        } finally {
            setLoading(false);
        }
    };

    // Update symbol when defaultSymbol changes from Dashboard
    React.useEffect(() => {
        if (defaultSymbol) setSymbol(defaultSymbol);
    }, [defaultSymbol]);

      return (
            <form onSubmit={handleSubmit} className="card order">
              <div className="order__tabs">
                 <button className="chip chip--active" 
                         onClick={(e) => setType('BUY')} disabled={loading}  >Buy</button>
                 <button className="chip" 
                         onClick={(e) => setType("SELL")} disabled={loading}  >Sell</button>
              </div>

                <div className="order__tabs2">
                    <label className="field-primary2">
                        <span >Symbol</span>
                        <input type="text" min="GOOGL" placeholder="GOOGL" 
                               value={symbol} 
                               onChange={(e) => setSymbol(e.target.value)} 
                              //  required 
                              disabled={loading}
                                />
                    </label>

                        <label className="field-primary2">
                        <span >Type</span>
                        <input type="text" 
                               step="0.01" 
                               style={{
                                 color: type == "MARKET" ? " #585959ff" : "#f8f3f3ff"}}
                               placeholder={type}
                               value={type} 
                               disabled={loading}  />
                    </label>
               </div>

               <div className="order__tabs2">
                    <label className="field-primary">
                        <span >Quantity</span>
                        <input  type="number" 
                                min="1" 
                                value={quantity} 
                                onChange={(e) => setQuantity(Number(e.target.value))} 
                                required 
                                disabled={loading} />
                    </label>
                    <label className="field-primary">
                        <span >Limit price</span>
                        <input type="number" step="0.01" placeholder="$0.00" />
                    </label>
               </div>
              

                {/* <label className="field">
                 <span>Limit price</span>
                 <input type="number" step="0.01" placeholder="$0.00" />
               </label> */}
               {message && <div className="order-message">{message}</div>}

               <button className="btn btn--primary btn--block" 
                      disabled={!loading && symbol == "" && type !== "MARKET"} >
                   {loading 
                ? "Processing..." 
                : (successMessage 
                    ? "Order Placed Successfully! 🎉" 
                    : `Place Order`)}
               </button>

           
      </form>

    );

    // return (
        // <form onSubmit={handleSubmit} className="order-ticket">
            {/* Symbol Input */}

            // <form onSubmit={handleSubmit} className="card order">
              {/* <div className="order__tabs">
                 <button className="chip chip--active" 
                         onChange={(e) => setType(e.target.context)} >Buy</button>
                 <button className="chip" 
                         onChange={(e) => setType(e.target.context)}>Sell</button>
               </div> */}

                {/* <div className="order__tabs2">
                    <label className="field-primary2">
                        <span>Symbol</span>
                        <input type="text" min="GOOGL" placeholder="GOOGL" 
                               value={symbol} 
                               onChange={(e) => setSymbol(e.target.value)} 
                               required disabled={loading} />
                    </label>
                    <label className="field-primary3">
                        <span>Type</span> */}
                       {/*  <input type="number" step="0.01" placeholder="$0.00" /> */}
                        {/* <select className="field-primary-select"  
                               value={type} onChange={(e) => setType(e.target.value)} disabled={loading}>
                            <option value="BUY">BUY</option>
                            <option value="SELL">SELL</option>
                        </select>
                    </label>
               </div>

               <div className="order__tabs2">
                    <label className="field-primary">
                        <span>Quantity</span>
                        <input  type="number" 
                                min="1" 
                                value={quantity} 
                                onChange={(e) => setQuantity(Number(e.target.value))} 
                                required 
                                disabled={loading} />
                    </label>
                    <label className="field-primary">
                        <span>Limit price</span>
                        <input type="number" step="0.01" placeholder="$0.00" />
                    </label>
               </div>
               */}

                {/* <label className="field">
                 <span>Limit price</span>
                 <input type="number" step="0.01" placeholder="$0.00" />
               </label> */}
               {/* <button className="btn btn--primary btn--block" 
                      disabled={loading || symbol === ""} >
                   {loading 
                ? "Processing..." 
                : (successMessage 
                    ? "Order Placed Successfully! 🎉" 
                    : `Place Order`)}
               </button> */}

                {/* Submission Button
            <button className={`btn btn--${side === 'BUY' ? 'green' : 'red'}`} 
                    type="submit" disabled={loading}>
                {loading ? "Processing..." : `${side} ${type}`}
            </button> */}

            {/* Status Message */}
            {/* {message && <div className="order-message">{message}</div>}
             </form> */}




            {/* <label>
                <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} required disabled={loading} />
            </label> */}

            {/* <div style={{ display: 'flex', gap: '10px' }}> */}
                {/* Side Selector */}
                {/* <label>Side
                    <select value={side} onChange={(e) => setSide(e.target.value)} disabled={loading}>
                        <option value="BUY">BUY</option>
                        <option value="SELL">SELL</option>
                    </select>
                </label> */}

                {/* Type Selector */}
                {/* <label>Type
                    <select value={type} onChange={(e) => setType(e.target.value)} disabled={loading}>
                        <option value="MARKET">MARKET</option>
                        <option value="LIMIT">LIMIT</option>
                    </select>
                </label> */}
            {/* </div> */}
            
            {/* Quantity Input */}
            {/* <label>Quantity
                <input 
                    type="number" 
                    min="1" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Number(e.target.value))} 
                    required 
                    disabled={loading} 
                />
            </label> */}

            {/* Submission Button */}
            {/* <button className={`btn btn--${side === 'BUY' ? 'green' : 'red'}`} type="submit" disabled={loading}>
                {loading ? "Processing..." : `${side} ${type}`}
            </button> */}

            {/* Status Message */}
            {/* {message && <div className="order-message">{message}</div>} */}
        // </form>
    // );
}



// import React, { useMemo, useState, useEffect } from "react";
// import { useAuth } from "../pages/auth/authContext";

// export default function OrderTicket({
//   defaultSymbol = "",
//   submitUrl,
//   onSubmit,
//   onSuccess,
//   onError,
// }) {
//  const { token: authToken, accountNumber, setAccountNumber, safeFetch } = useAuth(); 


//   const [side, setSide] = useState("BUY");      // BUY | SELL
//   const [type, setType] = useState("MARKET");   // MARKET | LIMIT
//   const [symbol, setSymbol] = useState(defaultSymbol);
//   const [quantity, setQuantity] = useState("1");
//   const [limitPrice, setLimitPrice] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const canLimit = type === "LIMIT";

//   // keep symbol in sync with parent
//   useEffect(() => { setSymbol(defaultSymbol || ""); }, [defaultSymbol]);

//   // Try to fetch primary account number if missing
//   useEffect(() => {
//     let abort = false;
//     async function fetchPrimary() {
//       if (accountNumber) return;
//       try {
//         const res = await fetch("http://localhost:8080/api/v1/accounts", {
//           method: "GET",
//           credentials: authToken ? "same-origin" : "include",
//           headers: {
//             Accept: "application/json",
//             ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
//           },
//         });
//         if (!res.ok) return;
//         const list = await res.json(); // expect [{ accountNumber: "...", ... }]
//         const accNum = Array.isArray(list) && list.length > 0 ? list[0]?.accountNumber : null;
//         if (!abort && accNum) setAccountNumber(accNum);
//       } catch { /* ignore */ }
//     }
//     fetchPrimary();
//     return () => { abort = true; };
//   }, [accountNumber, authToken, setAccountNumber]);

//   const isValid = useMemo(() => {
//     const qty = Number(quantity);
//     if (!symbol || !qty || qty <= 0) return false;
//     if (canLimit && !(Number(limitPrice) > 0)) return false;
//     if (!accountNumber) return false; // block until we have it
//     return true;
//   }, [symbol, quantity, canLimit, limitPrice, accountNumber]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isValid || submitting) return;

//     const payload = {
//       symbol: symbol.trim().toUpperCase(),
//       side,
//       type,
//       quantity: Number(quantity),
//       limitPrice: canLimit ? Number(limitPrice) : null,
//       accountNumber, // REQUIRED by backend
//       source: "ascendia-web",
//       ts: new Date().toISOString(),
//     };

//     try {
//       setSubmitting(true);
//       if (onSubmit) await onSubmit(payload);

//       if (submitUrl) {
//         const res = await safeFetch(submitUrl, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             // *** REMOVE Authorization header here if safeFetch adds it ***
//             // *** For now, let's keep it simple and rely on the original fetch setup ***
//             // *** You can decide if safeFetch is fully automatic or just handles retry ***
//             ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
//         },
//         credentials: authToken ? "same-origin" : "include",
//         body: JSON.stringify(payload),
//     });
//         const txt = await res.text();
//         const json = txt ? JSON.parse(txt) : null;
//         if (!res.ok) throw new Error(txt || `HTTP ${res.status}`);
//         onSuccess?.(json);
//       }
//     } catch (err) {
//       console.error("Order submit error:", err);
//       onError?.(err.message || "Order failed");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <form className="order" onSubmit={handleSubmit} aria-labelledby="order-title">
//       {!accountNumber && (
//         <div className="banner banner--warn" role="alert" style={{ marginBottom: 8 }}>
//           Fetching your account… Please wait a moment.
//         </div>
//       )}

//       <div className="order__tabs" role="tablist" aria-label="Order side">
//         <button
//           type="button"
//           role="tab"
//           aria-selected={side === "BUY"}
//           className={`chip ${side === "BUY" ? "chip--active buy" : ""}`}
//           onClick={() => setSide("BUY")}
//         >
//           Buy
//         </button>
//         <button
//           type="button"
//           role="tab"
//           aria-selected={side === "SELL"}
//           className={`chip ${side === "SELL" ? "chip--active sell" : ""}`}
//           onClick={() => setSide("SELL")}
//         >
//           Sell
//         </button>
//       </div>

//       <div className="order__row">
//         <label className="field-primary">
//           <span>Symbol</span>
//           <input
//             value={symbol}
//             onChange={(e) => setSymbol(e.target.value)}
//             placeholder="AAPL"
//             required
//           />
//         </label>

//         <label className="field">
//           <span>Quantity</span>
//           <input
//             type="number"
//             min="1"
//             step="1"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//             required
//           />
//         </label>
//       </div>

//       {/* Enable when you want LIMIT orders */}
//       {/* <div className="order__row">
//         <label className="field">
//           <span>Type</span>
//           <select value={type} onChange={(e) => setType(e.target.value)}>
//             <option value="MARKET">Market</option>
//             <option value="LIMIT">Limit</option>
//           </select>
//         </label>

//         <label className="field">
//           <span>Limit Price</span>
//           <input
//             type="number"
//             step="0.01"
//             value={limitPrice}
//             onChange={(e) => setLimitPrice(e.target.value)}
//             placeholder="e.g. 125.50"
//             disabled={!canLimit}
//             required={canLimit}
//           />
//         </label>
//       </div> */}

//       <button
//         type="submit"
//         className={`btn btn--primary btn--block ${side === "SELL" ? "btn--danger" : ""}`}
//         disabled={!isValid || submitting}
//         aria-label={`${side} ${quantity || 0} ${symbol}${canLimit ? ` @ ${limitPrice}` : ""}`}
//       >
//         {submitting ? "Submitting…" : `${side} ${quantity || 0}`}
//       </button>
//     </form>
//   );
// }