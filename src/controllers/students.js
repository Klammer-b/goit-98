import { getAllStudents, getStudentById } from '../services/students.js';

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
