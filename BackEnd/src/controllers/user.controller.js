import httpStatus from 'http-status';

import { User } from "../model/user.model.js"
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";
import bodyParser from 'body-parser';

export const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "username and password must be required" });
    }
    try {

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "username not exist", success: false });
        }
        let isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            let token = crypto.randomBytes(20).toString('hex');
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token, success: true, message: "Login Successfull" });

        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid  password", success: false });
        }
    }
    catch (err) {
        return res.status(httpStatus.NOT_FOUND).json({ message: err.message, success: false });
    }
}



export const register = async (req, res) => {
    const { username, password, name } = req.body;
    if (!username || !password || !name) {
        return res.send("username, password and name  are required")
    }
    try {
        const newUser = await User.findOne({ username });

        if (newUser) {
            return res.status(404).json({ message: "user aleardy exist", success:false })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUserPass = new User({
            name: name,
            username: username,
            password: hashPassword,
        });
        await newUserPass.save()

        return res.status(200).json({ message: "user Register", success: true });
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: `some thing went wrong ${e}`, success: false });
    }
}

