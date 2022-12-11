import {Request, Response} from "express";
import User from "../../models/user";
import Mood from "../../models/mood";

const deleteMood = (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const year = req.query.year;
    const month = req.query.month;
    const date = req.query.date;

    !token ? res.status(400).send({message: "로그인해주세요."}) :
        User.findOne({token: token})
            .then(user => {
                if (!user) res.status(400).send({message: "로그인해주세요."});
                else {
                    Mood.deleteOne({userId: user.id, year: year, month: month, date: date})
                        .then(result => {
                            if (result) res.status(200).send()
                            else res.status(400).send({message: "삭제에 실패했습니다."})
                        })
                        .catch(err => console.log(err));
                }
            });
}

export default deleteMood;