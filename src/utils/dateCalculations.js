export function getDateRelativeToNow(date) {
  var d = new Date(date);

  const hourDiff = getHourDifference(d, new Date());
  const dayDiff = getDateDifference(d, new Date());
  const minDiff = getMinuteDifference(d, new Date());

  if (d.getTime() < new Date()) {
    if (minDiff < 1) return "Agora";
    else if (hourDiff < 1) return "há " + minDiff + " min";
    else if (hourDiff < 24)
      return "há " + hourDiff + ` hora${hourDiff > 1 ? "s" : ""}`;
    else if (dayDiff < 7)
      return "há " + dayDiff + ` dia${dayDiff > 1 ? "s" : ""}`;
    else return d.toLocaleDateString("pt-PT").split("T")[0];
  }
}

const getDateDifference = (startDate, endDate) => {
  var diff = endDate.getTime() - startDate.getTime();
  var days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days;
};

const getMinuteDifference = (startDate, endDate) => {
  var diff = endDate.getTime() - startDate.getTime();
  var minutes = Math.floor(diff / (1000 * 60));
  return minutes;
};

const getHourDifference = (startDate, endDate) => {
  var diff = endDate.getTime() - startDate.getTime();
  var hours = Math.floor(diff / (1000 * 60 * 60));
  return hours;
};
