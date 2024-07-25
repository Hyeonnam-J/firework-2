import { ctx } from "../canvas.js";
import { easeOutCubic } from "../func.js";
import { getEndPoint } from "../func.js";

export const particle_arr: Particle[] = [];

export interface Particle {
    update(): void;
    draw(): void;
}

export class BaseParticle implements Particle {
    static readonly width = 2;
    static readonly height = 30;
    static readonly head = 1;
    static readonly radius = 2;

    start_x: number;
    start_y: number;
    distance: number;
    degrees: number;
    time: number;
    color: string;
    callback: () => void;

    current_x: number;
    current_y: number;
    end_x: number;
    end_y: number;
    startTime: number;
    progress: number;

    constructor(start_x: number, start_y: number, distance: number, degrees: number, time: number, color: string, callback: () => void) {
        this.start_x = start_x;
        this.start_y = start_y;
        this.distance = distance;
        this.degrees = degrees;
        this.time = time * 1000; // 화면 구성 편의상 초 단위로 보낸 시간을 밀리초로 전환.
        this.color = color;
        this.callback = callback;

        this.current_x = start_x;
        this.current_y = start_y;

        const end_point = getEndPoint(this.start_x, this.start_y, this.distance, this.degrees);
        this.end_x = end_point.end_x;
        this.end_y = end_point.end_y;

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

            this.callback();
        }
    }

    draw() {
        if(ctx != null) {
            ctx.save(); // 캔버스 상태 저장. 여기서는 rotate 되기 전의 상태를 저장.

            // Creating a gradient with 90 degrees as the reference.
            const gradient = ctx.createLinearGradient(this.current_x, this.current_y, this.current_x + BaseParticle.width, this.current_y + BaseParticle.height);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;

            // opacity.
            ctx.globalAlpha = 1 - this.progress;

            // rotate.
            ctx.translate(this.current_x + BaseParticle.width / 2, this.current_y + BaseParticle.height / 2); // 그릴 사각형의 중심이 회전의 중심이 되도록 이동.
            // 물체를 90도 기준으로 그렸기 때문에 다 그렸으면 물체를 다시 -90도 돌려야 한다.
            // 캔버스를 90도 돌림으로 물체를 -90도 돌린 효과를 준다.
            // 90 degrees == 1.57 radians.
            ctx.rotate(this.degrees * (Math.PI / 180) + 1.57);
            ctx.translate(-(this.current_x + BaseParticle.width / 2), -(this.current_y + BaseParticle.height / 2)); // translate 복구.

            // fill.
            BaseParticle.createParticle(ctx, this.current_x, this.current_y, BaseParticle.width, BaseParticle.height, BaseParticle.head, BaseParticle.radius);
            ctx.fill();

            ctx.restore(); // 캔버스 상태 복구.
        }
    }

    // Drawn with 90 degrees as the reference.
    static createParticle(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, head:number, radius: number) {
        ctx.beginPath();

        ctx.moveTo(x - head + radius, y);
        ctx.lineTo(x + width + head - radius, y);
        ctx.arcTo(x + width + head, y, x + width + head, y + radius, radius);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x - head, y + radius);
        ctx.arcTo(x - head, y, x - head + radius, y, radius);

        ctx.closePath();
    }
}

