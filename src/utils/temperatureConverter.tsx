export const KelvinToCelsius = (k: number): string => {
  return `${(k - 273.15).toFixed(2)}\u00B0C`;
};
