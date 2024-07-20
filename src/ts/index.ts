import { x, y } from './canvas.js';
import { play } from './play.js';
import { shot } from './shot.js';

play();

shot(5, x(50), y(0), x(0), y(50));