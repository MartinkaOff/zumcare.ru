import { Meteor } from 'meteor/meteor';
import { Сompanies } from '../Сompanies';

Meteor.publish('companies', function () {
    return Сompanies.find();
});


