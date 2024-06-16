import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';
// import config from '../../config';
// import bcrypt from 'bcrypt'



const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, requiredPaths: true },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid'
    }
  },


});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContactNo: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, 'ID is required'], unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required:[true,'user id is required'],
    unique:true,
    ref:'User'
  },
  name: userNameSchema,
  gender: ['male', 'female'],
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} email is not a valid"
    }
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  dateOfBirth: { type: Date },
  profileImg: { type: String },
  admissionSemester:{
    type:Schema.Types.ObjectId,
    ref:'AcademicSemester'
  },
  academicDepartment:{
    type:Schema.Types.ObjectId,
    ref:'AcademicDepartment'
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
},
  {
    toJSON: {
      virtuals: true
    }
  });

// virtual
studentSchema.virtual('fullName').get(function () {
  return (
    `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
  )
})


// Document Middleware

// pre save middleware hook:will work on create()  save()
// studentSchema.pre('save', async function (next) {
//   // console.log(this, 'Pre hook:We will pre save data')
//   const user = this;
//   user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds),
//   )
//   next();
// })

// // post save middleware hook
// //   set '' after saving password
// studentSchema.post('save', function (doc, next) {
//   doc.password = ''
//   next()
//   console.log(this, 'post hook:Post save data')
// })

// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })

  return existingUser;
}




// Creating a custom instance method
// studentSchema.methods.isUserExists=async function(id:string){
//   const existingUser=await Student.findOne({id})
//   return existingUser;
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
