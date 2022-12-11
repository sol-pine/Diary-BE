/** 비밀번호 분실 인증 코드 유효성 체크 */
const checkCodeValid = (code: string) => {
    const codeRegExp = /^[0-9]{6}$/;
    return code.length && codeRegExp.test(code);
};

export default checkCodeValid;
