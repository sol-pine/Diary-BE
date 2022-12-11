import User from "../../models/user";
import Mood from "../../models/mood";
import {Request, Response} from "express";

const deleteUser = (req: Request, res: Response) => {
    const token = req.headers.authorization;

    !token ? res.status(400).send({message: "로그인해주세요."}) :
        User.findOne({token: token})
            .then(user => {
                if (user) {
                    Mood.deleteMany({userId: user.id}).then(()=>{
                        User.deleteOne({id: user.id})
                            .then(() => res.status(200).send())
                    })
                } else {
                    res.status(400).send({message: "로그인해주세요."});
                }
            });
};

export default deleteUser;