import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { getAllStudents, getStudentById } from './services/students.js';

export const startServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.get('/students', async (req, res) => {
    const students = await getAllStudents();
    res.json({
      status: 200,
      message: 'Successfully get all students!',
      data: students,
    });
  });

  app.get('/students/:studentId', async (req, res) => {
    const id = req.params.studentId;
    const student = await getStudentById(id);

    if (!student) {
      return res.status(404).json({
        status: 404,
        message: `Student with id ${id} not found!`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully get student with id ${id}!`,
      data: student,
    });
  });

  app.use(notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};
