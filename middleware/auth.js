import User from "../models/user.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export function authUser(req, res, next){
    console.log(User.username)
    console.log("Authorize User")

    const token = req.headers['Authorization']
    console.log(token)
    if (!token) {
        res.status(401).json({msg: 'Access Denied: Please Login!'})
    } else {
        const tokenBody = token.slice(7)
        jwt.verify({tokenBody}, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({msg: 'Token not Verified!'})
            }
            res.json({msg: 'Token Verified!'})
            next()
        })
    }
}