import Post from "../mongodb/models/post.js";
import User from "../mongodb/models/user.js";

const initialPosts = [
  {
    name: "Thanh Duong",
    prompt: "What is your favorite food?",
    photo: "https://www.google.com",
    love: 0,
    user: "672df5088ff8d59ed91c92eb",
  },
];

const initialUsers = [
  {
    username: "thanhduong",
    email: "thanhduonghd1214@gmail.com",
    password: "abcd12345",
  },
];

const nonExistingId = async () => {
  const post = new Post({
    name: "Thanh Duong",
    prompt: "What is your favorite color?",
    photo: "https://www.google.com",
    love: 0,
  });
  await post.save();
  await post.remove();

  return post._id.toString();
};

const postsInDb = async () => {
  const posts = await Post.find({});
  return posts.map((post) => post.toJSON());
};

const createPost = async (postData) => {
  const post = new Post(postData);
  await post.save();
  return post.toJSON();
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

export default { initialPosts, initialUsers, nonExistingId, postsInDb, usersInDb, createPost };