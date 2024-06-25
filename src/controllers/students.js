import {
  createStudent,
  deleteStudentById,
  getAllStudents,
  getStudentById,
  upsertStudent,
} from '../services/students.js';
import { parseFilters } from '../utils/parseFilters.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getStudentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = req.query;
  const filter = parseFilters(req.query);

  const students = await getAllStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

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
  const { body, file } = req;
  const student = await createStudent({ ...body, avatar: file }, req.user._id);

  res.status(201).json({
    status: 201,
    message: `Successfully created student!`,
    data: student,
  });
};

export const patchStudentController = async (req, res) => {
  const { body, file } = req;
  const { studentId } = req.params;
  const { student } = await upsertStudent(studentId, { ...body, avatar: file });

  res.status(200).json({
    status: 200,
    message: `Successfully patched student!`,
    data: student,
  });
};

export const putStudentController = async (req, res) => {
  const { body, file } = req;
  const { studentId } = req.params;
  const { isNew, student } = await upsertStudent(
    studentId,
    { ...body, avatar: file },
    {
      upsert: true,
    },
  );

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
