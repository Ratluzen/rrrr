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
