import util from "util";
import crypto from "crypto";

const randomBytes = util.promisify(crypto.randomBytes);

const pbkdf2 = util.promisify(crypto.pbkdf2);

const createSalt = async () => {
    const buf = await randomBytes(64);
    return buf.toString("base64");
};

/** 비밀번호 암호화 */
const createHashedPassword = async (password: string) => {
    const salt = await createSalt();
    const key = await pbkdf2(password, salt, 104904, 64, "sha512");
    const hashedPassword = key.toString("base64");

    return { hashedPassword, salt };
};

const verifyPassword = async (
    password: string,
    userPassword: string,
    userSalt: string
) => {
    const key = await pbkdf2(password, userSalt, 104904, 64, "sha512");
    const hashedPassword = key.toString("base64");

    return hashedPassword === userPassword;
};

export { createHashedPassword, verifyPassword };
