class ValidationChain {
    constructor(str) {
        this.str = str;
    }

    isLength({ min = 0, max = '' }) {
        const regexp = new RegExp(`.{${min},${max}}`);

        return regexp.test(this.str);
    }

    isEmail() {
        const regexp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

        return regexp.test(this.str);
    }
}


export const check = (str) => {
    return new ValidationChain(str);
}
