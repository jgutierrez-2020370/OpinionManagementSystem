import User from "../user/user.model.js"
import { checkPassword, encrypt } from '../../utils/encrypt.js'

export const defaultAdmin = async() => {
    try {
        const defautlAdmin = await User.findOne({name: 'Admin'})

        if (!defautlAdmin) { 
            const newADmin = new User(
                {
                    name: 'Admin',
                    userDescription: 'Admin',
                    userName: 'Admin',
                    email: process.env.ADMIN_EMAIL,
                    password: await encrypt(process.env.ADMIN_PASS),
                    role: 'ADMIN'
                }
            )
            await newADmin.save()
        }
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error whit default admin',
                err
            }
        )
    } 
}

export const updateProfile = async (req, res)=> {
    const { password, ...data } = req.body
    try {

        if (password) {
            return res.status(400).send(
                {
                    success: false,
                    message: "Password can't be updated here"
                }
            )
        }

        const user = await User.findById(req.user.uid)

        const userUpadted = await User.findByIdAndUpdate(
            user,
            data,
            { new: true }
        )

        return res.send(
            {
                success: true,
                message: 'Your account was updated successfully',
                userUpadted
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error updating account'
            }
        )
    }
}

export const updatePassword = async (req, res)=> {
    try {
        const { password, passwordconfirm} = req.body
        const user = await User.findById(req.user.uid)
        
        if (password == null || passwordconfirm == null) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'Password and password confirm are required'
                }   
            )
        }

        if (await checkPassword(user.password, passwordconfirm)) {
            const passwordUpadted = await User.findByIdAndUpdate(
                user,
                {password: await encrypt(password)},
                { new: true }
            )
            return res.send(
                {
                    success: true,
                    message: 'Your password was updated successfully',
                    passwordUpadted
                }
            )
        }
        return res.status(404).send(
            {
                success: false,
                message: 'Wrong password'
            }
        )
        
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error updating password'
            }
        )
    }
}
