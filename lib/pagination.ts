export function getValidPageNumber(
  value: string | string[] | undefined,
): number {
  const firstValue = Array.isArray(value) ? value[0] : value;
  const page = Number(firstValue);

  return Number.isInteger(page) && page >= 1 && page <= 500 ? page : 1;
}
