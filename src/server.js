import http from 'http';
import app from './app.js';

import { initSocket } from './socket.js';

const server = http.createServer(app);
const PORT = 8080;

initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});