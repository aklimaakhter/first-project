import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';


const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty'
    }
},
    {
        timestamps: true
    })


// Same name not use create and update database(validation)
academicDepartmentSchema.pre('save', async function (next) {

    const isDepartmentExist = await AcademicDepartment.findOne({ name: this.name })

    if (isDepartmentExist) {
        throw new Error('This Department is already exist!')
    }
})

// query middleware for check exist data(validation)
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {

    const query = this.getQuery()

    const isDepartmentExist = await AcademicDepartment.findOne(query)

    if (!isDepartmentExist) {
        throw new Error('This department dose not exist')
    }

})



export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema)