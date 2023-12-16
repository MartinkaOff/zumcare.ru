import { Meteor } from "meteor/meteor";
import { Genders } from "../Genders";

Meteor.publish('genders', function() {
    return Genders.find();
})