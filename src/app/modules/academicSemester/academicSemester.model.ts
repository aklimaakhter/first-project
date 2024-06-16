import { model, Schema } from 'mongoose';
import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from './academicSemester.interface';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.constant';





const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        required: true,
        enum: AcademicSemesterName
    },
    year: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        enum: AcademicSemesterCode
    },
    startMonth: {
        type: String,
        required: true,
        enum: Months
    },
    endMonth: {
        type: String,
        required: true,
        enum: Months
    }
},
    {
        timestamps: true
    })

academicSemesterSchema.pre('save', async function (next) {
    const isSemesterExits = await AcademicSemester.findOne({
        year: this.year,
        name: this.name
    })
    if (isSemesterExits) {
        throw new Error('Semester already exits')
    }
    else{
        next()
    }
})

export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)