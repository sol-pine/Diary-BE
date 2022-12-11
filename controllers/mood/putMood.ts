import {Request, Response} from "express";
import User from "../../models/user";
import Mood from "../../models/mood";

interface ReqBodyType {
    year: number;
    month: number;
    date: number;
    newText: string;
    newColor: string;
}

const putMood = (req: Request, res: Response) => {
    const body: ReqBodyType = req.body;
    const token = req.headers.authorization;

    !token ? res.status(400).send({message: "로그인해주세요."}) :
        User.findOne({token: token})
            .then(user => {
                if(!user) res.status(400).send({message: "로그인해주세요."});
                else {
                    Mood.findOne({userId: user.id, year:body.year, month: body.month, date:body.date})
                        .then(mood => {
                            if(!mood) res.status(400).send({message: "수정에 실패했습니다."});
                            else {
                                mood.moodText = body.newText.substring(0,140);
                                mood.color = body.newColor;
                                mood.save()
                                    .then(() => res.status(200).send())
                                    .catch(err => console.log(err));
                            }
                        })
                }
            })
}

export default putMood;