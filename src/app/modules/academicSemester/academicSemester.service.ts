import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB=async(payload:TAcademicSemester)=>{

   
    if(academicSemesterNameCodeMapper[payload.name]!==payload.code){
        throw new AppError(httpStatus.NOT_FOUND,'Invalid semester code')
    }
    const result= await AcademicSemester.create(payload)
    
    return result;
}

const getAllAcademicSemesterFromDB = async () => {
    const result = await AcademicSemester.find();
    return result;
  };

  const getSingleAcademicSemesterFromDB = async (id: string) => {
    // const result = await Student.findOne({ id });
    const result = await AcademicSemester.findOne({_id:id})
    return result;
  };

  const updateAcademicSemesterFromDB = async (
    id: string,
    payload: Partial<TAcademicSemester>,
  ) => {
    if (
      payload.name &&
      payload.code &&
      academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
      throw new AppError(httpStatus.NOT_FOUND,'Invalid Semester Code');
    }
  
    const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };

export const AcademicSemesterServices={
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterFromDB
}