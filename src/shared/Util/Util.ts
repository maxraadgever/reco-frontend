export const formatEuro = function(number: number | string) {
  if (number === 0) return number;
  if (typeof number === "string") number = parseFloat(number);
  return formatThousands(number.toFixed(0));
};

export const formatThousands = function(number: number | string) {
  if (number === 0) return number;
  if (number === null) return 0;
  var parts = number.toString().split(".");
  if (parts.length === 2) {
    parts[1] = parts[1].substring(0, 2);
  }
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
};

export function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}
