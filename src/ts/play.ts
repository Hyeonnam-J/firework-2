import { canvas, ctx } from "./canvas.js"
import { particle_arr } from "./particles/particle.js"

export function play() {
    if(ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)

    particle_arr.forEach(p => { p.update() })

    // 불꽃놀이가 진행되는 한 애니메이션은 계속 호출되어야 한다.
    requestAnimationFrame(play)

    console.log('particle_arr length -> ', particle_arr.length)
}