/**
 * Create a smooth deceleration effect.
 * Start quickly and slow down towards the end.
 * 
 * @param progress The progress as a decimal (e.g., 0.75 for 75%).
 */
export function easeOutCubic(progress: number) {
    return 1 - Math.pow(1 - progress, 3);
}