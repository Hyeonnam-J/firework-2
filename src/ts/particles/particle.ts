import { ctx } from "../canvas.js"
import { easeOutCubic } from "../func.js"
import { getEndPoint } from "../func.js"

export const particle_arr: Particle[] = []

export interface Particle {
    update(): void
    draw(): void
}

// degrees는 개발자 편의상 파티클 초기 방향을 설정할 때 사용되며
export class BaseParticle implements Particle {
    static readonly width = 30
    static readonly height = 3
    static readonly head = 1
    static readonly radius = 3

    static readonly gravity = 0.5

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
    radians: number
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

        // Degrees to radians.
        // When the canvas is rotated, the particles rotate in the opposite direction. To align the reference frame with our view, we multiply by -1.
        this.radians = -(this.degrees * (Math.PI / 180))

        this.startTime = performance.now()
        this.progress = 0
    }

    update() {
        this.progress = (performance.now() - this.startTime) / this.time

        if (this.progress < 1) {
            // Update radians based on the current position and the dynamically changing end position.
            // The value of end_y is continuously updated due to the effects of gravity, 
            // so the radians needs to be recalculated to reflect the new trajectory.
            this.end_y += BaseParticle.gravity
            this.radians = Math.atan2(this.end_y - this.current_y, this.end_x - this.current_x)

            this.current_x = this.start_x + (this.end_x - this.start_x) * easeOutCubic(this.progress)
            this.current_y = this.start_y + (this.end_y - this.start_y) * easeOutCubic(this.progress)

            this.draw()
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
            ctx.rotate(this.radians)
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

