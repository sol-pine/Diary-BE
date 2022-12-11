import {Request, Response} from "express";
import User from "../../models/user";
import Mood from "../../models/mood";

const getMonthlyMoods = (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const year = req.query.year;
    const month = req.query.month;

    !token ? res.status(400).send({message: "로그인해주세요."}) :
        User.findOne({token: token})
            .then(user => {
                if(!user) res.status(400).send({message: "로그인해주세요."});
                else {
                    Mood.find({userId: user.id, year: year, month: month})
                        .then(moods => {
                            if(!moods) res.status(400).send({id: "불러오기 실패했습니다."});
                            else {
                                res.status(200).send({data: moods});
                            }
                        });
                }
            }).catch(err => console.log(err));
}

export default getMonthlyMoods;