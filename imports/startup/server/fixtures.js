import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const SEED_USERNAME = 'admin@admin.com';
const SEED_NAME = 'admin';
const SEED_PASSWORD = 'password';

const MANAGER_USERNAME = 'manager@manager.com';
const MANAGER_NAME = 'manager';
const MANAGER_PASSWORD = 'password';

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
      profile: {
        name: SEED_NAME,
        email: SEED_USERNAME,
        userType: 'admin',
      },
    });
    Accounts.createUser({
      username: MANAGER_USERNAME,
      password: MANAGER_PASSWORD,
      profile: {
        name: MANAGER_NAME,
        email: MANAGER_USERNAME,
        userType: 'manager',
      },
    });
  }
});
