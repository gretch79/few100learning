export function formatName(first: string, last: string, fn: (x: string) => string) {
    return fn(`${last}, ${first}`);
}

export function roundToTwoPlaces(amount: number) {
    return Math.round(amount * 100) / 100;
}