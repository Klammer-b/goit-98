import { Router } from 'express';
import {
  createStudentController,
  deleteStudentByIdController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  putStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createStudentSchema } from '../validation/createStudentSchema.js';
import { updateStudentSchema } from '../validation/updateStudentSchema.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkChildPermissions } from '../middlewares/checkRoles.js';
import { upload } from '../middlewares/upload.js';

const studentsRouter = Router();

studentsRouter.use('/:studentId', validateMongoId('studentId'));

studentsRouter.use('/', authenticate);

studentsRouter.get('/', ctrlWrapper(getStudentsController));

studentsRouter.get('/:studentId', ctrlWrapper(getStudentByIdController));

studentsRouter.post(
  '/',
  upload.single('avatar'),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

studentsRouter.patch(
  '/:studentId',
  checkChildPermissions('teacher', 'parent'),
  upload.single('avatar'),
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

studentsRouter.put(
  '/:studentId',
  upload.single('avatar'),
  validateBody(createStudentSchema),
  ctrlWrapper(putStudentController),
);

studentsRouter.delete('/:studentId', ctrlWrapper(deleteStudentByIdController));

export default studentsRouter;
