import { Meteor } from "meteor/meteor";
import { Blogs } from "../Blogs";

Meteor.publish("blogs.all", function () {
  const cursor = Blogs.find();
  return cursor;
});

Meteor.publish("blogs.getByBlogId", function (blogId: string) {
  return Blogs.find({ _id: blogId });
});

Meteor.publish("blogs.withPhoto", function () {
  const cursor = Blogs.find({ photo: true });
  if (cursor) return cursor;
  return this.ready();
});
