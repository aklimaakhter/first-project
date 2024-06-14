import Joi from "joi";

const userNameValidationSchema = Joi.object({
    firstName: Joi.string().required().messages({
      'any.required': 'First name is required',
    }),
    middleName: Joi.string().optional().allow(''),
    lastName: Joi.string().required().pattern(/^[A-Za-z]+$/).messages({
      'any.required': 'Last name is required',
      'string.pattern.base': 'Last name must only contain alphabetic characters',
    }),
  });

  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required().messages({
      'any.required': 'Father name is required',
    }),
    fatherContactNo: Joi.string().required().messages({
      'any.required': 'Father contact number is required',
    }),
    fatherOccupation: Joi.string().required().messages({
      'any.required': 'Father occupation is required',
    }),
    motherName: Joi.string().required().messages({
      'any.required': 'Mother name is required',
    }),
    motherContactNo: Joi.string().required().messages({
      'any.required': 'Mother contact number is required',
    }),
    motherOccupation: Joi.string().required().messages({
      'any.required': 'Mother occupation is required',
    }),
  });

  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'Local guardian name is required',
    }),
    occupation: Joi.string().required().messages({
      'any.required': 'Local guardian occupation is required',
    }),
    contactNo: Joi.string().required().messages({
      'any.required': 'Local guardian contact number is required',
    }),
    address: Joi.string().required().messages({
      'any.required': 'Local guardian address is required',
    }),
  });

  const studentValidationSchema = Joi.object({
    id: Joi.string().optional().allow(''),
    name: userNameValidationSchema,
    gender: Joi.string().valid('male', 'female').required().messages({
      'any.only': 'Gender must be either male or female',
    }),
    contactNo: Joi.string().required().messages({
      'any.required': 'Contact number is required',
    }),
    emergencyContactNo: Joi.string().required().messages({
      'any.required': 'Emergency contact number is required',
    }),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').required().messages({
      'any.only': 'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email address',
    }),
    presentAddress: Joi.string().required().messages({
      'any.required': 'Present address is required',
    }),
    permanentAddress: Joi.string().required().messages({
      'any.required': 'Permanent address is required',
    }),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    dateOfBirth: Joi.string().optional().allow(''),
    profileImg: Joi.string().optional().allow(''),
    isActive: Joi.string().valid('active', 'blocked').required().messages({
      'any.only': 'Status must be either active or blocked',
    }),
  });


  export default studentValidationSchema;