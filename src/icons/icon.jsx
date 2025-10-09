import React from "react";

/**
 * Usage: <Icon name="home" />
 * Colors inherit from CSS (currentColor). Size via props or CSS.
 */
export default function Icon({ name, size = 22, stroke = 1.8, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
    focusable: "false",
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 10.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9.5" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="M7 15l4-6 3 3 5-7" />
        </svg>
      );
    case "bag":
      return (
        <svg {...common}>
          <path d="M6 8h12l1.2 10.2A2 2 0 0 1 17.21 20H6.79A2 2 0 0 1 4.8 18.2L6 8Z" />
          <path d="M9 8V6a3 3 0 1 1 6 0v2" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M6 10a6 6 0 0 1 12 0v4l2 2H4l2-2v-4Z" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <path d="M3 6h18v12H3z" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="m15.5 8.5-3 7-7 3 3-7 7-3Z" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M8 2v4M16 2v4M3 10h18" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
          <path d="M14 3v6h6" />
          <path d="M9 13h6M9 17h6" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common}>
          <path d="M20.59 13.41 12 22 2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z" />
          <circle cx="7.5" cy="7.5" r="1.5" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="m19.4 15-1.1 1.9a2 2 0 0 1-1.7 1l-1.8-.2-1.2 1.4a2 2 0 0 1-2.9 0L8.6 17.7l-1.8.2a2 2 0 0 1-1.7-1L4 15l-1.4-1a2 2 0 0 1 0-3L4 10 4.9 8.1a2 2 0 0 1 1.7-1l1.8.2 1.2-1.4a2 2 0 0 1 2.9 0l1.2 1.4 1.8-.2a2 2 0 0 1 1.7 1L19.4 10l1.4 1a2 2 0 0 1 0 3l-1.4 1Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}
