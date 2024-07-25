import { Particle, particle_arr } from "../../particles/particle.js";
import { RisingParticle } from "../../particles/rising_particle.js";

/**
 * 
 * @param time Duration in seconds.
 */
export function ignite(start_x: number, start_y: number, distance: number, degrees: number, time: number, color: string, callback: () => void) {
    const particle: Particle = new RisingParticle(start_x, start_y, distance, degrees, time, color, callback);
    particle_arr.push(particle);
}