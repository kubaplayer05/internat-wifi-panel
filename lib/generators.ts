export function generateLogin(firstName: string, lastName: string) {
    return `${lastName.toLocaleUpperCase()}${firstName.toLocaleUpperCase()}`
}

export function generatePassword(length: number) {
    let pass = '';
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (let i = 1; i <= length; i++) {
        const char = Math.floor(Math.random()
            * str.length + 1);

        pass += str.charAt(char)
    }

    return pass;
}