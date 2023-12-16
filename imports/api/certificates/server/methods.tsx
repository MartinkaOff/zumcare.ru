import { Match, check } from 'meteor/check';
import { Certificates } from '../Certificates';
import { Certificate } from '../../../helpers/types';

Meteor.methods({
  'certificates.insert'(certificate: Certificate) {
    check(certificate, {
      _id: Match.Optional(String),
      specialistUserId: String,
      certificateUrl: String,
    });

    const certificateInDb = Certificates.findOne({
      _id: certificate._id,
    });

    if (certificateInDb)
      Certificates.update({ _id: certificateInDb._id }, { $set: certificate });
    else {
      Certificates.insert(certificate);
    }
  },
});
