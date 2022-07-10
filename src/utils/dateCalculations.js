export function getMonthDifference(startDate, endDate) {
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
  );
}

export function getDatePlusMonths(date, months) {
  var d = date;
  d.setMonth(d.getMonth() + months);
  return d;
}
