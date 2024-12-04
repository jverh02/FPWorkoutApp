export default class Friend {
    info = null;
    uuid = Math.random() * 1e16;
    constructor(user) {
        this.info = user;
    }
}