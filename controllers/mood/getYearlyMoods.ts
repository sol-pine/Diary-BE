import {Request, Response} from "express";
import User from "../../models/user";
import Mood from "../../models/mood";

const getYearlyMoods = (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const year = req.params.year;

    !token ? res.status(400).send({message: "로그인해주세요."}) :
        User.findOne({token: token})
            .then(user => {
                if(!user) res.status(400).send({message: "로그인해주세요."});
                else {
                    Mood.find({userId: user.id, year: year})
                        .then(moods => {
                            if(!moods) res.status(400).send({id: "불러오기 실패했습니다."});
                            else {
                                const moodList = [];
                                for(let i = 1; i <= 12; ++i) {
                                    const monthly = moods.filter(mood => mood.month === i);
                                    const newMonthly:{date:number, color:string}[] = [];
                                    monthly.map(({date, color}) => {
                                        newMonthly.push({date: date? date : 0, color: color? color : ""});
                                    })
                                    moodList.push(newMonthly);
                                }

                                res.status(200).send({data: moodList, id: user.id, moodCount: moods.length});
                            }
                        });
                }
            }).catch(err => console.log(err));
}

export default getYearlyMoods;