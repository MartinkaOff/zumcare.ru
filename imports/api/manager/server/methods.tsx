import {Manager} from '../Manager'

Meteor.methods({
    'manager.insert'(userData) {
        Manager.insert(userData);
    }
})