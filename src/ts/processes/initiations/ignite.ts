import { Particle, particle_arr } from "../../particles/particle.js"
import { RisingParticle } from "../../particles/rising_particle.js"

/**
 * Ignite a rising particle.
 * 
 * @param start_x The starting x-coordinate.
 * @param time Duration in seconds.
 * @param callback The function to call once the particle reaches its end point.
 * 
 * Note: The y-coordinate is fixed in the RisingParticle class and does not need to be passed as a parameter.
 */
export function ignite(start_x: number, distance: number, time: number, color: string, callback: () => void) {
    const risingParticle: Particle = new RisingParticle(start_x, distance, time, color, callback)
    particle_arr.push(risingParticle)
}