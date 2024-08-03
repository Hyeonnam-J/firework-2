import { ctx } from "../canvas.js"
import { easeOutCubic } from "../func.js"
import { getEndPoint } from "../func.js"

export const particle_arr: Particle[] = []

export interface Particle {
    update(): void
    draw(): void
}

export class BaseParticle implements Particle {
    static readonly width = 30
    static readonly height = 3
    static readonly head = 1
    static readonly radius = 3

    start_x: number
    start_y: number
    distance: number
    degrees: number
    time: number
    color: string
    callback: () => void

    current_x: number
    current_y: number
    end_x: number
    end_y: number
    startTime: number
    progress: number

    constructor(start_x: number, start_y: number, distance: number, degrees: number, time: number, color: string, callback: () => void) {
        this.start_x = start_x
        this.start_y = start_y
        this.distance = distance
        this.degrees = degrees
        this.time = time * 1000 // 화면 구성 편의상 초 단위로 보낸 시간을 밀리초로 전환.
        this.color = color
        this.callback = callback

        this.current_x = start_x
        this.current_y = start_y

        const end_point = getEndPoint(this.start_x, this.start_y, this.distance, this.degrees)
        this.end_x = end_point.end_x
        this.end_y = end_point.end_y

        this.startTime = performance.now()
        this.progress = 0
    }

    update() {
        this.progress = (performance.now() - this.startTime) / this.time

        if (this.progress < 1) {
            this.current_x = this.start_x + (this.end_x - this.start_x) * easeOutCubic(this.progress)
            this.current_y = this.start_y + (this.end_y - this.start_y) * easeOutCubic(this.progress)
        } else {
            const deleteIdx = particle_arr.indexOf(this)
            particle_arr.splice(deleteIdx, 1)

            this.callback()
        }
    }

    draw() {
        if(ctx != null) {
            ctx.save() // 캔버스 상태 저장. 여기서는 rotate 되기 전의 상태를 저장.

            // Gradient from right to left.
            const gradient = ctx.createLinearGradient(this.current_x + BaseParticle.width, this.current_y + BaseParticle.height / 2, this.current_x, this.current_y + BaseParticle.height / 2)
            gradient.addColorStop(0, this.color)
            gradient.addColorStop(1, 'transparent')
            ctx.fillStyle = gradient

            // Opacity.
            ctx.globalAlpha = 1 - this.progress

            // Rotate.
            ctx.translate(this.current_x + BaseParticle.width / 2, this.current_y + BaseParticle.height / 2) // 그릴 사각형의 중심이 회전의 중심이 되도록 이동.
            ctx.rotate(-(this.degrees * (Math.PI / 180))) // 캔버스를 회전시키면 파티클은 역으로 회전된다. 기준을 우리 시야로 잡기 위해 앞에 -1을 곱함.
            ctx.translate(-(this.current_x + BaseParticle.width / 2), -(this.current_y + BaseParticle.height / 2)) // translate 복구.

            // Fill.
            BaseParticle.createParticle(ctx, this.current_x, this.current_y, BaseParticle.width, BaseParticle.height, BaseParticle.head, BaseParticle.radius)
            ctx.fill()

            ctx.restore() // 캔버스 상태 복구.
        }
    }

    // Drawn with 0 degrees as the reference.
    static createParticle(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, head:number, radius: number) {
        ctx.beginPath()

        ctx.moveTo(x + width - radius, y - head)
        ctx.arcTo(x + width, y - head, x + width, y + radius, radius)
        ctx.lineTo(x + width, y + height - radius)
        ctx.arcTo(x + width, y + height + head, x + width - radius, y + height + head, radius)
        ctx.lineTo(x, y + height)
        ctx.lineTo(x, y)
        
        ctx.closePath()
    }
}

