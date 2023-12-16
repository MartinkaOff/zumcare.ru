import { Meteor } from 'meteor/meteor';
import { Files } from '../Files';

Meteor.methods({
  'files.upload'(fileData) {
    check(fileData, Object);

    const fileId = Files.insert(fileData);
    return fileId;
  },

  'files.remove'(fileId) {
    check(fileId, String);

    const file = Files.findOne(fileId);
    if (!file) {
      throw new Meteor.Error('file-not-found', 'The file does not exist.');
    }

    if (file.creatorId !== this.userId) {
      throw new Meteor.Error(
        'access-denied',
        'You do not have permission to remove this file.',
      );
    }

    Files.remove(fileId);
  },
});
