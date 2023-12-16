import { check, Match } from 'meteor/check';
import { Сompanies } from '../Сompanies';

Meteor.methods({
    'companies.insert'(company) {
        check(company, {
            company: String
        })
        Сompanies.insert(company);
    }
})