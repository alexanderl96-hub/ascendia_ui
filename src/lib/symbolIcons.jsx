// Map symbols -> filename base (without extension)
const ALIASES = {
  //level1_mega_bluechip
    AAPL: "APPLE",
    GOOGL: "GOOGL",
    AMZN: "AMZN",
    MSFT: "MSFT",
    NVDA: "NVDA",
    META: "META",
    NFLX: "NFLX",
    DIS: "DIS",
    V: "V",
    JPM: "JPM",
    WMT: "WMT",
    KO: "KO",
    COST: "COST",
    LLY: "LLY",
    XOM: "XOM",
    CVX: "CVX",

  // level2_large_established

  TSLA: "Tesla",
    CRM: "CRM",
    BAC: "BAC",
    PFE: "PFE",
    INTC: "INTC",
    VZ: "VZ",
    T: "T",
    C: "C",
    GE: "GE",
    BA: "BA",
    GM: "GM",
    PYPL: "PYPL",
    BKNG: "BKNG",
    AZO: "AZO",
    MTD: "MTD",
    EQIX: "EQIX",
    TSN: "TSN",
    BMY: "BMY",
    WBA: "WBA",
    K: "K",
    GIS: "GIS",
    HPQ: "HPQ",
    HPE: "HPE",
    TFC: "TFC",
    AA: "AA",
    FCX: "FCX",
    MRO: "MRO",
    OXY: "OXY",
    ADT: "ADT",

 // level3_mid_growth
   SBUX: "SBUX",
    SNAP: "Snapchat",
    UBER: "UBER",
    SOFI: "SOFI",
    PLTR: "PLTR",
    DKNG: "DKNG",
    PINS: "PINS",
    LYFT: "LYFT",
    RIVN: "RIVN",
    LCID: "LCID",
    PARA: "PARA",
    SIRI: "SIRI",
    KHC: "KHC",
    JBLU: "JBLU",
    CCL: "CCL",
    NCLH: "NCLH",
    AAL: "AAL",
    DAL: "DAL",
    LUV: "LUV",
    SABR: "SABR",
    COMP: "COMP",
    HL: "HL",
    INTR: "INTR",
    LESL: "LESL",
    OLPX: "OLPX",
    NEOG: "NEOG",
    HNST: "HNST",
    HP: "HP",
    U: "U",

  // level4_high_volatility
    AMC: "AMC",
    GME: "GME",
    SAVE: "SAVE",
    PLUG: "PLUG",
    SNDL: "SNDL",
    CRON: "CRON",
    ATUS: "ATUS",
    MRNA: "MRNA",

  // americas_latam_canada
     ABEV: "ABEV",   // Brazil
    PBR: "PBR",     // Brazil
    MELI: "MELI",   // LatAm
    PAGS: "PAGS",   // Brazil
    BB: "BB",
  
  // etfs
   JETS: "JETS",
    EWZ: "EWZ",
  
  // non_americas_optional
   NIO: "NIO",
    NOK: "NOK",
    ASML: "ASML",
    SAN: "SAN",
    LYG: "LYG",
    MLCO: "MLCO",
    XPEV: "XPEV",


  // SNAP: "Snapchat",
  // ABEV: "ABEV",
  // SBUX: "SBUX",
  // F: "F",
  // NIO: "NIO",
  // AAL: "AAL",
  // PLUG: "PLUG",
  // NOK: "NOK",
  // PARA: "PARA",
  // PBR: "PBR",
  // JBLU: "JBLU",
  // RIVN: "RIVN",
  // CCL: "CCL",
  // SOFI: "SOFI",

  // DKNG: "DKNG",
  // LYFT: "LYFT",
  // SIRI: "SIRI",
  // KHC: "KHC",
  // NCLH: "NCLH",
  // HPQ: "HPQ",
  // TFC: "TFC",
  // PINS: "PINS",
  // U: "U",
  // LCID: "LCID",
  // XPEV: "XPEV",
  // HPE: "HPE",
  // BMY: "BMY",
  // AA: "AA",
  // ASML: "ASML",
  // EQIX: "EQIX",
  // MELI: "MELI",
  // BKNG: "BKNG",
  // AZO: "AZO",
  // MTD: "MTD",
  // WBA: "WBA",
  // K: "K",
  // GIS: "GIS",
  // C: "C",
  // AMC: "AMC",
  // GME: "GME",
  // LUV: "LUV",
  // SAVE: "SAVE",
  // UBER: "UBER",
  // GM: "GM",
  // MRNA: "MRNA",
  // FCX: "FCX",
  // MRO: "MRO",
  // OXY: "OXY",
  // DAL: "DAL",
  // JETS: "JETS",
  // PYPL: "PYPL",
  // HP: "HP",
  // TSN: "TSN",
  // EWZ: "EWZ",
  // SNDL: "SNDL",
  // CRON: "CRON",
  // PLTR: "PLTR",
  // BB: "BB",
  // PAGS: "PAGS",
  // ADT: "ADT",
  // SAN: "SAN",
  // COMP: "COMP",
  // HL: "HL",
  // INTR: "INTR",
  // LESL: "LESL",
  // OLPX: "OLPX",
  // NEOG: "NEOG",
  // HNST: "HNST",
  // MLCO: "MLCO",
  // LYG: "LYG",
  // SABR: "SABR",
  // ATUS: "ATUS"

};

// CRA/Webpack: load every image in src/assets_image
const req = require.context(
  "../assets_image",
  false,
  /\.(png|jpg|jpe?g|gif|webp|svg)$/i
);

const ICONS_BY_NAME = {};

// Build: { "APPLE": "url...", "GOOGL": "url..." }
req.keys().forEach((key) => {
  // key like "./Apple.svg.png" or "./GOOGL.png"
  const file = key.replace("./", "");     // "Apple.svg.png"
  const base = file.split(".")[0];        // "Apple" (handles ".svg.png" too)
  ICONS_BY_NAME[base.toUpperCase()] = req(key);
});

export function getSymbolIcon(symbol) {
  if (!symbol) return "";
  const sym = String(symbol).toUpperCase();

  // if symbol has an alias, use it; else use symbol itself
  const nameKey = (ALIASES[sym] || sym).toUpperCase();

  return ICONS_BY_NAME[nameKey] || "";
}
