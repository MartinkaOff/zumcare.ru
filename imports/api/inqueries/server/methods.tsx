import {check, Match} from 'meteor/check';
import {Inqueries} from '../Inqueries';

Meteor.methods({
  'inqueries.insert'(data: object) {
    check(data, {
      name: String,
      phone: String,
      messenger: String,
      case: Match.Maybe(String),
      attending: Match.Maybe(String),
      city: Match.Maybe(String),
      person: Match.Maybe(String),
      price: Match.Maybe(String),
      specializations: Match.Maybe(Array),
    });

    Inqueries.insert(data);
  },
});
