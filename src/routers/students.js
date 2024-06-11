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

const studentsRouter = Router();

studentsRouter.use('/students/:studentId', validateMongoId('studentId'));

studentsRouter.get('/students', ctrlWrapper(getStudentsController));

studentsRouter.get(
  '/students/:studentId',
  ctrlWrapper(getStudentByIdController),
);

studentsRouter.post(
  '/students',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

studentsRouter.patch(
  '/students/:studentId',
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

studentsRouter.put(
  '/students/:studentId',
  validateBody(createStudentSchema),
  ctrlWrapper(putStudentController),
);

studentsRouter.delete(
  '/students/:studentId',
  ctrlWrapper(deleteStudentByIdController),
);

export default studentsRouter;
