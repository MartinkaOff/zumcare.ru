import { useTracker } from "meteor/react-meteor-data";
import { Blogs } from "../../api/blogs/Blogs";
import { Blog } from "../types";

export function useMultipleBlogs(withPhoto?: boolean | null, _id?: string) {
  const { blogs, isBlogsLoading } = useTracker(() => {
    const subscription = withPhoto
      ? Meteor.subscribe("blogs.withPhoto")
      : Meteor.subscribe("blogs.all");
    const blogs = Blogs.find().fetch() as Blog[];
    return { blogs, isBlogsLoading: !subscription.ready() };
  });

  return { blogs, isBlogsLoading };
}
