import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

// const createStudent = async (req, res,next) => {
//   try {
//     const { password, student:studentData } = req.body;

//     

//     const result = await UserServices.createStudentIntoDB(password,studentData);

//     // res.status(200).json({
//     //   success: true,
//     //   message: 'Student create is successfully',
//     //   data: result,
//     // });

//     sendResponse(res,{
//       statusCode:httpStatus.OK,
//       success:true,
//       message:'Student create is successfully',
//       data:result

//     })
//   } catch (err) {
//     next(err)
//   }
// };


const createStudent = catchAsync(async (req, res,next) => {
  
    const { password, student:studentData } = req.body;

    // const zodParseData=studentValidationSchema.parse(studentData)

    const result = await UserServices.createStudentIntoDB(password,studentData);
console.log('please give a',password,studentData,result)
    // res.status(200).json({
    //   success: true,
    //   message: 'Student create is successfully',
    //   data: result,
    // });

    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Student create is successfully',
      data:result

    })
  });

export const UserControllers = {
  createStudent,

};