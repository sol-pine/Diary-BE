import {Request, Response} from "express";
import User from "../../models/user";
import Mood from "../../models/mood";

interface ReqBodyType {
    year: number;
    month: number;
    date: number;
    moodText: string;
    color: string;
}

const postMood = (req: Request, res: Response) => {
    const body: ReqBodyType = req.body;
    const token = req.headers.authorization;

    !token ? res.status(400).send({message: "로그인해주세요."}) :
        User.findOne({token: token})
            .then(user => {
                if(!user) res.status(400).send({message: "로그인해주세요."});
                else {
                    Mood.findOne({userId:user.id, year: body.year, month: body.month, date: body.date})
                        .then(mood => {
                            if(mood) res.status(400).send({message: "이미 등록되었습니다."});
                            else {
                                const newMood = new Mood({
                                    userId: user.id,
                                    year:body.year,
                                    month:body.month,
                                    date:body.date,
                                    moodText: body.moodText.substring(0,140),
                                    color: body.color,
                                });
                                newMood.save()
                                    .then(() => res.status(200).send())
                                    .catch(err => console.log(err));
                            }
                        })
                }
            })
}

export default postMood;