export const formatPrice = (value: number | null): string => {
  if (value === null) {
    return "";
  }
  return value.toLocaleString("vi-VN");
};
