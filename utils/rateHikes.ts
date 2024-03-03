export function add20Percent(rate: number) {
    const increase = rate * 0.2; // Calculate 20% of the rate
    const result = rate + increase; // Add the increase to the original number
    return result.toFixed(5).toString();
}
