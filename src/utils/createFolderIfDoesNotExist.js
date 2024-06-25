import fs from 'node:fs/promises';

export const createFolderIfDoesNotExist = async (path) => {
  try {
    await fs.access(path);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(path);
    }
  }
};
