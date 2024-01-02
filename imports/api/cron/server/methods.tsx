import { Meteor } from 'meteor/meteor';
// import { Room } from '../../../helpers/types';
// import { RoomDB } from '../../room/Room';
import { Sessions } from '../../sessions/Sessions';
import { Session } from '../../../helpers/types';

Meteor.methods({
  async scheduleEmailing() {
    const now = new Date(); // Get the current time

    const after = new Date(now.getTime() + 40 * 60000); // Add 15 minutes to the current time

    const matchingRoom = Sessions.find({
      schedule: { $lte: after },
    }).fetch() as Session[];

    if (matchingRoom.length < 1) {
      return;
    } else {
      const parallelEmails = matchingRoom.map(async (session) => {
        await sendEmail(session, now);
        endSessionsAfterTime(session, now)
      });
      await Promise.all(parallelEmails);
    }

    return matchingRoom;
  }
});

function sendEmail(session: Session, now) {
  //@ts-ignore
  const dateForSendingEmail = new Date(session.schedule.getTime() - session.step * 60000)
  const notification = new Date(session.schedule.getTime() - 5 * 60000);

  if (now.toLocaleString() == dateForSendingEmail.toLocaleString() ||
    now.toLocaleString() == session.schedule.toLocaleString() ||
    now.toLocaleString() == notification.toLocaleString()
  ) {

    const subject = 'Conference';
    //Рабочая ссылка на dev стороне
    const text =
      'Добрый день, привет от команды zumcare. Вы забронировали встречу в ' +
      session.schedule.toLocaleString("kk-KZ", { timeZone: 'Asia/Almaty' }) +
      ' вот ссылка для входа : http://healthbalance.pro/conference/' +
      session._id;


    Meteor.call('sendEmail', session.specialist, subject, text);
    Meteor.call('sendEmail', session.client, subject, text);
  }
}

function endSessionsAfterTime(session: Session, now) {
  const dateForAfterTime = new Date(session.schedule.getTime() + 60 * 60000)
  if (now >= dateForAfterTime) {
    Meteor.call('sessions.complete', session._id);
  }
};