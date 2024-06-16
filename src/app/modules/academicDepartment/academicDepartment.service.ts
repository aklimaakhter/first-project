import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";



const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {


  // Same name not use create and update database(validation)
  // const isDepartmentExist = await AcademicDepartment.findOne({ name: payload.name })

  // if (isDepartmentExist) {
  //   throw new Error('This Department is already exist!')
  // }


  

  const result = await AcademicDepartment.create(payload)

  return result;
}

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await AcademicDepartment.findOne({ _id: id }).populate('academicFaculty');
  
  return result;
};

const updateAcademicDepartmentFromDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {


  const result = await AcademicDepartment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDB

}