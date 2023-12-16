import { Sessions } from '../Sessions';
import { check } from 'meteor/check';

Meteor.methods({
  'sessions.insert'(data, roomData, messageForSpec, messageForClient, messageForAdmin) {
    check(data, {
      clientName: String,
      specialistName: String,
      comments: String,
      online: String,
      schedule: Array,
      clientId: String,
      specialistId: String
    });

    // const check = Sessions.findOne({name: data.name})
    // if(check === undefined) {
    //     Sessions.insert(assign);
    // } else if(check.name === data.name && check.specialist === data.specialist) {
    //     Sessions.update(check._id, {$set: {schedule: schedule.schedule, complete: false}})    //объединение сессий
    // } else {
    //     Sessions.insert(assign);
    // }

    Meteor.startup(function () {
      process.env.MAIL_URL =
        'smtps://zn@healthbalance.kz:piwEriixq3tNUAWhGf3N@smtp.mail.ru:465';
      Email.send({
        from: messageForSpec?.from,
        to: messageForSpec?.to,
        subject: messageForSpec?.subject,
        text: messageForSpec?.text,
      });
      Email.send({
        from: messageForClient?.from,
        to: messageForClient?.to,
        subject: messageForClient?.subject,
        text: messageForClient?.text,
      });
      Email.send({
        from: messageForAdmin?.from,
        to: messageForAdmin?.to,
        subject: messageForAdmin?.subject,
        text: messageForAdmin?.text,
      });
    });

    const assign = Object.assign(data, roomData)

    return Sessions.insert(assign);
  },
  'sessions.update'(data) {
    const session = Sessions.findOne({ _id: data._id });
    if (session) Sessions.update(session._id, { $set: { ...data } });
  },
  'sessions.remove'(sessionId) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const session = Sessions.findOne({ _id: sessionId });
    if (session !== undefined) {
      Sessions.remove(session._id);
    }
  },
  'sessions.complete'(sessionId) {
    const session = Sessions.findOne({ _id: sessionId });
    if (session !== undefined) {
      Sessions.update(session._id, { $set: { status: 'end' } });
    }
  },
  'sessions.cancel'(sessionId, cancel) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const session = Sessions.findOne({ _id: sessionId });
    if (session !== undefined) {
      Sessions.update(session._id, { $set: { cancel: cancel } });
    }
  },
  'sessions.messageCancel'(messageForAdmin) {
    Meteor.startup(function () {
      process.env.MAIL_URL =
        'smtps://zn@healthbalance.kz:piwEriixq3tNUAWhGf3N@smtp.mail.ru:465';
      Email.send({
        from: messageForAdmin?.from,
        to: messageForAdmin?.to,
        subject: messageForAdmin?.subject,
        text: messageForAdmin?.text,
      });
    });
  },
  'sessions.messageCancelForSpecAndClient'(messageForClient, messageForSpec) {
    Meteor.startup(function () {
      process.env.MAIL_URL =
        'smtps://zn@healthbalance.kz:piwEriixq3tNUAWhGf3N@smtp.mail.ru:465';
      Email.send({
        from: messageForClient?.from,
        to: messageForClient?.to,
        subject: messageForClient?.subject,
        text: messageForClient?.text,
      });
      Email.send({
        from: messageForSpec?.from,
        to: messageForSpec?.to,
        subject: messageForSpec?.subject,
        text: messageForSpec?.text,
      });
    });
  }
});
