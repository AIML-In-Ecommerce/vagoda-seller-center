//Get the previous week date range (in textual format)
export const getPreviousWeekDateRange = (isFromToday: boolean = false) => {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtract 6 days
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23,59,59,59);

  // Format dates as "dd/mm/yyyy"
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return `${formattedStartDate} - ${formattedEndDate}`;
};

export const getPreviousWeekDateRange_2 = () => {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtract 6 days
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23,59,59,59);

  return [startDate, endDate];
};

//To dd/mm/yyyy format
export const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};