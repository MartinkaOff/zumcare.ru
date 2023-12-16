import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.users.after.insert(function (userId, userData) {
  console.log(userData.profile.userType);
  if (!userId && Meteor.users.find().count() === 1) {
    console.log("new admin registered, added to 'admin' role", userData._id);
    return Roles.addUsersToRoles(userData._id, ['admin'], Roles.GLOBAL_GROUP);
  } else if (!userId) {
    if (userData.userType === 'specialist') {
      console.log(
        "new user registered, added to 'specialist' role",
        userData._id,
      );
      return Roles.addUsersToRoles(
        userData._id,
        ['specialist'],
        Roles.GLOBAL_GROUP,
      );
    } else if (userData.profile.userType === 'manager') {
      console.log('manager');
      console.log("new user registered, added to 'manager' role", userData._id);
      return Roles.addUsersToRoles(
        userData._id,
        ['manager'],
        Roles.GLOBAL_GROUP,
      );
    } else {
      console.log('client');
      console.log("new user registered, added to 'client' role", userData._id);
      return Roles.addUsersToRoles(
        userData._id,
        ['client'],
        Roles.GLOBAL_GROUP,
      );
    }
  }
});
