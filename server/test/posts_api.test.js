import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import Post from "../mongodb/models/post.js";
import User from "../mongodb/models/user.js";
import helper from "./helper.js";

const api = supertest(app);

describe("post api tests", () => {
  
  let user;
  let token;

  beforeAll(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});

    // Create a user and get a token if your app supports JWT authentication
    const newUser = {
      username: "testuser",
      email: "testuser@gmail.com",
      password: "password123",
    };
    user = await api.post("/api/v1/user/register").send(newUser);
    token = user.body.token; // Assuming a token is returned on registration
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test("create a new post", async () => {
    const newPost = {
      name: "Sample Post",
      prompt: "This is a test prompt",
      photo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAYAAACAGCw...==" // A sample base64 image string
    };

    await api
      .post("/api/v1/post")
      .set("Authorization", `Bearer ${token}`)
      .send(newPost)
      .expect(201);

    const postsAtEnd = await helper.postsInDb();
    expect(postsAtEnd).toHaveLength(1);
  });

  test("fails to create a post with missing fields", async () => {
    const newPost = {
      name: "Incomplete Post",
    };

    await api
      .post("/api/v1/post")
      .set("Authorization", `Bearer ${token}`)
      .send(newPost)
      .expect(400);
  });

  test("delete an existing post", async () => {
    const postToDelete = await helper.createPost({
      name: "Deletable Post",
      prompt: "Post to delete",
      photo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAYAAACAGCw...",
      user: user.body.id
    });

    await api
      .delete(`/api/v1/post/${postToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const postsAtEnd = await helper.postsInDb();
    expect(postsAtEnd).toHaveLength(0);
  });
});
