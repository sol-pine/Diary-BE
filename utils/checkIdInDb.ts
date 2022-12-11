import User from "../models/user";

/** 아이디 중복 체크 */
const checkIdInDB = async (id: string) =>
    await User.findOne({id: id});

export default checkIdInDB;