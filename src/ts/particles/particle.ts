import { ctx } from "../canvas.js";
import { easeOutCubic } from "../func.js";

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
    end_x: number;
    end_y: number;
    time: number;
    color: string;
    callback: () => void;

    current_x: number;
    current_y: number;
    angle: number;
    startTime: number;
    progress: number;

    constructor(start_x: number, start_y: number, end_x: number, end_y: number, time: number, color: string, callback: () => void) {
        this.start_x = start_x;
        this.start_y = start_y;
        this.end_x = end_x;
        this.end_y = end_y;
        this.time = time * 1000; // 화면 구성 편의상 초 단위로 보낸 시간을 밀리초로 전환.
        this.color = color;
        this.callback = callback;

        this.current_x = start_x;
        this.current_y = start_y;

        // 전통적인 수학 좌표계와 다르게 javascript canvas 좌표계는 y축이 아래를 향할수록 증가한다.
        // atan2 메서드는 이를 고려하여 라디안 값을 반환.
        // 그러나 불꽃놀이 프로젝트 편의상 y값이 축 위를 향할수록 증가하도록 설계했기 때문에,
        // atan2 파라미터로 보내는 y의 길이는 시작점에서 끝점을 뺀다. - end_y - start_y.
        //
        // 또 불꽃놀이 프로젝트 편의상 위로 솟는 방향을 0도로 설계해서 
        // 90도, 즉 라디안 1.57을 빼준다.
        this.angle = Math.atan2(start_y - end_y, end_x - start_x) - 1.57;

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

            // color.
            ctx.fillStyle = this.color;

            // gradient.
            const gradient = ctx.createLinearGradient(this.current_x, this.current_y, this.current_x + BaseParticle.width, this.current_y + BaseParticle.height);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;

            // opacity.
            ctx.globalAlpha = 1 - this.progress;

            // rotate.
            ctx.translate(this.current_x + BaseParticle.width / 2, this.current_y + BaseParticle.height / 2); // 그릴 사각형의 중심이 회전의 중심이 되도록 이동.
            ctx.rotate(this.angle);
            ctx.translate(-(this.current_x + BaseParticle.width / 2), -(this.current_y + BaseParticle.height / 2)); // translate 복구.

            // fill.
            // ctx.fillRect(this.current_x, this.current_y, BaseParticle.width, BaseParticle.height);
            BaseParticle.createParticle(ctx, this.current_x, this.current_y, BaseParticle.width, BaseParticle.height, BaseParticle.head, BaseParticle.radius);
            ctx.fill();

            ctx.restore(); // 캔버스 상태 복구.
        }
    }

    static createParticle(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, head:number, radius: number) {
        ctx.beginPath();

        // + head,
        // ctx.moveTo(x - head, y);
        // ctx.lineTo(x + width + head, y);
        // ctx.lineTo(x + width, y + height);
        // ctx.lineTo(x, y + height);
        // ctx.lineTo(x - head, y);

        // + head, radius
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

