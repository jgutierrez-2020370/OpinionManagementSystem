import User from "../user/user.model.js"
import { encrypt } from '../../utils/encrypt.js'

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

export const CreateUser = async(req, res) =>{
    try {
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        user.role = 'CLIENT'
        await user.save()
        return res.send(
            {
                success: true,
                message: `registration successful, Welcome ${user.username}`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error whit Creating User',
                err
            }
        )
    }
}
