import { BaseParticle } from "./particle.js";
import { y } from "../canvas.js";

export class RisingParticle extends BaseParticle {
    // The risingParticle's y starting point is always zero.
    static y(): number { return y(0); }
}