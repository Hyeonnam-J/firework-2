import { Particle, particle_arr } from "../../particles/particle.js";
import { RisingParticle } from "../../particles/rising_particle.js";

/**
 * 
 * @param time Duration in seconds.
 */
export function ignite(start_x: number, start_y: number, end_x: number, end_y: number, time: number, color: string) {
    const particle: Particle = new RisingParticle(start_x, start_y, end_x, end_y, time, color);
    particle_arr.push(particle);
}