import { ctx } from "../canvas.js";
import { easeOutCubic } from "../func.js";

export const particle_arr: Particle[] = [];

export interface Particle {
    update(): void;
    draw(): void;
}

export class BaseParticle implements Particle {
    static readonly width = 20;
    static readonly height = 4;

    time: number;
    start_x: number;
    start_y: number;
    end_x: number;
    end_y: number;
    current_x: number;
    current_y: number;
    angle: number;
    startTime: number;
    progress: number;

    constructor(time: number, start_x: number, start_y: number, end_x: number, end_y: number) {
        this.time = time * 1000; // 화면 구성 편의상 초 단위로 보낸 시간을 밀리초로 전환.
        this.start_x = start_x;
        this.start_y = start_y;
        this.end_x = end_x;
        this.end_y = end_y;
        this.current_x = start_x;
        this.current_y = start_y;
        this.angle = Math.atan2(end_y - start_y, end_x - start_x);
        this.startTime = performance.now();
        this.progress = 0;
    }

    update() {
        this.progress = (performance.now() - this.startTime) / this.time;

        if (this.progress < 1) {
            this.current_x = this.start_x + (this.end_x - this.start_x) * easeOutCubic(this.progress);
            this.current_y = this.start_y + (this.end_y - this.start_y) * easeOutCubic(this.progress);
        } else {
            const deleteIdx = particle_arr.indexOf(this);
            particle_arr.splice(deleteIdx, 1);
        }
    }

    draw() {
        if(ctx != null) {
            ctx.save();

            ctx.translate(this.current_x + BaseParticle.width / 2, this.current_y + BaseParticle.height / 2); // 회전.
            ctx.rotate(this.angle);
            ctx.translate(-(this.current_x + BaseParticle.width / 2), -(this.current_y + BaseParticle.height / 2)); // 복구.

            // ctx.fillStyle = 'yellow';
            ctx.fillStyle = 'white';
            ctx.fillRect(this.current_x, this.current_y, BaseParticle.width, BaseParticle.height);

            ctx.restore();
        }
    }
}

