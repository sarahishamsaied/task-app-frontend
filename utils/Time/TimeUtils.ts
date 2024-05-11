import { Moment } from "moment";
export function formatTimeDiff({
  days,
  hours,
  minutes,
}: {
  days: number;
  hours: number;
  minutes: number;
}) {
  let returnedStr = "";
  if (days > 0) {
    returnedStr += `${days}d `;
  }
  if (hours > 0) {
    returnedStr += `${hours}h `;
  }
  if (minutes > 0) {
    returnedStr += `${minutes}m `;
  }

  return returnedStr;
}

export const formatDay = (date: Moment) => {
  return date.format("MMM DD, YYYY");
};
export const getTimeDiff = (startDate: Moment, endDate: Moment) => {
  // get time diff if hours, days, mins
  const diff = endDate.diff(startDate, "minutes");
  const days = Math.floor(diff / 1440);
  const hours = Math.floor((diff % 1440) / 60);
  const minutes = diff % 60;
  return formatTimeDiff({ days, hours, minutes });
};
export const hour12Format = (date: Moment) => {
  return date.format("hh:mm A");
};
