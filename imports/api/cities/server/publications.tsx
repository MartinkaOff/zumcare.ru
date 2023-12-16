import { Meteor } from "meteor/meteor";
import { Cities } from "../Cities";

Meteor.publish('cities', function() {
    return Cities.find();
})