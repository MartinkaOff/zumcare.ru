import { Meteor } from "meteor/meteor";
import { PromoCodes } from "../PromoCodes";

Meteor.publish("promoCodes.all", function () {
  const cursor = PromoCodes.find();
  return cursor;
});
