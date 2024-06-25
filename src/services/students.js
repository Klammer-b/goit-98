import createHttpError from 'http-errors';
import { Student } from '../db/models/student.js';
import { saveFile } from '../utils/saveFile.js';

const createPaginationInformation = (page, perPage, count) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getAllStudents = async ({
  page = 1,
  perPage = 5,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
  userId,
}) => {
  const skip = perPage * (page - 1);

  const studentsFilters = Student.find();

  if (filter.minAge) {
    studentsFilters.where('age').gte(filter.minAge);
  }

  if (filter.maxAge) {
    studentsFilters.where('age').lte(filter.maxAge);
  }

  if (filter.minAvgMark) {
    studentsFilters.where('avgMark').gte(filter.minAvgMark);
  }
  if (filter.maxAverageMark) {
    studentsFilters.where('avgMark').lte(filter.maxAverageMark);
  }
  if (filter.gender) {
    studentsFilters.where('gender').equals(filter.gender);
  }
  if (typeof filter.onDuty === 'boolean') {
    studentsFilters.where('onDuty').equals(filter.onDuty);
  }

  studentsFilters.where('parentId').equals(userId);

  const [studentsCount, students] = await Promise.all([
    Student.find().merge(studentsFilters).countDocuments(),
    Student.find()
      .merge(studentsFilters)
      .skip(skip)
      .limit(perPage)
      .sort({
        [sortBy]: sortOrder,
      })
      .exec(),
  ]);

  const paginationInformation = createPaginationInformation(
    page,
    perPage,
    studentsCount,
  );

  return {
    students,
    ...paginationInformation,
  };
};

export const getStudentById = async (id) => {
  const student = await Student.findById(id);

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  return student;
};

export const createStudent = async ({ avatar, ...payload }, userId) => {
  const url = await saveFile(avatar);

  const student = await Student.create({
    ...payload,
    parentId: userId,
    avatarUrl: url,
  });

  return student;
};

export const upsertStudent = async (
  id,
  { avatar, ...payload },
  options = {},
) => {
  const url = await saveFile(avatar);

  const rawResult = await Student.findByIdAndUpdate(
    id,
    { ...payload, avatarUrl: url },
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) {
    throw createHttpError(404, 'Student not found');
  }

  return {
    student: rawResult.value,
    isNew: !rawResult?.lastErrorObject?.updatedExisting,
  };
};

export const deleteStudentById = async (studentId) => {
  await Student.findByIdAndDelete(studentId);
};
