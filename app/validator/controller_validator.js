export class ControllerValidator {
    static validateEmail(email) {
        let re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    static validateCountry(country) {
        let re = new RegExp(".co$");
        return re.test(String(country).toLowerCase());
    }
    static validatePhone(phone) {
        let re = /^[0-9\s]*$/;
        return re.test(String(phone));
    }
}
