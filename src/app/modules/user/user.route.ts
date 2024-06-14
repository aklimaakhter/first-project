import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { AnyZodObject } from 'zod';

import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from '../student/student.validation';

// import studentValidationSchema from '../student/student.validation';



const router = express.Router();

router.post('/create-student', validateRequest(studentValidations.studentValidationSchema), UserControllers.createStudent);


export const UserRoutes = router;