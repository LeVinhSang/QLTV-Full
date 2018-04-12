
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
          {
              account: 'admin',
              password:'$2a$10$Sum/lxILDUVfZjBg3dpGcur8rfyUjxqSuEqMO3GM64yyqjolP0knq',
              images: 'http://image.phimmoi.net/film/2783/poster.medium.jpg',
              email:'sanglv@sphinx-software.com'
          }
      ]);
    });
};
