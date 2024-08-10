class Logger {
    //bean 등록시 true/false 옵션으로 전체 로그 on/off
    //test 끝나면 off할 것.
    constructor(isEnabled) {
        this.isEnabled = isEnabled;
    }

    log(...args) {
        // if (this.isEnabled) console.trace(...args);
        if (this.isEnabled) console.log(...args);
        /*
            db사용하면 log table에 log 저장 구현?
        */
    }
    err(...args) {
        if (this.isEnabled) console.error(...args);
    }
}

export default Logger;
