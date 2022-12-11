import User from "../../models/user";
import {Request, Response} from "express";
import checkPwdValid from "../../utils/checkPwdValid";
import {createHashedPassword} from "../../utils/encrypt";

interface ReqBodyType {
    id: string;
    code: string;
    newPwd: string;
}

const resetPwd = (req: Request, res: Response) => {
    const body: ReqBodyType = req.body;

    const id = body.id;
    const code = body.code;
    const newPwd = body.newPwd;

    User.findOne({id: id})
        .then(async user => {
            if (!user) {
                res.status(400).send({message: "가입하지 않은 아이디예요."});
            } else if (code !== user.code) {
                res.status(400).send({message: "코드가 달라요."});
            } else if (!checkPwdValid(newPwd)) {
                res.status(400).send({message: "비밀번호 형식을 한번 더 확인해주세요."});
            } else {
                const {hashedPassword, salt} = await createHashedPassword(newPwd);
                if(hashedPassword === newPwd) res.status(400).send({message: "비밀번호 재설정에 실패했습니다. 다시 시도해주세요."});
                else {
                    user.pwd = hashedPassword;
                    user.salt = salt;

                    user.save()
                        .then(() => res.status(200).send())
                        .catch(err => console.log(err));
                }
            }
        })
};

export default resetPwd;