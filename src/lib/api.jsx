

// // Centralized fetch wrapper (handles JSON + errors)
// const BASE_URL =
//   import.meta?.env?.VITE_API_BASE_URL ||
//   process.env.REACT_APP_API_BASE_URL ||
//   "http://localhost:8080"; // <- match your backend port

// function parseBody(text) {
//   try {
//     return text ? JSON.parse(text) : null;
//   } catch {
//     return text || null;
//   }
// }

// export async function getJSON(path, opts = {}) {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     method: "GET",
//     headers: {
//       ...(opts.headers || {}),
//     },
//     credentials: "include",
//     signal: opts.signal,
//   });

//   const text = await res.text();
//   const data = parseBody(text);

//   if (!res.ok) {
//     const msg = (data && (data.message || data.error)) || res.statusText || "Request failed";
//     const error = new Error(msg);
//     error.status = res.status;
//     error.data = data;
//     throw error;
//   }

//   return data;
// }

// export async function postJSON(path, body, opts = {}) {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       ...(opts.headers || {}),
//     },
//     body: JSON.stringify(body),
//     credentials: "include",
//     signal: opts.signal,
//   });

//   const text = await res.text();
//   const data = parseBody(text);

//   if (!res.ok) {
//     const msg = (data && (data.message || data.error)) || res.statusText || "Request failed";
//     const error = new Error(msg);
//     error.status = res.status;
//     error.data = data;
//     throw error;
//   }

//   return data;
// }

// // ✅ Stocks API (reusable everywhere)
// export function getStocks(opts) {
//   return getJSON("/api/stocks", opts);
// }

// export function getStockBySymbol(symbol, opts) {
//   return getJSON(`/api/stocks/${encodeURIComponent(symbol)}`, opts);
// }


// Centralized fetch wrapper (handles JSON + errors)
const BASE_URL =
  import.meta?.env?.VITE_API_BASE_URL ||
  process.env.REACT_APP_API_BASE_URL ||
  "http://localhost:8080"; // <- match your backend port

function parseBody(text) {
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text || null;
  }
}

export async function getJSON(path, opts = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: {
      ...(opts.headers || {}),
    },
    credentials: "include",
    signal: opts.signal,
  });

  const text = await res.text();
  const data = parseBody(text);

  if (!res.ok) {
    const msg =
      (data && (data.message || data.error)) ||
      res.statusText ||
      "Request failed";
    const error = new Error(msg);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export async function postJSON(path, body, opts = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    body: JSON.stringify(body),
    credentials: "include",
    signal: opts.signal,
  });

  const text = await res.text();
  const data = parseBody(text);

  if (!res.ok) {
    const msg =
      (data && (data.message || data.error)) ||
      res.statusText ||
      "Request failed";
    const error = new Error(msg);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

// ✅ Stocks API (reusable everywhere)
export function getStocks(opts) {
  return getJSON("/api/stocks", opts);
}

export function getStockBySymbol(symbol, opts) {
  return getJSON(`/api/stocks/${encodeURIComponent(symbol)}`, opts);
}

/* ===========================
   ✅ Stock Price (Table) API
   Backend:
   - GET /api/stock-price
   - GET /api/stock-price?symbols=AAPL,TSLA,RIVN
   =========================== */

function buildSymbolsQuery(symbols) {
  if (!symbols) return "";

  // accept: "AAPL,TSLA" OR ["AAPL", "TSLA"]
  const list = Array.isArray(symbols)
    ? symbols
    : String(symbols).split(",");

  const cleaned = list
    .map((s) => String(s).trim())
    .filter(Boolean);

  if (cleaned.length === 0) return "";

  // controller supports comma-separated `symbols`
  return `?symbols=${encodeURIComponent(cleaned.join(","))}`;
}

// GET all rows (or filter by symbols)
export function getStockPrices({ symbols } = {}, opts) {
  const qs = buildSymbolsQuery(symbols);
  return getJSON(`/api/stock-price${qs}`, opts);
}

// Convenience: fetch one symbol (returns the first row or null)
export function getStockPriceBySymbol(symbol, opts) {
  return getStockPrices({ symbols: [symbol] }, opts).then(
    (rows) => rows?.[0] ?? null
  );
}
