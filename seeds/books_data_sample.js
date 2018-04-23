
exports.seed = function(knex, Promise) {
    return knex('books').truncate()
        .then(function () {
            return knex('books').insert([
                {title: "Dragon Ball Z", author: "Akira", images_book: 'http://image.phimmoi.net/film/2844/poster.medium.jpg',
                    publisher_id: 1, genre: 'comic', amount: 10, published_in: 1992},
                {title: "One Piece", author: "Akira", images_book: 'http://image.phimmoi.net/film/665/poster.medium.jpg',
                    publisher_id: 1, genre: 'comic', amount: 11, published_in: 1992},
            ]);
        });
};
