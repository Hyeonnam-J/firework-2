import { x, y } from './canvas.js';
import { play } from './play.js';
import { shot } from './shot.js';

play();

// shot(5, x(50), y(50), x(100), y(0));
// shot(5, x(50), y(50), x(100), y(50));
// shot(5, x(50), y(50), x(100), y(100));

// shot(5, x(50), y(50), x(0), y(0));
// shot(5, x(50), y(50), x(0), y(50));
// shot(5, x(50), y(50), x(0), y(100));

shot(5, x(50), y(50), x(50), y(100));
// shot(5, x(50), y(50), x(50), y(0));