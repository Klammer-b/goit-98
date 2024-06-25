import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { startServer } from './server.js';
import { createFolderIfDoesNotExist } from './utils/createFolderIfDoesNotExist.js';

(async () => {
  await initMongoConnection();
  await createFolderIfDoesNotExist(TEMP_UPLOAD_DIR);
  await createFolderIfDoesNotExist(UPLOAD_DIR);
  startServer();
})();
