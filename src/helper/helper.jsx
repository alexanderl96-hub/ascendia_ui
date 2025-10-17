export function formatNumber(num) {
  if (num == null || !isFinite(num)) return "";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}
