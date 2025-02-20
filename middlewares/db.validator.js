import User from "../src/user/user.model.js"

export const existEmail = async (email) => {
    const alreadyEmail = await User.findOne({ email })
    if (alreadyEmail) {
        throw new Error(`Already exist a user with email: ${email}`)
    }
}

export const existUser = async (userName) => {
    const alreadyUser = await User.findOne({ userName })
    if (alreadyUser) {
        throw new Error(`Already exist a user with name: ${userName}`)
    }
}