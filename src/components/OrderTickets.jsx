import React, { useMemo, useState, useEffect } from "react";

/**
 * Props:
 * - defaultSymbol (string)
 * - submitUrl (string)                    // where to POST (e.g. http://localhost:8080/api/v1/orders)
 * - userId (string|number)               // from your auth context
 * - authToken (string|null)              // JWT if you use bearer auth
 * - onSubmit(payload) => Promise|void    // optional: pre/post hook
 * - onSuccess(respJson) => void          // optional: success hook
 * - onError(errorMsg) => void            // optional: error hook
 */
export default function OrderTicket({
  defaultSymbol = "AAPL",
  submitUrl,
  userId,
  authToken,
  onSubmit,
  onSuccess,
  onError,
}) {
  const [side, setSide] = useState("BUY");     // BUY | SELL
  const [type, setType] = useState("MARKET");  // MARKET | LIMIT
  const [symbol, setSymbol] = useState(defaultSymbol);
  const [quantity, setQuantity] = useState("1");
  const [limitPrice, setLimitPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // keep symbol in sync if parent changes defaultSymbol
  useEffect(() => { setSymbol(defaultSymbol || ""); }, [defaultSymbol]);

  const canLimit = type === "LIMIT";

  const isValid = useMemo(() => {
    const qty = Number(quantity);
    if (!symbol || !qty || qty <= 0) return false;
    if (type === "LIMIT" && !(Number(limitPrice) > 0)) return false;
    return true;
  }, [symbol, quantity, type, limitPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    const payload = {
      symbol: symbol.trim().toUpperCase(),
      side,                       // "BUY" | "SELL"
      type,                       // "MARKET" | "LIMIT"
      quantity: Number(quantity),
      limitPrice: canLimit ? Number(limitPrice) : null,
      userId,                     // <-- include if your API expects it in body
      source: "ascendia-web",
      ts: new Date().toISOString(),
    };

    try {
      setSubmitting(true);

      // Optional hook (e.g., analytics, validation, mapping field names)
      if (onSubmit) await onSubmit(payload);

      if (submitUrl) {
        const res = await fetch(submitUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          },
          credentials: "include", // keep if your API uses cookies
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const msg = await safeText(res);
          throw new Error(msg || `HTTP ${res.status}`);
        }

        const json = await safeJson(res);
        onSuccess?.(json);
      }
    } catch (err) {
      console.error("Order submit failed:", err);
      onError?.(String(err.message || err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="order" onSubmit={handleSubmit} aria-labelledby="order-title">
      <div className="order__tabs" role="tablist" aria-label="Order side">
        <button
          type="button"
          role="tab"
          aria-selected={side === "BUY"}
          className={`chip ${side === "BUY" ? "chip--active buy" : ""}`}
          onClick={() => setSide("BUY")}
        >
          Buy
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={side === "SELL"}
          className={`chip ${side === "SELL" ? "chip--active sell" : ""}`}
          onClick={() => setSide("SELL")}
        >
          Sell
        </button>
      </div>

      <div className="order__row">
        <label className="field">
          <span>Symbol</span>
          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="AAPL"
            required
          />
        </label>

        <label className="field">
          <span>Quantity</span>
          <input
            type="number"
            min="1"
            step="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
      </div>

      <div className="order__row">
        <label className="field">
          <span>Type</span>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="MARKET">Market</option>
            <option value="LIMIT">Limit</option>
          </select>
        </label>

        <label className="field">
          <span>Limit Price</span>
          <input
            type="number"
            step="0.01"
            value={limitPrice}
            onChange={(e) => setLimitPrice(e.target.value)}
            placeholder="e.g. 125.50"
            disabled={!canLimit}
            required={canLimit}
          />
        </label>
      </div>

      <button
        type="submit"
        className={`btn btn--primary btn--block ${side === "SELL" ? "btn--danger" : ""}`}
        disabled={!isValid || submitting}
        aria-label={`${side} ${quantity || 0} ${symbol}${type === "LIMIT" ? ` @ ${limitPrice}` : ""}`}
      >
        {submitting ? "Submitting…" : `${side} ${quantity || 0}`}
      </button>
    </form>
  );
}

/* --- helpers --- */
async function safeText(res) {
  try { return await res.text(); } catch { return ""; }
}
async function safeJson(res) {
  try { return await res.json(); } catch { return null; }
}
