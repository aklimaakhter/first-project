import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import mongoose from 'mongoose';
import { User } from '../user/user.model';

const createStudentIntoDB = async (studentData: TStudent) => {


  // static method
  if (await Student.isUserExists(studentData.id)) {
    throw new AppError(httpStatus.NOT_FOUND, `User already exists!`)
  }

  const result = await Student.create(studentData);
  return result;



  // create instance
  // const student = new Student(studentData);
  // if(await student.isUserExists(studentData.id)){
  //   throw new Error(`User already exists!`)
  // }
  // built in instance method
  // const result = await student.save()  
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty'
    }
  });
  return result;
};


// findOne = generated Id
const getSingleStudentFromDB = async (id: string) => {
  console.log(id)
  const result = await Student.findOne({ id }).populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty'
      }
    });
  // const result = await Student.findById(id).populate({
  //   path: 'academicDepartment',
  //   populate: {
  //     path: 'academicFaculty'
  //   }
  // })
  return result;
};

const deleteStudentFromDB = async (id: string) => {
console.log(id)
  const session = await mongoose.startSession();
  try {

    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to deleted student")
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to deleted user")
    }
    await session.commitTransaction()
    await session.endSession();


    return deletedStudent;
  } catch (err:any) {
    await session.abortTransaction();
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, err)
  }
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
