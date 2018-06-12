export function checkInteger(value: number) {
  if (isNaN(value)) {
    return value.toString();
  }

  if ((value | 0) === value) { // tslint:disable-line
    return value.toFixed(2);
  }

  return value.toString();
}
