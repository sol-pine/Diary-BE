import User from "../../models/user";
import {Request, Response} from "express";
import {createHashedPassword} from "../../utils/encrypt";
import checkIdValid from "../../utils/checkIdValid";
import checkIdInDB from "../../utils/checkIdInDb";
import checkPwdValid from "../../utils/checkPwdValid";
import checkCodeValid from "../../utils/checkCodeValid";

interface ReqBodyType {
    id: string;
    pwd: string;
    code: string;
}

const signUp = async (req: Request, res: Response) => {
    const body: ReqBodyType = req.body;

    if (!checkIdValid(body.id)) {
        res.status(400).send({message: "아이디 형식을 한번 더 확인해주세요."});
    } else if (!checkPwdValid(body.pwd)) {
        res.status(400).send({message: "비밀번호 형식을 한번 더 확인해주세요."});
    } else if (!checkCodeValid(body.code)) {
        res.status(400).send({message: "숫자 코드 형식을 한번 더 확인해주세요."});
    } else if (await checkIdInDB(body.id)) {
        res.status(400).send({message: "이미 사용중인 아이디예요."});
    } else {
        const {hashedPassword, salt} = await createHashedPassword(body.pwd);
        if(hashedPassword === body.pwd) res.status(400).send({message: "회원가입에 실패했습니다. 다시 시도해주세요."});
        else {
            const user = new User({
                    id: body.id,
                    pwd: hashedPassword,
                    salt: salt,
                    token: null,
                    code: body.code
                }
            );
            user.save()
                .then(() => res.status(200).send())
                .catch(err => console.log(err));
        }
    }
};

export default signUp;
