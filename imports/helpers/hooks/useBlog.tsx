import { useTracker } from "meteor/react-meteor-data";
import { Blogs } from "../../api/blogs/Blogs";
import { Blog } from "../types";

export function useBlog(_id?: string) {
  const { blog, isBlogLoading } = useTracker(() => {
    const subscription = !!_id
      ? Meteor.subscribe("blogs.getByBlogId", _id)
      : Meteor.subscribe("blogs.all");
    const blog = Blogs.findOne({ _id: _id }) as Blog;
    return { blog, isBlogLoading: !subscription.ready() };
  });

  const updateBlog = (title: string, content: string) => {
    Meteor.call("blogs.update", _id, content, title);
  };

  return { blog, isBlogLoading, updateBlog };
}
