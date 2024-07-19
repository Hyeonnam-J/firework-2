export const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

export function x(percentage: number) : number {
    return Math.floor( canvas.width * (percentage / 100) );
}

export function y(percentage: number) : number {
    return Math.floor( canvas.height * (percentage / 100) );
}