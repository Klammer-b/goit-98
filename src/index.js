import { initMongoConnection } from './db/initMongoConnection.js';
import { startServer } from './server.js';

(async () => {
  await initMongoConnection();
  startServer();
})();
