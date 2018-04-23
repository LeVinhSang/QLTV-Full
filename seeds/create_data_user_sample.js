
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
          {
              account: '1400618',
              password:'$2a$10$Sum/lxILDUVfZjBg3dpGcur8rfyUjxqSuEqMO3GM64yyqjolP0knq',
              images: 'http://image.phimmoi.net/film/2783/poster.medium.jpg',
              decentralization: null,
              email:'lsang300696@gmail.com'
          },
          {
              account: 'admin',
              password:'$2a$10$Sum/lxILDUVfZjBg3dpGcur8rfyUjxqSuEqMO3GM64yyqjolP0knq',
              images: 'http://image.phimmoi.net/film/2783/poster.medium.jpg',
              decentralization: 'admin',
              email:'lsang300696@gmail.com'
          }
      ]);
    });
};
