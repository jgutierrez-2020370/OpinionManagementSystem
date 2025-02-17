import { model, Schema } from "mongoose"

const categorySchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            unique: true,
            maxLength: [25, `Can't be oversize 25 characters`]
        },
        description: {
            type: String,
            required: [true, 'Category description is required'],
            maxLength: [50, `Can't be oversize 50 characters`]
        }
    },
    {
        versionKey: false, 
        timeStamps: true
    }
)

export default model('Category', categorySchema)