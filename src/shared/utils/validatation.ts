export const validatationPassword = (password: string, passwordConfirm?:string) => {
    if(password.length < 8) {
        return false;
    }
    if(password.length > 16) {
        return false;
    }
    let checkRule = 0
    if(/[A-Z]/.test(password) || /[a-z]/.test(password)) {
        checkRule += 1
    }
    if(/[0-9]/.test(password)) {
        checkRule += 1
    }
    if(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi.test(password)) {
        checkRule += 1
    }
    if(checkRule < 2) {
        return checkRule < 2;
    }
    if(passwordConfirm && password !== passwordConfirm) {
        return false;
    }
    return true
}

export const validationEmail = (email: string) => {
    const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegExp.test(email);
}