export const roundAvergeRate = (average: number) => {
  const whole = Math.floor(average);

  const fractional = average - whole;

  if (fractional < 0.5) {
    return whole;
  } else if (fractional >= 0.5 && fractional < 1.0) {
    return whole + 0.5;
  } else {
    return average;
  }
};
