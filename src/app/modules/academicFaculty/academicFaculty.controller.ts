import { NextFunction, Request, RequestHandler, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./academicFaculty.service";





const createAcademicFaculty = catchAsync(async (req, res, next) => {

  // const { password, student:studentData } = req.body;



  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);



  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty create is successfully',
    data: result

  })
});


const getAllAcademicFaculties= catchAsync(async (req, res, next) => {

  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();


  // res.status(200).json({
  //   success: true,
  //   message: 'Students are retrieved successfully',
  //   data: result,
  // });


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty are retrieved successfully',
    data: result

  })
});

const getSingleAcademicFaculty = catchAsync(async (req, res, next) => {

  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
  // return result;


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is retrieved successfully',
    data: result

  })
});


const updateAcademicFaculty= catchAsync(async (req, res, next) => {

  const { facultyId} = req.params;
  // const {data} = req.body
  
  const result = await AcademicFacultyServices.updateAcademicFacultyFromDB(
    facultyId,
    req.body,
  )
console.log(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is updated successfully',
    data: result

  })
});



export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty

};