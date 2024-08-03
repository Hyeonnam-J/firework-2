import { x, y } from './canvas.js'
import { play } from './play.js'
import { ignite } from './processes/initiations/ignite.js'
import { burst } from './processes/explosions/burst.js'
import { RisingParticle } from './particles/rising_particle.js'
import { getEndPoint } from './func.js'
import { twinkle } from './processes/effects/twinkle.js'

play();

const initiationStartPoint = {
    start_x: x(50),
    start_y: RisingParticle.y
}
const distance = 250
const degrees = 90
const time = 3
const color = 'blue'
const initiationEndPoint = getEndPoint(initiationStartPoint.start_x, initiationStartPoint.start_y, distance, degrees)
const explosionStartPoint = {
    start_x: initiationEndPoint.end_x,
    start_y: initiationEndPoint.end_y
}
ignite(
    initiationStartPoint.start_x, distance, time, color
    , () => burst(
        explosionStartPoint.start_x, explosionStartPoint.start_y, time, color
        , () => twinkle()
    )
)