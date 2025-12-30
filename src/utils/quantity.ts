export const extractNumericQuantity = (label?: string, fallback = 1): number => {
  if (!label) return fallback;

  const matches = label.match(/\d[\d.,]*/g);
  if (matches) {
    const parsedValues = matches
      .map(value => Number(value.replace(/,/g, "")))
      .filter(value => Number.isFinite(value) && value > 0);

    if (parsedValues.length) {
      return Math.max(...parsedValues);
    }
  }

  return fallback;
};

export const resolveQuantityFromSelection = (
  label?: string,
  denomination?: { amount?: number; quantity?: number },
  fallback = 1
): number => {
  // Prefer explicit numeric fields on the denomination if present
  const denomQuantity = denomination?.quantity ?? denomination?.amount;
  if (typeof denomQuantity === 'number' && Number.isFinite(denomQuantity) && denomQuantity > 0) {
    return denomQuantity;
  }

  // Otherwise parse it from the label (largest number to avoid picking a price)
  const parsed = extractNumericQuantity(label, fallback);
  if (parsed > 0) return parsed;

  return fallback;
};
