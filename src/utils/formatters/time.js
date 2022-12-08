export const secondsToElapsedTimeFormat = (number) => {
  let minutes =
    Math.floor(number / 60).toString().length > 1
      ? Math.floor(number / 60)
      : '0' + Math.floor(number / 60);

  let seconds =
    number.toString().length > 1
      ? Math.round(number % 60)
      : '0' + Math.round(number % 60);

  return `${minutes}:${seconds}`;
};
