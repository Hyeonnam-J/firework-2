export const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
canvas.width = window.innerWidth
canvas.height = window.innerHeight

export const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')

/**
 * 
 * @param percentage The percentage of the canvas value (e.g., 75 for 75%).
 * @returns The corresponding pixel value.
 */
export function x(percentage: number) : number {
    return Math.floor( canvas.width * (percentage / 100) )
}

export function y(percentage: number) : number {
    return canvas.height - Math.floor( canvas.height * (percentage / 100) ) // Set the baseline using the bottom.
}