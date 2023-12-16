import { check, Match } from 'meteor/check';
import { handleMethodException } from '../../helpers/handle-method-exception';
import { Roles } from 'meteor/alanning:roles';
import { v4 as uuidv4 } from 'uuid';


Meteor.methods({
  'users.insert'(userData) {
    check(userData, {
      name: String,
      surname: String,
      userType: String,
      email: String,
      password: String,
      confirmPassword: String,
      phone: String,
      terms: Boolean,
      company: Match.Optional(String),
    });

    const duplicate = Meteor.users.findOne({ username: userData.email });
    if (duplicate) {
      throw new Meteor.Error(
        409,
        `There is already a user with email: ${duplicate.username}`,
      );
    } else {
      try {
        const userId = Accounts.createUser({
          username: userData.email,
          password: userData.password,
          profile: {
            name: userData.name,
            surname: userData.surname,
            email: userData.email,
            phone: userData.phone,
            userType: userData.userType,
            company: userData.company,
          },
        });

        Roles.addUsersToRoles(userId, [userData.userType], Roles.GLOBAL_GROUP);
        userData.userId = userId;
        userData.createdAt = new Date();
        delete userData.terms;
        delete userData.confirmPassword;

        if (userData.userType === 'specialist') {
          return Meteor.call('specialists.insert', userData);
        } else if (userData.userType === 'admin') {
          return Meteor.call('admin.insert', userData);
        } else if (userData.userType === 'manager') {
          return Meteor.call('manager.insert', userData);
        } else return Meteor.call('clients.insert', userData);
      } catch (exception) {
        console.log(exception);
        handleMethodException(exception);
      }
    }
  },
  'users.forgotPassword'(email) {

    const user = Meteor.users.findOne({ username: email });

    if (user !== undefined) {
      if (!user.emails) Accounts.addEmail(user._id, email);

      process.env.MAIL_URL =
        'smtps://zn@healthbalance.kz:piwEriixq3tNUAWhGf3N@smtp.mail.ru:465';

      Email.send({
        from: 'Zoomcare - Психологическая поддержка сотрудников <zn@healthbalance.kz>',
        to: email,
        subject: 'Сброс пароля',
        text: `Ссылка для восстановления пароля https://dev.zoomcare.kz/reset-password/?email=${email}`
      });
    } else {
      throw new Meteor.Error(
        403,
        `There is no user with this email: ${email}`,
      );
    }
  },
  'users.resetPassword'(email, newPassword) {
    const user = Meteor.users.findOne({ username: email });

    Accounts.setPassword(user._id, newPassword);
  }
});