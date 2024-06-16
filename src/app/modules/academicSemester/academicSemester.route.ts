import express, { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from '../student/student.validation';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';





const router = express.Router();

router.post('/create-academic-semester',validateRequest(academicSemesterValidation.createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester);

router.get('/', AcademicSemesterControllers.getAllAcademicSemester);

router.get('/:academicSemesterId', AcademicSemesterControllers.getSingleAcademicSemester);
router.patch('/:semesterId',validateRequest(academicSemesterValidation.updateAcademicSemesterValidationSchema), AcademicSemesterControllers.updateAcademicSemester);

// router.delete('/:studentId', StudentControllers.deletedStudent);


export const AcademicSemesterRoutes = router;