// import { Types } from 'joi';
import { Model,Types } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherContactNo: string;
  fatherOccupation: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type TStudent = {
  id: string;
  user:Types.ObjectId;
  password:string;
  name: TUserName;
  contactNo: string;
  emergencyContactNo: string;
  gender: 'male' | 'female'|'other';
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  email: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  dateOfBirth?: Date;
  profileImg?: string;
  admissionSemester:Types.ObjectId;
  academicDepartment:Types.ObjectId;
  isDeleted:boolean;
};


// for creating static
export interface StudentModel extends Model<TStudent> {
  isUserExists(id:string):Promise<TStudent|null>
}





// for creating instance
// export type StudentMethods={
//   isUserExists(id:string):Promise<TStudent|null>
// }

// export type StudentModel = Model<TStudent, Record<string,never>, StudentMethods>