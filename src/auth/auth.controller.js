import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generatejwt } from '../../utils/jwt.js'

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
                message: `registration successful, Welcome ${user.userName}`
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

export const login = async(req, res)=>{
    try{
        let { userLoggin, password } = req.body
        let user = await User.findOne(
            {
                $or: [
                    {email: userLoggin},
                    {userName: userLoggin}
                ]
            }
        )
        
        if(user && await checkPassword(user.password, password)) {
            let loggedUser = {
                uid: user._id,
                name: user.name,
                userName: user.userName,
                role: user.role
            }
            let token = await generatejwt(loggedUser)
            return res.send(
                {   
                    success: true,
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send(
            {
                success: false,
                message: 'Wrong email or password'
            }
        )

    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with login',
                err
            }
        )
    }
}