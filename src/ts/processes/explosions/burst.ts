import { ExplodingParticle } from "../../particles/exploding_particle.js"
import { Particle, particle_arr } from "../../particles/particle.js"

export function burst(start_x: number, start_y: number, time: number, color: string, callback: () => void) {
    const _particle_arr: Particle[] = []
    for(let i = 0; i < 4; i++) {
        const explodingParticle: Particle = new ExplodingParticle(start_x, start_y, i * 90, time, color, callback)
        _particle_arr.push(explodingParticle)
    }

    particle_arr.push(..._particle_arr)
}