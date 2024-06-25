import { z } from "zod";

const createAcademicDepartmentValidationSchema=z.object({
   
   body:z.object({
    name:z.string({
        invalid_type_error: "Name must be a string",
        required_error:"Name is required"
    }),
    academicFaculty:z.string({
        invalid_type_error: "Academic Faculty must be a string",
        required_error:"Academic Faculty is required"
        
    })
   })
    
    
})


const updateAcademicDepartmentValidationSchema=z.object({
   
   body:z.object({
    name:z.string({
        invalid_type_error: "Name must be a string",
        required_error:"Name is required"
    }).optional(),
    academicFaculty:z.string({
        invalid_type_error: "Academic Faculty must be a string",
        required_error:"Academic Faculty is required"
        
    }).optional()
   })
    
    
})
// const updateAcademicFacultyValidationSchema=z.object({
   
//     body:z.object({
//      name:z.string({
//          invalid_type_error: "Name must be a string",
//      })
//     })
     
     
//  })

export const academicDepartmentValidation={
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
}