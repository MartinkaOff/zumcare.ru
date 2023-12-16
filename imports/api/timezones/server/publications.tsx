import { Meteor } from "meteor/meteor";
import { Timezones } from "../Timezones";

Meteor.publish('timezones', function() {
    return Timezones.find();
})