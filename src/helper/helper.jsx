export function formatNumber(num) {
  if (num == null || !isFinite(num)) return "";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

export function scrollToTopAndStart({ setOpenType, delay = 150 } = {}) {
  if (typeof window === "undefined") return;

  window.scrollTo({ top: 0, behavior: "smooth" });

  setTimeout(() => {
    if (typeof setOpenType === "function") setOpenType(true);
  }, delay);
}
