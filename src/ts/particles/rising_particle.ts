import { BaseParticle } from "./particle.js"
import { y } from "../canvas.js"

export class RisingParticle extends BaseParticle {
    static readonly y: number = y(0)
    static readonly degrees: number = 90

    constructor(start_x: number, distance: number, time: number, color: string, callback: () => void) {
        super(start_x, RisingParticle.y, distance, RisingParticle.degrees, time, color, callback)
    }
}