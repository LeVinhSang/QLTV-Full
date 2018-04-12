const Publisher = require('./publisher');

class PublisherFactory {

    makeFromDB(publisherRaw) {
        let publisher = new Publisher(publisherRaw.name);
        publisher.setId(publisherRaw.id);
        publisher.setPhone(publisherRaw.phone);
        publisher.setAddress(publisherRaw.address);
        return publisher;
    }

    makeFromRequest(publisherRaw) {
        let publisher = new Publisher(publisherRaw.name);
        publisher.setPhone(publisherRaw.phone);
        publisher.setAddress(publisherRaw.address);
        return publisher;
    }
}

module.exports = PublisherFactory;
