import { Schema } from "mongoose";

const publicationSchema = Schema(
    {
        title: {
            type: String,
            required: [true, 'Name is required'],
            unique: true,
            maxLength: [40, `Can't be oversize 40 characters`]
        },
        description: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [40, `Can't be oversize 40 characters`]
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category", 
            required: true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User", 
            required: true
        },
        commentaries: {
            type: [Schema.Types.ObjectId],
            ref: "Commentary"
        }
    },
    {
        versionKey: false,
        timeStamps: true
    }
)

export default model('Publication', publicationSchema)