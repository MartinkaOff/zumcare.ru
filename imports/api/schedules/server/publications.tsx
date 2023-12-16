import { Meteor } from "meteor/meteor";
import { Schedules } from "../Schedules";

Meteor.publish('schedules', function() {
    return Schedules.find();
})