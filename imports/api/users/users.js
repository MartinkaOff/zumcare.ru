import { Meteor } from 'meteor/meteor';

Meteor.users.deny({
  update() {
    return true;
  },
});

Meteor.startup(() => {
  const roles = ['admin', 'specialist', 'client', 'manager'];
  roles.forEach((role) => Roles.createRole(role, { unlessExists: true }));
});
