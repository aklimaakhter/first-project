import { NextFunction, Request, RequestHandler, Response } from "express";

import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";




const createAcademicSemester = catchAsync(async (req, res, next) => {

  // const { password, student:studentData } = req.body;



  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);



  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester create is successfully',
    data: result

  })
});


const getAllAcademicSemester = catchAsync(async (req, res, next) => {

  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();


  // res.status(200).json({
  //   success: true,
  //   message: 'Students are retrieved successfully',
  //   data: result,
  // });


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester are retrieved successfully',
    data: result

  })
});

const getSingleAcademicSemester = catchAsync(async (req, res, next) => {

  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
  // return result;


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved successfully',
    data: result

  })
});


const updateAcademicSemester = catchAsync(async (req, res, next) => {

  const { semesterId } = req.params;
  // const {data} = req.body
  
  const result = await AcademicSemesterServices.updateAcademicSemesterFromDB(
    semesterId,
    req.body,
  )
console.log(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is updated successfully',
    data: result

  })
});



export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester

};