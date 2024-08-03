import { BaseParticle } from "./particle.js"
import { y } from "../canvas.js"

export class RisingParticle extends BaseParticle {
    static readonly y: number = y(0)
    static readonly degrees: number = 90

    constructor(start_x: number, distance: number, time: number, color: string, callback: () => void) {
        const start_y = RisingParticle.y
        const degrees = RisingParticle.degrees

        super(start_x, start_y, distance, degrees, time, color, callback)
    }
}