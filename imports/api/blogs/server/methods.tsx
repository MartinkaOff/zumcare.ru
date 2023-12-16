import { check } from "meteor/check";
import { Blog } from "../../../helpers/types";
import { Blogs } from "../Blogs";

Meteor.methods({
  "blogs.insert"(data: Blog) {
    check(data, {
      author: String,
      title: String,
      content: String,
    });

    Blogs.insert(data);
  },

  "blogs.update"(_id: string, title: string, content: string) {
    check(_id, String);
    check(title, String);
    check(content, String);

    const blog = Blogs.findOne(_id) as Blog;

    Blogs.update({ _id: _id }, { $set: { title, content } });
  },

  "blogs.updatePhoto"(data: Blog) {
    check(data, {
      _id: String,
      title: String,
      photo: String,
    });

    const { _id, title, photo } = data;

    Blogs.update({ _id: _id }, { $set: { title, photo } });
  },

  "blogs.remove"(_id: string) {
    check(_id, String);

    Blogs.remove(_id);
  },
});
