
exports.seed = function(knex, Promise) {
    return knex('publishers').truncate()
        .then(function () {
            return knex('publishers').insert([
                {name: "Anonymous", phone: null, address: ""},
                {name: "NXB-Kim Đồng", phone: "01648021510", address: "Hà Nội"},
                {name: "NXB-Nhi Đồng", phone: "01648021510", address: "Thanh Hóa"}
            ]);
        });
};
