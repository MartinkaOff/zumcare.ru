import { check, Match } from 'meteor/check';
import { Clients } from '../Clients';

Meteor.methods({
  'clients.insert'(userData) {
    check(userData, {
      name: String,
      surname: String,
      userType: String,
      email: String,
      password: String,
      userId: String,
      phone: String,
      createdAt: Date,
      company: Match.Optional(String),
    });

    Clients.insert(userData);
  },

  'clients.remove'(clientUserId) {
    check(clientUserId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const client = Clients.findOne({ userId: clientUserId });
    Clients.remove(client._id);
    Meteor.users.remove(client.userId);
  },
  'clients.updateBasicDetails'(userData, clientUserId) {
    check(userData, {
      name: String,
      surname: String,
      age: Number,
      gender: String,
    });
    check(clientUserId, String);

    const client = Clients.findOne({ userId: clientUserId });
    if (client) Clients.update(client._id, { $set: { ...userData } });
  },
  'clients.updateTableData'(userData, clientUserId) {
    check(userData, {
      name: String,
      surname: String,
      age: String,
      gender: String,
    });
    check(clientUserId, String);
    const client = Clients.findOne({ userId: clientUserId });
    if (client) {
      Clients.update(client._id, { $set: { ...userData } });
    }
  },
  'clients.completeSession'(clientUserId) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const client = Clients.findOne({ userId: clientUserId });
    if (client !== undefined) {
      const completeSessions = client.completeSessions
      if (completeSessions === undefined || Number.isNaN(completeSessions)) {
        Clients.update(client._id, { $set: { completeSessions: 1 } });
      } else {
        Clients.update(client._id, { $set: { completeSessions: completeSessions + 1 } });
      }
    }
  }
});
