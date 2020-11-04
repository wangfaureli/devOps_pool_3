'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'admin',
          password: '$2a$06$IMYYTt4GQOtcxdJyACik1.qskLjYU0GQRcYpGdYfqxEIDqugb4Nry',
          firstname: 'admin',
          lastname: 'admin',
          email: 'admin@admin.com',
          birthday: '2020-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          roleId: 1
        },
        {
          username: 'Rompiot',
          password: '$2a$06$IMYYTt4GQOtcxdJyACik1.qskLjYU0GQRcYpGdYfqxEIDqugb4Nry',
          firstname: 'Romain',
          lastname: 'PIOT',
          email: 'romainpiot.pro@gmail.com',
          birthday: '1991-12-10',
          createdAt: new Date(),
          updatedAt: new Date(),
          roleId: 2
        },
        {
          username: 'Litchie',
          password: '$2a$06$IMYYTt4GQOtcxdJyACik1.qskLjYU0GQRcYpGdYfqxEIDqugb4Nry',
          firstname: 'Li',
          lastname: 'TCHIE',
          email: 'litchie@gmail.com',
          birthday: '1953-02-04',
          createdAt: new Date(),
          updatedAt: new Date(),
          roleId: 2
        },
        {
          username: 'JatinB',
          password: '$2a$06$IMYYTt4GQOtcxdJyACik1.qskLjYU0GQRcYpGdYfqxEIDqugb4Nry',
          firstname: 'Jatin',
          lastname: 'BBB',
          email: 'jatinb@gmail.com',
          birthday: '2001-06-30',
          createdAt: new Date(),
          updatedAt: new Date(),
          roleId: 2
        },
        {
          username: 'Fitz',
          password: '$2a$06$IMYYTt4GQOtcxdJyACik1.qskLjYU0GQRcYpGdYfqxEIDqugb4Nry',
          firstname: 'Vincent',
          lastname: 'FITZ',
          email: 'fitz@gmail.com',
          birthday: '1995-08-11',
          createdAt: new Date(),
          updatedAt: new Date(),
          roleId: 2
        },
        {
          username: 'popol',
          password: '$2a$06$IMYYTt4GQOtcxdJyACik1.qskLjYU0GQRcYpGdYfqxEIDqugb4Nry',
          firstname: 'Paul',
          lastname: 'Polochon',
          email: 'popol@gmail.com',
          birthday: '1965-08-24',
          createdAt: new Date(),
          updatedAt: new Date(),
          roleId: 3
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});

  },
};
