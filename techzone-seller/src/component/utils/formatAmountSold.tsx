export const formatAmountSold = (value: number | null): string => {
  if (value === null) {
    return "";
  }
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "tr";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(0) + "k";
  } else {
    return value.toString();
  }
};
