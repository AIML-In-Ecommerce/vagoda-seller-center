//Get the previous week date range (in textual format)
export const getPreviousWeekDateRange = () => {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); 
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23,59,59,59);

  // Format the dates for display
  const startDateFormatted = formatDate(startDate);
  const endDateFormatted = formatDate(endDate);

  // Return the formatted date range
  return `${startDateFormatted} - ${endDateFormatted}`;
};

export const getPreviousWeekDateRange_2 = () => {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
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

//hh:mm:ss
export const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}