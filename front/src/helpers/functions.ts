export const floatToHoursMinutes = (floatValue: number): string => {
  const hours = Math.floor(floatValue);
  const minutes = Math.round((floatValue - hours) * 60);

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${formattedHours}:${formattedMinutes}`;
};
