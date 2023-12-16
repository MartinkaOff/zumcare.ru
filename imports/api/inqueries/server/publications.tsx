import {Meteor} from 'meteor/meteor';
import {Inqueries} from '../Inqueries';

Meteor.publish('inqueries.all', function () {
  return Inqueries.find();
});
