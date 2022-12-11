import {Request, Response} from "express";
import User from "../../models/user";
import Mood from "../../models/mood";

const getMood = (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const year = req.query.year;
    const month = req.query.month;
    const date = req.query.date;

    !token ? res.status(400).send({message: "로그인해주세요."}) :
        User.findOne({token: token})
            .then(user => {
                if (!user) res.status(400).send({message: "로그인해주세요."});
                else {
                    Mood.findOne({userId: user.id, year: year, month: month, date: date})
                        .then(mood => {
                            if (mood) {
                                res.status(200).send({isMood: true, moodText: mood.moodText, color: mood.color});
                            } else {
                                res.status(200).send({isMood: false, moodText: '', color: ''});
                            }
                        })
                        .catch(err => console.log(err));
                }
            });
}

export default getMood;