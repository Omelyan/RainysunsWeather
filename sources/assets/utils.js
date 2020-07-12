// eslint-disable-next-line import/prefer-default-export
export function dateToWeekDay(date) {
  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  if (date instanceof Date === false) return '';
  return weekDays[date.getDay()];
}
