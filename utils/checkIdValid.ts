/** 아이디 유효성 체크 */
const checkIdValid = (id: string) => {
    const idRegExp = /^[a-z0-9]{5,8}$/;
    return idRegExp.test(id);
};

export default checkIdValid;