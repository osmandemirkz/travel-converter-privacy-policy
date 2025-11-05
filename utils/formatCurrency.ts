export function formatCurrencyValue(value: number, currencyCode: string): string {
  if (value === 0) return '0';

  if (currencyCode === 'BTC') {
    if (value < 0.00001) {
      return value.toFixed(8);
    } else if (value < 0.001) {
      return value.toFixed(6);
    } else if (value < 1) {
      return value.toFixed(4);
    }
    return value.toFixed(2);
  }

  if (Math.abs(value) < 0.01) {
    return value.toFixed(4);
  }

  if (Math.abs(value) >= 1000000) {
    return value.toFixed(0);
  }

  return value.toFixed(2);
}

export function shouldUseScientificNotation(value: number): boolean {
  return Math.abs(value) < 0.000001 && value !== 0;
}
