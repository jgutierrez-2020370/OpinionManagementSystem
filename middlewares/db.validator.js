import Category from "../src/category/category.model.js"
import Publication from "../src/publication/publication.model.js"
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

export const existCategory = async(name)=>{
    const alreadyCategory = await Category.findOne({name})
    if(alreadyCategory){
        console.error(`Name ${name} is already taken`)
        throw new Error(`Name ${name} is already taken`)
    }
}

export const existPublication = async(title)=>{
    const alreadyPublication = await Publication.findOne({title})
    if(alreadyPublication){
        console.error(`Publication ${title} already exists`)
        throw new Error(`Publication ${title} already exists`)
    }
}

