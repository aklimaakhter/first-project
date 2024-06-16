// import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

// export const generatedStudentId=(payload:TAcademicSemester)=>{

//     const currentId= (0).toString();

//     let incrementId= (Number(currentId)+1).toString().padStart(4,'0');

//     incrementId=`${payload.name}${payload.code}${incrementId}`;

//     return incrementId;

// }


const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
        {
            role: 'student',
        },
        {
            id: 1,
            _id: 0,
        },
    )
        .sort({
            createdAt: -1,
        })
        .lean();
    return lastStudent?.id ? lastStudent.id : undefined;
};

//  generated id
export const generateStudentId = async (payload: TAcademicSemester) => {
    let currentId = (0).toString();

    const lastStudentId = await findLastStudentId();
    console.log(lastStudentId)
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
    const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
    const currentStudentSemesterCode = payload.code;
    const currentStudentSemesterYear = payload.year;

    if (
        lastStudentId &&
        lastStudentSemesterCode === currentStudentSemesterCode &&
        lastStudentSemesterYear === currentStudentSemesterYear
    ) {
        currentId = lastStudentId.substring(6);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `${payload.year}${payload.code}${incrementId}`;
    console.log(incrementId)
    return incrementId;
};