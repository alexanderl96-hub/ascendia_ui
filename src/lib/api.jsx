// // Centralized fetch wrapper (handles JSON + errors)
// const BASE_URL = import.meta?.env?.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

// export async function postJSON(path, body, opts = {}) {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       ...(opts.headers || {}),
//     },
//     body: JSON.stringify(body),
//     credentials: "include", // keep/remove depending if you use cookies
//     signal: opts.signal,
//   });

//   let data = null;
//   const text = await res.text();
//   try { data = text ? JSON.parse(text) : null; } catch { data = text || null; }

//   if (!res.ok) {
//     const msg = (data && (data.message || data.error)) || res.statusText || "Login failed";
//     const error = new Error(msg);
//     error.status = res.status;
//     error.data = data;
//     throw error;
//   }
//   return data;
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
    const msg = (data && (data.message || data.error)) || res.statusText || "Request failed";
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
    const msg = (data && (data.message || data.error)) || res.statusText || "Request failed";
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
