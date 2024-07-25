import { x, y } from './canvas.js';
import { play } from './play.js';
import { ignite } from './processes/initiations/ignite.js';

play();

ignite(x(50), y(50), x(50), y(100), 5, 'yellow');