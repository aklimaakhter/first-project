
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicDepartmentServices } from "./academicDepartment.service";






const createAcademicDepartment = catchAsync(async (req, res, next) => {

  // const { password, student:studentData } = req.body;



  const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);



  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department create is successfully',
    data: result

  })
});


const getAllAcademicDepartments= catchAsync(async (req, res, next) => {

  const result = await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();


  // res.status(200).json({
  //   success: true,
  //   message: 'Students are retrieved successfully',
  //   data: result,
  // });


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department are retrieved successfully',
    data: result

  })
});

const getSingleAcademicDepartment = catchAsync(async (req, res, next) => {

  const { departmentId } = req.params;
  const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);
  // return result;


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is retrieved successfully',
    data: result

  })
});


const updateAcademicDepartment= catchAsync(async (req, res, next) => {

  const { departmentId} = req.params;
  // const {data} = req.body
  
  const result = await AcademicDepartmentServices.updateAcademicDepartmentFromDB(
    departmentId,
    req.body,
  )
console.log(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is updated successfully',
    data: result

  })
});



export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment

};