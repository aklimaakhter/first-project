import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.sevice';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';


const catchAsync = (fn:RequestHandler) => {
  return (req:Request, res:Response, next:NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err)=> next(err));
};
}

const getSingleStudent= catchAsync(async (req, res, next) => {
  
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    // res.status(200).json({
    //   success: true,
    //   message: 'Student is retrieved successfully',
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students are retrieved successfully',
      data: result

    })
  });

// const getAllStudents: RequestHandler = async (req, res, next) => {
//   try {
//     const result = await StudentServices.getAllStudentsFromDB();


//     // res.status(200).json({
//     //   success: true,
//     //   message: 'Students are retrieved successfully',
//     //   data: result,
//     // });


//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Students are retrieved successfully',
//       data: result

//     })
//   } catch (err) {
//     // res.status(500).json({
//     //   success:false,
//     //   message:'Something went wrong',
//     //   error:err
//     // })

//     next(err)
//   }
// };


const getAllStudents = catchAsync(async (req, res, next) => {
  
  const result = await StudentServices.getAllStudentsFromDB();


  // res.status(200).json({
  //   success: true,
  //   message: 'Students are retrieved successfully',
  //   data: result,
  // });


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved successfully',
    data: result

  })
});


// const deletedStudent: RequestHandler = async (req, res, next) => {
//   try {
//     const { studentId } = req.params;

//     const result = await StudentServices.getSingleStudentFromDB(studentId);

//     // res.status(200).json({
//     //   success: true,
//     //   message: 'Student is retrieved successfully',
//     //   data: result,
//     // });

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Students are retrieved successfully',
//       data: result

//     })
//   } catch (err) {
//     // res.status(500).json({
//     //   success:false,
//     //   message:'Something went wrong',
//     //   error:err
//     // })


//     next(err)
//   }
// };


const deletedStudent = catchAsync(async (req, res, next) => {
  
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    // res.status(200).json({
    //   success: true,
    //   message: 'Student is retrieved successfully',
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students are retrieved successfully',
      data: result

    })
  });




export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deletedStudent
};
