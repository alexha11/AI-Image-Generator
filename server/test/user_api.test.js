import mongoose from "mongoose";
import supertest from "supertest";

import app from "../app.js";

import User from "../mongodb/models/user.js";
import helper from "./helper.js";

const api = supertest(app);

describe("user api tests", () => {

  // beforeEach(async () => {
  //   await User.deleteMany({});
  // });
  beforeEach(async () => {
    await User.deleteMany({});
  });
  afterAll(() => {
    mongoose.connection.close();
  }
  );

  test("register user", async () => {

    const newUser = {
      username: "thanhduong11",
      email: "thanhduonghd114@gmail.com",
      password: "abcd12345", 
    };
  
    await api
      .post("/api/v1/user/register")
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    
    const usersAtEnd = await helper.usersInDb();
    const usernames = usersAtEnd.map((user) => user.username);
    console.log(usersAtEnd);
    expect(usernames).toContain(newUser.username);
    });

  test("register user with invalid email", async () => {
    const newUser = {
      username: "thanhduong11",
        email: "thanhduonghd114gmail.com",
        password: "testing123",
      };
      await api
        .post("/api/v1/user/register")
        .send(newUser)
        .expect(400);

    });

    test("update user count with invalid data, and expect count to be default", async () => {
      const newUser = {
        username: "thanhduong11",
        email: "thanhduonghd114@gmail.com",
        password: "abcd12345",
      };
  
      const createdUser = await api.post("/api/v1/user/register").send(newUser).expect(201);
  
      const userId = createdUser.body.data._id;
  
      await api
        .put(`/api/v1/user/${userId}`)
        .send({ count: -1 }) 
        .expect(400);
  
      const updatedUser = await User.findById(userId);


      expect(updatedUser.count).toBe(0); 
    });
    
    

  });