import { OAuth2Client } from 'google-auth-library';
import fs from 'node:fs';
import path from 'node:path';
import { env } from './env.js';
import { ENV_VARS } from '../constants/index.js';
import createHttpError from 'http-errors';

const googleConfig = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'google.json')).toString(),
);

const client = new OAuth2Client({
  clientId: env(ENV_VARS.GOOGLE_CLIENT_ID),
  clientSecret: env(ENV_VARS.GOOGLE_CLIENT_SECRET),
  project_id: googleConfig.web.project_id,
  redirectUri: googleConfig.web.redirect_uris[0],
});

export const generateOAuthURL = () => {
  return client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
};

export const validateGoogleOAuthCode = async (code) => {
  try {
    const { tokens } = await client.getToken(code);

    const idToken = tokens.id_token;

    if (!idToken) throw createHttpError(401);

    const ticket = await client.verifyIdToken({ idToken });

    return ticket.getPayload();
  } catch (err) {
    console.log(err);
    throw createHttpError(500, 'Error during google oauth authorization');
  }
};
