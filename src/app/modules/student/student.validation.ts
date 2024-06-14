import { z } from "zod";

// Define Zod schema for UserName
const userNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Last name must only contain alphabetic characters",
    }),
});

// Define Zod schema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherContactNo: z.string(),
  fatherOccupation: z.string(),
  motherName: z.string(),
  motherContactNo: z.string(),
  motherOccupation: z.string(),
});

// Define Zod schema for LocalGuardian
const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Define Zod schema for Student
const studentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female'],),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],),
      email: z.string()

        .email("Email must be a valid email address"),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      dateOfBirth: z.string(),
      profileImg: z.string(),
    })
  })
});


export const studentValidations = {
  studentValidationSchema
};