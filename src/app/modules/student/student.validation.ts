import { z } from "zod";

// Define Zod schema for UserName
const createUserNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Last name must only contain alphabetic characters",
    }),
});

// Define Zod schema for Guardian
const createGuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherContactNo: z.string(),
  fatherOccupation: z.string(),
  motherName: z.string(),
  motherContactNo: z.string(),
  motherOccupation: z.string(),
});

// Define Zod schema for LocalGuardian
const createLocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Define Zod schema for Student
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female'],),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],),
      email: z.string()

        .email("Email must be a valid email address"),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      dateOfBirth: z.string().optional(),
      profileImg: z.string(),
      admissionSemester:z.string()
    })
  })
});


const updateUserNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

// Define Zod schema for Guardian
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherContactNo: z.string().optional(),
  fatherOccupation: z.string().optional(),
  motherName: z.string().optional(),
  motherContactNo: z.string().optional(),
  motherOccupation: z.string().optional(),
});

// Define Zod schema for LocalGuardian
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

// Define Zod schema for Student
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female'],).optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],).optional(),
      email: z.string()

        .email("Email must be a valid email address").optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      dateOfBirth: z.string().optional(),
      profileImg: z.string().optional(),
      admissionSemester:z.string().optional()
    })
  })
});


export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema
};