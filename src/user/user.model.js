import { Schema } from "mongoose";

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [50, `Can't be oversize 50 characters`]
        },
        userDescription: {
            type: String,
            required: [true, 'Your description is required'],
            maxLength: [75, `Can't be oversize 75 characters`]
        },
        userName: {
            type: String,
            required: [true, 'Your user name is required'],
            unique: true,
            lowercase: true,
            maxLength: [15, `Can't be oversize 15 characters`]
        },
        email: {
            type: String,
            required: [true , 'email is required'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, `Password must be 8 characteres`],
            maxLength: [100, `Can't be oversize 16 characteres`],
            match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm]
        },
        role: {
            type: String,
            required: [true, 'role is required'],
            uppercase: true,
            enum: ['ADMIN', 'CLIENT']
        }
    },
    {
        versionKey: false, 
        timeStamps: true
    }
)

userSchema.methods.toJSON = function(){
    const { __v, password, ...user} = this.toObject()
    return user
}

export default model('User', userSchema)