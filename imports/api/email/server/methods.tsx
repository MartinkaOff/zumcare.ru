import { check } from 'meteor/check';
import { Email } from 'meteor/email';

Meteor.methods({
  sendEmail(to, subject, text) {
    check([to, subject, text], [String]);
    process.env.MAIL_URL =
      'smtps://zn@healthbalance.kz:piwEriixq3tNUAWhGf3N@smtp.mail.ru:465';
    Email.send({
      to,
      from: 'Zoomcare - Психологическая поддержка сотрудников <zn@healthbalance.kz>',
      subject,
      text,
    });
  },
});
