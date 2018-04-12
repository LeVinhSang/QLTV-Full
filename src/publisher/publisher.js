class Publisher {

    /**
     *
     * @param {string} name
     */
    constructor(name) {
        this.name = name;
    }

    /**
     *
     * @return {string|*}
     */
    getName() {
        return this.name;
    }

    /**
     *
     * @param {int} id
     */
    setId(id) {
        this.id = id;
    }

    /**
     *
     * @return {int|*}
     */
    getId() {
        return this.id;
    }

    /**
     *
     * @param {string} address
     */
    setAddress(address) {
        this.address = address;
    }

    /**
     *
     * @return {string|*}
     */
    getAddress() {
        return this.address;
    }

    /**
     *
     * @param {int} phone
     */
    setPhone(phone) {
        this.phone = phone;
    }

    /**
     *
     * @return {int|*}
     */
    getPhone() {
        return this.phone;
    }

}

module.exports = Publisher;
