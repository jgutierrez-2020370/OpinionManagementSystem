import { model, Schema } from "mongoose";

const commentarySchema = Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            maxLength: [40, `Can't be oversize 40 characters`]
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxLength: [40, `Can't be oversize 40 characters`]
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User", 
            required: true
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        versionKey: false,
        timeStamps: true
    }
)

export default model('Commentary', commentarySchema)