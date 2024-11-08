import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";

import Post from "../mongodb/models/post.js";
import User from "../mongodb/models/user.js";
import helper from "./helper.js";

const api = supertest(app);

var loginToken = "";

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

beforeEach(async () => {
  await Post.deleteMany({})
  await Post.insertMany(helper.initialPosts)
  
  // const res = await api
  //     .post('/api/login')
  //     .send({
  //         username: 'thanhduongTest',
  //         password: 'abcd123456'
  //     })
  // token = res.body.token 
})

beforeEach(async () => {
  const response = await api
      .post('/api/v1/user/login')
      .send({
          username: 'thanhduonghd1214@gmail.com',
          password: 'testing12345'
      })

  loginToken = response.body.token
  console.log('this one is the one u are looking for duong ' + response.body.username)

})

test('posts are returned as json and failed due to unauthorized', async () => {
  console.log('this one is the one u are looking for' + loginToken)
  await api
      .get('/api/v1/post')
      .expect(401)
      .expect('Content-Type', /application\/json/)
})

test("fail create a new post", async () => {
  const newPost = {
    name: "Sample Post",
    prompt: "This is a test prompt",
    photo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAYAAACAGCw...==", // A sample base64 image string
    user: "672df5088ff8d59ed91c92eb"
  };

  await api
    .post("/api/v1/post")
    .set("Authorization", `Bearer ${loginToken}`)
    .send(newPost)
    .expect(500);

  const postsAtEnd = await helper.postsInDb();
  expect(postsAtEnd).toHaveLength(1);
});

// test("fails to create a post with missing fields", async () => {
//   const newPost = {
//     name: "Incomplete Post",
//   };

//   await api
//     .post("/api/v1/post")
//     .set("Authorization", `Bearer ${token}`)
//     .send(newPost)
//     .expect(400);
// });

// test("delete an existing post", async () => {
//   const postToDelete = await helper.createPost({
//     name: "Deletable Post",
//     prompt: "Post to delete",
//     photo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAYAAACAGCw...",
//     user: user.body.id
//   });

//   await api
//     .delete(`/api/v1/post/${postToDelete.id}`)
//     .set("Authorization", `Bearer ${token}`)
//     .expect(200);

//   const postsAtEnd = await helper.postsInDb();
//   expect(postsAtEnd).toHaveLength(0);
// });



// describe("post api tests", () => {
  
//   let user;
//   let token;

//   beforeAll(async () => {
//     await User.deleteMany({});
//     await Post.deleteMany({});

//     await 

//     user = await api.post("/api/v1/user/login").send(
//       new 
//     )

//   });

//   afterAll(() => {
//     mongoose.connection.close();
//   });


afterAll(async () => {
    await mongoose.connection.close()
});