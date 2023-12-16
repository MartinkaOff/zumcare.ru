import {check, Match} from 'meteor/check';
import {Specialists} from '../Specialists';
import {Specialist, Timezone, City} from '../../../helpers/types';

Meteor.methods({
  'specialists.insert'(userData: object): void {
    check(userData, {
      name: String,
      surname: String,
      userType: String,
      email: String,
      password: String,
      userId: String,
      phone: String,
      createdAt: Date
    });

    Specialists.insert(userData);
  },

  'specialists.remove'(specialistUserId: string): void {
    check(specialistUserId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const specialist = Specialists.findOne({userId: specialistUserId});
    Specialists.remove(specialist?._id);
    Meteor.users.remove(specialist?.userId);
  },
  'specialists.updateBasicDetails'(
    userData: Specialist,
    specialistUserId: string
  ) {
    check(userData, {
      name: String,
      surname: String,
      // email: String,
      age: Number,
      gender: String,
    });
    check(specialistUserId, String);


    const specialist = Specialists.findOne({userId: specialistUserId});
    if (specialist) Specialists.update(specialist._id, {$set: {...userData}});
  },
  'specialists.updateAdvancedDetails'(
    userData: Specialist,
    offline: string,
    timezone: Timezone,
    languages: object[],
    specializations: object[],
    methodics: object[],
    specialistUserId: string
  ){
    check(userData, {
      email: String,
      phone: String,
      experience: String,
      price: Number,
      currency: Match.Maybe(String),
      online: Match.Maybe(String),
      info: Match.Maybe(String),
      descriptor: Match.Maybe(String),
      background: Match.Maybe(String),
    });
    check(offline, String);
    check(timezone, Match.Maybe(Object));
    check(languages, Match.Maybe(Array));
    check(specializations, Match.Maybe(Array));
    check(methodics, Match.Maybe(Array));
    check(specialistUserId, String);

    const specialist = Specialists.findOne({userId: specialistUserId});
    if (specialist)
      Specialists.update(specialist._id, {
        $set: {...userData, offline, timezone, languages, specializations, methodics}
      });
  },
  'specialists.addCountryAndCity'(
    specialistUserId: string,
    city: string
  ){
    check(city, String);
    check(specialistUserId, String);

    const specialist = Specialists.findOne({userId: specialistUserId});
    if (specialist)
      Specialists.update(specialist._id, {
        $set: {city: city}
      });
  },
  'specialists.updateTableData'( userData, specialistUserId) 
  {
    check(userData, {
      name: String,
      surname: String,
      age: String,
      gender: String
    })
    check(specialistUserId, String)

    const specialist = Specialists.findOne({userId: specialistUserId});
    if (specialist) Specialists.update(specialist._id, {$set: {...userData}});
  },
});

// Specialists.remove({email: 'ildarastana@mail.ru'})
