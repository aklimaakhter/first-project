import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { NewUser, TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";


const createStudentIntoDB = async (password: string, payload: TStudent) => {

    // create a user object
    let userData: Partial<TUser> = {}

    // if password is not given, use default password
    userData.password = password || (config.default_password as string)



    // set student role
    userData.role = 'student'



    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

    const session = await mongoose.startSession();
    try {
        session.startTransaction()
        // set auto generated id
        userData.id = await generateStudentId(admissionSemester as TAcademicSemester);


        // create a user(transaction-1)
        const newUser = await User.create([userData], { session });

        // create a student
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
        }
        // set is, _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id

        // create a user(transaction-2)
        const newStudent = await Student.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
        }

        await session.commitTransaction()
        await session.endSession()

        return newStudent;


    } catch (err) {

        await session.abortTransaction()
        await session.endSession()

    }
}
export const UserServices = {
    createStudentIntoDB
}