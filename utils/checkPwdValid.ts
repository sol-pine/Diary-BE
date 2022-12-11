/** 비밀번호 유효성 체크 */
const checkPwdValid = (pwd: string) => {
    const pwdRegExp =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^/])[A-Za-z\d@$!%*#?&^/]{8,20}$/;
    return pwdRegExp.test(pwd);
};

export default checkPwdValid;