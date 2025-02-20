import { model, Schema } from "mongoose";

const publicationSchema = Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            unique: true,
            maxLength: [30, `Can't be oversize 30 characters`]
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxLength: [400, `Can't be oversize 400 characters`]
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