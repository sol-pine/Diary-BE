import User from "../../models/user";
import {Request, Response} from "express";
import jwt, {Secret} from "jsonwebtoken";
import * as dotenv from "dotenv";
import {verifyPassword} from "../../utils/encrypt";

dotenv.config();

interface ReqBodyType {
    id: string;
    pwd: string;
}

const logIn = (req: Request, res: Response) => {
    const body: ReqBodyType = req.body;

    const id = body.id;
    const pwd = body.pwd;

    const secretKey: Secret = String(process.env.SECRET_KEY);
    const expiresIn = String(process.env.EXPIRES_IN);
    const issuer = String(process.env.ISSUER);

    let token: string;

    User.findOne({id: id})
        .then(async (result) => {
            if (!result) {
                res.status(400).send({message: "가입하지 않은 아이디예요."});
            } else {
                const userPwd = String(result.pwd);
                const userSalt = String(result.salt);
                const isVerify = await verifyPassword(pwd, userPwd, userSalt);

                if (isVerify) {
                    token = jwt.sign({id: id}, secretKey, {
                        expiresIn: expiresIn,
                        issuer: issuer,
                    });
                    result.token = token;
                    return result.save().then(()=>res.status(200).json({token: token}));
                } else res.status(400).send({message: "비밀번호가 달라요."});
            }
        })
        .catch((err) => console.log(err));
};

export default logIn;
