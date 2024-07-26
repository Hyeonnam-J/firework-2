import { x, y } from './canvas.js';
import { play } from './play.js';
import { ignite } from './processes/initiations/ignite.js';
import { burst } from './processes/explosions/burst.js';

play();

ignite(x(50), y(50), 250, 0, 5, 'yellow', burst);
ignite(x(50), y(0), 250, 90, 5, 'yellow', burst);