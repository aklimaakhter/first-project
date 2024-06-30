import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();


router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.patch('/:studentId',validateRequest(studentValidations.updateStudentValidationSchema), StudentControllers.updatedStudent);

router.delete('/:studentId', StudentControllers.deletedStudent);

export const StudentRoutes = router;
