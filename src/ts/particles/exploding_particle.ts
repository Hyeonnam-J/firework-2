import { BaseParticle } from "./particle.js"

export class ExplodingParticle extends BaseParticle {
    static readonly distance = 250

    constructor(start_x: number, start_y: number, degrees: number, time: number, color: string, callback: () => void) {
        super(start_x, start_y, ExplodingParticle.distance, degrees, time, color, callback)
    }
}