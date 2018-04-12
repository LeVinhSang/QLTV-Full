class User {

    /**
     * 
     * @param {string} account
     * @param {string} password
     * @param {string} email
     */
    constructor(account, password, email) {
        this.account = account;
        this.password = password;
        this.email = email;
    }

    /**
     * 
     * @return {string|*}
     */
    getAccount() {
        return this.account;
    }

    /**
     * 
     * @return {string | *}
     */
    getPassword() {
        return this.password;
    }

    /**
     * 
     * @return {string|*}
     */
    getEmail() {
        return this.email;
    }

    /**
     *
     * @param {int} code_conform
     */
    setCode_confirm(code_conform) {
        this.code_confirm = code_conform;
    }

    /**
     *
     * @return {int|*}
     */
    getCode_confirm() {
        return this.code_confirm;
    }

    /**
     *
     * @param {string} images
     */
    setImages(images) {
        this.images = images;
    }

    /**
     *
     * @return {string|*}
     */
    getImages() {
        return this.images;
    }

}

module.exports = User;
