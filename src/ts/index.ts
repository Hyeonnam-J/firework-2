import { x, y } from './canvas.js';
import { play } from './play.js';
import { shot } from './shot.js';

play();

shot(x(50), y(50), x(50), y(100), 5, 'yellow');