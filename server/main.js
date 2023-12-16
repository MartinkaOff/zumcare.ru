import '../imports/startup/server';
import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';

SyncedCron.add({
  name: 'Schedule',
  schedule(parser) {
    return parser.text('every 5 minutes');
  },
  job() {
    console.log('Running example cron job');
    Meteor.call('scheduleEmailing');
    SyncedCron.remove(Schedule);
    SyncedCron.stop();
  },
});

SyncedCron.start();
