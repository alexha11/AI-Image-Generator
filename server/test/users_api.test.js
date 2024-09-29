import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import User from "../mongodb/models/user";

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const users = [
    {
      username: "user1",
      email: "abcd12345",
      password: "password1",
    },
    {
      username: "user2",
      email: "efgh67890",
      password: "password2",
    },
  ];

  const userObjects = users.map((user) => new User(user));

  const promiseArray = userObjects.map((user) => user.save());
  await Promise.all(promiseArray);
}
);

test("users are returned as json", async () => {
  await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all users are returned", async () => {
  const response = await api.get("/api/users");
  expect(response.body).toHaveLength(2);
});

test("a specific user is within the returned users", async () => {
  const response = await api.get("/api/users");
  const contents = response.body.map((r) => r.username);
  expect(contents).toContain("user1");
});

test("a valid user can be added", async () => {
  const newUser = {
    username: "user3",
    email: "ijkl12345",
    password: "password3",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/users");

  const contents = response.body.map((r) => r.username);

  expect(response.body).toHaveLength(3);
  expect(contents).toContain("user3");
});

test("user without username is not added", async () => {
  const newUser = {
    email: "mnop12345",
    password: "password4",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(500);
});

afterAll(() => {
  mongoose.connection.close();
});

