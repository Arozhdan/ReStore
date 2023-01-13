export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}
export function formatCurrency(value: number) {
  return "$" + (value / 100).toFixed(2);
}
