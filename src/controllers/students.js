import {
  createStudent,
  deleteStudentById,
  getAllStudents,
  getStudentById,
  upsertStudent,
} from '../services/students.js';

export const getStudentsController = async (req, res) => {
  const students = await getAllStudents();

  res.json({
    status: 200,
    message: 'Successfully get all students!',
    data: students,
  });
};

export const getStudentByIdController = async (req, res) => {
  const id = req.params.studentId;

  const student = await getStudentById(id);

  res.json({
    status: 200,
    message: `Successfully get student with id ${id}!`,
    data: student,
  });
};

export const createStudentController = async (req, res) => {
  const { body } = req;
  const student = await createStudent(body);

  res.status(201).json({
    status: 201,
    message: `Successfully created student!`,
    data: student,
  });
};

export const patchStudentController = async (req, res) => {
  const { body } = req;
  const { studentId } = req.params;
  const { student } = await upsertStudent(studentId, body);

  res.status(200).json({
    status: 200,
    message: `Successfully patched student!`,
    data: student,
  });
};

export const putStudentController = async (req, res) => {
  const { body } = req;
  const { studentId } = req.params;
  const { isNew, student } = await upsertStudent(studentId, body, {
    upsert: true,
  });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted student!`,
    data: student,
  });
};

export const deleteStudentByIdController = async (req, res) => {
  const id = req.params.studentId;
  await deleteStudentById(id);

  res.status(204).send();
};
