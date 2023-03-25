export default function changeFromPercentage(percentage, css) {
  return Number.parseInt(percentage) >= 50
    ? `${css.list} ${css.green}`
    : `${css.list} ${css.red}`;
}
