import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';




const router = express.Router();

router.post('/create-academic-department',validateRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema), AcademicDepartmentControllers.createAcademicDepartment);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);

router.get('/:departmentId', AcademicDepartmentControllers.getSingleAcademicDepartment);
router.patch('/:departmentId',validateRequest(academicDepartmentValidation.updateAcademicDepartmentValidationSchema), AcademicDepartmentControllers.updateAcademicDepartment);




export const AcademicDepartmentRoutes = router;