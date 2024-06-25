import { Router } from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import {
  loginUserController,
  logoutController,
  refreshTokenController,
  registerUserController,
  resetPasswordController,
  sendResetPasswordEmailController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';
import { loginUserSchema } from '../validation/loginSchemaValidator.js';
import { sendResetPasswordSchema } from '../validation/sendResetPasswordEmailSchema.js';
import { resetPasswordSchema } from '../validation/resetPasswordSchema.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/refresh-token', ctrlWrapper(refreshTokenController));

authRouter.post('/logout', ctrlWrapper(logoutController));

authRouter.post(
  '/request-reset-password-email',
  validateBody(sendResetPasswordSchema),
  ctrlWrapper(sendResetPasswordEmailController),
);

authRouter.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default authRouter;
