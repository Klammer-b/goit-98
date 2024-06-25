import fs from 'node:fs/promises';
import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';
import { ENV_VARS } from '../constants/index.js';

cloudinary.config({
  cloud_name: env(ENV_VARS.CLOUDINARY_NAME),
  api_key: env(ENV_VARS.CLOUDINARY_API_KEY),
  api_secret: env(ENV_VARS.CLOUDINARY_API_SECRET),
});

export const saveToCloudinary = async (file) => {
  const res = await cloudinary.uploader.upload(file.path);
  await fs.unlink(file.path);

  return res.secure_url;
};
