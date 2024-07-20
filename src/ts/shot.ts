import { Particle, particle_arr } from "./particle/particle.js";
import { RisingParticle } from "./particle/rising_particle.js";

/**
 * 
 * @param time Duration in seconds.
 */
export function shot(time: number, start_x: number, start_y: number, end_x: number, end_y: number) {
    const particle: Particle = new RisingParticle(time, start_x, start_y, end_x, end_y);
    particle_arr.push(particle);
}