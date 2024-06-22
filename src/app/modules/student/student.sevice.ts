import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {


  // static method
  if(await Student.isUserExists(studentData.id)){
    throw new AppError(httpStatus.NOT_FOUND,`User already exists!`)
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
    path:'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.findById({_id:id}).populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  })
  return result;
};

const deleteStudentFromDB=async (id:string)=>{
  const result=await Student.updateOne({id},{isDeleted:true})
  return result
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
