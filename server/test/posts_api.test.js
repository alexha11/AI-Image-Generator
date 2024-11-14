import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";

import Post from "../mongodb/models/post.js";
import User from "../mongodb/models/user.js";
import helper from "./helper.js";

const api = supertest(app);
let loginToken = "";

beforeEach(async () => {
  await User.deleteMany({});
  await api
    .post("/api/v1/user/register")
    .send(helper.initialUsers[0])
    .expect(201)
    .expect("Content-Type", /application\/json/);
});

beforeEach(async () => {
  await Post.deleteMany({});
  await Post.insertMany(helper.initialPosts);
});

beforeEach(async () => {
  const response = await api
    .post("/api/v1/user/login")
    .send({
      email: "thanhduonghd1214@gmail.com",
      password: "abcd12345",
    });

  loginToken = response.body.token;
});

test("posts are returned as json and fail due to unauthorized access", async () => {
  await api.get("/api/v1/post").expect(401).expect("Content-Type", /application\/json/);
});

test("create successfully a new post", async () => {
  const newPost = {
    name: "Sample Post",
    prompt: "This is a test prompt",
    photo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/3FXwfkAAAAASUVORK5CYII=",
  };

  await api
    .post("/api/v1/post")
    .set("Authorization", `Bearer ${loginToken}`)
    .send(newPost)
    .expect(201);

  const postsAtEnd = await helper.postsInDb();
  expect(postsAtEnd).toHaveLength(helper.initialPosts.length + 1);
});

test("attempt to create a post without authorization fails", async () => {
  const newPost = {
    name: "Unauthorized Post",
    prompt: "This should fail",
    photo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/3FXwfkAAAAASUVORK5CYII=",
  };

  await api
    .post("/api/v1/post")
    .send(newPost)
    .expect(401); // Unauthorized
});

test("toggle love on a post", async () => {
  const postsAtStart = await helper.postsInDb();
  
  expect(postsAtStart).toHaveLength(helper.initialPosts.length);
  
  const postToLove = postsAtStart[0];

  const postID = postToLove._id.toString();
  
  expect(postID).toBeDefined();

  await api
    .post(`/api/v1/post/${postID}/love`)
    .set("Authorization", `Bearer ${loginToken}`)
    .expect(200);

  const updatedPost = await Post.findById(postID);
  expect(updatedPost.love).toBe(postToLove.love + 1);

  // Then "unlove" the post
  await api
    .post(`/api/v1/post/${postID}/love`)
    .set("Authorization", `Bearer ${loginToken}`)
    .expect(200);

  const postAfterUnlove = await Post.findById(postID);
  expect(postAfterUnlove.love).toBe(postToLove.love); // Back to original
});


afterAll(async () => {
  await mongoose.connection.close();
});
