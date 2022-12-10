const vietnamCurrency = Intl.NumberFormat("en-US");

export default function convertToFormatCurrency(text, suffix) {
  let num = Number(text).toFixed(2);
  if (suffix === "đ") num = Math.round(num);
  if (text || text === 0)
    return `${suffix || ""}${vietnamCurrency.format(num)}`;
  return "";
}
