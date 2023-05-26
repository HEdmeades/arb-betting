// https://github.com/lodash/lodash/blob/master/.internal/createRound.js
function round(number, precision) {
  precision = precision == null ? 0 : precision >= 0 ? Math.min(precision, 292) : Math.max(precision, -292);
  if (precision) {
    // Shift with exponential notation to avoid floating-point issues.
    // See [MDN](https://mdn.io/round#Examples) for more details.
    let pair = `${number}e`.split("e");
    const value = Math.round(`${pair[0]}e${+pair[1] + precision}`);

    pair = `${value}e`.split("e");
    return +`${pair[0]}e${+pair[1] - precision}`;
  }
  return Math.round(number);
}

export default round;