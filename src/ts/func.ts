/**
 * Create a smooth deceleration effect.
 * Start quickly and slow down towards the end.
 * 
 * @param progress The progress as a decimal (e.g., 0.75 for 75%).
 */
export function easeOutCubic(progress: number) {
    return 1 - Math.pow(1 - progress, 3)
}

/**
 * get end point with start point, distance, degrees.
 */
export function getEndPoint(start_x: number, start_y: number, distance: number, degrees: number): { end_x: number, end_y: number } {
    const radians = degrees * (Math.PI / 180); // degrees to radians
    const end_x = start_x + distance * Math.cos(radians)
    const end_y = start_y - distance * Math.sin(radians) // y-values are designed to increase as they go up the axis.
    return { end_x, end_y }
}