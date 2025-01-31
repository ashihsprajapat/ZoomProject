import httpStatus from 'http-status';

import { User } from "../model/user.model.js"
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";
import  bodyParser  from 'body-parser';

export const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "username and password must be required" });
    }
    //console.log(username,password);
    try {

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "username not exist" });
        }
        let isPasswordCorrect=await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            let token = crypto.randomBytes(20).toString('hex');
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token });

        }else{
            return res.status(httpStatus.UNAUTHORIZED).json({message:"Invalid username or password"});
        }
    }
    catch (err) {
        return res.status(httpStatus.NOT_FOUND).json({ message: `somthing went wrong ${err}` });
    }
}



export const register = async (req, res) => {
   // console.log("req for register");
    const { username, password, name } = req.body;
    if(!username || !password ||!name){
        return res.send("username, password and name  are required")
    }
   
    //console.log(username, password,name)

    try {
        const newUser = await User.findOne({ username });

        if (newUser) {
            return res.status(404).json({ message: "user aleardy exist" })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUserPass = new User({
            name: name,
            username: username,
            password: hashPassword,
        });
        await newUserPass.save()
            .then(() => {
               // console.log(newUser);
            })


      return   res.status(200).json({ message: "userRegister" });
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: `some thing went wrong ${e}` });
    }
}

//"18eb87954c9411d0b8ad3c510dca5521771751f6"
///4df8b5cb59a703d2941a708ef8efdab9dd1ecd7b
